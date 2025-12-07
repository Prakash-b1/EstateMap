import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Received Enquiry:', body);
        // Here you would typically save to MongoDB

        return NextResponse.json({ success: true, message: 'Enquiry received' });
    } catch (_) {
        return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }
}
