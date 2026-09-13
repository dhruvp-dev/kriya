'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { signInAction } from '../../lib/actions/auth';
import { useToast } from '../../components/ui/Toast';
import { FullScreenLoginLoading } from '../../components/ui/FullScreenLoginLoading';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
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

    if (!res.success) {
      setIsSubmitting(false);
      showToast(res.error || 'Invalid credentials.', 'error');
      return;
    }

    // Instead of just giving a toast, activate the full-screen logging in screen
    setIsLoggingIn(true);
    router.prefetch('/dashboard');
    setTimeout(() => {
      router.push('/dashboard');
    }, 850);
  };

  return (
    <>
      {isLoggingIn && <FullScreenLoginLoading email={email} />}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 bg-[#F9FAFB] text-[#070709] font-sans selection:bg-[#070709] selection:text-white">
        {/* Background Soft Glow */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center group py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] rounded-lg"
          >
            <span className="font-satoshi font-bold text-3xl tracking-normal text-[#070709] lowercase">
              kriya
            </span>
          </Link>


          <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
            Log in to your account
          </h1>
          <p className="text-sm text-[#60606C] max-w-xs mx-auto leading-relaxed">
            Continue your daily quests, build your streak, and compound your momentum.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#070709] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#070709] placeholder-[#9CA3AF] focus:outline-none focus:border-[#070709] focus:bg-white focus:ring-1 focus:ring-[#070709] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#070709] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#070709] placeholder-[#9CA3AF] focus:outline-none focus:border-[#070709] focus:bg-white focus:ring-1 focus:ring-[#070709] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoggingIn}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#070709] hover:bg-[#1E1E24] text-white font-medium text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting || isLoggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#60606C]">
          Don't have an account yet?{' '}
          <Link href="/signup" className="text-[#070709] hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
