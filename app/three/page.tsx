"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  R3FCanvas, 
  FloatingObjects, 
  ThreeOrbitScene, 
  MorphingShapes 
} from "@tuel/three";

const threeExamples = [
  {
    title: "3D Gallery",
    description: "Interactive 3D image gallery with depth",
    href: "/three/gallery",
    gradient: "from-purple-600 to-blue-600"
  },
  {
    title: "Particle System",
    description: "GPU-powered particle animations",
    href: "/three/particles",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Orbit Scene",
    description: "Interactive 3D scene with orbit controls",
    href: "/three/orbit",
    gradient: "from-green-600 to-emerald-600"
  },
  {
    title: "Floating Objects",
    description: "Animated floating 3D objects",
    href: "/three/floating",
    gradient: "from-orange-600 to-red-600"
  },
  {
    title: "Shader Effects",
    description: "Custom shader materials and effects",
    href: "/three/shaders",
    gradient: "from-pink-600 to-purple-600"
  },
  {
    title: "Model Viewer",
    description: "3D model loader and viewer",
    href: "/three/models",
    gradient: "from-indigo-600 to-blue-600"
  }
];

// TUEL Three.js Components Demo
function TuelThreeDemo() {
  return (
    <div className="p-6 bg-black/30 rounded-xl">
      <p className="text-gray-300 mb-4">✅ @tuel/three components successfully imported:</p>
      <ul className="list-disc list-inside text-gray-400 space-y-1">
        <li>R3FCanvas</li>
        <li>FloatingObjects</li>
        <li>ThreeOrbitScene</li>
        <li>MorphingShapes</li>
      </ul>
      <p className="text-sm text-gray-500 mt-4">3D components are ready for implementation.</p>
    </div>
  );
}

// Mini 3D Scene Component
function MiniScene() {
  return (
    <div className="h-96 rounded-xl overflow-hidden bg-black/50">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          {/* Distorted Sphere */}
          <Sphere args={[1.5, 64, 64]} position={[-2, 0, 0]}>
            <MeshDistortMaterial
              color="#8B5CF6"
              attach="material"
              distort={0.5}
              speed={2}
            />
          </Sphere>
          
          {/* Rotating Box */}
          <Box args={[1.5, 1.5, 1.5]} position={[2, 0, 0]}>
            <meshStandardMaterial color="#3B82F6" />
          </Box>
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function ThreePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-purple-400 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-semibold text-white">@tuel/three</h1>
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
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              3D Graphics
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Powerful Three.js components and utilities for creating stunning 3D experiences in React.
          </p>
        </motion.div>

        {/* Live TUEL Three.js Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">@tuel/three Components</h2>
          <TuelThreeDemo />
        </motion.div>

        {/* Live Demo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <MiniScene />
          <p className="text-center text-gray-400 mt-4">
            Interactive 3D scene - Click and drag to rotate
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {threeExamples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Link href={example.href}>
                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  {/* 3D Icon */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {example.description}
                    </p>

                    {/* Arrow */}
                    <div className="text-purple-400 group-hover:text-blue-400 transition-colors">
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
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Example</h2>
          <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{`import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      
      <Box>
        <meshStandardMaterial color="hotpink" />
      </Box>
      
      <OrbitControls />
    </Canvas>
  );
}`}</code>
          </pre>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-purple-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">WebGL Powered</h3>
            <p className="text-gray-400 text-sm">
              Hardware-accelerated 3D graphics with Three.js
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">React Integration</h3>
            <p className="text-gray-400 text-sm">
              Seamless integration with React Three Fiber
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
            <p className="text-gray-400 text-sm">
              Optimized for 60fps with instancing and LOD
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}