'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TRENDING_TOPICS = [
  {
    id: 'topic1',
    topic: 'COVID-19 Vaccines',
    claimCount: 24,
    topClaim: 'COVID-19 vaccines contain microchips for tracking',
    verdict: 'likely false'
  },
  {
    id: 'topic2',
    topic: 'Government Budget',
    claimCount: 18,
    topClaim: 'Education budget increased by 15% in 2024',
    verdict: 'likely true'
  },
  {
    id: 'topic3',
    topic: 'Election Integrity',
    claimCount: 32,
    topClaim: 'Widespread fraud affected election results',
    verdict: 'likely false'
  },
  {
    id: 'topic4',
    topic: 'Climate Change',
    claimCount: 15,
    topClaim: 'Sea levels rising faster than predicted',
    verdict: 'needs review'
  }
];

export default function TrendingTopics() {
  const [topics, setTopics] = useState(TRENDING_TOPICS);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-3">Trending Topics</h3>
      <div className="space-y-3">
        {topics.map(topic => (
          <div key={topic.id} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-blue-700">{topic.topic}</h4>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {topic.claimCount} claims
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{topic.topClaim}</p>
            <div className="flex justify-end mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                topic.verdict === 'likely true' ? 'bg-green-100 text-green-800' :
                topic.verdict === 'likely false' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {topic.verdict}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <Link href="/topics" className="text-sm text-blue-600 hover:underline">
          View all topics
        </Link>
      </div>
    </div>
  );
}