"use client";

import { createMotionVariants } from "@tuel/motion";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const motionExamples = [
  {
    title: "Spring Animations",
    description: "Physics-based spring animations",
    demo: "spring",
  },
  {
    title: "Stagger Children",
    description: "Sequenced animations for lists",
    demo: "stagger",
  },
  {
    title: "Morph Transitions",
    description: "Smooth shape morphing effects",
    demo: "morph",
  },
  {
    title: "Timeline Control",
    description: "Orchestrated animation sequences",
    demo: "timeline",
  },
  {
    title: "Gesture Response",
    description: "Animations triggered by gestures",
    demo: "gesture",
  },
  {
    title: "Path Animation",
    description: "SVG path following animations",
    demo: "path",
  },
  {
    title: "Animated Values",
    description: "Number and value interpolation",
    demo: "values",
  },
  {
    title: "Parallax Effects",
    description: "Layered motion with scroll",
    demo: "parallax",
  },
  {
    title: "Drag & Drop",
    description: "Interactive drag animations",
    demo: "drag",
  },
];

// Enhanced TUEL Motion Components Demo
function TuelMotionDemo() {
  const [selectedVariant, setSelectedVariant] =
    useState<keyof typeof createMotionVariants>("fadeIn");
  const [animationKey, setAnimationKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVariantChange = (variant: keyof typeof createMotionVariants) => {
    setSelectedVariant(variant);
    setAnimationKey((prev) => prev + 1); // Force re-render to replay animation
    setIsPlaying(true);
  };

  return (
    <div className="space-y-8">
      {/* Motion Variants Demo */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          TUEL Motion Variants
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(createMotionVariants).map((variant) => (
            <button
              key={variant}
              onClick={() =>
                handleVariantChange(
                  variant as keyof typeof createMotionVariants
                )
              }
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedVariant === variant
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {variant}
            </button>
          ))}
        </div>

        <div className="relative h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedVariant}-${animationKey}`}
              initial="hidden"
              animate={isPlaying ? "visible" : "hidden"}
              exit="hidden"
              variants={createMotionVariants[selectedVariant]}
              transition={{ duration: 0.6 }}
              className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg"
            />
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setAnimationKey((prev) => prev + 1)}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Replay Animation
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            {isPlaying ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Combined Animations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Combined Animations
        </h3>
        <div className="flex gap-4 justify-center">
          {["fadeIn", "slideUp", "scaleIn"].map((variant, index) => (
            <motion.div
              key={`${variant}-${animationKey}`}
              initial="hidden"
              animate="visible"
              variants={
                createMotionVariants[
                  variant as keyof typeof createMotionVariants
                ]
              }
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Demo Components with Interactive Controls
function SpringDemo() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(20);

  return (
    <div className="space-y-4">
      <motion.div
        animate={{
          scale: isAnimated ? 1.5 : 1,
          rotate: isAnimated ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: stiffness,
          damping: damping,
        }}
        onClick={() => setIsAnimated(!isAnimated)}
        className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl cursor-pointer mx-auto shadow-lg"
      />

      {/* Controls */}
      <div className="space-y-2 text-xs">
        <div>
          <label className="text-gray-400">Stiffness: {stiffness}</label>
          <input
            type="range"
            min="50"
            max="500"
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="text-gray-400">Damping: {damping}</label>
          <input
            type="range"
            min="5"
            max="50"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

function StaggerDemo() {
  const [key, setKey] = useState(0);
  const [staggerDelay, setStaggerDelay] = useState(0.1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-4">
      <motion.div
        key={key}
        variants={container}
        initial="hidden"
        animate="show"
        className="flex gap-2 justify-center"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            variants={item}
            className="w-3 h-16 bg-gradient-to-t from-blue-500 to-cyan-500 rounded"
          />
        ))}
      </motion.div>

      <div className="space-y-2 text-xs">
        <button
          onClick={() => setKey(key + 1)}
          className="w-full px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
        >
          Replay
        </button>
        <div>
          <label className="text-gray-400">Stagger: {staggerDelay}s</label>
          <input
            type="range"
            min="0.05"
            max="0.3"
            step="0.05"
            value={staggerDelay}
            onChange={(e) => setStaggerDelay(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

function MorphDemo() {
  const [shape, setShape] = useState(0);
  const shapes = [
    { borderRadius: "50%", rotate: 0 },
    { borderRadius: "10%", rotate: 45 },
    { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", rotate: 90 },
    { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", rotate: 135 },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        animate={shapes[shape]}
        transition={{ duration: 0.5, type: "spring" }}
        onClick={() => setShape((shape + 1) % shapes.length)}
        className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 cursor-pointer mx-auto shadow-lg"
      />
      <p className="text-xs text-gray-400 text-center">Click to morph</p>
    </div>
  );
}

function TimelineDemo() {
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      controls.start({
        x: [0, 50, 50, 0, 0],
        y: [0, 0, 50, 50, 0],
        backgroundColor: [
          "#EF4444",
          "#F59E0B",
          "#10B981",
          "#3B82F6",
          "#EF4444",
        ],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    } else {
      controls.stop();
    }
  }, [isPlaying, controls]);

  return (
    <div className="space-y-4">
      <div className="relative w-32 h-32 mx-auto">
        <motion.div
          animate={controls}
          className="absolute w-16 h-16 rounded-lg shadow-lg"
        />
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full px-2 py-1 bg-white/10 text-white rounded text-xs hover:bg-white/20 transition-colors"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

function GestureDemo() {
  const [scale, setScale] = useState(1);

  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        onHoverStart={() => setScale(1.2)}
        onHoverEnd={() => setScale(1)}
        className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl cursor-pointer mx-auto shadow-lg"
      />
      <p className="text-xs text-gray-400 text-center">
        Hover & Click
        <br />
        Scale: {scale.toFixed(2)}
      </p>
    </div>
  );
}

function PathDemo() {
  const [pathLength, setPathLength] = useState(1);

  return (
    <div className="space-y-4">
      <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
        <motion.path
          d="M 10,60 Q 60,10 110,60 T 10,60"
          stroke="url(#gradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathLength }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-xs">
        <label className="text-gray-400">
          Path Length: {pathLength.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={pathLength}
          onChange={(e) => setPathLength(Number(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

// New demo components
function AnimatedValuesDemo() {
  const [value, setValue] = useState(0);
  const displayValue = useSpring(value, { stiffness: 100, damping: 30 });
  const transform = useTransform(displayValue, (val) => Math.round(val));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = transform.on("change", (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [transform]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-white">{display}</div>
        <p className="text-xs text-gray-400 mt-2">Animated Number</p>
      </div>
      <button
        onClick={() => setValue(Math.random() * 100)}
        className="w-full px-2 py-1 bg-white/10 text-white rounded text-xs hover:bg-white/20 transition-colors"
      >
        Random Value
      </button>
    </div>
  );
}

function ParallaxDemo() {
  const scrollY = useMotionValue(0);
  const y1 = useTransform(scrollY, [0, 100], [0, -20]);
  const y2 = useTransform(scrollY, [0, 100], [0, -40]);
  const y3 = useTransform(scrollY, [0, 100], [0, -60]);

  return (
    <div
      className="relative h-32 overflow-hidden"
      onWheel={(e) => scrollY.set(scrollY.get() + e.deltaY * 0.5)}
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent rounded-lg"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-lg"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-gradient-to-t from-green-500/30 to-transparent rounded-lg"
      />
      <p className="absolute bottom-2 left-0 right-0 text-xs text-gray-400 text-center">
        Scroll to see parallax
      </p>
    </div>
  );
}

function DragDemo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="relative h-32">
      <motion.div
        drag
        dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
        dragElastic={0.2}
        onDragEnd={(e, info) =>
          setPosition({ x: info.offset.x, y: info.offset.y })
        }
        whileDrag={{ scale: 1.1 }}
        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg cursor-move mx-auto shadow-lg"
      />
      <p className="text-xs text-gray-400 text-center mt-2">
        Drag me! ({position.x.toFixed(0)}, {position.y.toFixed(0)})
      </p>
    </div>
  );
}

const demos: { [key: string]: () => JSX.Element } = {
  spring: SpringDemo,
  stagger: StaggerDemo,
  morph: MorphDemo,
  timeline: TimelineDemo,
  gesture: GestureDemo,
  path: PathDemo,
  values: AnimatedValuesDemo,
  parallax: ParallaxDemo,
  drag: DragDemo,
};

export default function MotionPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-white hover:text-indigo-400 transition-colors"
            >
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
            Core animation utilities and primitives for building complex motion
            experiences.
          </p>
        </motion.div>

        {/* Live TUEL Motion Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            @tuel/motion Components
          </h2>
          <TuelMotionDemo />
        </motion.div>

        {/* Interactive Demo Modal */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setActiveDemo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/20 rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {motionExamples.find((ex) => ex.demo === activeDemo)?.title}
                  </h3>
                  <button
                    onClick={() => setActiveDemo(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="mb-4">
                  {demos[activeDemo] && React.createElement(demos[activeDemo])}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {motionExamples.map((example, index) => {
            const DemoComponent = demos[example.demo];

            return (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => setActiveDemo(example.demo)}
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {example.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {example.description}
                </p>

                <div className="h-32 flex items-center justify-center relative overflow-hidden rounded-lg bg-black/20">
                  {DemoComponent && <DemoComponent />}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to interact →
                  </span>
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
            <h2 className="text-2xl font-semibold text-white mb-4">
              Spring Physics
            </h2>
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
            <h2 className="text-2xl font-semibold text-white mb-4">
              Motion Variants
            </h2>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`import { createMotionVariants } from '@tuel/motion';

<motion.div
  initial="hidden"
  animate="visible"
  variants={createMotionVariants.slideUp}
  transition={{ duration: 0.6 }}
>
  Animated content
</motion.div>`}</code>
            </pre>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Orchestrated Animations
            </h2>
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="text-indigo-400 mb-4 text-2xl">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              60fps Performance
            </h3>
            <p className="text-gray-400 text-sm">
              Hardware-accelerated animations with optimal performance
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="text-purple-400 mb-4 text-2xl">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Declarative API
            </h3>
            <p className="text-gray-400 text-sm">
              Simple, intuitive API for complex animations
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="text-pink-400 mb-4 text-2xl">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Flexible Composition
            </h3>
            <p className="text-gray-400 text-sm">
              Compose and chain animations seamlessly
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="text-blue-400 mb-4 text-2xl">📱</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Gesture Support
            </h3>
            <p className="text-gray-400 text-sm">
              Touch, drag, and gesture-based interactions
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
