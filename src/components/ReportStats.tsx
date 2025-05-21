'use client';

import { useState, useEffect } from 'react';

export default function ReportStats() {
  const [stats, setStats] = useState({
    total: 0,
    likelyTrue: 0,
    likelyFalse: 0,
    needsReview: 0,
    loading: true
  });
  
  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setStats({
        total: 87,
        likelyTrue: 32,
        likelyFalse: 41,
        needsReview: 14,
        loading: false
      });
    }, 1000);
  }, []);
  
  if (stats.loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-2">Fact-Check Statistics</h3>
      <p className="text-3xl font-bold mb-4">{stats.total} Total Reports</p>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-green-50 p-3 rounded text-center">
          <span className="block text-2xl font-bold text-green-700">{stats.likelyTrue}</span>
          <span className="text-sm text-green-600">Likely True</span>
        </div>
        <div className="bg-red-50 p-3 rounded text-center">
          <span className="block text-2xl font-bold text-red-700">{stats.likelyFalse}</span>
          <span className="text-sm text-red-600">Likely False</span>
        </div>
        <div className="bg-yellow-50 p-3 rounded text-center">
          <span className="block text-2xl font-bold text-yellow-700">{stats.needsReview}</span>
          <span className="text-sm text-yellow-600">Needs Review</span>
        </div>
      </div>
    </div>
  );
}