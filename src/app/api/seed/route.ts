import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';

// Sample reports for seeding the database
const sampleReports = [
  {
    claim: 'The Philippines has the fastest internet speed in Southeast Asia',
    verdict: 'likely false',
    confidence: 0.92,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    sources: ['DICT Reports', 'Speedtest Global Index']
  },
  {
    claim: 'The national budget for education increased by 15% in 2024',
    verdict: 'likely true',
    confidence: 0.88,
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    sources: ['DBM Transparency Portal', 'Official Gazette']
  },
  {
    claim: 'A new government program offers free laptops to all college students',
    verdict: 'needs review',
    confidence: 0.45,
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    sources: ['CHED Website']
  }
];

export async function GET() {
  try {
    console.log('Checking if database needs seeding');
    
    // Check if we already have reports
    const reportsQuery = query(collection(db, 'reports'), limit(1));
    const querySnapshot = await getDocs(reportsQuery);
    
    // Only seed if no reports exist
    if (querySnapshot.empty) {
      console.log('Database is empty, adding sample reports');
      
      // Add sample reports to Firestore
      const addedReports = await Promise.all(
        sampleReports.map(report => addDoc(collection(db, 'reports'), report))
      );
      
      console.log(`Added ${addedReports.length} sample reports`);
      
      return NextResponse.json({
        success: true,
        message: `Added ${addedReports.length} sample reports`,
      });
    }
    
    console.log('Database already contains reports, skipping seed');
    return NextResponse.json({
      success: true,
      message: 'Database already contains reports, skipping seed',
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}