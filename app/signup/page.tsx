'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { AvatarCustomizer } from '../../components/rpg/avatar3d/AvatarCustomizer';
import { DEFAULT_AVATAR_CONFIG, AvatarConfig } from '../../types/avatar.types';
import { signUpAction } from '../../lib/actions/auth';
import { useToast } from '../../components/ui/Toast';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  const [timezone, setTimezone] = useState('UTC');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof Intl !== 'undefined') {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please provide email and password.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('display_name', displayName.trim() || email.split('@')[0]);
    formData.append('avatar_config', JSON.stringify(avatarConfig));
    formData.append('timezone', timezone);

    const res = await signUpAction(formData);
    setIsSubmitting(false);

    if (!res.success) {
      showToast(res.error || 'Failed to create account.', 'error');
      return;
    }

    showToast('Account created! Initializing character...', 'success');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8 bg-[#161310]">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-indigo-600/30">
              K
            </div>
          </Link>
          <h1 className="text-2xl font-black text-slate-100">Begin Your Quest</h1>
          <p className="text-sm text-slate-400">Create your account, design your 3D avatar, and initialize progression.</p>
        </div>

        <Card className="p-6 border-slate-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Alex Skywalker"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

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
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Timezone (for Streak calculation)
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="UTC, America/New_York..."
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* 3D Avatar Customizer */}
            <div className="pt-4 border-t border-slate-800">
              <AvatarCustomizer
                config={avatarConfig}
                onChange={setAvatarConfig}
                ownedAccessories={[]}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
              Start Progression <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
