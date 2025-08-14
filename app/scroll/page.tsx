"use client";

import {
  HorizontalScroll,
  HorizontalScrollItem,
  OrchestraCubes,
  ParallaxContainer,
  ParallaxLayer,
  ParallaxScroll,
  ScrollFrameAnimation,
  ScrollMinimap,
  WodniackWorkScroll,
} from "@tuel/scroll";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Demo Components for each scroll type
function ParallaxDemo() {
  const [speed, setSpeed] = useState(0.5);
  const [fadeIn, setFadeIn] = useState(false);
  const [scaleOnScroll, setScaleOnScroll] = useState(false);
  const [rotateOnScroll, setRotateOnScroll] = useState(false);

  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto rounded-lg bg-black/20 relative">
        <div className="h-[200vh] relative">
          {/* Background layers */}
          <ParallaxContainer className="absolute inset-0">
            <ParallaxLayer speed={0.2} className="absolute inset-0">
              <div className="h-full bg-gradient-to-b from-purple-500/20 to-transparent" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.5} className="absolute inset-0">
              <div className="h-32 w-32 bg-blue-500/50 rounded-full absolute top-20 left-10" />
              <div className="h-24 w-24 bg-green-500/50 rounded-full absolute top-40 right-10" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.8} className="absolute inset-0">
              <div className="h-20 w-20 bg-pink-500/50 rounded-lg absolute top-60 left-1/2 -translate-x-1/2" />
            </ParallaxLayer>
          </ParallaxContainer>

          {/* Main content with parallax */}
          <div className="relative z-10 p-8 space-y-32">
            <ParallaxScroll
              speed={speed}
              fadeIn={fadeIn}
              scaleOnScroll={scaleOnScroll}
              rotateOnScroll={rotateOnScroll}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Parallax Element 1
                </h3>
                <p className="text-gray-300">
                  This element moves with parallax effect
                </p>
              </div>
            </ParallaxScroll>

            <ParallaxScroll speed={speed * 1.5} fadeIn={fadeIn}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Parallax Element 2
                </h3>
                <p className="text-gray-300">Different speed creates depth</p>
              </div>
            </ParallaxScroll>

            <ParallaxScroll speed={speed * 0.5} fadeIn={fadeIn}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Parallax Element 3
                </h3>
                <p className="text-gray-300">
                  Slower movement for background feel
                </p>
              </div>
            </ParallaxScroll>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3 p-4 bg-black/30 rounded-lg">
        <div>
          <label className="text-xs text-gray-400">
            Speed: {speed.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center text-xs text-gray-400">
            <input
              type="checkbox"
              checked={fadeIn}
              onChange={(e) => setFadeIn(e.target.checked)}
              className="mr-2"
            />
            Fade In
          </label>
          <label className="flex items-center text-xs text-gray-400">
            <input
              type="checkbox"
              checked={scaleOnScroll}
              onChange={(e) => setScaleOnScroll(e.target.checked)}
              className="mr-2"
            />
            Scale
          </label>
          <label className="flex items-center text-xs text-gray-400">
            <input
              type="checkbox"
              checked={rotateOnScroll}
              onChange={(e) => setRotateOnScroll(e.target.checked)}
              className="mr-2"
            />
            Rotate
          </label>
        </div>
      </div>
    </div>
  );
}

