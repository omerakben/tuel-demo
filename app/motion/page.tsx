"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createMotionVariants } from "@tuel/motion";

const motionExamples = [
  {
    title: "Spring Animations",
    description: "Physics-based spring animations",
    demo: "spring"
  },
  {
    title: "Stagger Children",
    description: "Sequenced animations for lists",
    demo: "stagger"
  },
  {
    title: "Morph Transitions",
    description: "Smooth shape morphing effects",
    demo: "morph"
  },
  {
    title: "Timeline Control",
    description: "Orchestrated animation sequences",
    demo: "timeline"
  },
  {
    title: "Gesture Response",
    description: "Animations triggered by gestures",
    demo: "gesture"
  },
  {
    title: "Path Animation",
    description: "SVG path following animations",
    demo: "path"
  }
];

// TUEL Motion Components Demo
function TuelMotionDemo() {
  const [selectedVariant, setSelectedVariant] = useState<keyof typeof createMotionVariants>('fadeIn');

  return (
    <div className="space-y-8">
      {/* Motion Variants Demo */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">TUEL Motion Variants</h3>
        <div className="flex gap-2 mb-4">
          {Object.keys(createMotionVariants).map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant as keyof typeof createMotionVariants)}
              className={`px-3 py-1 rounded ${
                selectedVariant === variant 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-gray-300'
              }`}
            >
              {variant}
            </button>
          ))}
        </div>
        <motion.div
          key={selectedVariant}
          initial="hidden"
          animate="visible"
          variants={createMotionVariants[selectedVariant]}
          className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto"
        />
      </div>

      {/* Combined Animations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Combined Animations</h3>
        <div className="flex gap-4 justify-center">
          {['fadeIn', 'slideUp', 'scaleIn'].map((variant, index) => (
            <motion.div
              key={variant}
              initial="hidden"
              animate="visible"
              variants={createMotionVariants[variant as keyof typeof createMotionVariants]}
              transition={{ delay: index * 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Demo Components
function SpringDemo() {
  const [isAnimated, setIsAnimated] = useState(false);
  
  return (
    <motion.div
      animate={{
        scale: isAnimated ? 1.5 : 1,
        rotate: isAnimated ? 180 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      onClick={() => setIsAnimated(!isAnimated)}
      className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl cursor-pointer"
    />
  );
}

function StaggerDemo() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex gap-2"
    >
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          variants={item}
          className="w-4 h-16 bg-gradient-to-t from-blue-500 to-cyan-500 rounded"
        />
      ))}
    </motion.div>
  );
}

function MorphDemo() {
  const [isCircle, setIsCircle] = useState(true);
  
  return (
    <motion.div
      animate={{
        borderRadius: isCircle ? "50%" : "10%",
      }}
      transition={{ duration: 0.5 }}
      onClick={() => setIsCircle(!isCircle)}
      className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 cursor-pointer"
    />
  );
}

function TimelineDemo() {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      x: [0, 50, 50, 0, 0],
      y: [0, 0, 50, 50, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  }, []);

  return (
    <motion.div
      animate={controls}
      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg"
    />
  );
}

function GestureDemo() {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl cursor-pointer"
    />
  );
}

function PathDemo() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <motion.path
        d="M 10,60 Q 60,10 110,60 T 10,60"
        stroke="url(#gradient)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const demos: { [key: string]: () => JSX.Element } = {
  spring: SpringDemo,
  stagger: StaggerDemo,
  morph: MorphDemo,
  timeline: TimelineDemo,
  gesture: GestureDemo,
  path: PathDemo
};

export default function MotionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-indigo-400 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-semibold text-white">@tuel/motion</h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Motion Primitives
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Core animation utilities and primitives for building complex motion experiences.
          </p>
        </motion.div>

        {/* Live TUEL Motion Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">@tuel/motion Components</h2>
          <TuelMotionDemo />
        </motion.div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {motionExamples.map((example, index) => {
            const DemoComponent = demos[example.demo];
            
            return (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {example.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {example.description}
                </p>
                
                <div className="h-32 flex items-center justify-center">
                  {DemoComponent && <DemoComponent />}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Spring Physics</h2>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { motion } from '@tuel/motion';

<motion.div
  animate={{ scale: 1.5, rotate: 180 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
/>`}</code>
            </pre>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Orchestrated Animations</h2>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { useAnimation } from '@tuel/motion';

const controls = useAnimation();

// Sequence multiple animations
await controls.start({ x: 100 });
await controls.start({ y: 100 });
await controls.start({ scale: 2 });`}</code>
            </pre>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-indigo-400 mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">60fps</h3>
            <p className="text-gray-400 text-sm">
              Hardware-accelerated animations
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-purple-400 mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">Declarative</h3>
            <p className="text-gray-400 text-sm">
              Simple, declarative API
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-pink-400 mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Flexible</h3>
            <p className="text-gray-400 text-sm">
              Compose complex animations
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">📱</div>
            <h3 className="text-lg font-semibold text-white mb-2">Responsive</h3>
            <p className="text-gray-400 text-sm">
              Touch and gesture support
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}