import { NextRequest, NextResponse } from 'next/server';
import { sendOTPAPI } from '@/lib/services/authService';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const success = await sendOTPAPI(phone);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send OTP' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
