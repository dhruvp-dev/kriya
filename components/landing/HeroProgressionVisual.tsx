'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkle,
  BookOpen,
  PersonSimpleRun,
  Brain,
  Code,
  Palette,
  Check,
} from '@phosphor-icons/react';

export type ActionVerb = 'read' | 'run' | 'learn' | 'build' | 'create';

interface ActionItem {
  id: ActionVerb;
  verb: string;
  quest: string;
  xp: number;
  statName: string;
  statBonus: string;
  statColor: string; // Sage for intellect, Terracotta for vitality, Cobalt for focus, Slate for discipline, Ochre for craft
  statBadgeBg: string;
  accent: string;
  icon: React.ComponentType<{ className?: string; weight?: 'regular' | 'bold' | 'fill' }>;
  desktopPos: {
    top: string;
    left?: string;
    right?: string;
  };
  svgPath: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cx: number;
    cy: number;
  };
}

export const HERO_ACTIONS: ActionItem[] = [
  {
    id: 'read',
    verb: 'READ',
    quest: 'Read 20 pages',
    xp: 50,
    statName: 'INTELLECT',
    statBonus: '+1',
    statColor: '#2E5C56',
    statBadgeBg: '#EDF5F3',
    accent: '#2E5C56',
    icon: BookOpen,
    desktopPos: { top: '8%', left: '6%' },
    svgPath: { x1: 18, y1: 14, x2: 40, y2: 36, cx: 28, cy: 22 },
  },
  {
    id: 'learn',
    verb: 'LEARN',
    quest: 'Deep logic sprint',
    xp: 50,
    statName: 'FOCUS',
    statBonus: '+1',
    statColor: '#1D64EC',
    statBadgeBg: '#EFF6FF',
    accent: '#1D64EC',
    icon: Brain,
    desktopPos: { top: '8%', right: '6%' },
    svgPath: { x1: 82, y1: 14, x2: 60, y2: 36, cx: 72, cy: 22 },
  },
  {
    id: 'run',
    verb: 'RUN',
    quest: '5km morning pace',
    xp: 65,
    statName: 'VITALITY',
    statBonus: '+1',
    statColor: '#C85A3D',
    statBadgeBg: '#FDF4F2',
    accent: '#C85A3D',
    icon: PersonSimpleRun,
    desktopPos: { top: '44%', left: '4%' },
    svgPath: { x1: 15, y1: 48, x2: 37, y2: 44, cx: 25, cy: 46 },
  },
  {
    id: 'build',
    verb: 'BUILD',
    quest: 'Ship feature module',
    xp: 75,
    statName: 'DISCIPLINE',
    statBonus: '+1',
    statColor: '#2D3B42',
    statBadgeBg: '#F3F4F6',
    accent: '#2D3B42',
    icon: Code,
    desktopPos: { top: '44%', right: '4%' },
    svgPath: { x1: 85, y1: 48, x2: 63, y2: 44, cx: 75, cy: 46 },
  },
  {
    id: 'create',
    verb: 'CREATE',
    quest: 'Refine visual system',
    xp: 60,
    statName: 'CRAFT',
    statBonus: '+1',
    statColor: '#D9A441',
    statBadgeBg: '#FEF9EE',
    accent: '#D9A441',
    icon: Palette,
    desktopPos: { top: '70%', left: '8%' },
    svgPath: { x1: 19, y1: 72, x2: 41, y2: 56, cx: 28, cy: 66 },
  },
];

