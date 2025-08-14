"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function OrkenScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Complex transforms for Orken-style animations
  const scaleProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.5, 0.8]
  );
  const rotateProgress = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityProgress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const projects = [
    {
      title: "Cosmic Journey",
      subtitle: "Exploring the infinite canvas",
      description: "A mesmerizing scroll experience through space and time",
      image: "/images/img_1.jpg",
      color: "from-purple-600 to-blue-600",
    },
    {
      title: "Digital Dreams",
      subtitle: "Where imagination meets code",
      description: "Interactive storytelling through scroll-driven narratives",
      image: "/images/img_2.jpg",
      color: "from-blue-600 to-teal-600",
    },
    {
      title: "Neon Nights",
      subtitle: "Cyberpunk aesthetics",
      description: "Futuristic scroll animations with glowing effects",
      image: "/images/img_3.jpg",
      color: "from-pink-600 to-purple-600",
    },
    {
      title: "Nature's Symphony",
      subtitle: "Organic motion design",
      description: "Smooth, natural transitions inspired by nature",
      image: "/images/img_4.jpg",
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">Orken Scroll</h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div ref={containerRef} className="relative">
        {/* Hero Section with Orken Effect */}
        <section className="h-[200vh] relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background with scale effect */}
            <motion.div
              className="absolute inset-0"
              style={{ scale: scaleProgress }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-purple-900 to-pink-900 opacity-50" />
              <Image
                src="/images/img_10.jpg"
                alt="Orken Background"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Rotating Element */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
              style={{ rotate: rotateProgress }}
            >
              <div className="w-full h-full rounded-full border-4 border-cyan-400/30 relative">
                <div className="absolute inset-4 rounded-full border-2 border-purple-400/30" />
                <div className="absolute inset-8 rounded-full border border-pink-400/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.h1
                    className="text-6xl md:text-8xl font-bold"
                    style={{ opacity: opacityProgress }}
                  >
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ORKEN
                    </span>
                  </motion.h1>
                </div>
              </div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </section>

        {/* Projects Grid with Orken Animations */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Orken Projects
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onViewportEnter={() => setActiveSection(index)}
                >
                  {/* Card Container */}
                  <div className="relative h-[500px] rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70 group-hover:opacity-50 transition-opacity duration-500`}
                    />

                    {/* Orken Pattern Overlay */}
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <pattern
                          id={`orken-pattern-${index}`}
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="2"
                            fill="rgba(255,255,255,0.2)"
                          />
                          <line
                            x1="0"
                            y1="10"
                            x2="20"
                            y2="10"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="10"
                            y1="0"
                            x2="10"
                            y2="20"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="0.5"
                          />
                        </pattern>
                        <rect
                          width="100"
                          height="100"
                          fill={`url(#orken-pattern-${index})`}
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-cyan-300 text-sm font-medium mb-2">
                          {project.subtitle}
                        </p>
                        <h3 className="text-4xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-lg mb-6">
                          {project.description}
                        </p>

                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors">
                          Explore Project
                          <svg
                            width="20"
                            height="20"
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
                        </button>
                      </motion.div>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute top-4 right-4 w-20 h-20">
                      <motion.div
                        className="w-full h-full border-2 border-cyan-400/30 rounded-lg"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="py-20 bg-gradient-to-b from-black to-slate-900">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Orken Scroll Techniques
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-cyan-400 text-3xl mb-4">🌀</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Spiral Transforms
                </h3>
                <p className="text-gray-400">
                  Rotating elements that respond to scroll position with smooth
                  interpolation.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-purple-400 text-3xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Particle Systems
                </h3>
                <p className="text-gray-400">
                  Floating elements that create depth and atmosphere throughout
                  the scroll.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-pink-400 text-3xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Pattern Overlays
                </h3>
                <p className="text-gray-400">
                  Geometric patterns that add texture and visual interest to
                  sections.
                </p>
              </motion.div>
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
              <code className="text-sm text-gray-300">{`// Orken-style scroll animations
const scaleProgress = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  [1, 1.5, 0.8]
);

const rotateProgress = useTransform(
  scrollYProgress,
  [0, 1],
  [0, 180]
);

// Apply transforms
<motion.div
  style={{
    scale: scaleProgress,
    rotate: rotateProgress
  }}
>
  {/* Orken content */}
</motion.div>`}</code>
            </pre>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
