'use client';

import { useState } from 'react';

export default function TestDatabasePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to fetch. Is the server running?',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Database Connection Test
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to verify your Supabase connection is working.
        </p>

        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          {loading ? 'Testing...' : 'Test Database Connection'}
        </button>

        {result && (
          <div
            className={`mt-6 p-4 rounded-xl ${
              result.success
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {result.success ? '✅' : '❌'}
              </span>
              <span
                className={`font-semibold ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {result.success ? 'Success!' : 'Failed'}
              </span>
            </div>

            <p
              className={`text-sm ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {result.message}
            </p>

            {result.tests && (
              <div className="mt-4 space-y-1 text-sm">
                {Object.entries(result.tests).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium text-green-600">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {result.error && (
              <div className="mt-4 text-sm text-red-600">
                <p className="font-medium">Error:</p>
                <p className="mt-1">{result.error}</p>
              </div>
            )}

            {result.hint && (
              <div className="mt-4 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                <p className="font-medium">💡 Hint:</p>
                <p className="mt-1">{result.hint}</p>
              </div>
            )}

            {result.timestamp && (
              <p className="mt-4 text-xs text-gray-400">
                {new Date(result.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Setup Checklist:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                1
              </span>
              Created Supabase project
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                2
              </span>
              Ran SQL migration
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                3
              </span>
              Set environment variables
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
