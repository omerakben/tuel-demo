"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const scrollExamples = [
  {
    title: "Parallax Scroll",
    description: "Multi-layer parallax effects with depth",
    href: "/scroll/parallax",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Horizontal Scroll",
    description: "Smooth horizontal scrolling experiences",
    href: "/scroll/horizontal",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Reveal on Scroll",
    description: "Elements reveal as you scroll",
    href: "/scroll/reveal",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Scroll-Triggered Animations",
    description: "Complex animations triggered by scroll position",
    href: "/scroll/animations",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Scroll Minimap",
    description: "Visual scroll progress indicator",
    href: "/scroll/minimap",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Sticky Elements",
    description: "Elements that stick during scroll",
    href: "/scroll/sticky",
    gradient: "from-teal-500 to-blue-500"
  },
  {
    title: "Scroll Frame Animation",
    description: "Frame-by-frame animation on scroll",
    href: "/scroll/frame",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Smooth Scroll",
    description: "Buttery smooth scroll experience",
    href: "/scroll/smooth",
    gradient: "from-gray-500 to-slate-500"
  }
];

export default function ScrollPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
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
            Advanced scroll-triggered animations and effects for React. Create stunning scroll experiences
            with parallax, reveal animations, and smooth scrolling.
          </p>
        </motion.div>

        {/* Installation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Installation</h2>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
            <code className="text-blue-400">npm install @tuel/scroll</code>
          </div>
          <div className="mt-4 text-gray-400">
            <p>Peer dependencies:</p>
            <code className="text-sm">gsap, framer-motion, lenis</code>
          </div>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scrollExamples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Link href={example.href}>
                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {example.description}
                    </p>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="absolute bottom-4 right-4 text-gray-500 group-hover:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SSR Safe</h3>
            <p className="text-gray-400 text-sm">
              All components work with server-side rendering out of the box.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performant</h3>
            <p className="text-gray-400 text-sm">
              Optimized for 60fps animations with automatic performance detection.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-purple-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">TypeScript</h3>
            <p className="text-gray-400 text-sm">
              Fully typed with TypeScript for excellent developer experience.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}