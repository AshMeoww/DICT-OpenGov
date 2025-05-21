'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';

type Report = {
  id: string;
  claim: string;
  url?: string;
  verdict: 'likely true' | 'likely false' | 'needs review';
  confidence: number;
  timestamp: string;
  sources?: any[];
  explanation?: string;
};

export default function Feed() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const searchParams = useSearchParams();
  const router = useRouter();
  const highlightId = searchParams.get('id');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/getReports', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();
        console.log('Fetched reports:', data.reports);
        setReports(data.reports || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
    
    // Set up a refresh interval
    const intervalId = setInterval(fetchReports, 5000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.verdict === filter;
  });

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'likely true':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'likely false':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
          <div className="md:flex-grow">
            <h1 className="text-3xl font-bold mb-2 text-center md:text-left">Fact-Check Feed</h1>
            <p className="text-gray-600 text-center md:text-left">
              Browse verified claims and reports from the community
            </p>
          </div>
          <div className="md:w-64">
            <StatsCard />
          </div>
        </div>

        <div className="mb-6 flex justify-center md:justify-start">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                filter === 'all'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              All Reports
            </button>
            <button
              type="button"
              onClick={() => setFilter('likely true')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                filter === 'likely true'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Likely True
            </button>
            <button
              type="button"
              onClick={() => setFilter('likely false')}
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'likely false'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Likely False
            </button>
            <button
              type="button"
              onClick={() => setFilter('needs review')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                filter === 'needs review'
                  ? 'bg-yellow-600 text-white border-yellow-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Needs Review
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No reports found</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
              Submit a claim to check
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div 
                key={report.id} 
                id={report.id}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getVerdictColor(report.verdict)} ${
                  highlightId === report.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium line-clamp-2">{report.claim}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    report.verdict === 'likely true' ? 'bg-green-100 text-green-800' :
                    report.verdict === 'likely false' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.verdict}
                  </span>
                </div>
                
                {report.url && (
                  <div className="mb-3 text-sm text-gray-500 truncate">
                    <span className="font-medium">Source URL:</span>{' '}
                    <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {report.url}
                    </a>
                  </div>
                )}
                
                {report.explanation && (
                  <div className="mb-3 text-sm text-gray-800">
                    <span className="font-medium">Analysis:</span>{' '}
                    <p>{report.explanation}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Confidence:</span>{' '}
                    {Math.round(report.confidence * 100)}%
                  </div>
                  <div>
                    <span className="font-medium">Submitted:</span>{' '}
                    {new Date(report.timestamp).toLocaleString()}
                  </div>
                </div>
                
                {report.sources && report.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Verified against:</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.sources.map((source, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {typeof source === 'string' ? source : source.name || 'Unknown source'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}