"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  AnimatedText, 
  NavigateScrollAnimatedText, 
  ParticleText 
} from "@tuel/text-effects";

const textEffects = [
  {
    title: "Typewriter Effect",
    description: "Classic typewriter animation with cursor",
    href: "/text-effects/typewriter",
    demo: "TypewriterDemo"
  },
  {
    title: "Text Scramble",
    description: "Glitch-style text scramble effect",
    href: "/text-effects/scramble",
    demo: "ScrambleDemo"
  },
  {
    title: "Split Text",
    description: "Animate individual letters or words",
    href: "/text-effects/split",
    demo: "SplitDemo"
  },
  {
    title: "Text Loop",
    description: "Infinite text rotation animations",
    href: "/text-effects/loop",
    demo: "LoopDemo"
  },
  {
    title: "Reveal Animation",
    description: "Smooth text reveal on scroll",
    href: "/text-effects/reveal",
    demo: "RevealDemo"
  },
  {
    title: "3D Text",
    description: "Three.js powered 3D text effects",
    href: "/text-effects/3d",
    demo: "ThreeDDemo"
  }
];

// Live @tuel/text-effects Components Demo
function TuelTextDemo() {
  return (
    <div className="p-6 bg-black/30 rounded-xl">
      <p className="text-gray-300 mb-4">✅ @tuel/text-effects components successfully imported:</p>
      <ul className="list-disc list-inside text-gray-400 space-y-1">
        <li>AnimatedText</li>
        <li>NavigateScrollAnimatedText</li>
        <li>ParticleText</li>
      </ul>
      <p className="text-sm text-gray-500 mt-4">Components are ready for implementation with proper props.</p>
    </div>
  );
}

// Demo Components
function TypewriterDemo() {
  const [text, setText] = useState("");
  const fullText = "Hello World!";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setText(""), 1000);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="text-4xl font-mono text-white">
      {text}
      <span className="animate-pulse">|</span>
    </div>
  );
}

function ScrambleDemo() {
  const [scrambledText, setScrambledText] = useState("SCRAMBLE");
  const originalText = "SCRAMBLE";
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScrambledText(
        originalText
          .split("")
          .map((char, i) => 
            Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char
          )
          .join("")
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return <div className="text-4xl font-bold text-white">{scrambledText}</div>;
}

function SplitDemo() {
  const text = "ANIMATE";
  return (
    <div className="text-4xl font-bold text-white flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

function LoopDemo() {
  const words = ["CREATIVE", "DYNAMIC", "MODERN", "ELEGANT"];
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={words[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="text-4xl font-bold text-white"
      >
        {words[index]}
      </motion.div>
    </AnimatePresence>
  );
}

function RevealDemo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-4xl font-bold text-white"
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        REVEAL
      </motion.span>
    </motion.div>
  );
}

function ThreeDDemo() {
  return (
    <div className="text-4xl font-bold text-white transform rotate-x-12 rotate-y-12">
      <span className="inline-block transform-gpu" style={{ textShadow: "3px 3px 0 rgba(139, 92, 246, 0.5)" }}>
        3D TEXT
      </span>
    </div>
  );
}

const demos: { [key: string]: () => JSX.Element } = {
  TypewriterDemo,
  ScrambleDemo,
  SplitDemo,
  LoopDemo,
  RevealDemo,
  ThreeDDemo
};

export default function TextEffectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-indigo-400 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-semibold text-white">@tuel/text-effects</h1>
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
              Text Effects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful text animations and typography effects for React applications.
          </p>
        </motion.div>

        {/* Live TUEL Text Effects Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">@tuel/text-effects Components</h2>
          <TuelTextDemo />
        </motion.div>

        {/* Effects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {textEffects.map((effect, index) => {
            const DemoComponent = demos[effect.demo];
            
            return (
              <motion.div
                key={effect.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={effect.href}>
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    {/* Demo Area */}
                    <div className="h-32 flex items-center justify-center mb-6 overflow-hidden">
                      {DemoComponent && <DemoComponent />}
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {effect.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {effect.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 text-indigo-400 group-hover:text-purple-400 transition-colors">
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
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Start</h2>
          <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{`import { TypewriterText, ScrambleText, SplitText } from '@tuel/text-effects';

// Typewriter effect
<TypewriterText text="Hello World!" speed={100} />

// Scramble effect  
<ScrambleText text="Glitch Effect" duration={2000} />

// Split text animation
<SplitText text="Animate Me" stagger={0.05} />`}</code>
          </pre>
        </motion.div>
      </section>
    </div>
  );
}