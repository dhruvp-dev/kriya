'use client';

import React, { useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What exactly is KRIYA and how is it different from a to-do list?',
      answer:
        'Standard to-do lists are passive dumpsters for unfinished tasks that create guilt. KRIYA is an active personal progression engine. Every action you log earns XP and Gold, builds specific attributes (Focus, Vitality, Discipline, Craft), and levels up your digital character. It turns fleeting motivation into visible, compounding momentum.',
    },
    {
      question: 'How are XP, Gold, and attribute points calculated when completing a quest?',
      answer:
        'XP is calculated based on quest difficulty (Easy: 20-30 XP, Medium: 40-60 XP, Hard: 70-100+ XP) and active streak multipliers. Gold is awarded alongside XP and can be redeemed in the shop for character titles, cosmetic relics, and streak freeze shields. Attribute points feed directly into the corresponding skill tree.',
    },
    {
      question: 'What happens if I miss a day or break my streak?',
      answer:
        'We believe in compassion and discipline, not punishing burnout. KRIYA provides automatic Streak Freeze Shields that absorb missed days caused by illness, travel, or planned rest. If you exhaust your shields, your multiplier gently resets, but your lifetime XP, character level, and unlocked keepsakes remain permanent.',
    },
    {
      question: 'Can I customize my own attribute trees and categories?',
      answer:
        'Yes. While KRIYA starts with 4 core pillars (Focus, Vitality, Discipline, Craft), you can create custom attributes such as "Parenting", "Guitar", "Writing", or "Financial Literacy". Every quest can be mapped to single or dual attributes to reflect multi-disciplinary growth.',
    },
    {
      question: 'Is KRIYA suitable for serious professionals or is it just a game?',
      answer:
        'KRIYA is architected specifically for professionals, founders, writers, and athletes who dislike juvenile gaming clutter. There are no cheesy 8-bit monsters or noisy popups. The design system is minimalist, typography-driven (Plus Jakarta Sans), and calm, functioning like an executive dashboard for your personal life.',
    },
    {
      question: 'Can I use KRIYA across mobile devices and offline?',
      answer:
        'Yes. KRIYA is fully responsive across desktop, tablet, and mobile browsers, and functions seamlessly as an installable Progressive Web App (PWA). Your quest completions and streak state sync automatically to the cloud the moment you reconnect.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-b border-[#EBEBEF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#070709] tracking-normal leading-tight">
            Expert answers to your questions
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed max-w-2xl mx-auto font-normal tracking-normal">
            Our team of habit researchers and system architects has compiled answers to frequently asked questions on quest mechanics, XP compounding, and character evolution.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC] rounded-lg"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#070709] tracking-normal group-hover:text-[#1D64EC] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#60606C] shrink-0 group-hover:bg-[#EFF6FF] group-hover:text-[#1D64EC] transition-colors">
                    {isOpen ? (
                      <CaretUp weight="bold" className="w-4 h-4" />
                    ) : (
                      <CaretDown weight="bold" className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-sm sm:text-base text-[#60606C] leading-relaxed animate-fadeIn font-normal tracking-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
