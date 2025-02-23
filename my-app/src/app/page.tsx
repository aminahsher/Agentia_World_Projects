'use client';
import { useState } from 'react';

export default function Home() {
  const [requirements, setRequirements] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requirements }),
      });
      
      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Code Generator</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="requirements" className="block mb-2">
              Enter your requirements:
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
        </form>

        {generatedCode && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Generated Code:</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {generatedCode}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
} 