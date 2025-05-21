'use client';

import { useState, useEffect } from 'react';

type DataSource = {
  name: string;
  url: string;
  description: string;
};

export default function DataSourcesSection() {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSources() {
      try {
        const response = await fetch('/api/opendata');
        if (!response.ok) throw new Error('Failed to fetch sources');
        const data = await response.json();
        setSources(data.sources);
      } catch (error) {
        console.error('Error fetching sources:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSources();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-3 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <section className="max-w-5xl mx-auto mt-12 px-4">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Trusted Data Sources</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our verification system leverages these authoritative data sources to provide accurate and reliable fact-checking.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">{source.name}</h4>
            </div>
            <p className="text-gray-600 flex-grow">{source.description}</p>
            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
              Visit source
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}