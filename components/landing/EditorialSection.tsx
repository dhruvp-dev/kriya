'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';

export function EditorialSection() {
  const articles = [
    {
      image: '/editorial_1.webp',
      category: 'Psychology',
      date: 'March 12, 2025',
      title: 'The Illusion of Busywork: Why Most To-Do Lists Fail',
      snippet:
        'Crossing off 20 trivial errands leaves you exhausted without any needle-moving progress. Here is how quest design solves it.',
    },
    {
      image: '/editorial_2.webp',
      category: 'Habit Design',
      date: 'March 8, 2025',
      title: 'Attribute Compounding: How Small Daily Quests Snowball',
      snippet:
        'Applying RPG progression mechanics to deliberate real-world skill acquisition, strength training, and focus.',
    },
    {
      image: '/editorial_3.webp',
      category: 'Philosophy',
      date: 'March 1, 2025',
      title: 'Building a Character Sheet for Real-World Ambition',
      snippet:
        'How identifying your dominant archetype clarifies which habits to build and which distractions to ruthlessly discard.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#070709] tracking-normal">
              News & Dispatches
            </h2>
            <p className="text-sm sm:text-base text-[#60606C] leading-relaxed font-normal tracking-normal">
              Field notes on habit engineering, deliberate practice, character evolution, and digital mindfulness.
            </p>
          </div>

          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-medium text-[#070709] hover:bg-[#F9FAFB] transition-colors self-start sm:self-auto shadow-xs tracking-normal"
          >
            <span>Read All Blogs</span>
            <ArrowRight weight="bold" className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col space-y-4 cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F3F4F6] border border-[#E5E7EB] shadow-xs group-hover:shadow-md transition-all">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Tag & Date */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#8B8B8B] tracking-normal">
                <span className="text-[#070709] font-semibold">{item.category}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>

              {/* Headline */}
              <h3 className="text-base sm:text-lg font-semibold text-[#070709] tracking-normal group-hover:text-[#1D64EC] transition-colors leading-snug">
                {item.title}
              </h3>

              {/* Snippet */}
              <p className="text-xs sm:text-sm text-[#60606C] leading-relaxed line-clamp-2">
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