export function HeroProgressionVisual() {
  const [activeActionId, setActiveActionId] = useState<ActionVerb | null>(null);
  const [hoveredActionId, setHoveredActionId] = useState<ActionVerb | null>(null);
  const [step, setStep] = useState<number>(0); // 0 = idle, 1 = action, 2 = quest, 3 = xp, 4 = character/level
  const [isBlinking, setIsBlinking] = useState(false);
  const [characterReacting, setCharacterReacting] = useState(false);
  const [showXpFloat, setShowXpFloat] = useState(false);
  const [isInitialMounted, setIsInitialMounted] = useState(false);

  // Progression values that compound as the visitor explores
  const [accumulatedXP, setAccumulatedXP] = useState(840);
  const [currentLevel, setCurrentLevel] = useState(14);
  const [recentAttribute, setRecentAttribute] = useState<string | null>(null);

  const activeAction = HERO_ACTIONS.find((a) => a.id === activeActionId) || null;
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  // Entrance mount animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialMounted(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Subtle, calm natural blink every 4.6 seconds (character feels alive while remaining still)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      const blinkTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 140);
      timeoutRefs.current.push(blinkTimer);
    }, 4600);

    return () => {
      clearInterval(interval);
      clearAllTimers();
    };
  }, []);

  // Handle clicking an action: runs the 500-1000ms transformation sequence
  const handleActionSelect = (actionId: ActionVerb) => {
    clearAllTimers();

    const selected = HERO_ACTIONS.find((a) => a.id === actionId);
    if (!selected) return;

    setActiveActionId(actionId);
    setRecentAttribute(`${selected.statName} ${selected.statBonus}`);

    // Step 1 (0ms): Action activates
    setStep(1);
    setCharacterReacting(false);
    setShowXpFloat(false);

    // Step 2 (220ms): Quest created
    const t2 = setTimeout(() => {
      setStep(2);
    }, 220);
    timeoutRefs.current.push(t2);

    // Step 3 (480ms): +XP momentum triggers
    const t3 = setTimeout(() => {
      setStep(3);
      setShowXpFloat(true);
      setAccumulatedXP((prev) => {
        const next = prev + selected.xp;
        if (next >= 1000) {
          setCurrentLevel((lvl) => lvl + 1);
          return next - 1000;
        }
        return next;
      });
    }, 480);
    timeoutRefs.current.push(t3);

    // Step 4 (720ms): Character evolves & subtly reacts (tiny scale change + happy expression)
    const t4 = setTimeout(() => {
      setStep(4);
      setCharacterReacting(true);
    }, 720);
    timeoutRefs.current.push(t4);

    // Step 5 (1150ms): Character settles back to calm rest state, visual remains in active completed state
    const t5 = setTimeout(() => {
      setCharacterReacting(false);
      setShowXpFloat(false);
    }, 1150);
    timeoutRefs.current.push(t5);
  };

  const xpProgressPercent = Math.min(100, Math.round((accumulatedXP / 1000) * 100));

  return (
    <div
      className={`relative w-full max-w-[620px] mx-auto rounded-3xl bg-[#FFFFFF] border border-[#EBEBEF] shadow-xl p-5 sm:p-7 select-none overflow-hidden transition-all duration-700 ease-out ${
        isInitialMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      {/* Editorial Header Coordinate Bar */}
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#F0F1F3]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#070709]" />
          <span className="text-[10px] font-mono tracking-widest text-[#8B8B8B] uppercase">
            REAL LIFE → PROGRESS ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeActionId ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#668F72] px-2 py-0.5 rounded-full bg-[#F1F6F3] border border-[#668F72]/20">
              <Check weight="bold" className="w-3 h-3" />
              <span>Transformed</span>
            </span>
          ) : (
            <span className="text-[10px] font-medium tracking-wide text-[#60606C] bg-[#F7F7F8] px-2.5 py-0.5 rounded-full border border-[#E6E6E8]">
              Select an action
            </span>
          )}
        </div>
      </div>

      {/* Main Composition Canvas: Intentional Whitespace + Central Blob + 5 Floating Actions */}
      <div className="relative min-h-[340px] sm:min-h-[370px] w-full flex items-center justify-center">
        {/* SVG Connecting Paths Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Subtle concentric orbit ring around character */}
          <circle
            cx="50"
            cy="45"
            r="23"
            stroke="#F0F1F3"
            strokeWidth="0.75"
            strokeDasharray="2 3"
            fill="none"
          />

          {/* Rays from each of the 5 actions connecting to central character */}
          {HERO_ACTIONS.map((item) => {
            const isTarget = activeActionId === item.id;
            const isHovered = hoveredActionId === item.id;
            const { x1, y1, x2, y2, cx, cy } = item.svgPath;
            const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

            return (
              <g key={item.id}>
                {/* Background hairline */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isTarget ? item.accent : isHovered ? '#B0B0B8' : '#EBEBEF'}
                  strokeWidth={isTarget ? '1.4' : '0.8'}
                  strokeDasharray={isTarget ? 'none' : '2 2.5'}
                  className="transition-colors duration-300"
                />

                {/* Animated active energy node along path when active */}
                {isTarget && step >= 1 && (
                  <circle cx={x2} cy={y2} r="1.5" fill={item.accent} className="animate-ping" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Real-Life Action Buttons (Desktop Layout) */}
        <div className="absolute inset-0 z-10 hidden sm:block pointer-events-none">
          {HERO_ACTIONS.map((item, index) => {
            const isSelected = activeActionId === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleActionSelect(item.id)}
                onMouseEnter={() => setHoveredActionId(item.id)}
                onMouseLeave={() => setHoveredActionId(null)}
                style={{
                  top: item.desktopPos.top,
                  left: item.desktopPos.left,
                  right: item.desktopPos.right,
                }}
                className={`pointer-events-auto absolute px-3 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC] ${
                  isSelected
                    ? 'bg-[#070709] border-[#070709] text-white shadow-md scale-105'
                    : 'bg-white/95 hover:bg-white border-[#E6E6E8] hover:border-[#070709] text-[#070709] hover:shadow-sm'
                }`}
                aria-label={`Select action ${item.verb}`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isSelected ? 'bg-white' : 'bg-[#D1D1D6] group-hover:bg-[#070709]'
                  }`}
                  style={!isSelected ? { backgroundColor: item.accent } : undefined}
                />
                <span className="text-xs font-medium tracking-wider">{item.verb}</span>
                <Icon
                  weight={isSelected ? 'bold' : 'regular'}
                  className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-white' : 'text-[#8B8B8B] group-hover:text-[#070709]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Central Anchor: KRIYA Blob Character & Progression Hub */}
        <div className="relative z-20 flex flex-col items-center justify-center -translate-y-2">
          {/* Floating +XP Notification Chip (Appears right above head upon reward) */}
          <div
            className={`absolute -top-10 z-30 transition-all duration-500 ease-out pointer-events-none ${
              showXpFloat
                ? 'opacity-100 -translate-y-2 scale-105'
                : 'opacity-0 translate-y-1 scale-95'
            }`}
          >
            {activeAction && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D9A441] shadow-lg text-xs font-semibold text-[#070709]">
                <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                <span className="tabular-nums font-bold text-[#D9A441]">+{activeAction.xp} XP</span>
                <span className="text-[10px] text-[#60606C] border-l border-[#E6E6E8] pl-1.5">
                  {activeAction.statName} {activeAction.statBonus}
                </span>
              </div>
            )}
          </div>

          {/* Blob Character Container (Very subtle, premium response) */}
          <div
            className={`relative transition-transform duration-500 ease-out ${
              characterReacting ? 'scale-[1.04] -translate-y-1' : 'scale-100 translate-y-0'
            }`}
          >
            {/* Subtle soft grounding shadow under character */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-[#000000]/6 blur-xs pointer-events-none" />

            {/* Custom High-Fidelity KRIYA Blob SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-sm select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dynamic gradient that harmonizes with active pursuit */}
                <linearGradient
                  id="kriya-hero-blob-grad"
                  x1="20"
                  y1="16"
                  x2="80"
                  y2="88"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    stopColor={activeAction ? activeAction.accent : '#2D3B42'}
                    className="transition-colors duration-500"
                  />
                  <stop offset="1" stopColor="#171E22" />
                </linearGradient>

                <filter
                  id="kriya-blob-shadow"
                  x="10"
                  y="10"
                  width="80"
                  height="80"
                  filterUnits="userSpaceOnUse"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="3"
                    floodColor="#000000"
                    floodOpacity="0.16"
                  />
                </filter>
              </defs>

              {/* Organic Teardrop Blob Silhouette */}
              <path
                d="M26 42C26 26 38 18 50 18C62 18 74 26 74 42C74 58 78 76 68 84C58 92 42 92 32 84C22 76 26 58 26 42Z"
                fill="url(#kriya-hero-blob-grad)"
                filter="url(#kriya-blob-shadow)"
              />

              {/* Soft Specular Highlight on forehead */}
              <ellipse
                cx="42"
                cy="26"
                rx="11"
                ry="4"
                transform="rotate(-15 42 26)"
                fill="#FFFFFF"
                fillOpacity="0.14"
              />

              {/* Signature KRIYA Architectural Wire Glasses in Ochre/Gold */}
              <g className="transition-opacity duration-300">
                {/* Left Rim */}
                <circle
                  cx="41"
                  cy="45"
                  r="8.5"
                  stroke="#D9A441"
                  strokeWidth="2.2"
                  fill="#FFFFFF"
                  fillOpacity="0.06"
                />
                {/* Right Rim */}
                <circle
                  cx="59"
                  cy="45"
                  r="8.5"
                  stroke="#D9A441"
                  strokeWidth="2.2"
                  fill="#FFFFFF"
                  fillOpacity="0.06"
                />
                {/* Bridge */}
                <path
                  d="M49.5 44C50 43 50 43 50.5 44"
                  stroke="#D9A441"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Temples */}
                <line
                  x1="32.5"
                  y1="45"
                  x2="26"
                  y2="43.5"
                  stroke="#D9A441"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="67.5"
                  y1="45"
                  x2="74"
                  y2="43.5"
                  stroke="#D9A441"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              {/* Expressive Eyes behind Glasses */}
              {isBlinking ? (
                // Subtle organic blink (closed slit)
                <g>
                  <path
                    d="M37 45.5C39 47 43 47 45 45.5"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M55 45.5C57 47 61 47 63 45.5"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              ) : characterReacting || step >= 4 ? (
                // Happy celebration crescent eyes (^ ^) during progression
                <g>
                  <path
                    d="M37 46.5C39 43.5 43 43.5 45 46.5"
                    stroke="#FFFFFF"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M55 46.5C57 43.5 61 43.5 63 46.5"
                    stroke="#FFFFFF"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {/* Subtle warm cheek flush */}
                  <circle cx="34" cy="53" r="2.5" fill="#E26544" fillOpacity="0.45" />
                  <circle cx="66" cy="53" r="2.5" fill="#E26544" fillOpacity="0.45" />
                </g>
              ) : (
                // Calm, mindful gaze
                <g>
                  <circle cx="41" cy="45" r="2.8" fill="#FFFFFF" />
                  <circle cx="59" cy="45" r="2.8" fill="#FFFFFF" />
                  <circle cx="41.7" cy="44.5" r="1.4" fill="#151515" />
                  <circle cx="59.7" cy="44.5" r="1.4" fill="#151515" />
                  <circle cx="40.5" cy="44" r="0.6" fill="#FFFFFF" />
                  <circle cx="58.5" cy="44" r="0.6" fill="#FFFFFF" />
                </g>
              )}

              {/* Composed Mouth Expression */}
              {characterReacting || step >= 4 ? (
                <path
                  d="M46 59C48 62 52 62 54 59"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                />
              ) : (
                <path
                  d="M47 59.5C49 61 51 61 53 59.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.75"
                />
              )}
            </svg>
          </div>

          {/* Underneath Character: Micro Level & Attribute Status */}
          <div className="mt-2 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#070709] text-white text-[10px] font-mono font-medium tracking-wider">
                LVL {currentLevel}
              </span>
              <span className="text-[11px] font-medium text-[#60606C]">
                {activeAction ? `${activeAction.verb.toLowerCase()} momentum` : 'kriya avatar'}
              </span>
              {recentAttribute && (
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all duration-300"
                  style={{
                    backgroundColor: activeAction?.statBadgeBg || '#F1F6F3',
                    color: activeAction?.statColor || '#2E5C56',
                    borderColor: `${activeAction?.statColor || '#2E5C56'}30`,
                  }}
                >
                  {recentAttribute}
                </span>
              )}
            </div>

            {/* Micro XP Progress Bar */}
            <div className="w-36 h-1.5 rounded-full bg-[#EBEBEF] overflow-hidden">
              <div
                className="h-full bg-[#D9A441] transition-all duration-500 ease-out"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-[#8B8B8B] tracking-tight tabular-nums">
              {accumulatedXP} / 1000 XP
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Actions Ribbon (Visible on small screens where absolute layout pinches) */}
      <div className="sm:hidden pt-3 pb-1">
        <p className="text-[10px] font-medium text-[#8B8B8B] text-center mb-2 uppercase tracking-wider">
          Tap an action to evolve:
        </p>
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {HERO_ACTIONS.map((item) => {
            const isSelected = activeActionId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleActionSelect(item.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#070709] text-white border-[#070709]'
                    : 'bg-[#F7F7F8] text-[#070709] border-[#E6E6E8]'
                }`}
              >
                {item.verb}
              </button>
            );
          })}
        </div>
      </div>

      {/* THE KRIYA PROGRESSION LINE MOTIF */}
      {/* Concept: ●────────●────────●────────● */}
      {/* Nodes: 01 ACTION → 02 QUEST → 03 XP → 04 CHARACTER */}
      <div className="pt-5 border-t border-[#F0F1F3] mt-3">
        <div className="grid grid-cols-4 items-start gap-1 sm:gap-2 relative">
          {/* Node 1: ACTION */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full mb-1.5 transition-all duration-300 bg-white">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  step >= 1
                    ? 'bg-[#070709] ring-4 ring-[#070709]/15 scale-110'
                    : 'bg-[#D1D1D6]'
                }`}
              />
            </div>
            <span className="text-[9px] font-mono font-medium text-[#8B8B8B] tracking-wider uppercase">
              01 ACTION
            </span>
            <span
              className={`text-xs font-medium tracking-normal mt-0.5 truncate max-w-[70px] sm:max-w-none transition-colors ${
                step >= 1 ? 'text-[#070709] font-semibold' : 'text-[#8B8B8B]'
              }`}
            >
              {activeAction ? activeAction.verb : 'Choose'}
            </span>
          </div>

          {/* Node 2: QUEST */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full mb-1.5 transition-all duration-300 bg-white">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  step >= 2
                    ? 'bg-[#070709] ring-4 ring-[#070709]/15 scale-110'
                    : 'bg-[#D1D1D6]'
                }`}
              />
            </div>
            <span className="text-[9px] font-mono font-medium text-[#8B8B8B] tracking-wider uppercase">
              02 QUEST
            </span>
            <span
              className={`text-xs font-medium tracking-normal mt-0.5 truncate max-w-[70px] sm:max-w-[110px] transition-colors ${
                step >= 2 ? 'text-[#070709] font-semibold' : 'text-[#8B8B8B]'
              }`}
            >
              {activeAction && step >= 2 ? activeAction.quest : 'Generated'}
            </span>
          </div>

          {/* Node 3: XP */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full mb-1.5 transition-all duration-300 bg-white">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  step >= 3
                    ? 'bg-[#D9A441] ring-4 ring-[#D9A441]/20 scale-110'
                    : 'bg-[#D1D1D6]'
                }`}
              />
            </div>
            <span className="text-[9px] font-mono font-medium text-[#8B8B8B] tracking-wider uppercase">
              03 XP
            </span>
            <span
              className={`text-xs font-medium tracking-normal mt-0.5 tabular-nums transition-colors ${
                step >= 3 ? 'text-[#D9A441] font-semibold' : 'text-[#8B8B8B]'
              }`}
            >
              {activeAction && step >= 3 ? `+${activeAction.xp} XP` : '+Momentum'}
            </span>
          </div>

          {/* Node 4: CHARACTER / EVOLUTION */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full mb-1.5 transition-all duration-300 bg-white">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  step >= 4
                    ? 'bg-[#668F72] ring-4 ring-[#668F72]/20 scale-110'
                    : 'bg-[#D1D1D6]'
                }`}
              />
            </div>
            <span className="text-[9px] font-mono font-medium text-[#8B8B8B] tracking-wider uppercase">
              04 EVOLVE
            </span>
            <span
              className={`text-xs font-medium tracking-normal mt-0.5 truncate max-w-[70px] sm:max-w-none transition-colors ${
                step >= 4 ? 'text-[#668F72] font-semibold' : 'text-[#8B8B8B]'
              }`}
            >
              {step >= 4 ? `Lvl ${currentLevel} • +1` : 'Character'}
            </span>
          </div>

          {/* Connecting Thin Progression Track behind the nodes */}
          <div className="absolute top-3 left-[12.5%] right-[12.5%] h-[1.5px] bg-[#E6E6E8] z-0 pointer-events-none">
            {/* Active Drawing Line that sweeps through the nodes */}
            <div
              className="h-full transition-all duration-400 ease-out bg-[#070709]"
              style={{
                width:
                  step === 0
                    ? '0%'
                    : step === 1
                    ? '10%'
                    : step === 2
                    ? '40%'
                    : step === 3
                    ? '72%'
                    : '100%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
