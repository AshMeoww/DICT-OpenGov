'use client';

import { useEffect, useState } from 'react';

type Stats = {
  total: number;
  likelyTrue: number;
  likelyFalse: number;
  needsReview: number;
};

export default function StatsCard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!stats) {
    return null;
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2">Fact-Check Statistics</h3>
      <p className="text-3xl font-bold mb-4">{stats.total} Total Reports</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-green-50 p-2 rounded">
          <span className="block text-green-700 font-medium">{stats.likelyTrue}</span>
          <span className="text-xs text-green-600">True</span>
        </div>
        <div className="bg-red-50 p-2 rounded">
          <span className="block text-red-700 font-medium">{stats.likelyFalse}</span>
          <span className="text-xs text-red-600">False</span>
        </div>
        <div className="bg-yellow-50 p-2 rounded">
          <span className="block text-yellow-700 font-medium">{stats.needsReview}</span>
          <span className="text-xs text-yellow-600">Review</span>
        </div>
      </div>
    </div>
  );
}