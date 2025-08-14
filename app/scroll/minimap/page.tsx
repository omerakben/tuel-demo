"use client";

import { ScrollMinimap } from "@/components/scroll/ScrollMinimap";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ScrollMinimapPage() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Hero", color: "#3B82F6" },
    { id: "about", label: "About", color: "#10B981" },
    { id: "features", label: "Features", color: "#F59E0B" },
    { id: "gallery", label: "Gallery", color: "#EF4444" },
    { id: "testimonials", label: "Testimonials", color: "#8B5CF6" },
    { id: "pricing", label: "Pricing", color: "#EC4899" },
    { id: "contact", label: "Contact", color: "#14B8A6" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-green-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">Scroll Minimap</h1>
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
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Scroll Minimap
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visual navigation indicator showing current scroll position and
            section navigation with smooth scrolling.
          </p>
        </motion.div>

        {/* Main Demo */}
        <div className="relative mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Interactive Demo
          </h2>

          <div className="relative">
            {/* Main Content Area */}
            <div
              id="minimap-container"
              className="h-[600px] overflow-y-auto rounded-xl bg-black/20 border border-white/10"
            >
              <div className="space-y-2 p-8">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="min-h-[500px] scroll-mt-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full rounded-xl p-8 flex flex-col justify-between"
                      style={{
                        background: `linear-gradient(135deg, ${section.color}20, ${section.color}10)`,
                        borderLeft: `4px solid ${section.color}`,
                      }}
                    >
                      <div>
                        <h2 className="text-4xl font-bold text-white mb-4">
                          {section.label}
                        </h2>
                        <p className="text-gray-300 text-lg mb-6">
                          This is the {section.label.toLowerCase()} section. The
                          minimap on the right shows your current position and
                          allows quick navigation.
                        </p>
                      </div>

                      {/* Section specific content */}
                      {section.id === "gallery" && (
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="relative h-32 rounded-lg overflow-hidden"
                            >
                              <Image
                                src={`/images/img_${i}.jpg`}
                                alt={`Gallery ${i}`}
                                width={200}
                                height={150}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === "features" && (
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="text-white font-semibold mb-2">
                              Smooth Scrolling
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Click on minimap sections for smooth navigation
                            </p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="text-white font-semibold mb-2">
                              Progress Indicator
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Visual feedback of current scroll position
                            </p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="text-white font-semibold mb-2">
                              Custom Styling
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Fully customizable colors and appearance
                            </p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="text-white font-semibold mb-2">
                              Responsive
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Works on all screen sizes
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-auto pt-8">
                        <div className="text-6xl font-bold text-white/10">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </motion.div>
                  </section>
                ))}
              </div>
            </div>
          </div>
          
          {/* Minimap - positioned absolutely */}
          <ScrollMinimap
            sections={sections}
            position="right"
            width={120}
            height={400}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            trackColor="rgba(255, 255, 255, 0.1)"
            thumbColor="rgba(16, 185, 129, 0.6)"
            activeColor="#10B981"
            showLabels={true}
            autoHide={false}
          />
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
            <code className="text-sm text-gray-300">{`import { ScrollMinimap } from '@tuel/scroll';

const sections = [
  { id: 'hero', label: 'Hero', color: '#3B82F6' },
  { id: 'about', label: 'About', color: '#10B981' },
  { id: 'features', label: 'Features', color: '#F59E0B' },
];

<ScrollMinimap
  sections={sections}
  containerSelector="#scroll-container"
  className="fixed right-4 top-20"
  activeClassName="bg-blue-500"
  onSectionClick={(id) => console.log('Clicked:', id)}
/>`}</code>
          </pre>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
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
              Visual Navigation
            </h3>
            <p className="text-gray-400 text-sm">
              Clear visual representation of page sections and current position.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-emerald-400 mb-4">
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
              Smooth Scrolling
            </h3>
            <p className="text-gray-400 text-sm">
              Click to navigate with smooth scroll animations between sections.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-teal-400 mb-4">
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
              Progress Tracking
            </h3>
            <p className="text-gray-400 text-sm">
              Real-time indication of scroll progress through the document.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
