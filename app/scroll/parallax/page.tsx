"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ParallaxPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Different parallax speeds for layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.8, 0.3, 0]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-50%", "-100%"]
  );

  const cards = [
    {
      title: "Echoes of Silence",
      description: "Exploring the depth of visual storytelling through layers",
      image: "/images/img_1.jpg",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "Floral Circuit",
      description: "Nature meets technology in perfect harmony",
      image: "/images/img_2.jpg",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Synthetic Horizon",
      description: "Where artificial landscapes blur reality",
      image: "/images/img_3.jpg",
      gradient: "from-pink-600 to-red-600",
    },
    {
      title: "Portal Sequence",
      description: "Journey through dimensional parallax shifts",
      image: "/images/img_4.jpg",
      gradient: "from-red-600 to-orange-600",
    },
    {
      title: "Projected Memory",
      description: "Memories layered in time and space",
      image: "/images/img_5.jpg",
      gradient: "from-orange-600 to-yellow-600",
    },
    {
      title: "Fractured Self",
      description: "Multiple perspectives converging into one",
      image: "/images/img_6.jpg",
      gradient: "from-green-600 to-teal-600",
    },
  ];

  return (
    <div className="bg-black overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-blue-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">
              Advanced Parallax
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Parallax Section */}
      <div ref={containerRef} className="relative">
        {/* Fixed Background Layer - Mountains/Landscape */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
            <Image
              src="/images/img_10.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </motion.div>

          {/* Floating Elements Layer */}
          <motion.div style={{ y: y2 }} className="absolute inset-0 z-10">
            <div className="relative h-full w-full">
              {/* Floating Cards */}
              <motion.div
                style={{ rotate }}
                className="absolute top-20 left-10 w-64 h-64"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/img_7.jpg"
                    alt="Floating 1"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                style={{ rotate: useTransform(rotate, (r) => -r) }}
                className="absolute top-40 right-20 w-48 h-48"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/img_8.jpg"
                    alt="Floating 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                style={{ y: y4 }}
                className="absolute bottom-20 left-1/4 w-56 h-56"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/img_9.jpg"
                    alt="Floating 3"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Overlay Layer */}
          <motion.div
            style={{ y: textY, opacity }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center px-6">
              <motion.h1
                className="text-7xl md:text-9xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PARALLAX
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Experience multi-layered scrolling with stunning visual depth
              </motion.p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-white/60 text-center">
              <p className="text-sm mb-2">Scroll to explore</p>
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
        </div>

        {/* Scrollable Content Sections */}
        <div className="relative z-40 bg-black">
          {/* Gallery Section */}
          <section className="min-h-screen py-20">
            <div className="container mx-auto px-6">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-white text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Layered Gallery
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-96 rounded-2xl overflow-hidden">
                      {/* Image with parallax effect on hover */}
                      <div className="absolute inset-0">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <h3 className="text-3xl font-bold text-white mb-2 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                          {card.title}
                        </h3>
                        <p className="text-white/80 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Split Screen Parallax Section */}
          <section className="min-h-screen relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
              {/* Left Side - Text */}
              <motion.div
                className="flex items-center justify-center p-12 bg-gradient-to-br from-slate-900 to-black"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="max-w-lg">
                  <h2 className="text-5xl font-bold text-white mb-6">
                    Depth Through Motion
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Parallax scrolling creates an illusion of depth by moving
                    background images slower than foreground images. This
                    technique adds a dynamic, three-dimensional feel to web
                    pages.
                  </p>
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                className="relative h-full min-h-[600px] overflow-hidden"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    y: useTransform(
                      scrollYProgress,
                      [0.3, 0.7],
                      ["0%", "-20%"]
                    ),
                  }}
                >
                  <Image
                    src="/images/img_1.jpg"
                    alt="Parallax Example"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gradient-to-b from-black to-slate-900">
            <div className="container mx-auto px-6">
              <motion.h2
                className="text-5xl font-bold text-white text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Parallax Features
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Multi-Layer",
                    description: "Multiple layers moving at different speeds",
                    icon: "🎭",
                  },
                  {
                    title: "Smooth Motion",
                    description: "60fps animations with easing functions",
                    icon: "✨",
                  },
                  {
                    title: "Responsive",
                    description: "Works seamlessly on all devices",
                    icon: "📱",
                  },
                  {
                    title: "Performance",
                    description: "GPU-accelerated transforms",
                    icon: "⚡",
                  },
                  {
                    title: "Interactive",
                    description: "Responds to user scroll and hover",
                    icon: "🎯",
                  },
                  {
                    title: "Customizable",
                    description: "Easily adjust speed and direction",
                    icon: "🎨",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
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
                <code className="text-sm text-gray-300">{`import { motion, useScroll, useTransform } from "framer-motion";

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
});

// Create multiple parallax layers
const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
const middleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

// Apply to layers
<motion.div style={{ y: backgroundY, scale }}>
  {/* Background content */}
</motion.div>`}</code>
              </pre>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
