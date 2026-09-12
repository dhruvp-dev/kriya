'use client';

import React, { useState } from 'react';
import { KriyaLogo } from './KriyaLogo';
import { KriyaIcon } from './KriyaIcon';
import {
  Copy,
  Check,
  Download,
  Sparkles,
  Zap,
  Shield,
  Palette,
} from 'lucide-react';

export function BrandBoard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'board' | 'spec' | 'assets'>('board');
  const [activeScale, setActiveScale] = useState<number>(32);

  const handleCopySvg = (id: string, svgContent: string) => {
    navigator.clipboard.writeText(svgContent);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const primarySvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 120" width="460" height="120" fill="none">
  <g transform="translate(18, 16) scale(2.75)">
    <rect x="5.5" y="4.5" width="4.5" height="23" rx="2.25" fill="#070709" />
    <path d="M 13.5 14.5 L 23.5 4.5" stroke="#C85A3D" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 13.5 17.5 L 23.5 27.5" stroke="#070709" stroke-width="4.5" stroke-linecap="round" />
    <circle cx="26.5" cy="2.5" r="1.5" fill="#D9A441" />
  </g>
  <g transform="translate(122, 16)">
    <text x="0" y="52" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" letter-spacing="-1.5" fill="#070709">KRIYA</text>
    <circle cx="154" cy="40" r="4" fill="#C85A3D" />
    <text x="2" y="78" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="#60606C">ACTION INTO PROGRESS</text>
  </g>
</svg>`;

  const navbarSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 36" width="160" height="36" fill="none">
  <g transform="translate(2, 2)">
    <rect x="5.5" y="4.5" width="4.5" height="23" rx="2.25" fill="#070709" />
    <path d="M 13.5 14.5 L 23.5 4.5" stroke="#C85A3D" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 13.5 17.5 L 23.5 27.5" stroke="#070709" stroke-width="4.5" stroke-linecap="round" />
    <circle cx="26.5" cy="2.5" r="1.5" fill="#D9A441" />
  </g>
  <text x="42" y="24" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.6" fill="#070709">KRIYA</text>
  <circle cx="112" cy="18" r="2" fill="#C85A3D" />
</svg>`;

  const iconSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <rect x="5.5" y="4.5" width="4.5" height="23" rx="2.25" fill="#070709" />
  <path d="M 13.5 14.5 L 23.5 4.5" stroke="#C85A3D" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 13.5 17.5 L 23.5 27.5" stroke="#070709" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="26.5" cy="2.5" r="1.5" fill="#D9A441" />
</svg>`;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] font-sans antialiased p-4 md:p-8 lg:p-12 selection:bg-[#070709] selection:text-white">
      {/* Brand Board Container */}
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Navigation & Metainfo */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6E6E8] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60606C] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C85A3D]" />
              KRIYA DESIGN SYSTEM v2.0 • BRAND SPECIFICATION
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#070709]">
              Logo System Specification
            </h1>
            <p className="text-sm md:text-base text-[#60606C] font-medium mt-1 max-w-2xl">
              Minimally abstract visual identity built around <span className="text-[#C85A3D] font-bold">Action → Progress → Elevation</span>. Modern geometric monogram with architectural stability and kinetic momentum.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-1.5 bg-[#F7F7F8] p-1.5 rounded-xl border border-[#E6E6E8]">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'board'
                  ? 'bg-[#070709] text-white shadow-xs'
                  : 'text-[#60606C] hover:text-[#070709] hover:bg-white'
              }`}
            >
              Logo System
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'spec'
                  ? 'bg-[#070709] text-white shadow-xs'
                  : 'text-[#60606C] hover:text-[#070709] hover:bg-white'
              }`}
            >
              Design Rationale
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'assets'
                  ? 'bg-[#070709] text-white shadow-xs'
                  : 'text-[#60606C] hover:text-[#070709] hover:bg-white'
              }`}
            >
              Raw SVG Assets
            </button>
          </div>
        </header>

        {/* LOGO SYSTEM BOARD TAB */}
        {activeTab === 'board' && (
          <div className="space-y-10 animate-in fade-in duration-300">

            {/* SECTION 1: PRIMARY BRAND LOGO (HERO) */}
            <section className="bg-white rounded-3xl border border-[#E6E6E8] p-8 lg:p-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-2 bg-[#F7F7F8] border-b border-l border-[#E6E6E8] rounded-bl-xl text-[10px] font-bold text-[#60606C] tracking-wider uppercase">
                01 • Primary Brand Logo
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Visual Canvas */}
                <div className="lg:col-span-8 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] p-8 lg:p-16 flex items-center justify-center min-h-[260px] relative group">
                  <div className="transform group-hover:scale-102 transition-transform duration-300">
                    <KriyaLogo variant="primary" size="lg" showTagline={true} />
                  </div>
                  <button
                    onClick={() => handleCopySvg('primary', primarySvgCode)}
                    className="absolute bottom-4 right-4 bg-white hover:bg-[#070709] hover:text-white text-[#070709] border border-[#E6E6E8] px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    {copiedId === 'primary' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied SVG
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy SVG
                      </>
                    )}
                  </button>
                </div>

                {/* Spec Notes */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
                    <Sparkles className="w-4 h-4" /> Core Identity Mark
                  </div>
                  <h2 className="text-2xl font-bold text-[#070709]">Primary Brand Logo</h2>
                  <p className="text-xs text-[#60606C] leading-relaxed">
                    Designed for official brand headers, marketing collateral, landing pages, and application navigation. Combines the grounded stability pillar with an ascending terracotta momentum vector.
                  </p>
                  
                  <div className="pt-2 space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-[#E6E6E8]">
                      <span className="text-[#60606C]">Foundation Pillar</span>
                      <span className="font-bold text-[#070709]">Near Black (#070709)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#E6E6E8]">
                      <span className="text-[#60606C]">Momentum Vector</span>
                      <span className="font-bold text-[#C85A3D]">Terracotta (#C85A3D)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#E6E6E8]">
                      <span className="text-[#60606C]">Milestone Spark</span>
                      <span className="font-bold text-[#D9A441]">Ochre (#D9A441)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#E6E6E8]">
                      <span className="text-[#60606C]">Wordmark Font</span>
                      <span className="font-bold text-[#070709]">Plus Jakarta Sans (800)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2 & SECTION 3: NAVBAR VERSION & STANDALONE APP ICON */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* SECTION 2: COMPACT NAVBAR LOGO */}
              <section className="bg-white rounded-3xl border border-[#E6E6E8] p-6 md:p-8 shadow-xs relative flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#C85A3D] uppercase tracking-wider block">
                      02 • Application Navigation
                    </span>
                    <h3 className="text-xl font-bold text-[#070709]">Navbar / Sidebar Version</h3>
                  </div>
                  <span className="text-xs bg-[#F7F7F8] text-[#60606C] px-2.5 py-1 rounded-md font-semibold tabular-nums">
                    Target: 26-40px
                  </span>
                </div>

                {/* Simulated Header Rail */}
                <div className="space-y-4">
                  <div className="text-xs text-[#60606C] font-medium">Live Navigation Rail Preview:</div>
                  <div className="bg-[#F7F7F8] p-3.5 rounded-2xl border border-[#E6E6E8] flex items-center justify-between">
                    <KriyaLogo variant="navbar" size={26} />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-[#E6E6E8] text-[#60606C] tabular-nums">
                        LV.12
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#C85A3D]" />
                    </div>
                  </div>

                  {/* Size Matrix */}
                  <div className="pt-2 grid grid-cols-4 gap-2 text-center">
                    {[24, 28, 32, 36].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setActiveScale(sz)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          activeScale === sz
                            ? 'bg-white border-[#070709] shadow-xs ring-1 ring-[#070709]'
                            : 'bg-[#F7F7F8] border-[#E6E6E8] hover:bg-white'
                        }`}
                      >
                        <div className="text-[10px] text-[#8B8B8B] mb-1 tabular-nums">{sz}px</div>
                        <div className="flex justify-center">
                          <KriyaLogo variant="navbar" size={sz} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6E6E8] flex items-center justify-between text-xs">
                  <span className="text-[#60606C]">Optimized for dense UI headers</span>
                  <button
                    onClick={() => handleCopySvg('navbar', navbarSvgCode)}
                    className="text-[#C85A3D] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    {copiedId === 'navbar' ? 'Copied!' : 'Copy Code →'}
                  </button>
                </div>
              </section>

              {/* SECTION 3: STANDALONE APP ICON */}
              <section className="bg-white rounded-3xl border border-[#E6E6E8] p-6 md:p-8 shadow-xs relative flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#C85A3D] uppercase tracking-wider block">
                      03 • Standalone App Icon
                    </span>
                    <h3 className="text-xl font-bold text-[#070709]">App Icon & Favicon</h3>
                  </div>
                  <span className="text-xs bg-[#F7F7F8] text-[#60606C] px-2.5 py-1 rounded-md font-semibold">
                    Favicon • App Tile
                  </span>
                </div>

                <div className="flex items-center justify-around py-4 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8]">
                  {/* Tile 1: White Squircle */}
                  <div className="flex flex-col items-center gap-2">
                    <KriyaIcon size={44} withContainer={true} variant="default" />
                    <span className="text-[10px] text-[#60606C] font-semibold">Light Surface</span>
                  </div>

                  {/* Tile 2: Dark Charcoal */}
                  <div className="flex flex-col items-center gap-2">
                    <KriyaIcon size={44} withContainer={true} variant="dark" />
                    <span className="text-[10px] text-[#60606C] font-semibold">Dark Surface</span>
                  </div>

                  {/* Tile 3: Terracotta Solid */}
                  <div className="flex flex-col items-center gap-2">
                    <KriyaIcon size={44} withContainer={true} variant="on-terracotta" />
                    <span className="text-[10px] text-[#60606C] font-semibold">Brand Accent</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6E6E8] flex items-center justify-between text-xs">
                  <span className="text-[#60606C]">Instant silhouette recognition</span>
                  <button
                    onClick={() => handleCopySvg('icon', iconSvgCode)}
                    className="text-[#C85A3D] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    {copiedId === 'icon' ? 'Copied!' : 'Copy Code →'}
                  </button>
                </div>
              </section>

            </div>

            {/* SECTION 4 & SECTION 5: DARK AND LIGHT BACKGROUND VERSIONS */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* SECTION 4: DARK BACKGROUND VERSION */}
              <section className="bg-[#070709] rounded-3xl border border-[#202025] p-8 shadow-md relative overflow-hidden text-white">
                <div className="text-[10px] font-bold text-[#E26A4B] uppercase tracking-wider mb-4 block">
                  04 • Dark Mode Lockup
                </div>
                <div className="bg-[#121215] rounded-2xl border border-[#202025] p-8 flex items-center justify-center min-h-[160px]">
                  <KriyaLogo variant="dark" size="md" />
                </div>
                <p className="text-xs text-[#8B8B8B] mt-4 font-medium leading-relaxed">
                  Engineered for dark mode interfaces, code editors, and high-contrast night surfaces. High-contrast white pillar with bright terracotta momentum vector.
                </p>
              </section>

              {/* SECTION 5: LIGHT BACKGROUND VERSION */}
              <section className="bg-white rounded-3xl border border-[#E6E6E8] p-8 shadow-xs relative overflow-hidden text-[#070709]">
                <div className="text-[10px] font-bold text-[#C85A3D] uppercase tracking-wider mb-4 block">
                  05 • Light Mode Lockup
                </div>
                <div className="bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] p-8 flex items-center justify-center min-h-[160px]">
                  <KriyaLogo variant="primary" size="md" />
                </div>
                <p className="text-xs text-[#60606C] mt-4 font-medium leading-relaxed">
                  Engineered for pristine white SaaS dashboards, editorial docs, settings panels, and standard application navigation.
                </p>
              </section>
            </div>

            {/* SECTION 6 & SECTION 7: SMALL SCALE GRID & MONOCHROME */}
            <div className="grid md:grid-cols-12 gap-8">
              {/* SECTION 6: SCALE INTEGRITY TEST GRID */}
              <section className="md:col-span-7 bg-white rounded-3xl border border-[#E6E6E8] p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#C85A3D] uppercase tracking-wider block">
                      06 • Scale Integrity Grid
                    </span>
                    <h3 className="text-xl font-bold text-[#070709]">Micro-scale Legibility</h3>
                  </div>
                  <span className="text-xs text-[#60606C] font-semibold tabular-nums">16px to 64px</span>
                </div>

                <div className="grid grid-cols-5 gap-4 items-end justify-items-center bg-[#F7F7F8] p-6 rounded-2xl border border-[#E6E6E8]">
                  {[16, 24, 32, 48, 64].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className="bg-white p-2 rounded-xl border border-[#E6E6E8] flex items-center justify-center shadow-2xs">
                        <KriyaIcon size={s} />
                      </div>
                      <span className="text-[10px] font-semibold tabular-nums text-[#8B8B8B]">{s}px</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#60606C] mt-4 leading-relaxed">
                  Geometry is defined with optical negative clearance, preventing blur or muddy strokes at low resolution favicon sizes.
                </p>
              </section>

              {/* SECTION 7: MONOCHROME VERSION */}
              <section className="md:col-span-5 bg-white rounded-3xl border border-[#E6E6E8] p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#C85A3D] uppercase tracking-wider block">
                      07 • Monochrome Version
                    </span>
                    <h3 className="text-xl font-bold text-[#070709]">Single-Color Stamp</h3>
                  </div>
                  <span className="text-xs text-[#60606C] font-semibold">1-Color</span>
                </div>

                <div className="bg-[#F7F7F8] p-6 rounded-2xl border border-[#E6E6E8] flex justify-center items-center min-h-[110px]">
                  <KriyaLogo variant="mono" size="md" />
                </div>
                <p className="text-xs text-[#60606C] mt-4 leading-relaxed">
                  Single-color vector path with optical separation gaps. Designed for physical merchandise, letterpress, hardware engraving, and laser marking.
                </p>
              </section>
            </div>

            {/* COLOR PALETTE SWATCH SYSTEM */}
            <section className="bg-white rounded-3xl border border-[#E6E6E8] p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#C85A3D] uppercase tracking-wider block">
                    Brand Palette System
                  </span>
                  <h3 className="text-2xl font-bold text-[#070709]">Aesthetic SaaS Palette</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#60606C]">
                  <Palette className="w-4 h-4 text-[#C85A3D]" /> Curated Tokens
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: 'Near Black (Pillar)', hex: '#070709', role: 'Foundation & Text', textDark: false },
                  { name: 'Terracotta (Momentum)', hex: '#C85A3D', role: 'Action & Primary Accent', textDark: false },
                  { name: 'Reward Ochre', hex: '#D9A441', role: 'Milestones & Gold', textDark: true },
                  { name: 'Success Sage', hex: '#668F72', role: 'Completed & Growth', textDark: false },
                  { name: 'Deep Slate', hex: '#344653', role: 'Secondary Accents', textDark: false },
                  { name: 'Pure White', hex: '#FFFFFF', role: 'Base Background', textDark: true },
                  { name: 'Cool Surface', hex: '#F7F7F8', role: 'Secondary Containers', textDark: true },
                  { name: 'Subtle Surface', hex: '#F3F4F5', role: 'Input & Bar Fills', textDark: true },
                  { name: 'Border Subtle', hex: '#E6E6E8', role: 'Dividers & Outlines', textDark: true },
                  { name: 'Secondary Text', hex: '#60606C', role: 'Subtitles & Labels', textDark: false },
                ].map((color) => (
                  <div
                    key={color.hex}
                    className="p-3.5 rounded-2xl border border-[#E6E6E8] bg-[#F7F7F8]/60 flex flex-col justify-between space-y-3"
                  >
                    <div
                      className="h-14 rounded-xl border border-black/5 shadow-2xs p-2 flex items-end justify-end"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          color.textDark ? 'bg-black/10 text-black' : 'bg-white/20 text-white'
                        }`}
                      >
                        {color.hex}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#070709]">{color.name}</div>
                      <div className="text-[10px] text-[#60606C] font-medium mt-0.5">{color.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* DESIGN RATIONALE TAB */}
        {activeTab === 'spec' && (
          <div className="bg-white rounded-3xl border border-[#E6E6E8] p-8 lg:p-12 space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-[#C85A3D] tracking-widest uppercase">
                Brand Design Rationale
              </span>
              <h2 className="text-3xl font-extrabold text-[#070709] mt-1">Design Philosophy & Anatomy</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#070709] text-white flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="text-base font-bold text-[#070709]">Action → Progress → Elevation</h3>
                <p className="text-xs text-[#60606C] leading-relaxed">
                  In Sanskrit, Kriya means purposeful action. The logo mark translates this directly: a grounding vertical pillar representing daily discipline, paired with an ascending terracotta momentum vector rising toward milestone achievement.
                </p>
              </div>

              <div className="p-6 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C85A3D] text-white flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="text-base font-bold text-[#070709]">Architectural Precision</h3>
                <p className="text-xs text-[#60606C] leading-relaxed">
                  Avoids decorative clutter, generic gaming swords, or pixelated arcade noise. The mark relies on pure Swiss geometric alignment, optical negative space clearance, and calibrated stroke radii.
                </p>
              </div>

              <div className="p-6 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9A441] text-white flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="text-base font-bold text-[#070709]">Modern Plus Jakarta Sans</h3>
                <p className="text-xs text-[#60606C] leading-relaxed">
                  The wordmark is set in heavy Plus Jakarta Sans with subtle negative letter spacing. Confident, modern, and perfectly aligned with the aesthetic SaaS interface.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RAW ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="bg-white rounded-3xl border border-[#E6E6E8] p-8 lg:p-12 space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-[#C85A3D] tracking-widest uppercase">
                Production Vector Files
              </span>
              <h2 className="text-3xl font-extrabold text-[#070709] mt-1">Raw SVG Downloads</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'kriya-symbol.svg', path: '/brand/kriya-symbol.svg', desc: 'Standalone 32x32 Kinetic Icon Mark' },
                { name: 'kriya-app-icon.svg', path: '/brand/kriya-app-icon.svg', desc: '512x512 Master App Tile Icon' },
                { name: 'kriya-primary-logo.svg', path: '/brand/kriya-primary-logo.svg', desc: 'Primary Full Brand Logo Lockup' },
                { name: 'kriya-navbar-logo.svg', path: '/brand/kriya-navbar-logo.svg', desc: 'Compact Navbar / Sidebar Logo' },
                { name: 'kriya-logo-dark.svg', path: '/brand/kriya-logo-dark.svg', desc: 'Dark Mode Brand Logo Lockup' },
                { name: 'kriya-logo-mono.svg', path: '/brand/kriya-logo-mono.svg', desc: 'Single-Color Stamp Logo' },
                { name: 'kriya-favicon.svg', path: '/brand/kriya-favicon.svg', desc: 'Optimized 32x32 Browser Favicon' },
              ].map((asset) => (
                <div key={asset.name} className="p-4 rounded-2xl border border-[#E6E6E8] bg-[#F7F7F8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl border border-[#E6E6E8] flex items-center justify-center text-[#070709] shadow-2xs">
                      <KriyaIcon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#070709]">{asset.name}</div>
                      <div className="text-[10px] text-[#60606C]">{asset.desc}</div>
                    </div>
                  </div>
                  <a
                    href={asset.path}
                    download={asset.name}
                    className="px-3 py-1.5 bg-white hover:bg-[#070709] hover:text-white border border-[#E6E6E8] text-[#070709] rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> SVG
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer info */}
        <footer className="pt-8 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8B8B] gap-4">
          <div>© 2026 KRIYA Design System • Aesthetic SaaS Productivity</div>
          <div className="flex items-center gap-4 font-semibold">
            <span>Palette: #070709 / #C85A3D / #D9A441 / #FFFFFF</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
