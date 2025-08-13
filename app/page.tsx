"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const packages = [
  {
    name: "@tuel/scroll",
    description: "Advanced scroll-triggered animations and effects",
    href: "/scroll",
    color: "from-blue-500 to-cyan-500",
    examples: ["Parallax", "Reveal", "Horizontal", "Minimap"]
  },
  {
    name: "@tuel/gallery",
    description: "Interactive image and video galleries",
    href: "/gallery", 
    color: "from-purple-500 to-pink-500",
    examples: ["3D Gallery", "Carousel", "Grid", "Slider"]
  },
  {
    name: "@tuel/text-effects",
    description: "Animated text effects and typography",
    href: "/text-effects",
    color: "from-green-500 to-emerald-500",
    examples: ["Typewriter", "Scramble", "Split", "Loop"]
  },
  {
    name: "@tuel/three",
    description: "Three.js components and 3D animations",
    href: "/three",
    color: "from-orange-500 to-red-500",
    examples: ["3D Scene", "Orbit", "Particles", "Shaders"]
  },
  {
    name: "@tuel/interaction",
    description: "Interactive UI components and effects",
    href: "/interaction",
    color: "from-indigo-500 to-purple-500",
    examples: ["Magnetic", "Hover", "Drag", "Touch"]
  },
  {
    name: "@tuel/motion",
    description: "Motion utilities and animation primitives",
    href: "/motion",
    color: "from-teal-500 to-blue-500",
    examples: ["Spring", "Timeline", "Gesture", "Morph"]
  },
  {
    name: "@tuel/ui",
    description: "UI components with built-in animations",
    href: "/ui",
    color: "from-pink-500 to-rose-500",
    examples: ["Cards", "Buttons", "Modals", "Navigation"]
  },
  {
    name: "@tuel/performance",
    description: "Performance utilities and optimizations",
    href: "/performance",
    color: "from-gray-500 to-slate-500",
    examples: ["Lazy Load", "Debounce", "RAF", "Reduce Motion"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TUEL
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional Animation Library for React
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              A comprehensive suite of production-ready animation packages featuring scroll effects, 
              3D graphics, interactive components, and performance optimizations.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/omerakben/tuel"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/org/tuel"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                View on NPM
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
        >
          Explore Our Packages
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Link href={pkg.href}>
                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {pkg.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {pkg.examples.map((example) => (
                        <span
                          key={example}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-gray-500 group-hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7 10H13M13 10L10 7M13 10L10 13"
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
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Choose TUEL?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="text-purple-400 mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Production Ready</h3>
              <p className="text-gray-400">
                SSR-safe, TypeScript strict mode, comprehensive testing, and optimized bundles.
              </p>
            </div>
            
            <div>
              <div className="text-blue-400 mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10h-3v3h3v-3zm0-4h-3v3h3V6zm0 8h-3v3h3v-3zm4-8h-3v3h3V6zm0 4h-3v3h3v-3zm0 4h-3v3h3v-3zM7 6H4v3h3V6zm0 4H4v3h3v-3zm0 4H4v3h3v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Modular Design</h3>
              <p className="text-gray-400">
                Use only what you need. Each package is independent and tree-shakeable.
              </p>
            </div>
            
            <div>
              <div className="text-green-400 mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Well Documented</h3>
              <p className="text-gray-400">
                Comprehensive documentation, TypeScript definitions, and live examples.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 TUEL. MIT License.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/omerakben/tuel" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.npmjs.com/org/tuel" className="text-gray-400 hover:text-white transition-colors">
              NPM
            </a>
            <a href="https://tuel.ai" className="text-gray-400 hover:text-white transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}