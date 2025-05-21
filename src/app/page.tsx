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

      <div className="bg-gradient-to-b from-blue-600 to-blue-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verify Information
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Submit a claim or URL to check against trusted data sources and AI analysis
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 -mt-0">
        <section className="max-w-3xl mx-auto glass-card rounded-lg shadow-lg p-6 md:p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="claim" className="block text-sm font-medium text-gray-900 mb-2">
                Claim
              </label>
              <textarea
                id="claim"
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                rows={3}
                placeholder="Enter the claim you want to verify..."
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-900 mb-2">
                URL (Optional)
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="https://example.com/article"
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting || (!claim.trim() && !url.trim())}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </div>
                ) : 'Check Now'}
              </button>
            </div>
          </form>
        </section>

        {result && (
          <section className="max-w-3xl mx-auto glass-card rounded-lg shadow-lg p-6 md:p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verification Result
            </h3>
            <div className={`p-5 rounded-lg mb-6 ${
              result.verdict === 'likely true' ? 'bg-green-50 border border-green-200' :
              result.verdict === 'likely false' ? 'bg-red-50 border border-red-200' :
              'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center">
                {result.verdict === 'likely true' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : result.verdict === 'likely false' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <div>
                  <p className={`font-medium text-lg capitalize ${
                    result.verdict === 'likely true' ? 'text-green-800' :
                    result.verdict === 'likely false' ? 'text-red-800' :
                    'text-yellow-800'
                  }`}>
                    This claim is {result.verdict}
                  </p>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          result.verdict === 'likely true' ? 'bg-green-600' :
                          result.verdict === 'likely false' ? 'bg-red-600' :
                          'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.round(result.confidence * 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 text-xs text-gray-700 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Results are based on the Fake-News-Bert-Detect AI model. Higher confidence percentages generally indicate more reliable results.</p>
            </div>
            
            {result.explanation && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Analysis</h4>
                <p className="text-gray-800">{result.explanation}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <a href="/feed" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                View all reports
              </a>
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
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