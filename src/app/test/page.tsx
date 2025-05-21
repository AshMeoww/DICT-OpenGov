'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApiKeyTester from '@/components/ApiKeyTester';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">API Testing</h1>
        
        <ApiKeyTester />
      </main>
      
      <Footer />
    </div>
  );
}