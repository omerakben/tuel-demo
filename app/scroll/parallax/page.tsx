"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function ParallaxPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Different parallax speeds for layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/scroll" className="text-white hover:text-blue-400 transition-colors">
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">Parallax Scroll</h1>
          </div>
        </div>
      </header>

      {/* Parallax Section */}
      <div ref={containerRef} className="relative h-[300vh]">
        {/* Background Layer - Slowest */}
        <motion.div
          style={{ y: y1 }}
          className="fixed inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Middle Layer */}
        <motion.div
          style={{ y: y2 }}
          className="fixed inset-0 z-10 flex items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto px-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8"
              >
                <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">Layer {i}</h3>
                <p className="text-gray-400 text-sm">
                  This element moves at medium speed creating depth.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Foreground Layer - Fastest */}
        <motion.div
          style={{ y: y3, opacity }}
          className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white text-center">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Parallax Effect
            </span>
          </h1>
        </motion.div>

        {/* Content Sections */}
        <div className="relative z-30 pt-[100vh]">
          {[1, 2, 3].map((section) => (
            <motion.section
              key={section}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="min-h-screen flex items-center justify-center px-6"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Section {section}
                </h2>
                <p className="text-xl text-gray-300">
                  As you scroll, notice how different layers move at different speeds,
                  creating a sense of depth and immersion.
                </p>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Implementation</h2>
          <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{`import { motion, useScroll, useTransform } from "framer-motion";

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
});

// Different speeds for parallax layers
const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

<motion.div style={{ y: y1 }}>
  {/* Slowest background layer */}
</motion.div>`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}