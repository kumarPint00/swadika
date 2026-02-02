// Authentication Service - Phone OTP & Google OAuth

import crypto from 'crypto';

export interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
  profilePicture?: string;
  addresses: DeliveryAddress[];
  loyaltyPoints: number;
  walletBalance: number;
  orderCount: number;
  totalSpent: number;
  createdAt: Date;
  lastLogin: Date;
  authProvider: 'phone' | 'google';
  isVerified: boolean;
}

export interface DeliveryAddress {
  id: string;
  label: string; // "Home", "Work", "Other"
  fullAddress: string;
  landmark?: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}

export interface OTPSession {
  phone: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

export interface AuthSession {
  sessionId: string;
  userId: string;
  expiresAt: Date;
  device?: string;
  ip?: string;
}

class AuthService {
  private users: Map<string, User> = new Map();
  private otpSessions: Map<string, OTPSession> = new Map();
  private authSessions: Map<string, AuthSession> = new Map();
  private phoneToUserId: Map<string, string> = new Map();
  private emailToUserId: Map<string, string> = new Map();

  // Generate 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate session ID
  private generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Send OTP via SMS (Twilio/Firebase)
  async sendOTP(phone: string): Promise<boolean> {
    try {
      // Validate phone format
      if (!/^\+91[6-9]\d{9}$/.test(phone)) {
        throw new Error('Invalid Indian phone number format');
      }

      // Check if OTP already sent recently (rate limiting)
      const existingSession = this.otpSessions.get(phone);
      if (existingSession && existingSession.expiresAt > new Date()) {
        const waitTime = Math.ceil((existingSession.expiresAt.getTime() - Date.now()) / 1000);
        throw new Error(`Please wait ${waitTime} seconds before requesting new OTP`);
      }

      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Store OTP session
      this.otpSessions.set(phone, {
        phone,
        otp,
        expiresAt,
        attempts: 0,
        createdAt: new Date()
      });

      // In production, use Twilio or Firebase Auth
      // await twilioClient.messages.create({
      //   body: `Your Swadika verification code is: ${otp}. Valid for 5 minutes.`,
      //   to: phone,
      //   from: process.env.TWILIO_PHONE_NUMBER
      // });

      console.log(`[OTP] Sent to ${phone}: ${otp} (expires in 5 min)`);
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  }

  // Verify OTP and create/login user
  async verifyOTP(phone: string, otp: string, deviceInfo?: string): Promise<{ 
    success: boolean; 
    user?: User; 
    sessionId?: string;
    error?: string;
  }> {
    const session = this.otpSessions.get(phone);

    if (!session) {
      return { success: false, error: 'No OTP session found. Please request OTP first.' };
    }

    if (session.expiresAt < new Date()) {
      this.otpSessions.delete(phone);
      return { success: false, error: 'OTP expired. Please request a new one.' };
    }

    if (session.attempts >= 3) {
      this.otpSessions.delete(phone);
      return { success: false, error: 'Too many incorrect attempts. Please request a new OTP.' };
    }

    if (session.otp !== otp) {
      session.attempts++;
      return { success: false, error: `Incorrect OTP. ${3 - session.attempts} attempts remaining.` };
    }

    // OTP verified - create or get user
    let user = this.getUserByPhone(phone);
    
    if (!user) {
      // New user - create account
      user = this.createUser({
        phone,
        authProvider: 'phone',
        name: phone.slice(-10) // Default name as phone number
      });
    }

    // Update last login
    user.lastLogin = new Date();
    user.isVerified = true;

    // Create auth session
    const sessionId = this.generateSessionId();
    const authSession: AuthSession = {
      sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      device: deviceInfo
    };

    this.authSessions.set(sessionId, authSession);

    // Clean up OTP session
    this.otpSessions.delete(phone);

    return { success: true, user, sessionId };
  }

  // Google OAuth login
  async loginWithGoogle(googleToken: string, deviceInfo?: string): Promise<{
    success: boolean;
    user?: User;
    sessionId?: string;
    error?: string;
  }> {
    try {
      // In production, verify Google token with Google OAuth API
      // const ticket = await googleClient.verifyIdToken({
      //   idToken: googleToken,
      //   audience: process.env.GOOGLE_CLIENT_ID
      // });
      // const payload = ticket.getPayload();

      // Mock Google payload
      const payload = {
        sub: 'google_' + Math.random().toString(36).substr(2, 9),
        email: 'user@example.com',
        name: 'John Doe',
        picture: 'https://example.com/avatar.jpg'
      };

      if (!payload.email) {
        return { success: false, error: 'No email found in Google account' };
      }

      // Check if user exists
      let user = this.getUserByEmail(payload.email);

      if (!user) {
        // Create new user from Google account
        user = this.createUser({
          email: payload.email,
          name: payload.name || payload.email.split('@')[0],
          profilePicture: payload.picture,
          authProvider: 'google',
          phone: '' // Will be added later if needed
        });
      }

      // Update last login
      user.lastLogin = new Date();
      user.isVerified = true;

      // Create auth session
      const sessionId = this.generateSessionId();
      this.authSessions.set(sessionId, {
        sessionId,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        device: deviceInfo
      });

      return { success: true, user, sessionId };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'Failed to authenticate with Google' };
    }
  }

