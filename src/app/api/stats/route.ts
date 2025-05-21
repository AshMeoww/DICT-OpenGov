import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function GET() {
  try {
    const reportsRef = collection(db, 'reports');
    
    // Get all reports
    const allReportsSnapshot = await getDocs(reportsRef);
    const totalReports = allReportsSnapshot.size;
    
    // Get likely true reports
    const trueReportsQuery = query(reportsRef, where('verdict', '==', 'likely true'));
    const trueReportsSnapshot = await getDocs(trueReportsQuery);
    const trueReports = trueReportsSnapshot.size;
    
    // Get likely false reports
    const falseReportsQuery = query(reportsRef, where('verdict', '==', 'likely false'));
    const falseReportsSnapshot = await getDocs(falseReportsQuery);
    const falseReports = falseReportsSnapshot.size;
    
    // Get needs review reports
    const reviewReportsQuery = query(reportsRef, where('verdict', '==', 'needs review'));
    const reviewReportsSnapshot = await getDocs(reviewReportsQuery);
    const reviewReports = reviewReportsSnapshot.size;
    
    return NextResponse.json({
      success: true,
      stats: {
        total: totalReports,
        likelyTrue: trueReports,
        likelyFalse: falseReports,
        needsReview: reviewReports,
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}