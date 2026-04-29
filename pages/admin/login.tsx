import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const json = await res.json();
      setError(json.error || 'Login failed');
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - Prochar</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Admin login for Prochar email marketing platform" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
      <form className="w-full max-w-md p-6 border rounded" onSubmit={submit}>
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">Email</label>
        <input className="w-full mb-3 p-2 border" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block mb-2">Password</label>
        <input type="password" className="w-full mb-4 p-2 border" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
      </form>
      </div>
    </>
  );
}
