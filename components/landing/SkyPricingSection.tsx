'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Command, PencilSimple, Sparkle } from '@phosphor-icons/react';

export function SkyPricingSection() {
  const plans = [
    {
      icon: Command,
      name: 'Basic',
      subtitle: 'Perfect for individual seekers getting started',
      discount: 'Save up to 30%',
      price: '$0.00',
      period: '/ Month',
      highlighted: false,
      buttonText: 'Get started',
      featureHeader: 'Features include:',
      features: [
        'Unlimited active daily quests',
        '4 foundational attribute trees',
        'Streak tracking & freeze grace period',
        'Starter blob character avatar',
        'Reports & weekly progression summary',
        'Synced across web & mobile',
      ],
    },
    {
      icon: PencilSimple,
      name: 'Standard Plan',
      subtitle: 'Ideal for dedicated builders that need deep mastery',
      discount: 'Save up to 50%',
      price: '$9.00',
      period: '/ Month',
      highlighted: true,
      buttonText: 'Get started',
      featureHeader: 'Features include:',
      features: [
        'Everything in Basic',
        'Advanced multi-tier quest chains',
        'Habit decomposition & AI breakdown',
        'Full Keepsake Vault & cosmetic drops',
        'In-depth attribute compounding analytics',
        'Up to 10 custom attributes',
      ],
    },
    {
      icon: Sparkle,
      name: 'Enterprise Plan',
      subtitle: 'For lifelong practitioners seeking ultimate progression',
      discount: 'Save up to 60%',
      price: '$79.00',
      period: '/ Lifetime',
      highlighted: false,
      buttonText: 'Get started',
      featureHeader: 'Includes everything in Standard, plus:',
      features: [
        'Unlimited custom quests & attributes',
        'Lifetime access (pay once, keep forever)',
        'Exclusive mythical titles & cosmetics',
        'Advanced analytics & compounding forecasts',
        'Data export (CSV / JSON)',
      ],
    },
  ];

  return (
    <section id="pricing" className="relative pt-24 pb-20 sm:pb-28 overflow-hidden">
      {/* High-Fidelity Sky Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/sky_pricing_bg.webp"
          alt="Sky and Clouds"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        {/* Soft bottom blend to white for FAQ transition */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading in White */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-normal leading-tight">
            Simple pricing plan
          </h2>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl mx-auto tracking-normal">
            Accelerate your daily workflow by converting tasks into structured quests, live attribute compounding, and streak milestones.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all"
              >
                <div>
                  {/* Top Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#1D64EC] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Icon weight="bold" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#070709] tracking-normal">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-[#60606C] mt-0.5 leading-snug tracking-normal font-normal">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#F4F5F7] text-[11px] font-medium text-[#60606C] tracking-normal mb-4">
                    {plan.discount}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-[#070709] tracking-normal tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-sm font-normal text-[#8B8B8B] tracking-normal">
                      {plan.period}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/signup"
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium tracking-normal transition-all shadow-xs cursor-pointer mb-8 ${
                      plan.highlighted
                        ? 'bg-[#070709] hover:bg-black text-white shadow-md'
                        : 'bg-[#F4F5F7] hover:bg-[#EBECEF] text-[#070709]'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>

                  {/* Feature Checklist Header */}
                  <div className="text-xs font-semibold text-[#070709] tracking-normal mb-4">
                    {plan.featureHeader}
                  </div>

                  {/* Checklist Items */}
                  <ul className="space-y-3 text-xs text-[#4B5563] font-normal tracking-normal">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5">
                        <CheckCircle
                          weight="fill"
                          className="w-4 h-4 text-[#1D64EC] shrink-0"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
