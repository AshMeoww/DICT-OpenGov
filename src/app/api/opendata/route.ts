import { NextResponse } from 'next/server';
import { dataSources } from '@/lib/opendata';

// API endpoint to fetch open data sources
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  
  try {
    // Filter data sources based on query if provided
    let sources = dataSources;
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      sources = dataSources.filter(source => 
        source.name.toLowerCase().includes(lowerQuery) || 
        source.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    return NextResponse.json({
      success: true,
      sources,
    });
  } catch (error) {
    console.error('Error fetching open data sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch open data sources' },
      { status: 500 }
    );
  }
}