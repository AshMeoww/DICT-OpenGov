// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function GET() {
  try {
    const reportsRef = collection(db, 'reports');
    
    const allReportsSnapshot = await getDocs(reportsRef);
    const total = allReportsSnapshot.size;

    const getCount = async (verdict: string) => 
      (await getDocs(query(reportsRef, where('verdict', '==', verdict)))).size;

    const likelyTrue = await getCount('likely true');
    const likelyFalse = await getCount('likely false');
    const needsReview = await getCount('needs review');

    return NextResponse.json({
      success: true,
      stats: {
        total,
        verdicts: {
          likelyTrue,
          likelyFalse,
          needsReview
        }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });

    
  }
}
