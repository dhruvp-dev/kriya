'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MagnifyingGlass,
  ArrowUpRight,
  CheckCircle,
  Sparkle,
  TrendUp,
  Fire,
} from '@phosphor-icons/react';

export function HeroDashboardPreview() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none pt-4 pb-8 lg:py-0">
      {/* Background Atmospheric Sky Rounded Backdrop (Top Right of Hero Preview) */}
      <div className="absolute -top-4 -right-4 sm:-right-8 w-72 sm:w-88 h-72 sm:h-88 rounded-3xl overflow-hidden shadow-lg pointer-events-none z-0">
        <Image
          src="/sky_clouds_bg.webp"
          alt="Atmosphere"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover opacity-95"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
      </div>

      {/* Main SaaS Dashboard Preview Window */}
      <div className="relative z-10 bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Window Top Bar / Header */}
        <div className="px-5 py-4 border-b border-[#F0F1F3] flex items-center justify-between gap-4 bg-white/95">
          {/* Logo & Search */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-1.5 font-bold text-sm text-[#070709]">
              <div className="w-5 h-5 rounded-md bg-[#1D64EC] flex items-center justify-center text-white">
                <Sparkle weight="fill" className="w-3 h-3" />
              </div>
              <span>KRIYA</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F5F7] border border-[#EBECEF] text-xs text-[#8B8B8B] w-56">
              <MagnifyingGlass className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span>Search quests or habits...</span>
            </div>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1D64EC] to-[#60A5FA] flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
              AS
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-[#070709] leading-tight">
                Hi, Alex Smith 👋
              </div>
              <div className="text-[10px] text-[#8B8B8B] leading-tight">
                Level 14 Wayfarer
              </div>
            </div>
          </div>
        </div>

        {/* Window Interior Content */}
        <div className="p-5 sm:p-6 space-y-6 bg-white">
          {/* Main Progression Card: "Total Engagement / Progression" */}
          <div className="border border-[#EEF0F2] rounded-2xl p-5 bg-gradient-to-b from-white to-[#F9FAFB]/50">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-[#8B8B8B] uppercase tracking-wider">
                  Total Progression
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-bold text-[#070709] tabular-nums tracking-normal">
                    78%
                  </span>
                  <span className="text-xs font-normal text-[#8B8B8B] tracking-normal">
                    Level 14 Mastery
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold tabular-nums">
                <TrendUp weight="bold" className="w-3.5 h-3.5" />
                <span>+34% this month</span>
              </div>
            </div>

            {/* Smooth Spline Growth Chart Line (SVG) */}
            <div className="relative mt-4 h-24 sm:h-28 w-full">
              <svg
                viewBox="0 0 500 120"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D64EC" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1D64EC" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path
                  d="M 0,100 C 60,95 100,80 150,70 C 200,60 250,75 300,45 C 350,20 420,35 500,10 L 500,120 L 0,120 Z"
                  fill="url(#chartGradient)"
                />
                {/* Stroke Line */}
                <path
                  d="M 0,100 C 60,95 100,80 150,70 C 200,60 250,75 300,45 C 350,20 420,35 500,10"
                  fill="none"
                  stroke="#1D64EC"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Peak Dot */}
                <circle cx="500" cy="10" r="5" fill="#1D64EC" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            {/* 3 Metrics Row */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EEF0F2] text-center">
              <div className="p-2">
                <div className="text-[11px] font-medium text-[#8B8B8B] tracking-normal">Total XP</div>
                <div className="text-sm sm:text-base font-bold text-[#070709] tabular-nums tracking-normal mt-0.5">
                  25.3k <span className="text-[10px] text-[#059669] font-medium tracking-normal">+8%</span>
                </div>
              </div>
              <div className="p-2 border-x border-[#EEF0F2]">
                <div className="text-[11px] font-medium text-[#8B8B8B] tracking-normal">Quests Done</div>
                <div className="text-sm sm:text-base font-bold text-[#070709] tabular-nums tracking-normal mt-0.5">
                  124 <span className="text-[10px] text-[#059669] font-medium tracking-normal">+14%</span>
                </div>
              </div>
              <div className="p-2">
                <div className="text-[11px] font-medium text-[#8B8B8B] tracking-normal">Streak</div>
                <div className="text-sm sm:text-base font-bold text-[#070709] tabular-nums tracking-normal mt-0.5 flex items-center justify-center gap-1">
                  <span>14d</span>
                  <Fire weight="fill" className="w-3.5 h-3.5 text-[#C85A3D]" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Weekly Quest Distribution */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8B8B8B]">
              <span className="font-bold uppercase tracking-wider text-[10px]">
                Weekly Quest Velocity
              </span>
              <span className="font-semibold text-[#070709] tabular-nums">Mon – Sun</span>
            </div>
            <div className="flex items-end justify-between gap-2 h-12 pt-2">
              {[45, 65, 80, 50, 95, 75, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className={`w-full rounded-md transition-all ${
                      i === 4
                        ? 'bg-[#1D64EC]'
                        : i === 6
                        ? 'bg-[#10B981]'
                        : 'bg-[#E5E7EB]'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[9px] font-semibold text-[#9CA3AF]">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Overlapping Card (Matches "Email Verifier" in hero.webp) */}
      <div className="absolute -left-4 sm:-left-10 bottom-6 sm:bottom-12 z-30 w-60 sm:w-68 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F1F3]">
          <span className="text-xs font-bold text-[#070709]">Daily Energy & XP</span>
          <span className="text-[10px] font-bold text-[#1D64EC] hover:underline cursor-pointer">
            View all
          </span>
        </div>

        {/* Semi-Circular Radial Gauge */}
        <div className="py-3 flex flex-col items-center">
          <div className="relative w-36 h-20 overflow-hidden flex items-end justify-center">
            <svg viewBox="0 0 100 50" className="w-36 h-20">
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Segment 1: Focus (Blue) */}
              <path
                d="M 10 50 A 40 40 0 0 1 50 10"
                fill="none"
                stroke="#1D64EC"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Segment 2: Discipline (Amber) */}
              <path
                d="M 50 10 A 40 40 0 0 1 78 20"
                fill="none"
                stroke="#D9A441"
                strokeWidth="10"
              />
              {/* Segment 3: Vitality (Emerald) */}
              <path
                d="M 78 20 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#10B981"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute bottom-0 text-center">
              <div className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wider">
                TODAY
              </div>
              <div className="text-lg font-bold text-[#070709] tabular-nums leading-none tracking-normal">
                850 XP
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Rows */}
        <div className="space-y-2 pt-1 border-t border-[#F0F1F3] text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#60606C]">
              <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
              Focus
            </span>
            <span className="font-bold text-[#070709] tabular-nums">
              24 <span className="text-[10px] text-[#059669] font-medium bg-[#ECFDF5] px-1 rounded">60%</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#60606C]">
              <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
              Discipline
            </span>
            <span className="font-bold text-[#070709] tabular-nums">
              10 <span className="text-[10px] text-[#D97706] font-medium bg-[#FFFBEB] px-1 rounded">25%</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#60606C]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              Vitality
            </span>
            <span className="font-bold text-[#070709] tabular-nums">40</span>
          </div>

          <div className="pt-2 border-t border-[#F0F1F3] flex items-center justify-between text-[11px] text-[#8B8B8B]">
            <span className="flex items-center gap-1 text-[#059669] font-medium">
              <CheckCircle weight="fill" className="w-3.5 h-3.5" />
              Synced
            </span>
            <span>11m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
