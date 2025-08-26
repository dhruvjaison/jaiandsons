import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  type: 'enquiry' | 'visit';
  name: string;
  email: string;
  phone: string;
  message: string;
  visitDate?: string;
  visitTime?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();
    
    // Validate required fields
    const { type, name, email, phone, message } = body;
    
    if (!type || !name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Additional validation for visit type
    if (type === 'visit') {
      const { visitDate, visitTime } = body;
      if (!visitDate || !visitTime) {
        return NextResponse.json(
          { error: 'Visit date and time are required for visit scheduling' },
          { status: 400 }
        );
      }
    }
    
    // Log the lead data (in production, you would save to database)
    console.log('New lead received:', {
      type,
      name,
      email,
      phone,
      message,
      ...(type === 'visit' && { visitDate: body.visitDate, visitTime: body.visitTime }),
      timestamp: new Date().toISOString(),
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, you would:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send email notifications to sales team
    // 3. Send confirmation email to customer
    // 4. Integrate with CRM system
    // 5. Send SMS notifications
    
    // Example of what you might do:
    /*
    // Save to database
    const lead = await db.leads.create({
      type,
      name,
      email,
      phone,
      message,
      visitDate: body.visitDate,
      visitTime: body.visitTime,
      source: 'website',
      status: 'new',
      createdAt: new Date(),
    });
    
    // Send email to sales team
    await sendEmail({
      to: 'sales@arc-luxury.com',
      subject: `New ${type === 'visit' ? 'Site Visit' : 'Enquiry'} - ${name}`,
      template: 'new-lead',
      data: body,
    });
    
    // Send confirmation to customer
    await sendEmail({
      to: email,
      subject: 'Thank you for your interest in ARC Luxury',
      template: 'lead-confirmation',
      data: { name, type },
    });
    
    // Send SMS to customer
    if (type === 'visit') {
      await sendSMS({
        to: phone,
        message: `Hi ${name}, your site visit is scheduled for ${visitDate} at ${visitTime}. We'll send you a reminder. - ARC Luxury`,
      });
    }
    */
    
    return NextResponse.json(
      {
        success: true,
        message: type === 'visit' 
          ? 'Site visit scheduled successfully'
          : 'Enquiry submitted successfully',
        leadId: `LEAD-${Date.now()}`, // In production, use proper UUID
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing lead:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS (if needed)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 