"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function FirstLastScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring for smooth transitions
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // First-Last specific transforms
  const firstOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);
  const lastOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0, 1, 1]);
  const middleOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const firstScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const lastScale = useTransform(smoothProgress, [0.8, 1], [0.8, 1]);
  
  const rotateFirst = useTransform(smoothProgress, [0, 0.5], [0, -180]);
  const rotateLast = useTransform(smoothProgress, [0.5, 1], [180, 0]);

  const journeySteps = [
    {
      id: "first",
      title: "The Beginning",
      subtitle: "Where every journey starts",
      content: "Every great story has a first chapter. This is where dreams take shape and possibilities become infinite.",
      image: "/images/img_1.jpg",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "exploration",
      title: "Exploration",
      subtitle: "Discovering new horizons",
      content: "The middle of the journey brings unexpected discoveries and transformative experiences.",
      image: "/images/img_2.jpg",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "growth",
      title: "Growth",
      subtitle: "Evolution through experience",
      content: "Each step forward brings new understanding and deeper appreciation of the path.",
      image: "/images/img_3.jpg",
      color: "from-green-600 to-teal-600",
    },
    {
      id: "transformation",
      title: "Transformation",
      subtitle: "Becoming something more",
      content: "The journey changes us, shapes us, and prepares us for what comes next.",
      image: "/images/img_4.jpg",
      color: "from-orange-600 to-red-600",
    },
    {
      id: "last",
      title: "The Destination",
      subtitle: "Every ending is a new beginning",
      content: "The last step of one journey becomes the first step of another. The cycle continues.",
      image: "/images/img_5.jpg",
      color: "from-indigo-600 to-purple-600",
    },
  ];

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-blue-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">First & Last</h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div ref={containerRef} className="relative">
        {/* First Section - The Beginning */}
        <section className="h-screen relative overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: firstOpacity, scale: firstScale }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/img_1.jpg"
                alt="First"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center text-white"
                  style={{ rotate: rotateFirst }}
                >
                  <h1 className="text-8xl md:text-9xl font-bold mb-4">
                    FIRST
                  </h1>
                  <p className="text-2xl text-white/80">The beginning of everything</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Journey Sections */}
        <section className="min-h-[400vh] relative">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="h-screen sticky top-0">
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: 1, // Simple opacity for now, scroll animation can be added later
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-60`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Step Number */}
                      <div className="text-white/30 text-9xl font-bold mb-4">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      
                      <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        {step.title}
                      </h2>
                      <p className="text-xl text-white/80 mb-6">
                        {step.subtitle}
                      </p>
                      <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        {step.content}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Scroll Indicator */}
                {index === 0 && (
                  <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <div className="text-white/60 text-center">
                      <p className="text-sm mb-2">Scroll to continue</p>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mx-auto"
                      >
                        <path
                          d="M12 5L12 19M12 19L5 12M12 19L19 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </section>

        {/* Last Section - The End/New Beginning */}
        <section className="h-screen relative overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: lastOpacity, scale: lastScale }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/img_10.jpg"
                alt="Last"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/40" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center text-white"
                  style={{ rotate: rotateLast }}
                >
                  <h1 className="text-8xl md:text-9xl font-bold mb-4">
                    LAST
                  </h1>
                  <p className="text-2xl text-white/80">Every ending is a new beginning</p>
                  
                  {/* Circular Connection Visual */}
                  <motion.div
                    className="mt-12"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg width="100" height="100" className="mx-auto">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="50"
                        cy="10"
                        r="5"
                        fill="white"
                      />
                      <circle
                        cx="50"
                        cy="90"
                        r="5"
                        fill="white"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Infinite Loop Visualization */}
        <section className="py-20 bg-gradient-to-b from-black to-slate-900">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              The Infinite Cycle
            </motion.h2>

            {/* Circular Progress */}
            <div className="max-w-md mx-auto mb-16">
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Background Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                  />
                  
                  {/* Progress Circle */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="502"
                    style={{
                      strokeDashoffset: useTransform(
                        smoothProgress,
                        [0, 1],
                        [502, 0]
                      ),
                      rotate: -90,
                      transformOrigin: "center",
                    }}
                  />
                  
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  
                  {/* Center Text */}
                  <text
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    <motion.tspan>
                      {useTransform(smoothProgress, (v) => `${Math.round(v * 100)}%`)}
                    </motion.tspan>
                  </text>
                </svg>
              </div>
            </div>

            {/* Philosophy */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-300 mb-8">
                In the grand tapestry of existence, every first leads to a last,
                and every last heralds a new first. The scroll of life is infinite,
                with beginnings and endings woven together in an eternal dance.
              </p>
              
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl text-blue-400 mb-2">α</div>
                  <p className="text-sm text-gray-400">Alpha</p>
                  <p className="text-xs text-gray-500">The First</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-white/20">∞</div>
                  <p className="text-sm text-gray-400">Infinite</p>
                  <p className="text-xs text-gray-500">The Journey</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-purple-400 mb-2">Ω</div>
                  <p className="text-sm text-gray-400">Omega</p>
                  <p className="text-xs text-gray-500">The Last</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Implementation
            </h2>
            <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`// First & Last scroll transitions
const firstOpacity = useTransform(
  scrollProgress, 
  [0, 0.2, 0.8, 1], 
  [1, 1, 0, 0]
);

const lastOpacity = useTransform(
  scrollProgress,
  [0, 0.2, 0.8, 1],
  [0, 0, 1, 1]
);

// Circular progress visualization
<motion.circle
  strokeDashoffset={useTransform(
    scrollProgress,
    [0, 1],
    [502, 0]
  )}
/>`}</code>
            </pre>
          </motion.div>
        </section>
      </div>
    </div>
  );
}