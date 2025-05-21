import { NextResponse } from 'next/server';
import { reports } from '../submitReport/route';

export async function GET() {
  try {
    // Sort reports by timestamp (newest first)
    const sortedReports = [...reports].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return NextResponse.json({
      success: true,
      reports: sortedReports,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}