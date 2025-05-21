'use client';

import Link from 'next/link';

type ClaimResultProps = {
  result: {
    verdict: 'likely true' | 'likely false' | 'needs review';
    confidence: number;
    id: string;
    explanation?: string;
    factVerification?: {
      isFactual: boolean;
      confidence: number;
      relevantFacts?: string[];
    };
  };
  onReset: () => void;
};

export default function ClaimResult({ result, onReset }: ClaimResultProps) {
  return (
    <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Verification Result</h3>
      <div className={`p-4 rounded-md mb-4 ${
        result.verdict === 'likely true' ? 'bg-green-100 text-green-800' :
        result.verdict === 'likely false' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {result.verdict === 'likely true' ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : result.verdict === 'likely false' ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium capitalize">
              This claim is {result.verdict} (Confidence: {Math.round(result.confidence * 100)}%)
            </p>
          </div>
        </div>
      </div>
      
      {result.explanation && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Why this assessment?</h4>
          <p className="text-sm text-gray-600">{result.explanation}</p>
        </div>
      )}
      
      {result.factVerification && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
          <h4 className="text-sm font-medium text-blue-700 mb-1">Fact Verification</h4>
          <p className="text-sm text-blue-600">
            This claim appears to be {result.factVerification.isFactual ? 'factual' : 'non-factual'} 
            (Confidence: {Math.round(result.factVerification.confidence * 100)}%)
          </p>
          {result.factVerification.relevantFacts && result.factVerification.relevantFacts.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-blue-700">Relevant facts:</p>
              <ul className="list-disc list-inside text-xs text-blue-600 mt-1">
                {result.factVerification.relevantFacts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between">
        <Link href={`/feed?id=${result.id}`} className="text-blue-600 hover:underline">
          View full report
        </Link>
        <button
          onClick={onReset}
          className="text-gray-600 hover:text-gray-800"
        >
          Submit another claim
        </button>
      </div>
    </section>
  );
}