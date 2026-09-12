'use client';

import React, { useState } from 'react';

export interface LabShellProps {
  title?: string;
  targetName?: string;
  briefSummary?: {
    scope?: string;
    brandAdjectives?: string[];
    density?: string;
    darkMode?: boolean;
  };
  children: React.ReactNode;
}

export function LabShell({
  title = 'Design Lab Exploration',
  targetName = 'Target Component',
  briefSummary,
  children,
}: LabShellProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'tabs' | 'compare'>('grid');
  const [viewportWidth, setViewportWidth] = useState<'full' | 'tablet' | 'mobile'>('full');
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Top Navigation / Control Header */}
      <header className="sticky top-0 z-[50] backdrop-blur-md bg-gray-900/80 border-b border-gray-800 text-white px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                Design Lab
              </span>
              <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
            </div>
            <p className="text-xs text-gray-400">Target: <code className="text-indigo-300 font-mono">{targetName}</code></p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Viewport Width Preset */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700 text-xs">
              <button
                onClick={() => setViewportWidth('full')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewportWidth === 'full' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                🖥️ Desktop
              </button>
              <button
                onClick={() => setViewportWidth('tablet')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewportWidth === 'tablet' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                📱 Tablet
              </button>
              <button
                onClick={() => setViewportWidth('mobile')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewportWidth === 'mobile' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                📲 Mobile
              </button>
            </div>

            {/* Dark/Light Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 text-xs transition-colors"
              title="Toggle canvas theme"
            >
              {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>

        {/* Brief Highlights strip */}
        {briefSummary && (
          <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-gray-800/60 flex items-center gap-4 text-xs text-gray-400 overflow-x-auto">
            <span className="font-semibold text-gray-300">Brief:</span>
            {briefSummary.scope && <span className="bg-gray-800 px-2 py-0.5 rounded">Scope: {briefSummary.scope}</span>}
            {briefSummary.density && <span className="bg-gray-800 px-2 py-0.5 rounded">Density: {briefSummary.density}</span>}
            {briefSummary.brandAdjectives && briefSummary.brandAdjectives.length > 0 && (
              <span className="bg-gray-800 px-2 py-0.5 rounded">
                Tone: {briefSummary.brandAdjectives.join(', ')}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Main Content Viewport Container */}
      <main className="p-6 max-w-7xl mx-auto">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewportWidth === 'mobile'
              ? 'max-w-[375px] ring-1 ring-gray-700 shadow-2xl rounded-2xl overflow-hidden'
              : viewportWidth === 'tablet'
              ? 'max-w-[768px] ring-1 ring-gray-700 shadow-2xl rounded-xl overflow-hidden'
              : 'w-full'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default LabShell;
