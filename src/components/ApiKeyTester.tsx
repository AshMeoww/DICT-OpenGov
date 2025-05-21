'use client';

import { useState, useEffect } from 'react';

export default function ApiKeyTester() {
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    apiKey?: string;
    model?: string;
    response?: any;
  } | null>(null);
  
  const [loading, setLoading] = useState(false);

  const testApiKey = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-huggingface');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Hugging Face API Key Tester</h3>
      
      <button
        onClick={testApiKey}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Key'}
      </button>
      
      {testResult && (
        <div className={`mt-4 p-4 rounded-md ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h4 className={`font-medium ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
            {testResult.success ? 'Success!' : 'Error'}
          </h4>
          
          {testResult.message && <p className="text-sm mt-1">{testResult.message}</p>}
          {testResult.error && <p className="text-sm text-red-600 mt-1">{testResult.error}</p>}
          
          {testResult.apiKey && (
            <p className="text-sm mt-2">
              <span className="font-medium">API Key:</span> {testResult.apiKey}
            </p>
          )}
          
          {testResult.model && (
            <p className="text-sm mt-1">
              <span className="font-medium">Model:</span> {testResult.model}
            </p>
          )}
          
          {testResult.response && (
            <div className="mt-3">
              <p className="text-sm font-medium">API Response:</p>
              <pre className="text-xs bg-gray-100 p-2 mt-1 rounded overflow-auto max-h-40">
                {JSON.stringify(testResult.response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}