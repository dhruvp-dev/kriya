'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (arg1: string, arg2?: string, arg3?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((arg1: string, arg2?: string, arg3?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    let type: ToastType = 'info';
    let message = arg1;

    if (arg1 === 'success' || arg1 === 'error' || arg1 === 'info') {
      type = arg1;
      message = arg3 ? `${arg2}: ${arg3}` : (arg2 || arg1);
    } else if (arg2 === 'success' || arg2 === 'error' || arg2 === 'info') {
      type = arg2;
      message = arg1;
    }

    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 font-sans">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-lg border ${
                toast.type === 'success'
                  ? 'bg-[#F4F8F5] border-[#C3D9C9] text-[#2C5237]'
                  : toast.type === 'error'
                  ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]'
                  : 'bg-[#FFFDF7] border-[#DFDDD2] text-[#20231F]'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />}
                {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#C85A3D] shrink-0" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-[#344653] shrink-0" />}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#70736B] hover:text-[#20231F] transition-colors p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
