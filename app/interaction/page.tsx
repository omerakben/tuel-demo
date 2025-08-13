"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  useMouseTracking, 
  useImageTrail, 
  CursorFollower as TuelCursorFollower,
  useCursorFollower 
} from "@tuel/interaction";

// Magnetic Button Component
function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`px-8 py-4 rounded-xl font-semibold text-white transition-colors ${
        isHovered ? "bg-purple-600" : "bg-purple-500"
      }`}
    >
      Magnetic Button
    </motion.button>
  );
}

// TUEL Interaction Components Demo
function TuelInteractionDemo() {
  return (
    <div className="p-6 bg-black/30 rounded-xl">
      <p className="text-gray-300 mb-4">✅ @tuel/interaction components successfully imported:</p>
      <ul className="list-disc list-inside text-gray-400 space-y-1">
        <li>useMouseTracking (hook)</li>
        <li>useImageTrail (hook)</li>
        <li>CursorFollower</li>
        <li>useCursorFollower (hook)</li>
      </ul>
      <p className="text-sm text-gray-500 mt-4">Components and hooks are ready for implementation.</p>
    </div>
  );
}

// Cursor Follower Component
function CursorFollower() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-8 h-8 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
}

// Draggable Card Component
function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1 }}
      className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold cursor-grab active:cursor-grabbing"
    >
      Drag Me!
    </motion.div>
  );
}

const interactionExamples = [
  {
    title: "Magnetic Hover",
    description: "Elements that follow cursor movement",
    href: "/interaction/magnetic",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Cursor Effects",
    description: "Custom cursor animations and trails",
    href: "/interaction/cursor",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Drag & Drop",
    description: "Smooth drag and drop interactions",
    href: "/interaction/drag",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Gesture Controls",
    description: "Touch and gesture recognition",
    href: "/interaction/gestures",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Hover Distortion",
    description: "Image distortion on hover",
    href: "/interaction/distortion",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Interactive Particles",
    description: "Particles that react to user input",
    href: "/interaction/particles",
    gradient: "from-pink-500 to-rose-500"
  }
];

export default function InteractionPage() {
  const [showCursor, setShowCursor] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {showCursor && <CursorFollower />}
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-purple-400 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-semibold text-white">@tuel/interaction</h1>
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
              Interactive Elements
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create engaging user interactions with magnetic effects, gestures, and dynamic responses.
          </p>
        </motion.div>

        {/* Live TUEL Interaction Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">@tuel/interaction Components</h2>
          <TuelInteractionDemo />
        </motion.div>

        {/* Interactive Demo Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Try These Interactions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Magnetic Button Demo */}
            <div className="text-center">
              <h3 className="text-white mb-4">Magnetic Effect</h3>
              <div className="flex justify-center">
                <MagneticButton />
              </div>
            </div>

            {/* Draggable Card Demo */}
            <div className="text-center">
              <h3 className="text-white mb-4">Drag & Drop</h3>
              <div className="flex justify-center">
                <DraggableCard />
              </div>
            </div>

            {/* Cursor Toggle */}
            <div className="text-center">
              <h3 className="text-white mb-4">Custom Cursor</h3>
              <button
                onClick={() => setShowCursor(!showCursor)}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                {showCursor ? "Hide" : "Show"} Cursor
              </button>
            </div>
          </div>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interactionExamples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Link href={example.href}>
                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 group-hover:rotate-12 transition-transform" />
                    
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {example.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 text-purple-400 group-hover:text-pink-400 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Example Code</h2>
          <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{`import { MagneticElement, CursorFollower, DraggableItem } from '@tuel/interaction';

// Magnetic hover effect
<MagneticElement strength={0.3}>
  <button>Hover Me</button>
</MagneticElement>

// Custom cursor
<CursorFollower color="purple" size={32} />

// Draggable element
<DraggableItem constraints={{ left: -100, right: 100 }}>
  <div>Drag me around!</div>
</DraggableItem>`}</code>
          </pre>
        </motion.div>
      </section>
    </div>
  );
}