function HorizontalScrollDemo() {
  const [speed, setSpeed] = useState(1);
  const [scrub, setScrub] = useState(1);
  const [pin, setPin] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("left");

  // Sample images from placeholder service
  const items = [
    { id: 1, color: "from-purple-500 to-pink-500", title: "Card 1" },
    { id: 2, color: "from-blue-500 to-cyan-500", title: "Card 2" },
    { id: 3, color: "from-green-500 to-emerald-500", title: "Card 3" },
    { id: 4, color: "from-orange-500 to-red-500", title: "Card 4" },
    { id: 5, color: "from-indigo-500 to-purple-500", title: "Card 5" },
    { id: 6, color: "from-teal-500 to-blue-500", title: "Card 6" },
  ];

  return (
    <div className="space-y-4">
      <div className="h-64 overflow-hidden rounded-lg bg-black/20">
        <HorizontalScroll
          speed={speed}
          scrub={scrub}
          pin={pin}
          direction={direction}
          containerClassName="h-full"
          className="gap-4 px-4 items-center h-full"
        >
          {items.map((item) => (
            <HorizontalScrollItem key={item.id} className="flex-shrink-0">
              <div
                className={`w-64 h-48 bg-gradient-to-br ${item.color} rounded-xl p-6 flex items-center justify-center shadow-lg`}
              >
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>
            </HorizontalScrollItem>
          ))}
        </HorizontalScroll>
      </div>

      {/* Controls */}
      <div className="space-y-3 p-4 bg-black/30 rounded-lg">
        <div>
          <label className="text-xs text-gray-400">Speed: {speed}</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Scrub: {scrub}</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={scrub}
            onChange={(e) => setScrub(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center text-xs text-gray-400">
            <input
              type="checkbox"
              checked={pin}
              onChange={(e) => setPin(e.target.checked)}
              className="mr-2"
            />
            Pin Container
          </label>
          <label className="flex items-center text-xs text-gray-400">
            <input
              type="radio"
              name="direction"
              checked={direction === "left"}
              onChange={() => setDirection("left")}
              className="mr-2"
            />
            Left
          </label>
          <label className="flex items-center text-xs text-gray-400">
            <input
              type="radio"
              name="direction"
              checked={direction === "right"}
              onChange={() => setDirection("right")}
              className="mr-2"
            />
            Right
          </label>
        </div>
      </div>
    </div>
  );
}

function ScrollMinimapDemo() {
  const [sections] = useState([
    { id: "intro", label: "Introduction", color: "#3B82F6" },
    { id: "features", label: "Features", color: "#10B981" },
    { id: "demo", label: "Demo", color: "#F59E0B" },
    { id: "pricing", label: "Pricing", color: "#EF4444" },
    { id: "contact", label: "Contact", color: "#8B5CF6" },
  ]);

  return (
    <div className="relative h-96">
      <div
        className="h-full overflow-y-auto rounded-lg bg-black/20"
        id="minimap-container"
      >
        <div className="space-y-32 p-8">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="h-64">
              <div
                className="h-full rounded-xl p-6 flex items-center justify-center"
                style={{ backgroundColor: section.color + "20" }}
              >
                <h3 className="text-2xl font-bold text-white">
                  {section.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimap */}
      <div className="absolute right-4 top-4 bottom-4">
        <ScrollMinimap
          sections={sections}
          containerSelector="#minimap-container"
          className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-2"
        />
      </div>
    </div>
  );
}

function ScrollFrameAnimationDemo() {
  const [frameCount] = useState(10);
  const [duration] = useState(2);

  return (
    <div className="h-96 overflow-y-auto rounded-lg bg-black/20">
      <div className="h-[200vh] relative">
        <ScrollFrameAnimation
          frameCount={frameCount}
          duration={duration}
          className="sticky top-1/2 -translate-y-1/2"
        >
          <div className="w-32 h-32 mx-auto">
            {/* Animated frames */}
            {Array.from({ length: frameCount }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: 0,
                  animation: `frame-${i} ${duration}s linear infinite`,
                }}
              >
                <div
                  className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500 to-pink-500"
                  style={{
                    transform: `rotate(${(i * 360) / frameCount}deg) scale(${
                      1 - i * 0.05
                    })`,
                  }}
                />
              </div>
            ))}
          </div>
        </ScrollFrameAnimation>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-white text-sm">Scroll to animate frames</p>
        </div>
      </div>
    </div>
  );
}

