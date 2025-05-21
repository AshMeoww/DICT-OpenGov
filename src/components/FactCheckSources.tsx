'use client';

import { useState } from 'react';

const FACT_CHECK_SOURCES = [
  {
    id: 'source1',
    name: 'Philippine Open Data Portal',
    url: 'https://data.gov.ph',
    description: 'Official open data portal of the Philippine government',
    category: 'government'
  },
  {
    id: 'source2',
    name: 'PSA Statistics',
    url: 'https://psa.gov.ph',
    description: 'Official statistics on population, economy, and other national data',
    category: 'government'
  },
  {
    id: 'source3',
    name: 'FactsFirstPH',
    url: 'https://www.rappler.com/facts-first',
    description: 'Collaborative fact-checking initiative',
    category: 'media'
  },
  {
    id: 'source4',
    name: 'DBM Transparency Portal',
    url: 'https://dbm.gov.ph/transparency',
    description: 'Budget allocation and spending information',
    category: 'government'
  },
  {
    id: 'source5',
    name: 'CICC Scam Alerts',
    url: 'https://www.cicc.gov.ph',
    description: 'Cybercrime alerts and warnings',
    category: 'security'
  }
];

export default function FactCheckSources() {
  const [filter, setFilter] = useState('all');
  
  const filteredSources = FACT_CHECK_SOURCES.filter(source => 
    filter === 'all' || source.category === filter
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-3">Fact-Checking Sources</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs rounded-full ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('government')}
          className={`px-3 py-1 text-xs rounded-full ${
            filter === 'government' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Government
        </button>
        <button 
          onClick={() => setFilter('media')}
          className={`px-3 py-1 text-xs rounded-full ${
            filter === 'media' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Media
        </button>
        <button 
          onClick={() => setFilter('security')}
          className={`px-3 py-1 text-xs rounded-full ${
            filter === 'security' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Security
        </button>
      </div>
      
      <div className="space-y-3">
        {filteredSources.map(source => (
          <a 
            key={source.id} 
            href={source.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 border border-gray-100 rounded hover:bg-gray-50"
          >
            <h4 className="font-medium text-blue-700">{source.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{source.description}</p>
            <div className="flex justify-end mt-1">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {source.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}