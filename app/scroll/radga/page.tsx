"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RadgaScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Radga-specific transforms with spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scrollSpring = useSpring(scrollYProgress, springConfig);

  const waveY = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const waveScale = useTransform(scrollSpring, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const colorShift = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#06b6d4", "#8b5cf6", "#ec4899"]
  );

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sections = [
    {
      title: "Fluid Dynamics",
      content: "Experience the flow of liquid motion through scroll",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Wave Patterns",
      content: "Organic wave animations that respond to interaction",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Color Symphony",
      content: "Dynamic color transitions synchronized with movement",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Elastic Motion",
      content: "Spring-based physics for natural animations",
      gradient: "from-pink-500 to-red-500",
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
              className="text-white hover:text-purple-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">Radga Scroll</h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div ref={containerRef} className="relative">
        {/* Hero Section with Radga Wave Effect */}
        <section className="h-[150vh] relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Dynamic Background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3), transparent 50%)`,
              }}
            />

            {/* Wave SVG Animation */}
            <div className="absolute inset-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 1440 800"
                preserveAspectRatio="none"
              >
                <motion.path
                  d={`M0,400 Q360,${
                    300 + Math.sin(Date.now() / 1000) * 50
                  } 720,400 T1440,400 L1440,800 L0,800 Z`}
                  fill="url(#radga-gradient)"
                  style={{ y: waveY }}
                  animate={{
                    d: [
                      "M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z",
                      "M0,400 Q360,500 720,400 T1440,400 L1440,800 L0,800 Z",
                      "M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <defs>
                  <linearGradient
                    id="radga-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <motion.stop
                      offset="0%"
                      style={{ stopColor: colorShift }}
                    />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Title with Liquid Effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ scale: waveScale }}
            >
              <div className="text-center">
                <motion.h1
                  className="text-7xl md:text-9xl font-bold mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <span
                    className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))",
                    }}
                  >
                    RADGA
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-white/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Fluid scroll animations with wave dynamics
                </motion.p>
              </div>
            </motion.div>

            {/* Floating Orbs */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  background: `radial-gradient(circle, rgba(${
                    100 + i * 30
                  }, 92, 246, 0.4), transparent)`,
                  filter: "blur(40px)",
                }}
                animate={{
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </section>

        {/* Interactive Sections */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="mb-32"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Section with alternating layout */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <motion.div
                    className={index % 2 === 1 ? "lg:order-2" : ""}
                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-5xl font-bold text-white mb-4">
                      <span
                        className={`bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
                      >
                        {section.title}
                      </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                      {section.content}
                    </p>

                    {/* Interactive Element */}
                    <div className="relative h-64 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at ${
                            mousePosition.x / 10
                          }% ${
                            mousePosition.y / 10
                          }%, rgba(139, 92, 246, 0.2), transparent)`,
                        }}
                      />

                      {/* Wave Pattern */}
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        {[...Array(5)].map((_, i) => (
                          <motion.circle
                            key={i}
                            cx={200}
                            cy={100}
                            r={20 + i * 20}
                            fill="none"
                            stroke="rgba(139, 92, 246, 0.3)"
                            strokeWidth="1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: [0, 1, 0] }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </svg>
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    className={`relative h-[500px] rounded-2xl overflow-hidden ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                    initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={`/images/img_${index + 1}.jpg`}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-40`}
                    />

                    {/* Animated Overlay */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-32 h-32 border-2 border-white/30 rounded-full flex items-center justify-center"
                        >
                          <div className="w-20 h-20 border border-white/20 rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gradient-to-b from-black to-slate-900">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Radga Features
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: "💧",
                  title: "Fluid Motion",
                  desc: "Liquid-like animations",
                },
                {
                  icon: "🌊",
                  title: "Wave Physics",
                  desc: "Natural wave patterns",
                },
                { icon: "🎨", title: "Color Flow", desc: "Dynamic gradients" },
                {
                  icon: "✨",
                  title: "Interactive",
                  desc: "Mouse-responsive effects",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
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
              <code className="text-sm text-gray-300">{`// Radga wave animations with spring physics
const springConfig = {
  stiffness: 100,
  damping: 30
};

const scrollSpring = useSpring(
  scrollYProgress,
  springConfig
);

// Dynamic color transitions
const colorShift = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ["#06b6d4", "#8b5cf6", "#ec4899"]
);

// Mouse-responsive gradients
style={{
  background: \`radial-gradient(
    circle at \${mouseX}px \${mouseY}px,
    rgba(139, 92, 246, 0.3),
    transparent
  )\`
}}`}</code>
            </pre>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
