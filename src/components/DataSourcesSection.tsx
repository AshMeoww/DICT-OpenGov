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
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <section className="max-w-3xl mx-auto mt-12">
      <h3 className="text-xl font-semibold mb-4 text-center">Trusted Data Sources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border border-gray-200"
          >
            <h4 className="font-medium mb-1">{source.name}</h4>
            <p className="text-sm text-gray-600">{source.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}