"use client";

import { WodniackWorkScroll } from "@tuel/scroll";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WodniackPage() {
  const projects = [
    {
      id: 1,
      title: "Digital Experience",
      category: "Web Design",
      year: "2024",
      image: "/images/img_1.jpg",
      description: "Crafting immersive digital experiences that captivate and engage audiences.",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Brand Evolution",
      category: "Branding",
      year: "2024",
      image: "/images/img_2.jpg",
      description: "Transforming brand identities through strategic design and storytelling.",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Motion Graphics",
      category: "Animation",
      year: "2023",
      image: "/images/img_3.jpg",
      description: "Dynamic animations that bring stories to life with fluid motion.",
      color: "from-pink-500 to-red-500",
    },
    {
      id: 4,
      title: "Interactive Design",
      category: "UI/UX",
      year: "2023",
      image: "/images/img_4.jpg",
      description: "User-centered design solutions that prioritize functionality and aesthetics.",
      color: "from-red-500 to-orange-500",
    },
    {
      id: 5,
      title: "Creative Campaign",
      category: "Marketing",
      year: "2023",
      image: "/images/img_5.jpg",
      description: "Innovative marketing campaigns that resonate with target audiences.",
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: 6,
      title: "Visual Identity",
      category: "Design System",
      year: "2023",
      image: "/images/img_6.jpg",
      description: "Comprehensive design systems that ensure brand consistency.",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/scroll"
              className="text-white hover:text-indigo-400 transition-colors"
            >
              ← Back to Scroll Examples
            </Link>
            <h1 className="text-xl font-semibold text-white">
              Wodniack Work Scroll
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio Showcase
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A portfolio-style scroll experience showcasing creative work with
            elegant transitions and animations.
          </p>
        </motion.div>
      </section>

      {/* Work Scroll Section */}
      <WodniackWorkScroll className="min-h-screen">
        <div className="space-y-32 pb-32">
          {projects.map((project, index) => (
            <motion.section
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="container mx-auto px-6"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}>
                {/* Image */}
                <motion.div
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`relative h-[500px] rounded-2xl overflow-hidden group ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`} />
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />
                  
                  {/* Project Number */}
                  <div className="absolute top-8 left-8 z-30">
                    <span className="text-8xl font-bold text-white/10">
                      {String(project.id).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{project.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500">{project.year}</span>
                    </div>
                    <h2 className="text-5xl font-bold text-white">
                      {project.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-4">
                    <button className={`group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${project.color} rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300`}>
                      View Project
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="group-hover:translate-x-1 transition-transform"
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
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {["Design", "Development", "Strategy", "Creative"].slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.section>
          ))}
        </div>
      </WodniackWorkScroll>

      {/* Code Example */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Implementation
            </h2>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { WodniackWorkScroll } from '@tuel/scroll';

<WodniackWorkScroll className="min-h-screen">
  <div className="space-y-32">
    {projects.map((project) => (
      <section key={project.id}>
        {/* Project showcase content */}
      </section>
    ))}
  </div>
</WodniackWorkScroll>`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-indigo-400 mb-4">
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
                Portfolio Ready
              </h3>
              <p className="text-gray-400 text-sm">
                Perfect for showcasing creative work and case studies.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-purple-400 mb-4">
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
                Scroll Triggered
              </h3>
              <p className="text-gray-400 text-sm">
                Animations and effects triggered by scroll position.
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
                Responsive
              </h3>
              <p className="text-gray-400 text-sm">
                Fully responsive design that works on all devices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}