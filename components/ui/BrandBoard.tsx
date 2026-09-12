'use client';

import React, { useState } from 'react';
import { KriyaLogo } from './KriyaLogo';
import { KriyaIcon } from './KriyaIcon';
import {
  Copy,
  Check,
  Download,
  Layers,
  Sparkles,
  Zap,
  ArrowUpRight,
  Maximize2,
  Grid,
  Shield,
  Eye,
  Sliders,
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
  <g transform="translate(16, 15) scale(2.8)">
    <path d="M 4 6 L 6 4 L 11 4 L 11 28 L 4 28 Z" fill="#C85A3D" />
    <path d="M 9.5 4 L 11 4 L 11 28 L 9.5 28 Z" fill="#A94730" opacity="0.4" />
    <rect x="12" y="15" width="5" height="4" rx="0.5" fill="#C85A3D" />
    <rect x="17" y="10" width="5" height="5" rx="0.5" fill="#C85A3D" />
    <rect x="22" y="4" width="6" height="6" rx="0.5" fill="#D9A441" />
    <rect x="26" y="2" width="2" height="2" fill="#668F72" />
    <rect x="12" y="19" width="6" height="4" rx="0.5" fill="#A94730" />
    <rect x="18" y="23" width="7" height="5" rx="0.5" fill="#A94730" />
  </g>
  <g transform="translate(116, 0)">
    <text x="0" y="66" font-family="'Plus Jakarta Sans', sans-serif" font-size="46" font-weight="800" letter-spacing="-1.5" fill="#20231F">KRIYA</text>
    <rect x="154" y="28" width="6" height="6" fill="#C85A3D" rx="1" />
    <text x="2" y="90" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3.5" fill="#70736B">DAILY PROGRESS ENGINE</text>
  </g>
</svg>`;

  const navbarSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 36" width="160" height="36" fill="none">
  <g transform="translate(2, 2)">
    <path d="M 4 6 L 6 4 L 11 4 L 11 28 L 4 28 Z" fill="#C85A3D" />
    <path d="M 9.5 4 L 11 4 L 11 28 L 9.5 28 Z" fill="#A94730" opacity="0.4" />
    <rect x="12" y="15" width="5" height="4" rx="0.5" fill="#C85A3D" />
    <rect x="17" y="10" width="5" height="5" rx="0.5" fill="#C85A3D" />
    <rect x="22" y="4" width="6" height="6" rx="0.5" fill="#D9A441" />
    <rect x="26" y="2" width="2" height="2" fill="#668F72" />
    <rect x="12" y="19" width="6" height="4" rx="0.5" fill="#A94730" />
    <rect x="18" y="23" width="7" height="5" rx="0.5" fill="#A94730" />
  </g>
  <text x="42" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#20231F">KRIYA</text>
</svg>`;

  const iconSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <path d="M 4 6 L 6 4 L 11 4 L 11 28 L 4 28 Z" fill="#C85A3D" />
  <path d="M 9.5 4 L 11 4 L 11 28 L 9.5 28 Z" fill="#A94730" opacity="0.4" />
  <rect x="12" y="15" width="5" height="4" rx="0.5" fill="#C85A3D" />
  <rect x="17" y="10" width="5" height="5" rx="0.5" fill="#C85A3D" />
  <rect x="22" y="4" width="6" height="6" rx="0.5" fill="#D9A441" />
  <rect x="26" y="2" width="2" height="2" fill="#668F72" />
  <rect x="12" y="19" width="6" height="4" rx="0.5" fill="#A94730" />
  <rect x="18" y="23" width="7" height="5" rx="0.5" fill="#A94730" />
</svg>`;

  return (
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] font-sans antialiased p-4 md:p-8 lg:p-12 selection:bg-[#C85A3D] selection:text-white">
      {/* Brand Board Container */}
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Header Navigation & Metainfo */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#DFDDD2] pb-6">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#70736B] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C85A3D] animate-pulse" />
              KRIYA DESIGN SYSTEM v1.0 • BRAND SPECIFICATION
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#20231F]">
              Logo System Specification
            </h1>
            <p className="text-sm md:text-base text-[#70736B] font-medium mt-1 max-w-2xl">
              Cozy retro-digital visual identity built around <span className="text-[#C85A3D] font-bold">Action → Progress → Growth</span>. Modern brand geometry with restrained pixel culture.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 bg-[#FFFDF7] p-1.5 rounded-xl border border-[#DFDDD2] shadow-2xs">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'board'
                  ? 'bg-[#C85A3D] text-white shadow-2xs'
                  : 'text-[#70736B] hover:text-[#20231F] hover:bg-[#EBE8DD]'
              }`}
            >
              Logo System
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'spec'
                  ? 'bg-[#C85A3D] text-white shadow-2xs'
                  : 'text-[#70736B] hover:text-[#20231F] hover:bg-[#EBE8DD]'
              }`}
            >
              Design Rationale
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'assets'
                  ? 'bg-[#C85A3D] text-white shadow-2xs'
                  : 'text-[#70736B] hover:text-[#20231F] hover:bg-[#EBE8DD]'
              }`}
            >
              Raw SVG Assets
            </button>
          </div>
        </header>

        {activeTab === 'board' && (
          <div className="space-y-12 animate-in fade-in duration-300">

            {/* SECTION 1: PRIMARY BRAND LOGO (HERO) */}
            <section className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 lg:p-12 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-2 bg-[#EBE8DD] border-b border-l border-[#DFDDD2] rounded-bl-xl text-[10px] font-mono font-bold text-[#70736B] tracking-wider uppercase">
                01 • PRIMARY BRAND LOGO
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Visual Canvas */}
                <div className="lg:col-span-8 bg-[#F3F1E8]/70 rounded-2xl border border-[#DFDDD2]/80 p-8 lg:p-16 flex items-center justify-center min-h-[260px] relative group">
                  <div className="transform group-hover:scale-102 transition-transform duration-300">
                    <KriyaLogo variant="primary" size="lg" showTagline={true} />
                  </div>
                  <button
                    onClick={() => handleCopySvg('primary', primarySvgCode)}
                    className="absolute bottom-4 right-4 bg-[#FFFDF7] hover:bg-[#20231F] hover:text-white text-[#20231F] border border-[#DFDDD2] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
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
                  <h2 className="text-2xl font-black text-[#20231F]">Primary Brand Logo</h2>
                  <p className="text-xs text-[#70736B] leading-relaxed">
                    Designed for official brand headers, marketing touchpoints, landing pages, and launch collateral. Combines the stepped growth mark with humanized geometric letterforms.
                  </p>
                  
                  <div className="pt-2 space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-[#DFDDD2]">
                      <span className="text-[#70736B]">Primary Color</span>
                      <span className="font-bold text-[#C85A3D]">Terracotta (#C85A3D)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#DFDDD2]">
                      <span className="text-[#70736B]">Accent Spark</span>
                      <span className="font-bold text-[#D9A441]">Ochre (#D9A441)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#DFDDD2]">
                      <span className="text-[#70736B]">Wordmark Font</span>
                      <span className="font-bold text-[#20231F]">Plus Jakarta Sans (800)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* SECTION 2 & SECTION 3: NAVBAR VERSION & STANDALONE APP ICON */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* SECTION 2: COMPACT NAVBAR LOGO */}
              <section className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-6 md:p-8 shadow-xs relative flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#DFDDD2] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C85A3D] uppercase tracking-wider block">
                      02 • APPLICATION NAVIGATION
                    </span>
                    <h3 className="text-xl font-bold text-[#20231F]">Navbar / Sidebar Version</h3>
                  </div>
                  <span className="text-xs font-mono bg-[#EBE8DD] text-[#70736B] px-2.5 py-1 rounded-md font-bold">
                    Target: 28-40px
                  </span>
                </div>

                {/* Simulated Header Rail */}
                <div className="space-y-4">
                  <div className="text-xs text-[#70736B] font-medium">Live Navigation Rail Preview:</div>
                  <div className="bg-[#EBE8DD] p-3 rounded-2xl border border-[#DFDDD2] flex items-center justify-between">
                    <KriyaLogo variant="navbar" size={28} />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-[#FFFDF7] px-2 py-1 rounded-md border border-[#DFDDD2] text-[#70736B]">
                        LV.12
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#C85A3D]" />
                    </div>
                  </div>

                  {/* Size Matrix */}
                  <div className="pt-4 grid grid-cols-4 gap-2 text-center">
                    {[28, 32, 36, 40].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setActiveScale(sz)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          activeScale === sz
                            ? 'bg-[#F3F1E8] border-[#C85A3D] shadow-2xs'
                            : 'bg-white border-[#DFDDD2] hover:bg-[#F3F1E8]'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-[#70736B] mb-1">{sz}px</div>
                        <div className="flex justify-center">
                          <KriyaLogo variant="navbar" size={sz} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DFDDD2] flex items-center justify-between text-xs">
                  <span className="text-[#70736B]">Simplified for high density UI rail</span>
                  <button
                    onClick={() => handleCopySvg('navbar', navbarSvgCode)}
                    className="text-[#C85A3D] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedId === 'navbar' ? 'Copied!' : 'Copy Code →'}
                  </button>
                </div>
              </section>

              {/* SECTION 3: STANDALONE APP ICON */}
              <section className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-6 md:p-8 shadow-xs relative flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#DFDDD2] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C85A3D] uppercase tracking-wider block">
                      03 • STANDALONE APP ICON
                    </span>
                    <h3 className="text-xl font-bold text-[#20231F]">App Icon & Favicon</h3>
                  </div>
                  <span className="text-xs font-mono bg-[#EBE8DD] text-[#70736B] px-2.5 py-1 rounded-md font-bold">
                     Favicon • App Tile
                  </span>
                </div>

                <div className="flex items-center justify-around py-4 bg-[#F3F1E8]/60 rounded-2xl border border-[#DFDDD2]/80">
                  {/* Tile 1: Warm Squircle */}
                  <div className="flex flex-col items-center gap-2">
                    <KriyaIcon size={44} withContainer={true} variant="default" />
                    <span className="text-[10px] font-mono text-[#70736B] font-bold">App Tile</span>
                  </div>

                  {/* Tile 2: Dark Charcoal */}
                  <div className="flex flex-col items-center gap-2">
                    <KriyaIcon size={44} withContainer={true} variant="dark" />
                    <span className="text-[10px] font-mono text-[#70736B] font-bold">Dark Mode</span>
                  </div>

                  {/* Tile 3: Terracotta Solid */}
                  <div className="flex flex-col items-center gap-2">
                    <KriyaIcon size={44} withContainer={true} variant="on-terracotta" />
                    <span className="text-[10px] font-mono text-[#70736B] font-bold">Brand Tile</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DFDDD2] flex items-center justify-between text-xs">
                  <span className="text-[#70736B]">Instant silhouette recognition</span>
                  <button
                    onClick={() => handleCopySvg('icon', iconSvgCode)}
                    className="text-[#C85A3D] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedId === 'icon' ? 'Copied!' : 'Copy Code →'}
                  </button>
                </div>
              </section>

            </div>


            {/* SECTION 4 & SECTION 5: DARK AND LIGHT BACKGROUND VERSIONS */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* SECTION 4: DARK BACKGROUND VERSION */}
              <section className="bg-[#20231F] rounded-3xl border border-[#344653] p-8 shadow-md relative overflow-hidden text-white">
                <div className="text-[10px] font-mono font-bold text-[#E26A4B] uppercase tracking-wider mb-4 block">
                  04 • DARK BACKGROUND VERSION
                </div>
                <div className="bg-[#181A17] rounded-2xl border border-[#344653]/60 p-8 flex items-center justify-center min-h-[160px]">
                  <KriyaLogo variant="dark" size="md" />
                </div>
                <p className="text-xs text-[#DFDDD2] mt-4 font-medium">
                  Optimized for dark mode interfaces, IDE themes, night headers, and dark promotional assets. High contrast warm terracotta stem with golden spark.
                </p>
              </section>

              {/* SECTION 5: LIGHT BACKGROUND VERSION */}
              <section className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 shadow-xs relative overflow-hidden text-[#20231F]">
                <div className="text-[10px] font-mono font-bold text-[#C85A3D] uppercase tracking-wider mb-4 block">
                  05 • LIGHT BACKGROUND VERSION
                </div>
                <div className="bg-[#F3F1E8] rounded-2xl border border-[#DFDDD2] p-8 flex items-center justify-center min-h-[160px]">
                  <KriyaLogo variant="primary" size="md" />
                </div>
                <p className="text-xs text-[#70736B] mt-4 font-medium">
                  Optimized for light editorial surfaces, parchment cards, paper backgrounds, and light application headers.
                </p>
              </section>

            </div>


            {/* SECTION 6 & SECTION 7: SMALL FAVICON GRID & MONOCHROME VERSION */}
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* SECTION 6: SMALL FAVICON / ICON SCALE GRID */}
              <section className="md:col-span-7 bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#DFDDD2] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C85A3D] uppercase tracking-wider block">
                      06 • SCALE INTEGRITY TEST GRID
                    </span>
                    <h3 className="text-xl font-bold text-[#20231F]">Micro-scale Legibility</h3>
                  </div>
                  <span className="text-xs font-mono text-[#70736B] font-bold">16px to 64px</span>
                </div>

                <div className="grid grid-cols-5 gap-4 items-end justify-items-center bg-[#F3F1E8]/70 p-6 rounded-2xl border border-[#DFDDD2]">
                  {[16, 24, 32, 48, 64].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className="bg-white p-2 rounded-lg border border-[#DFDDD2] flex items-center justify-center">
                        <KriyaIcon size={s} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#70736B]">{s}px</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#70736B] mt-4">
                  Grid coordinates aligned strictly to integer pixel intervals on a 32x32 master grid, preventing anti-aliasing blur even at 16x16 browser tab sizes.
                </p>
              </section>

              {/* SECTION 7: MONOCHROME VERSION */}
              <section className="md:col-span-5 bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#DFDDD2] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C85A3D] uppercase tracking-wider block">
                      07 • MONOCHROME VERSION
                    </span>
                    <h3 className="text-xl font-bold text-[#20231F]">Single-Color Stamp</h3>
                  </div>
                  <span className="text-xs font-mono text-[#70736B] font-bold">1-Color</span>
                </div>

                <div className="bg-[#F3F1E8] p-6 rounded-2xl border border-[#DFDDD2] flex justify-center items-center min-h-[110px]">
                  <KriyaLogo variant="mono" size="md" />
                </div>
                <p className="text-xs text-[#70736B] mt-4">
                  Single-color vector path with micro separation gaps. Engineered for physical stamping, letterpress, hardware engraving, or single-color vinyl cutouts.
                </p>
              </section>

            </div>


            {/* COLOR PALETTE SWATCH SYSTEM */}
            <section className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DFDDD2] pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#C85A3D] uppercase tracking-wider block">
                    BRAND PALETTE SYSTEM
                  </span>
                  <h3 className="text-2xl font-bold text-[#20231F]">Warm Cozy Retro-Digital Palette</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#70736B]">
                  <Palette className="w-4 h-4 text-[#C85A3D]" /> 10 Curated Tokens
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: 'Terracotta (Primary)', hex: '#C85A3D', role: 'Main Brand Identity', textDark: false },
                  { name: 'Terracotta Dark', hex: '#A94730', role: 'Depth & Shadow', textDark: false },
                  { name: 'Ochre (Spark)', hex: '#D9A441', role: 'Growth & Level Up', textDark: true },
                  { name: 'Sage (Growth)', hex: '#668F72', role: 'Daily Habit Accent', textDark: false },
                  { name: 'Dusty Navy', hex: '#344653', role: 'Structural Trim', textDark: false },
                  { name: 'Warm Parchment', hex: '#F3F1E8', role: 'Main App Canvas', textDark: true },
                  { name: 'Surface Cream', hex: '#FFFDF7', role: 'Card Container', textDark: true },
                  { name: 'Charcoal', hex: '#20231F', role: 'Primary Typography', textDark: false },
                  { name: 'Border Taupe', hex: '#DFDDD2', role: 'Divider & Outline', textDark: true },
                  { name: 'Secondary Text', hex: '#70736B', role: 'Metadata & Labels', textDark: false },
                ].map((color) => (
                  <div
                    key={color.hex}
                    className="p-3.5 rounded-2xl border border-[#DFDDD2] bg-[#F3F1E8]/50 flex flex-col justify-between space-y-3"
                  >
                    <div
                      className="h-16 rounded-xl border border-black/10 shadow-2xs p-2 flex items-end justify-end"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          color.textDark ? 'bg-black/10 text-black' : 'bg-white/20 text-white'
                        }`}
                      >
                        {color.hex}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#20231F]">{color.name}</div>
                      <div className="text-[10px] text-[#70736B] font-medium">{color.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* DESIGN RATIONALE TAB */}
        {activeTab === 'spec' && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 lg:p-12 space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#C85A3D] tracking-widest uppercase">
                BRAND DESIGN SYSTEM SPECIFICATION
              </span>
              <h2 className="text-3xl font-black text-[#20231F] mt-1">Design Rationale & Philosophy</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F3F1E8]/70 rounded-2xl border border-[#DFDDD2] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C85A3D] text-white flex items-center justify-center font-black">
                  01
                </div>
                <h3 className="text-base font-bold text-[#20231F]">Action → Progress → Growth</h3>
                <p className="text-xs text-[#70736B] leading-relaxed">
                  The mark is structured as an ascending staircase of block steps. The left pillar represents foundational daily action, rising into progress steps, culminating in an golden Ochre spark block at the top right symbolizing personal growth and level-up.
                </p>
              </div>

              <div className="p-6 bg-[#F3F1E8]/70 rounded-2xl border border-[#DFDDD2] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#344653] text-white flex items-center justify-center font-black">
                  02
                </div>
                <h3 className="text-base font-bold text-[#20231F]">Restrained Pixel Culture</h3>
                <p className="text-xs text-[#70736B] leading-relaxed">
                  Avoids low-res 8-bit arcade clichés, swords, or generic gaming tropes. Pixel influence comes strictly from block geometry, stepped chamfer edges, and micro-grid alignment to deliver a cozy retro-digital feel.
                </p>
              </div>

              <div className="p-6 bg-[#F3F1E8]/70 rounded-2xl border border-[#DFDDD2] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9A441] text-white flex items-center justify-center font-black">
                  03
                </div>
                <h3 className="text-base font-bold text-[#20231F]">Modern Geometric Wordmark</h3>
                <p className="text-xs text-[#70736B] leading-relaxed">
                  Set in high-clarity humanist geometric sans-serif (Plus Jakarta Sans). Clean, friendly, confident, and highly readable across all platforms.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RAW ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#DFDDD2] p-8 lg:p-12 space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#C85A3D] tracking-widest uppercase">
                PRODUCTION READY VECTOR FILES
              </span>
              <h2 className="text-3xl font-black text-[#20231F] mt-1">Raw SVG Downloads & Code</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'kriya-symbol.svg', path: '/brand/kriya-symbol.svg', desc: 'Standalone 32x32 Icon Mark' },
                { name: 'kriya-app-icon.svg', path: '/brand/kriya-app-icon.svg', desc: '512x512 App Tile Icon' },
                { name: 'kriya-primary-logo.svg', path: '/brand/kriya-primary-logo.svg', desc: 'Primary Full Brand Logo' },
                { name: 'kriya-navbar-logo.svg', path: '/brand/kriya-navbar-logo.svg', desc: 'Compact Navbar Logo' },
                { name: 'kriya-logo-dark.svg', path: '/brand/kriya-logo-dark.svg', desc: 'Dark Background Version' },
                { name: 'kriya-logo-mono.svg', path: '/brand/kriya-logo-mono.svg', desc: 'Monochrome Version' },
                { name: 'kriya-favicon.svg', path: '/brand/kriya-favicon.svg', desc: 'Optimized 32x32 Favicon' },
              ].map((asset) => (
                <div key={asset.name} className="p-4 rounded-2xl border border-[#DFDDD2] bg-[#F3F1E8]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl border border-[#DFDDD2] flex items-center justify-center text-[#C85A3D]">
                      <KriyaIcon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#20231F]">{asset.name}</div>
                      <div className="text-[10px] text-[#70736B]">{asset.desc}</div>
                    </div>
                  </div>
                  <a
                    href={asset.path}
                    download={asset.name}
                    className="px-3 py-1.5 bg-[#FFFDF7] hover:bg-[#C85A3D] hover:text-white border border-[#DFDDD2] text-[#20231F] rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> SVG
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer info */}
        <footer className="pt-8 border-t border-[#DFDDD2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#70736B] gap-4">
          <div>© 2026 KRIYA Design System • Cozy Retro-Digital Productivity</div>
          <div className="flex items-center gap-4 font-mono font-bold">
            <span>Palette: #C85A3D / #FFFDF7 / #20231F</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