  // Create new user
  private createUser(data: {
    phone?: string;
    email?: string;
    name?: string;
    profilePicture?: string;
    authProvider: 'phone' | 'google';
  }): User {
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    const user: User = {
      id: userId,
      phone: data.phone || '',
      email: data.email,
      name: data.name,
      profilePicture: data.profilePicture,
      addresses: [],
      loyaltyPoints: 0,
      walletBalance: 0,
      orderCount: 0,
      totalSpent: 0,
      createdAt: new Date(),
      lastLogin: new Date(),
      authProvider: data.authProvider,
      isVerified: false
    };

    this.users.set(userId, user);
    
    if (data.phone) this.phoneToUserId.set(data.phone, userId);
    if (data.email) this.emailToUserId.set(data.email, userId);

    return user;
  }

  // Get user by session ID
  getUserBySession(sessionId: string): User | null {
    const session = this.authSessions.get(sessionId);
    
    if (!session) return null;
    
    if (session.expiresAt < new Date()) {
      this.authSessions.delete(sessionId);
      return null;
    }

    return this.users.get(session.userId) || null;
  }

  // Get user by phone
  getUserByPhone(phone: string): User | null {
    const userId = this.phoneToUserId.get(phone);
    return userId ? this.users.get(userId) || null : null;
  }

  // Get user by email
  getUserByEmail(email: string): User | null {
    const userId = this.emailToUserId.get(email);
    return userId ? this.users.get(userId) || null : null;
  }

  // Update user profile
  updateProfile(userId: string, updates: {
    name?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
  }): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    if (updates.name) user.name = updates.name;
    if (updates.email) {
      if (user.email) this.emailToUserId.delete(user.email);
      user.email = updates.email;
      this.emailToUserId.set(updates.email, userId);
    }
    if (updates.phone) {
      if (user.phone) this.phoneToUserId.delete(user.phone);
      user.phone = updates.phone;
      this.phoneToUserId.set(updates.phone, userId);
    }
    if (updates.profilePicture) user.profilePicture = updates.profilePicture;

    return user;
  }

  // Add delivery address
  addAddress(userId: string, address: Omit<DeliveryAddress, 'id'>): DeliveryAddress | null {
    const user = this.users.get(userId);
    if (!user) return null;

    const newAddress: DeliveryAddress = {
      id: 'addr_' + Date.now(),
      ...address
    };

    // If this is the first address or marked as default, make it default
    if (user.addresses.length === 0 || address.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);
    return newAddress;
  }

  // Update address
  updateAddress(userId: string, addressId: string, updates: Partial<DeliveryAddress>): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    const address = user.addresses.find(a => a.id === addressId);
    if (!address) return false;

    Object.assign(address, updates);

    // If setting as default, unset others
    if (updates.isDefault) {
      user.addresses.forEach(addr => {
        if (addr.id !== addressId) addr.isDefault = false;
      });
    }

    return true;
  }

  // Delete address
  deleteAddress(userId: string, addressId: string): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    const index = user.addresses.findIndex(a => a.id === addressId);
    if (index === -1) return false;

    const wasDefault = user.addresses[index].isDefault;
    user.addresses.splice(index, 1);

    // If deleted address was default, make first address default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    return true;
  }

  // Add loyalty points
  addLoyaltyPoints(userId: string, points: number): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    user.loyaltyPoints += points;
    return true;
  }

  // Deduct loyalty points
  deductLoyaltyPoints(userId: string, points: number): boolean {
    const user = this.users.get(userId);
    if (!user || user.loyaltyPoints < points) return false;

    user.loyaltyPoints -= points;
    return true;
  }

  // Add wallet balance
  addWalletBalance(userId: string, amount: number): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    user.walletBalance += amount;
    return true;
  }

  // Deduct wallet balance
  deductWalletBalance(userId: string, amount: number): boolean {
    const user = this.users.get(userId);
    if (!user || user.walletBalance < amount) return false;

    user.walletBalance -= amount;
    return true;
  }

  // Update order stats after successful order
  updateOrderStats(userId: string, orderAmount: number): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    user.orderCount++;
    user.totalSpent += orderAmount;
    return true;
  }

  // Logout - invalidate session
  logout(sessionId: string): boolean {
    return this.authSessions.delete(sessionId);
  }

  // Get all users (admin only)
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Get user analytics
  getUserAnalytics(userId: string) {
    const user = this.users.get(userId);
    if (!user) return null;

    return {
      userId: user.id,
      memberSince: user.createdAt,
      totalOrders: user.orderCount,
      totalSpent: user.totalSpent,
      averageOrderValue: user.orderCount > 0 ? user.totalSpent / user.orderCount : 0,
      loyaltyPoints: user.loyaltyPoints,
      walletBalance: user.walletBalance,
      lastLogin: user.lastLogin,
      addressCount: user.addresses.length
    };
  }
}

// Singleton instance
export const authService = new AuthService();

// Helper functions for API routes
export async function sendOTPAPI(phone: string) {
  return await authService.sendOTP(phone);
}

export async function verifyOTPAPI(phone: string, otp: string, deviceInfo?: string) {
  return await authService.verifyOTP(phone, otp, deviceInfo);
}

export async function loginWithGoogleAPI(googleToken: string, deviceInfo?: string) {
  return await authService.loginWithGoogle(googleToken, deviceInfo);
}

export function getUserBySessionAPI(sessionId: string) {
  return authService.getUserBySession(sessionId);
}

export function updateProfileAPI(userId: string, updates: any) {
  return authService.updateProfile(userId, updates);
}

export function addAddressAPI(userId: string, address: any) {
  return authService.addAddress(userId, address);
}

export function logoutAPI(sessionId: string) {
  return authService.logout(sessionId);
}
