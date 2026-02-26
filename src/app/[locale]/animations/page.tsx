'use client';

/**
 * Animation Components Demo Page
 * 
 * Internal testing and showcase page for all animation components.
 * Demonstrates CSS scroll-driven animations, counters, text reveals,
 * magnetic buttons, spotlight cards, and bento grid interactions.
 */

import { ScrollReveal, ScrollRevealGroup, HeroScrollReveal, CardScrollReveal } from '@/components/scroll-animations/ScrollReveal';
import { Counter } from '@/components/animations/Counter';
import { TextReveal, TextRevealHeading, TextRevealChars, TextRevealLines } from '@/components/animations/TextReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { SpotlightCard } from '@/components/animations/SpotlightCard';
import { SpotlightGroup } from '@/components/animations/SpotlightGroup';
import { BentoGrid, BentoCard } from '@/components/bento';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

// Demo Section Wrapper Component
function DemoSection({ 
  title, 
  description, 
  children,
  className = '' 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal animation="fade-in-up" range="slow">
      <section className={`py-16 border-b border-gray-200 dark:border-gray-800 last:border-0 ${className}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
            {children}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

// Code Snippet Component
function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="mt-6 bg-gray-900 rounded-lg p-4 overflow-x-auto">
      <pre className="text-sm text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function AnimationsDemoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <HeroScrollReveal>
        <div className="py-20 px-6 text-center bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Animation Components Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interactive showcase of all animation components. Scroll down to see each animation in action.
          </p>
        </div>
      </HeroScrollReveal>

      {/* 1. CSS Scroll-Driven Animations */}
      <DemoSection
        title="1. CSS Scroll-Driven Animations"
        description="Zero-JavaScript-overhead scroll animations using CSS animation-timeline. Progressive enhancement that gracefully degrades on unsupported browsers."
      >
        <div className="space-y-8">
          {/* Fade In Up */}
          <ScrollReveal animation="fade-in-up">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white">Fade In Up</h3>
              <p className="text-gray-600 dark:text-gray-400">Most common entrance animation</p>
            </div>
          </ScrollReveal>

          {/* Scale In */}
          <ScrollReveal animation="scale-in">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white">Scale In</h3>
              <p className="text-gray-600 dark:text-gray-400">Subtle zoom effect for emphasis</p>
            </div>
          </ScrollReveal>

          {/* Slide In Left */}
          <ScrollReveal animation="slide-in-left">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white">Slide In Left</h3>
              <p className="text-gray-600 dark:text-gray-400">Directional entrance from left</p>
            </div>
          </ScrollReveal>

          {/* Slide In Right */}
          <ScrollReveal animation="slide-in-right">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white">Slide In Right</h3>
              <p className="text-gray-600 dark:text-gray-400">Directional entrance from right</p>
            </div>
          </ScrollReveal>

          {/* Staggered Group */}
          <ScrollRevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" useStagger>
            {[1, 2, 3, 4].map((i) => (
              <CardScrollReveal key={i} index={i}>
                <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-center">
                  <span className="font-bold text-primary-600 dark:text-primary-400">{i}</span>
                </div>
              </CardScrollReveal>
            ))}
          </ScrollRevealGroup>

          <CodeSnippet code={`<ScrollReveal animation="fade-in-up">
  <YourContent />
</ScrollReveal>

<ScrollRevealGroup className="grid grid-cols-4 gap-4" useStagger>
  {items.map((item, i) => (
    <CardScrollReveal key={i} index={i}>
      <Card />
    </CardScrollReveal>
  ))}
</ScrollRevealGroup>`} />
        </div>
      </DemoSection>

      {/* 2. Counter Animations */}
      <DemoSection
        title="2. Counter Animations"
        description="Animated number counters that trigger when entering viewport. Uses RAF for smooth 60fps animation without React re-renders."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Simple Counter */}
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              <Counter end={1000} suffix="+" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Shipments</p>
          </div>

          {/* Counter with Prefix */}
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              <Counter end={99.9} prefix="" suffix="%" decimals={1} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Success Rate</p>
          </div>

          {/* Counter with Duration */}
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              <Counter end={50} suffix="K" duration={3} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Customers</p>
          </div>

          {/* Currency Counter */}
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              <Counter end={2.5} prefix="$" suffix="M" decimals={1} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Revenue</p>
          </div>
        </div>

        <CodeSnippet code={`<Counter end={1000} suffix="+" />
<Counter end={99.9} suffix="%" decimals={1} />
<Counter end={50} suffix="K" duration={3} />
<Counter end={2.5} prefix="$" suffix="M" decimals={1} />`} />
      </DemoSection>

      {/* 3. Text Reveal Animations */}
      <DemoSection
        title="3. Text Reveal Animations"
        description="SplitType-powered text animations with staggered reveals. Supports words, characters, and lines with customizable timing."
      >
        <div className="space-y-8">
          {/* Word Reveal */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Words (default)</p>
            <TextReveal 
              as="h3" 
              className="text-2xl font-bold text-gray-900 dark:text-white"
              stagger={0.08}
            >
              Shipping from China to Africa
            </TextReveal>
          </div>

          {/* Character Reveal */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Characters</p>
            <TextRevealChars
              as="h3"
              className="text-2xl font-bold text-primary-600 dark:text-primary-400"
            >
              中国到非洲物流
            </TextRevealChars>
          </div>

          {/* Line Reveal */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Lines</p>
            <TextRevealLines
              as="p"
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              We provide fast, reliable shipping services from China to West Africa. Our logistics network covers Mali, Senegal, Ivory Coast, and more.
            </TextRevealLines>
          </div>

          {/* Heading Preset */}
          <div className="p-6 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl">
            <TextRevealHeading
              level={2}
              className="text-3xl font-bold text-white"
            >
              Premium Freight Services
            </TextRevealHeading>
          </div>

          <CodeSnippet code={`<TextReveal type="words" stagger={0.08}>
  Shipping from China to Africa
</TextReveal>

<TextRevealChars>
  中国到非洲物流
</TextRevealChars>

<TextRevealHeading level={2}>
  Premium Freight Services
</TextRevealHeading>`} />
        </div>
      </DemoSection>

      {/* 4. Magnetic Buttons */}
      <DemoSection
        title="4. Magnetic Buttons"
        description="Buttons with magnetic hover effect that follow the cursor within a specified radius. Features spring animations and reduced motion support."
      >
        <div className="flex flex-wrap gap-6 items-center justify-center py-8">
          {/* Primary */}
          <MagneticButton variant="primary">
            Primary Button
          </MagneticButton>

          {/* Secondary */}
          <MagneticButton variant="secondary">
            Secondary
          </MagneticButton>

          {/* Ghost */}
          <MagneticButton variant="ghost">
            Ghost Button
          </MagneticButton>

          {/* High Strength */}
          <MagneticButton strength={50} radius={200} variant="primary">
            Strong Pull
          </MagneticButton>
        </div>

        <CodeSnippet code={`<MagneticButton variant="primary">
  Primary Button
</MagneticButton>

<MagneticButton 
  variant="secondary"
  strength={30}
  radius={150}
>
  Secondary
</MagneticButton>`} />
      </DemoSection>

      {/* 5. Spotlight Cards */}
      <DemoSection
        title="5. Spotlight Cards"
        description="Cards with mouse-following spotlight/gradient effect. Creates an interactive lighting effect that responds to cursor position."
      >
        <SpotlightGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default Spotlight */}
          <SpotlightCard className="h-48 rounded-2xl bg-gray-900 p-6">
            <div className="h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Air Freight</h3>
                <p className="text-gray-400 text-sm">2-5 days delivery</p>
              </div>
            </div>
          </SpotlightCard>

          {/* Custom Color */}
          <SpotlightCard 
            className="h-48 rounded-2xl bg-gray-900 p-6"
            spotlightColor="rgba(34, 197, 94, 0.2)"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sea Freight</h3>
                <p className="text-gray-400 text-sm">Cost-effective shipping</p>
              </div>
            </div>
          </SpotlightCard>

          {/* No Border Glow */}
          <SpotlightCard 
            className="h-48 rounded-2xl bg-gray-900 p-6"
            spotlightColor="rgba(168, 85, 247, 0.2)"
            borderGlow={false}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sourcing</h3>
                <p className="text-gray-400 text-sm">Product procurement</p>
              </div>
            </div>
          </SpotlightCard>
        </SpotlightGroup>

        <CodeSnippet code={`<SpotlightCard 
  className="h-48 rounded-2xl bg-gray-900"
  spotlightColor="rgba(255, 255, 255, 0.15)"
  borderGlow={true}
>
  <YourContent />
</SpotlightCard>`} />
      </DemoSection>

      {/* 6. Bento Grid */}
      <DemoSection
        title="6. Bento Grid"
        description="Expandable bento grid cards with smooth FLIP animations. Click any card to expand it into a detailed view."
      >
        <BentoGrid columns={4} gap="1rem" className="max-w-4xl mx-auto">
          {/* Card 1 - Large */}
          <BentoCard 
            id="shipping-card" 
            defaultSpan="2x2" 
            expandedSpan="3x3"
            gradient="rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)"
            className="group"
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Express Shipping</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Click to expand</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 2 - Tall */}
          <BentoCard 
            id="tracking-card" 
            defaultSpan="1x2" 
            expandedSpan="2x2"
            gradient="rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)"
            className="group"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Real-time updates</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 3 - Small */}
          <BentoCard 
            id="support-card" 
            defaultSpan="1x1" 
            expandedSpan="2x2"
            gradient="rgba(249, 115, 22, 0.1), rgba(234, 179, 8, 0.1)"
            className="group"
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">24/7 Support</h3>
            </div>
          </BentoCard>

          {/* Card 4 - Small */}
          <BentoCard 
            id="rates-card" 
            defaultSpan="1x1" 
            expandedSpan="2x2"
            gradient="rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1)"
            className="group"
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Best Rates</h3>
            </div>
          </BentoCard>

          {/* Card 5 - Wide */}
          <BentoCard 
            id="warehouse-card" 
            defaultSpan="2x1" 
            expandedSpan="2x2"
            gradient="rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1)"
            className="group"
          >
            <div className="h-full flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Warehousing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Storage solutions</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 6 - Small */}
          <BentoCard 
            id="customs-card" 
            defaultSpan="1x1" 
            expandedSpan="2x2"
            gradient="rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1)"
            className="group"
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Customs</h3>
            </div>
          </BentoCard>
        </BentoGrid>

        <CodeSnippet code={`<BentoGrid columns={4} gap="1rem">
  <BentoCard 
    id="card-1" 
    defaultSpan="2x2" 
    expandedSpan="3x3"
    gradient="rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)"
  >
    <Content />
  </BentoCard>
  
  <BentoCard 
    id="card-2" 
    defaultSpan="1x2" 
    expandedSpan="2x2"
  >
    <Content />
  </BentoCard>
</BentoGrid>`} />
      </DemoSection>

      {/* Animated Section Example */}
      <DemoSection
        title="7. AnimatedSection (Framer Motion)"
        description="Scroll-triggered animations using Framer Motion. Alternative to CSS scroll-driven for more complex effects."
      >
        <div className="space-y-4">
          <AnimatedSection animation="fadeUp">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Fade Up</h3>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Slide Left</h3>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scaleUp">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Scale Up</h3>
            </div>
          </AnimatedSection>
        </div>

        <CodeSnippet code={`<AnimatedSection animation="fadeUp">
  <YourContent />
</AnimatedSection>

<AnimatedSection animation="slideLeft" delay={0.2}>
  <YourContent />
</AnimatedSection>`} />
      </DemoSection>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 dark:text-gray-400">
        <p>Animation Components Demo — ChinaLink Express</p>
        <p className="text-sm mt-2">All animations respect prefers-reduced-motion</p>
      </footer>
    </main>
  );
}