// Project-specific scroll components demos
function WodniackWorkScrollDemo() {
  return (
    <div className="h-64 overflow-y-auto rounded-lg bg-black/20">
      <WodniackWorkScroll className="min-h-[150vh]">
        <div className="p-8 space-y-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-2">Work Section 1</h3>
            <p>Scroll-triggered animation showcase</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-2">Work Section 2</h3>
            <p>Creative portfolio display</p>
          </div>
        </div>
      </WodniackWorkScroll>
    </div>
  );
}

function OrchestraCubesDemo() {
  const [cubeCount] = useState(8);

  return (
    <div className="h-64 overflow-hidden rounded-lg bg-black/20">
      <OrchestraCubes cubeCount={cubeCount} className="h-full" />
      <p className="text-xs text-gray-400 text-center mt-2">
        3D Cubes Animation
      </p>
    </div>
  );
}

const scrollComponents = [
  {
    title: "Parallax Scroll",
    description: "Multi-layer parallax effects with depth perception",
    component: "parallax",
    href: "/scroll/parallax",
    gradient: "from-blue-500 to-cyan-500",
    demo: ParallaxDemo,
    image: "/images/img_1.jpg",
  },
  {
    title: "Horizontal Scroll",
    description: "GSAP-powered smooth horizontal scrolling",
    component: "horizontal",
    href: "/scroll/horizontal",
    gradient: "from-purple-500 to-pink-500",
    demo: HorizontalScrollDemo,
    image: "/images/img_2.jpg",
  },
  {
    title: "Scroll Minimap",
    description: "Visual navigation and progress indicator",
    component: "minimap",
    href: "/scroll/minimap",
    gradient: "from-green-500 to-emerald-500",
    demo: ScrollMinimapDemo,
    image: "/images/img_3.jpg",
  },
  {
    title: "Frame Animation",
    description: "Frame-by-frame scroll-driven animation",
    component: "frame",
    href: "/scroll/frame",
    gradient: "from-orange-500 to-red-500",
    demo: ScrollFrameAnimationDemo,
    image: "/images/img_4.jpg",
  },
  {
    title: "Wodniack Work",
    description: "Portfolio-style work showcase scroll",
    component: "wodniack",
    href: "/scroll/wodniack",
    gradient: "from-indigo-500 to-purple-500",
    demo: WodniackWorkScrollDemo,
    image: "/images/img_5.jpg",
  },
  {
    title: "Orchestra Cubes",
    description: "3D animated cubes with scroll interaction",
    component: "orchestra",
    href: "/scroll/orchestra",
    gradient: "from-teal-500 to-blue-500",
    demo: OrchestraCubesDemo,
    image: "/images/img_6.jpg",
  },
  {
    title: "Orken World",
    description: "Immersive world scrolling experience",
    component: "orken",
    href: "/scroll/orken",
    gradient: "from-pink-500 to-rose-500",
    demo: null,
    image: "/images/img_7.jpg",
  },
  {
    title: "Radga Horizontal",
    description: "Slide-based horizontal scroll gallery",
    component: "radga",
    href: "/scroll/radga",
    gradient: "from-yellow-500 to-orange-500",
    demo: null,
    image: "/images/img_8.jpg",
  },
  {
    title: "Sofi Health",
    description: "Health-themed scroll interactions",
    component: "sofi",
    href: "/scroll/sofi",
    gradient: "from-green-500 to-teal-500",
    demo: null,
    image: "/images/img_9.jpg",
  },
  {
    title: "The First The Last",
    description: "Artistic scroll storytelling",
    component: "first-last",
    href: "/scroll/first-last",
    gradient: "from-gray-500 to-slate-500",
    demo: null,
    image: "/images/img_10.jpg",
  },
];

