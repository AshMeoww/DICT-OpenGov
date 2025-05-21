'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DataSourcesSection from '@/components/DataSourcesSection';
import ClaimResult from '@/components/ClaimResult';

export default function Home() {
  const [claim, setClaim] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!claim.trim() && !url.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting claim:', { claim, url });
      
      // Call our API endpoint to check the claim using the Hugging Face model
      const response = await fetch('/api/checkClaim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim, url }),
      });
      
      console.log('Check claim response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to check claim: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Check claim response data:', data);
      
      // Submit the report with the verdict
      const reportResponse = await fetch('/api/submitReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          claim,
          url,
          verdict: data.verdict,
          confidence: data.confidence,
          explanation: data.explanation,
          sources: data.sources,
        }),
      });
      
      console.log('Submit report response status:', reportResponse.status);
      
      if (!reportResponse.ok) {
        const errorText = await reportResponse.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to submit report: ${reportResponse.status}`);
      }
      
      const reportData = await reportResponse.json();
      console.log('Submit report response data:', reportData);
      
      setResult({
        verdict: data.verdict,
        confidence: data.confidence,
        explanation: data.explanation,
        id: reportData.id,
      });
      
      // Reset form after successful submission
      setClaim('');
      setUrl('');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Verify Information & Combat Disinformation
          </h2>
          <p className="text-gray-800 mb-8 text-center">
            Submit a suspicious claim or URL to check against open government data and AI analysis
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="claim" className="block text-sm font-medium text-gray-900 mb-1">
                Suspicious Claim
              </label>
              <textarea
                id="claim"
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Enter the claim you want to verify..."
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-900 mb-1">
                URL (Optional)
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/article"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || (!claim.trim() && !url.trim())}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Checking...' : 'Check Now'}
              </button>
            </div>
          </form>
        </section>

        {result && (
          <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Verification Result</h3>
            <div className={`p-4 rounded-md mb-4 ${
              result.verdict === 'likely true' ? 'bg-green-100 text-green-800' :
              result.verdict === 'likely false' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="font-medium capitalize">
                    This claim is {result.verdict} (Confidence: {Math.round(result.confidence * 100)}%)
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4 text-xs text-gray-700 italic">
              <p>Reliability note: Results are based on the Fake-News-Bert-Detect AI model. Higher confidence percentages generally indicate more reliable results.</p>
            </div>
            
            {result.explanation && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-800">{result.explanation}</p>
              </div>
            )}
            
            <div className="flex justify-between">
              <a href="/feed" className="text-blue-600 hover:underline">
                View all reports
              </a>
              <button
                onClick={() => setResult(null)}
                className="text-gray-800 hover:text-black"
              >
                Submit another claim
              </button>
            </div>
          </section>
        )}

        <DataSourcesSection />
      </main>

      <Footer />
    </div>
  );
}