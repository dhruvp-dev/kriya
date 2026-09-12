'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { signInAction } from '../../lib/actions/auth';
import { useToast } from '../../components/ui/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await signInAction(formData);
    setIsSubmitting(false);

    if (!res.success) {
      showToast(res.error || 'Invalid credentials.', 'error');
      return;
    }

    showToast('Welcome back, Hero!', 'success');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#161310]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-indigo-600/30">
              K
            </div>
          </Link>
          <h1 className="text-2xl font-black text-slate-100">Welcome Back</h1>
          <p className="text-sm text-slate-400">Log in to resume your RPG progression.</p>
        </div>

        <Card className="p-6 border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hero@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
              Log In <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Don't have a character yet?{' '}
          <Link href="/signup" className="text-indigo-400 hover:underline font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
