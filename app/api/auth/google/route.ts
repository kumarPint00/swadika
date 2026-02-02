import { NextRequest, NextResponse } from 'next/server';
import { loginWithGoogleAPI } from '@/lib/services/authService';

export async function POST(request: NextRequest) {
  try {
    const { googleToken } = await request.json();

    if (!googleToken) {
      return NextResponse.json(
        { success: false, error: 'Google token is required' },
        { status: 400 }
      );
    }

    const deviceInfo = request.headers.get('user-agent') || undefined;
    const result = await loginWithGoogleAPI(googleToken, deviceInfo);

    if (!result.success) {
      return NextResponse.json(result, { status: 401 });
    }

    // Set session cookie
    const response = NextResponse.json(result);
    response.cookies.set('session_id', result.sessionId!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
