"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const TokenRequestForm = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('qtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('https://qt.organogram.app/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request token');
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('qtToken', data.token);
      setError('');
    } catch (error) {
      setError('Failed to request token. Please check your email address.');
      console.error('Error requesting token:', error);
    }
  };

  return (
    <div className="  mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Request Token</h1>

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Enter your email" required />
        </div>

        {/* Submit Button */}
        <div className='flex gap-4'>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Request Token</button>
          {token &&   <Link href="/">
            <div className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Create Question</div>
          </Link>}
        </div>
      </form>

      {/* Display token if available */}
      {token && <p className="mt-4">Token: {token}</p>}

      {/* Display error message if request fails */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default TokenRequestForm;
