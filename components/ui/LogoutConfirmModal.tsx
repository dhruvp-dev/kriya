'use client';

import React, { useState, useEffect } from 'react';
import { LogOut, X } from 'lucide-react';
import { signOutAction } from '../../lib/actions/auth';
import { createClient } from '../../lib/supabase/client';

export interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutConfirmModal({ isOpen, onClose }: LogoutConfirmModalProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSigningOut) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isSigningOut]);

  if (!isOpen) return null;

  const handleConfirmLogout = async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await signOutAction();
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none font-sans">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!isSigningOut) onClose();
        }}
        className="fixed inset-0 bg-[#070709]/40 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#FFFFFF] border border-[#EBEBEF] rounded-2xl p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FDF4F2] border border-[#C85A3D]/20 flex items-center justify-center text-[#C85A3D] shrink-0">
            <LogOut className="w-5 h-5 stroke-[1.75]" />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSigningOut}
            className="p-1.5 text-[#8B8B8B] hover:text-[#070709] hover:bg-[#F7F7F8] rounded-lg transition-colors border border-[#EBEBEF] cursor-pointer disabled:opacity-40"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold text-[#070709] tracking-tight">
            Log out of KRIYA?
          </h2>
          <p className="text-xs sm:text-sm text-[#60606C] leading-relaxed font-normal">
            Are you sure you want to end your session? Your quests, daily streak, and character progress remain safely saved.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#F0F1F3]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSigningOut}
            className="px-4 py-2 text-xs font-medium text-[#60606C] hover:text-[#070709] hover:bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl transition-colors cursor-pointer disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmLogout}
            disabled={isSigningOut}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C85A3D] hover:bg-[#B34A2E] text-white text-xs font-medium rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[2]" />
            <span>{isSigningOut ? 'Logging out...' : 'Log out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