export default function ScrollPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-white hover:text-blue-400 transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-xl font-semibold text-white">@tuel/scroll</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Scroll Effects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced scroll-triggered animations and effects for React. Create
            stunning scroll experiences with parallax, reveal animations, and
            smooth scrolling.
          </p>
        </motion.div>

        {/* Interactive Demo Modal */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setActiveDemo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {
                      scrollComponents.find((c) => c.component === activeDemo)
                        ?.title
                    }
                  </h3>
                  <button
                    onClick={() => setActiveDemo(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="mb-4">
                  {scrollComponents.find((c) => c.component === activeDemo)
                    ?.demo &&
                    React.createElement(
                      scrollComponents.find((c) => c.component === activeDemo)!
                        .demo!
                    )}
                  {!scrollComponents.find((c) => c.component === activeDemo)
                    ?.demo && (
                    <div className="h-64 flex items-center justify-center bg-black/30 rounded-lg">
                      <p className="text-gray-400">
                        This component requires specific setup. Check the
                        documentation for implementation details.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Installation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Installation
          </h2>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
            <code className="text-blue-400">npm install @tuel/scroll</code>
          </div>
          <div className="mt-4 text-gray-400">
            <p>Peer dependencies:</p>
            <code className="text-sm">gsap, framer-motion, lenis</code>
          </div>
        </motion.div>

        {/* Main Components Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Interactive Scroll Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scrollComponents
              .slice(0, showAdvanced ? undefined : 6)
              .map((component, index) => (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={component.href}>
                    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${component.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
                      />

                      {/* Image Preview */}
                      <div className="relative h-48 overflow-hidden bg-black/20">
                        <Image
                          src={component.image}
                          alt={component.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {component.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {component.description}
                        </p>

                        {/* Status Badge */}
                        <div className="mt-3">
                          {component.demo ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                              Interactive Demo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                              Documentation
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Click to Open Indicator */}
                      <div className="absolute bottom-4 right-4 text-gray-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>

          {/* Show More Button */}
          {!showAdvanced && scrollComponents.length > 6 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAdvanced(true)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Show Advanced Components ({scrollComponents.length - 6} more)
              </button>
            </div>
          )}
          {showAdvanced && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAdvanced(false)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Show Less
              </button>
            </div>
          )}
        </div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Code Examples
          </h2>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Parallax Scroll
            </h3>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { ParallaxScroll, ParallaxLayer } from '@tuel/scroll';

<ParallaxScroll
  speed={0.5}
  fadeIn={true}
  scaleOnScroll={true}
>
  <div className="content">
    Parallax content moves at different speed
  </div>
</ParallaxScroll>

// Multi-layer parallax
<ParallaxContainer>
  <ParallaxLayer speed={0.2}>Background</ParallaxLayer>
  <ParallaxLayer speed={0.5}>Midground</ParallaxLayer>
  <ParallaxLayer speed={0.8}>Foreground</ParallaxLayer>
</ParallaxContainer>`}</code>
            </pre>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Horizontal Scroll
            </h3>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { HorizontalScroll, HorizontalScrollItem } from '@tuel/scroll';

<HorizontalScroll
  speed={1}
  scrub={1}
  pin={true}
  direction="left"
>
  <HorizontalScrollItem>
    <Card>Item 1</Card>
  </HorizontalScrollItem>
  <HorizontalScrollItem>
    <Card>Item 2</Card>
  </HorizontalScrollItem>
  <HorizontalScrollItem>
    <Card>Item 3</Card>
  </HorizontalScrollItem>
</HorizontalScroll>`}</code>
            </pre>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Scroll Minimap
            </h3>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { ScrollMinimap } from '@tuel/scroll';

const sections = [
  { id: 'intro', label: 'Introduction', color: '#3B82F6' },
  { id: 'features', label: 'Features', color: '#10B981' },
  { id: 'pricing', label: 'Pricing', color: '#F59E0B' }
];

<ScrollMinimap
  sections={sections}
  containerSelector="#scroll-container"
  className="fixed right-4 top-20"
/>`}</code>
            </pre>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SSR Safe</h3>
            <p className="text-gray-400 text-sm">
              All components work with server-side rendering out of the box.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Performant
            </h3>
            <p className="text-gray-400 text-sm">
              Optimized for 60fps animations with automatic performance
              detection.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-purple-400 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              TypeScript
            </h3>
            <p className="text-gray-400 text-sm">
              Fully typed with TypeScript for excellent developer experience.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
