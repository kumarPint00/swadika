import { NextRequest, NextResponse } from 'next/server';
import { verifyOTPAPI } from '@/lib/services/authService';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    const deviceInfo = request.headers.get('user-agent') || undefined;
    const result = await verifyOTPAPI(phone, otp, deviceInfo);

    if (!result.success) {
      return NextResponse.json(result, { status: 401 });
    }

    // Set session cookie
    const response = NextResponse.json(result);
    response.cookies.set('session_id', result.sessionId!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
