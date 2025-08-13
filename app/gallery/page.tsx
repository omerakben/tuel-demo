"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const galleryExamples = [
  {
    title: "3D Carousel",
    description: "Interactive 3D carousel with depth effects",
    href: "/gallery/carousel",
    gradient: "from-purple-500 to-pink-500",
    image: "/images/img1.jpg"
  },
  {
    title: "Masonry Grid",
    description: "Pinterest-style masonry layout with animations",
    href: "/gallery/masonry",
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/img2.jpg"
  },
  {
    title: "Lightbox Gallery",
    description: "Full-screen lightbox with transitions",
    href: "/gallery/lightbox",
    gradient: "from-green-500 to-emerald-500",
    image: "/images/img3.jpg"
  },
  {
    title: "Infinite Grid",
    description: "Infinite scrolling image grid",
    href: "/gallery/infinite",
    gradient: "from-orange-500 to-red-500",
    image: "/images/img4.jpg"
  },
  {
    title: "Hover Effects",
    description: "Advanced hover animations and effects",
    href: "/gallery/hover",
    gradient: "from-indigo-500 to-purple-500",
    image: "/images/img5.jpg"
  },
  {
    title: "Filter Gallery",
    description: "Filterable gallery with smooth transitions",
    href: "/gallery/filter",
    gradient: "from-pink-500 to-rose-500",
    image: "/images/img6.jpg"
  }
];

export default function GalleryPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-purple-400 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-semibold text-white">@tuel/gallery</h1>
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
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gallery Components
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Beautiful image galleries with interactive effects, 3D transforms, and smooth animations.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryExamples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={example.href}>
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={example.image}
                      alt={example.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${example.gradient} opacity-60 mix-blend-multiply`} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-400">
                      {example.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-purple-400 group-hover:text-pink-400 transition-colors">
                      <span className="mr-2">Explore</span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none"
                        className="transform group-hover:translate-x-2 transition-transform"
                      >
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
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-purple-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v9H5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Responsive</h3>
            <p className="text-gray-400 text-sm">
              Adapts perfectly to all screen sizes
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-8.31c.67 0 1.21.54 1.21 1.21s-.54 1.21-1.21 1.21-1.21-.54-1.21-1.21.54-1.21 1.21-1.21z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performant</h3>
            <p className="text-gray-400 text-sm">
              Optimized for smooth 60fps animations
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Interactive</h3>
            <p className="text-gray-400 text-sm">
              Rich interactions with touch support
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-pink-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Accessible</h3>
            <p className="text-gray-400 text-sm">
              ARIA compliant with keyboard navigation
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}