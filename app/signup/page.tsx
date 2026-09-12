'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, Globe } from 'lucide-react';
import { AvatarCustomizer } from '../../components/rpg/avatar';
import { DEFAULT_AVATAR_CONFIG, AvatarConfig } from '../../types/avatar.types';
import { signUpAction } from '../../lib/actions/auth';
import { useToast } from '../../components/ui/Toast';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    ...DEFAULT_AVATAR_CONFIG,
    baseModel: 'architect' as any,
  });
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 bg-[#F9FAFB] text-[#070709] font-sans selection:bg-[#070709] selection:text-white">
      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      <div className="w-full max-w-2xl space-y-8">
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
            Create your account
          </h1>
          <p className="text-sm text-[#60606C] max-w-md mx-auto leading-relaxed">
            Choose your persona archetype, configure your profile, and start turning action into progress.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#070709] mb-1.5">
                  Display Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Alex Skywalker"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#070709] placeholder-[#9CA3AF] focus:outline-none focus:border-[#070709] focus:bg-white focus:ring-1 focus:ring-[#070709] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#070709] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3 pointer-events-none" />
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
                  <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#070709] placeholder-[#9CA3AF] focus:outline-none focus:border-[#070709] focus:bg-white focus:ring-1 focus:ring-[#070709] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#070709] mb-1.5">
                  Timezone
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="UTC, America/New_York..."
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#070709] placeholder-[#9CA3AF] focus:outline-none focus:border-[#070709] focus:bg-white focus:ring-1 focus:ring-[#070709] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Persona Customizer Section */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-[#070709]">Character Archetype</h2>
                <p className="text-xs text-[#60606C]">
                  Choose your starting persona. You can switch between modern Blob and Pixel avatars anytime.
                </p>
              </div>

              <AvatarCustomizer
                config={avatarConfig}
                onChange={setAvatarConfig}
                hideFrames={true}
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#070709] hover:bg-[#1E1E24] text-white font-medium text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Start Questing</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#60606C]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#070709] hover:underline font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
