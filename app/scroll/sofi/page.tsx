"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function SofiScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sofi-specific elegant transforms
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.3, 0]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 10]);
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const portfolioItems = [
    {
      title: "Ethereal Dreams",
      category: "Photography",
      image: "/images/img_1.jpg",
      description: "A journey through surreal landscapes",
    },
    {
      title: "Urban Poetry",
      category: "Architecture",
      image: "/images/img_2.jpg",
      description: "The rhythm of city life captured in frames",
    },
    {
      title: "Nature's Symphony",
      category: "Landscape",
      image: "/images/img_3.jpg",
      description: "Where earth meets sky in perfect harmony",
    },
    {
      title: "Silent Moments",
      category: "Portrait",
      image: "/images/img_4.jpg",
      description: "Stories told through quiet contemplation",
    },
    {
      title: "Abstract Reality",
      category: "Conceptual",
      image: "/images/img_5.jpg",
      description: "Blurring lines between real and imagined",
    },
    {
      title: "Golden Hour",
      category: "Nature",
      image: "/images/img_6.jpg",
      description: "Capturing magic in the dying light",
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
              className="text-white hover:text-amber-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">Sofi Scroll</h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div ref={containerRef} className="relative">
        {/* Hero Section with Elegant Parallax */}
        <section className="h-[200vh] relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background Image with Scale Effect */}
            <motion.div 
              className="absolute inset-0"
              style={{ scale: imageScale }}
            >
              <Image
                src="/images/img_10.jpg"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-black"
                style={{ 
                  opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.8])
                }}
              />
            </motion.div>

            {/* Elegant Title */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ y: headerY, opacity: textOpacity }}
            >
              <div className="text-center px-6">
                <motion.h1
                  className="text-8xl md:text-[10rem] font-thin text-white mb-6 tracking-wider"
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.2em" }}
                  transition={{ duration: 2 }}
                >
                  SOFI
                </motion.h1>
                <motion.p
                  className="text-xl text-white/60 tracking-widest uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Elegant · Minimal · Refined
                </motion.p>
              </div>
            </motion.div>

            {/* Mouse Follow Light */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: mousePosition.x - 200,
                top: mousePosition.y - 200,
                width: 400,
                height: 400,
                background: `radial-gradient(circle, rgba(255, 215, 0, 0.1), transparent 70%)`,
                filter: "blur(40px)",
              }}
            />
          </div>
        </section>

        {/* Portfolio Grid with Staggered Reveal */}
        <section className="relative py-20 bg-gradient-to-b from-black to-zinc-900">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-6xl font-thin text-white text-center mb-16 tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              PORTFOLIO
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-[500px] overflow-hidden bg-zinc-800">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    
                    {/* Elegant Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Category Label */}
                    <div className="absolute top-6 left-6">
                      <span className="text-xs text-white/60 tracking-[0.3em] uppercase">
                        {item.category}
                      </span>
                    </div>

                    {/* Content on Hover */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700"
                    >
                      <h3 className="text-3xl font-light text-white mb-2 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-white/70 font-light">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Minimalist Frame */}
                  <div className="absolute -inset-px border border-white/10 group-hover:border-amber-500/30 transition-colors duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="py-32 bg-zinc-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="space-y-12"
              >
                <p className="text-5xl font-thin text-white/90 leading-tight tracking-wide">
                  "Minimalism is not a lack of something.
                  <br />
                  <span className="text-amber-400">It's simply the perfect amount</span>
                  <br />
                  of something."
                </p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <p className="text-lg text-white/60 font-light tracking-wide leading-relaxed">
                  In the world of design, elegance speaks through silence. Every element 
                  carefully considered, every space deliberately crafted. This is where 
                  sophistication meets simplicity, where less becomes infinitely more.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: "◈", label: "Minimal" },
                { icon: "◆", label: "Elegant" },
                { icon: "◉", label: "Refined" },
                { icon: "◊", label: "Timeless" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl text-amber-400 mb-4">{feature.icon}</div>
                  <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-none p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-light text-white mb-4 tracking-wider">
              Implementation
            </h2>
            <pre className="bg-black/50 p-4 overflow-x-auto">
              <code className="text-sm text-gray-400">{`// Sofi elegant scroll effects
const imageScale = useTransform(
  scrollYProgress, 
  [0, 0.5, 1], 
  [1, 1.2, 1.5]
);

const textOpacity = useTransform(
  scrollYProgress,
  [0, 0.3, 0.7, 1],
  [1, 0.8, 0.3, 0]
);

// Minimalist portfolio grid
<motion.div
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96]
  }}
/>`}</code>
            </pre>
          </motion.div>
        </section>
      </div>
    </div>
  );
}