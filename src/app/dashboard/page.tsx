'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportStats from '@/components/ReportStats';
import TrendingTopics from '@/components/TrendingTopics';
import FactCheckSources from '@/components/FactCheckSources';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">TrustHub Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <ReportStats />
          </div>
          
          <div className="md:col-span-1">
            <TrendingTopics />
          </div>
          
          <div className="md:col-span-1 lg:col-span-2">
            <FactCheckSources />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3 text-black">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg mb-3 font-bold">Recent Activity</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center border-b border-gray-100 pb-2 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <div className="flex-grow">
                      <p className="text-sm">
                        A new claim was {i % 2 === 0 ? 'verified as likely true' : 'flagged as likely false'}
                      </p>
                      <p className="text-xs text-gray-500">{i} minute{i !== 1 ? 's' : ''} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}