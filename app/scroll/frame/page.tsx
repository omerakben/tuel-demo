"use client";

import { ScrollFrameAnimation } from "@tuel/scroll";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ScrollFramePage() {
  const [frameCount, setFrameCount] = useState(24);
  const [duration, setDuration] = useState(2);
  const [activeDemo, setActiveDemo] = useState<
    "rotation" | "morph" | "sequence" | "canvas"
  >("canvas");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Frame path function for ScrollFrameAnimation
  const framePath = (index: number) => {
    // Use existing images for demonstration
    const imageNumber = (index % 10) + 1;
    return `/images/img_${imageNumber}.jpg`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-orange-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">
              Frame Animation
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
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Frame Animation
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Frame-by-frame scroll-driven animations for creating cinematic
            effects and smooth transitions with @tuel/scroll.
          </p>
        </motion.div>

        {/* Demo Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: "canvas", label: "Canvas Sequence (TUEL)" },
            { id: "sequence", label: "CSS Sequence" },
            { id: "rotation", label: "3D Rotation" },
            { id: "morph", label: "Shape Morph" },
          ].map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeDemo === demo.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {demo.label}
            </button>
          ))}
        </div>

        {/* Main Demo */}
        <div className="mb-16">
          {/* Canvas Sequence Demo using @tuel/scroll */}
          {activeDemo === "canvas" && isClient && (
            <div className="h-[400vh] relative">
              <ScrollFrameAnimation
                frameCount={10}
                framePath={framePath}
                className="h-screen"
                scrollSpeed={1}
                pinContainer={true}
                startTrigger="top top"
                endTrigger="bottom top"
                preloadFrames={true}
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      TUEL ScrollFrameAnimation
                    </h2>
                    <p className="text-xl text-gray-300">
                      Canvas-based performance optimized animation
                    </p>
                  </div>
                </div>
              </ScrollFrameAnimation>
            </div>
          )}

          {activeDemo !== "canvas" && (
          <div className="h-[600px] overflow-y-auto rounded-xl bg-black/20 border border-white/10">
            <div className="h-[200vh] relative">
              {/* 3D Rotation Demo */}
              {activeDemo === "rotation" && (
                <div className="sticky top-1/2 -translate-y-1/2">
                  <div className="relative w-64 h-64 mx-auto">
                    <motion.div
                      className="w-48 h-48 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl flex items-center justify-center mx-auto"
                      animate={{
                        rotateY: [0, 360],
                        rotateX: [0, 180],
                        scale: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <span className="text-4xl font-bold text-white">
                        3D
                      </span>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Shape Morph Demo */}
              {activeDemo === "morph" && (
                <div className="sticky top-1/2 -translate-y-1/2">
                  <div className="relative w-64 h-64 mx-auto">
                    <motion.div
                      className="w-48 h-48 bg-gradient-to-br from-pink-500 to-orange-500 shadow-2xl mx-auto"
                      animate={{
                        borderRadius: [
                          "50%",
                          "20%",
                          "10%",
                          "5%",
                          "10%",
                          "20%",
                          "50%",
                        ],
                        rotate: [0, 45, 90, 180, 270, 315, 360],
                      }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Image Sequence Demo */}
              {activeDemo === "sequence" && (
                <div className="sticky top-1/2 -translate-y-1/2">
                  <div className="relative w-96 h-64 mx-auto rounded-xl overflow-hidden shadow-2xl">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0, 1, 0, 0],
                        }}
                        transition={{
                          duration: duration * 8,
                          repeat: Infinity,
                          delay: (index * duration * 8) / 8,
                          times: [0, 0.1, 0.125, 0.15, 1],
                        }}
                      >
                        <Image
                          src={`/images/img_${i}.jpg`}
                          alt={`Frame ${i}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-2xl font-bold">Frame {i}</h3>
                          <p className="text-sm opacity-80">
                            Scroll to animate
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white text-lg font-medium">
                  ↓ Scroll to animate ↓
                </p>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Controls */}
        <div className="mb-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Animation Controls
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Frame Count: {frameCount}
              </label>
              <input
                type="range"
                min="6"
                max="48"
                step="6"
                value={frameCount}
                onChange={(e) => setFrameCount(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Duration: {duration}s
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Product Showcases
              </h3>
              <p className="text-gray-400 text-sm">
                360° product rotation animations triggered by scroll
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-full h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Storytelling
              </h3>
              <p className="text-gray-400 text-sm">
                Frame-by-frame narrative sequences for immersive experiences
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-full h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Data Visualization
              </h3>
              <p className="text-gray-400 text-sm">
                Animated charts and graphs that reveal data on scroll
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
            Implementation with @tuel/scroll
          </h2>
          <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{`import { ScrollFrameAnimation } from '@tuel/scroll';

// Define frame path function
const framePath = (index: number) => {
  return \`/frames/frame_\${index.toString().padStart(4, '0')}.jpg\`;
};

<ScrollFrameAnimation
  frameCount={100}
  framePath={framePath}
  className="h-screen"
  scrollSpeed={1}
  pinContainer={true}
  startTrigger="top top"
  endTrigger="bottom top"
  preloadFrames={true}
  onProgress={(progress) => {
    console.log('Animation progress:', progress);
  }}
>
  {/* Optional overlay content */}
  <div className="absolute inset-0 flex items-center justify-center">
    <h1>Scroll to animate</h1>
  </div>
</ScrollFrameAnimation>`}</code>
          </pre>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-orange-400 mb-4">
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
              Canvas Performance
            </h3>
            <p className="text-gray-400 text-sm">
              Hardware-accelerated canvas rendering for smooth 60fps animations.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-red-400 mb-4">
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
              GSAP ScrollTrigger
            </h3>
            <p className="text-gray-400 text-sm">
              Perfect synchronization between scroll position and frame display.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-pink-400 mb-4">
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
              Preload & Cache
            </h3>
            <p className="text-gray-400 text-sm">
              Automatic frame preloading and intelligent caching for optimal performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}