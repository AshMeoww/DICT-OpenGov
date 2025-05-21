import { NextResponse } from 'next/server';

// In a real application, this would connect to a database
// Export the reports array so it can be imported by other routes
export const reports = [];
let nextId = 1;

export async function POST(request: Request) {
  try {
    const reportData = await request.json();
    
    if (!reportData.claim && !reportData.url) {
      return NextResponse.json(
        { error: 'Claim or URL is required' },
        { status: 400 }
      );
    }
    
    const report = {
      id: String(nextId++),
      timestamp: new Date().toISOString(),
      ...reportData
    };
    
    reports.push(report);
    console.log('Report submitted:', report);
    
    return NextResponse.json({ id: report.id });
    
  } catch (error) {
    console.error('Error submitting report:', error);
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}