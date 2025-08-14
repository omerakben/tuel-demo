"use client";

import { OrchestraCubes } from "@tuel/scroll";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function OrchestraPage() {
  const [cubeCount, setCubeCount] = useState(12);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [spacing, setSpacing] = useState(100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-teal-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">
              Orchestra Cubes
            </h1>
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
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Orchestra Cubes
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            3D animated cubes that dance and respond to scroll interaction,
            creating a mesmerizing visual symphony.
          </p>
        </motion.div>

        {/* Main Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Interactive 3D Cube Animation
          </h2>

          <div className="h-[600px] rounded-xl bg-black/20 border border-white/10 overflow-hidden">
            <OrchestraCubes
              cubeCount={cubeCount}
              className="w-full h-full"
              rotationSpeed={rotationSpeed}
              spacing={spacing}
            />
          </div>

          <div className="mt-8 text-center text-gray-400">
            <p className="text-sm">
              Scroll within the container to see the cubes react
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Customize Animation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Cube Count: {cubeCount}
              </label>
              <input
                type="range"
                min="6"
                max="24"
                step="2"
                value={cubeCount}
                onChange={(e) => setCubeCount(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Rotation Speed: {rotationSpeed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Spacing: {spacing}px
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="25"
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Visual Variations */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Visual Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="h-48 rounded-lg overflow-hidden mb-4">
                <OrchestraCubes cubeCount={6} className="w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Minimal</h3>
              <p className="text-gray-400 text-sm">
                Few cubes for subtle, elegant animations
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="h-48 rounded-lg overflow-hidden mb-4">
                <OrchestraCubes cubeCount={12} className="w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Balanced
              </h3>
              <p className="text-gray-400 text-sm">
                Perfect balance of complexity and performance
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="h-48 rounded-lg overflow-hidden mb-4">
                <OrchestraCubes cubeCount={18} className="w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Complex</h3>
              <p className="text-gray-400 text-sm">
                Rich, dynamic animations with many cubes
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Implementation
          </h2>
          <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{`import { OrchestraCubes } from '@tuel/scroll';

<OrchestraCubes
  cubeCount={12}
  className="w-full h-[600px]"
  rotationSpeed={1}
  spacing={100}
/>

// The component handles:
// - 3D cube generation
// - Scroll-based animations
// - WebGL rendering
// - Performance optimization`}</code>
          </pre>
        </motion.div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Perfect For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
              <div className="text-blue-400 mb-4 text-3xl">🎨</div>
              <h3 className="text-white font-semibold mb-2">
                Creative Portfolios
              </h3>
              <p className="text-gray-400 text-sm">
                Add visual interest to portfolio sites
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="text-green-400 mb-4 text-3xl">🏢</div>
              <h3 className="text-white font-semibold mb-2">Tech Companies</h3>
              <p className="text-gray-400 text-sm">
                Showcase innovation and technology
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
              <div className="text-purple-400 mb-4 text-3xl">🎮</div>
              <h3 className="text-white font-semibold mb-2">Gaming Sites</h3>
              <p className="text-gray-400 text-sm">
                Create immersive 3D experiences
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
              <div className="text-orange-400 mb-4 text-3xl">🎯</div>
              <h3 className="text-white font-semibold mb-2">
                Product Launches
              </h3>
              <p className="text-gray-400 text-sm">
                Eye-catching hero sections
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-teal-400 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              WebGL Powered
            </h3>
            <p className="text-gray-400 text-sm">
              Hardware-accelerated 3D graphics for smooth performance.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
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
              Scroll Interactive
            </h3>
            <p className="text-gray-400 text-sm">
              Cubes respond dynamically to scroll position and velocity.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-cyan-400 mb-4">
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
              Customizable
            </h3>
            <p className="text-gray-400 text-sm">
              Adjust cube count, speed, spacing, and colors to match your
              design.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
