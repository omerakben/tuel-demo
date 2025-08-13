"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  useMouseTracking, 
  useImageTrail, 
  CursorFollower,
  useCursorFollower 
} from "@tuel/interaction";

type DemoSection = {
  title: string;
  description: string;
  component: string;
  gradient: string;
};

const demoSections: DemoSection[] = [
  {
    title: "Mouse Tracking",
    description: "Advanced mouse position and velocity tracking",
    component: "MouseTracking",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Image Trail",
    description: "Beautiful image trails following cursor movement",
    component: "ImageTrail",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Cursor Effects",
    description: "Custom cursor with spring physics",
    component: "CursorEffects",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Magnetic Elements",
    description: "Interactive magnetic hover effects",
    component: "MagneticElements",
    gradient: "from-orange-500 to-red-500"
  }
];

// Trail images for the image trail demo
const trailImages = Array.from({ length: 20 }, (_, i) => 
  `/images/trail-images/img${i + 1}.jpeg`
);

export default function InteractionPage() {
  const [activeDemo, setActiveDemo] = useState<string>("MouseTracking");
  const [cursorSize, setCursorSize] = useState(32);
  const [cursorColor, setCursorColor] = useState("#8b5cf6");
  const [showCursor, setShowCursor] = useState(false);
  const [trailCount, setTrailCount] = useState(5);
  const [trailDistance, setTrailDistance] = useState(30);
  const [magneticStrength, setMagneticStrength] = useState(0.3);
  const [showVelocity, setShowVelocity] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  // Mouse tracking demo
  const mouseContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const [mouseDistance, setMouseDistance] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // Track mouse movement within container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseContainerRef.current) return;
      
      const rect = mouseContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is within container
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Calculate velocity
        const vx = x - lastMousePos.current.x;
        const vy = y - lastMousePos.current.y;
        setMouseVelocity({ x: vx * 0.1, y: vy * 0.1 });
        
        // Calculate distance
        const dist = Math.sqrt(vx * vx + vy * vy);
        setMouseDistance(prev => prev + dist);
        
        // Update positions
        setMousePos({ x, y });
        
        // Smooth position (with slight delay)
        setTimeout(() => {
          setSmoothPos({ x, y });
        }, 50);
        
        // Update moving state
        setIsMouseMoving(dist > 0.5);
        
        lastMousePos.current = { x, y };
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Reset moving state after a delay
    let timeout: NodeJS.Timeout;
    const handleMouseStop = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMouseMoving(false);
        setMouseVelocity({ x: 0, y: 0 });
      }, 100);
    };
    
    document.addEventListener('mousemove', handleMouseStop);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMouseStop);
      clearTimeout(timeout);
    };
  }, []);

  // Image trail demo
  const { 
    containerRef: trailContainerRef, 
    startAnimation: startTrailAnimation,
    stopAnimation: stopTrailAnimation,
    trailCount: activeTrailCount
  } = useImageTrail({
    images: trailImages,
    imageLifespan: 1000,
    mouseThreshold: trailDistance,
    inDuration: 750,
    outDuration: 1000
  });

  // Handle image trail animation
  useEffect(() => {
    if (activeDemo === "ImageTrail") {
      startTrailAnimation();
    } else {
      stopTrailAnimation();
    }

    return () => {
      stopTrailAnimation();
    };
  }, [activeDemo, startTrailAnimation, stopTrailAnimation]);

  // Cursor follower
  const cursorState = useCursorFollower({
    damping: 30,
    stiffness: 400,
    idleSize: cursorSize,
    hoverSize: cursorSize * 1.5
  });

  // Magnetic element component
  const MagneticElement = ({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      
      setOffset({
        x: distX * strength,
        y: distY * strength
      });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={ref}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Custom Cursor */}
      {showCursor && (
        <CursorFollower
          idleSize={cursorSize}
          hoverSize={cursorSize * 1.5}
          color={cursorColor}
          damping={30}
          stiffness={400}
          className="mix-blend-difference"
          style={{
            width: cursorSize,
            height: cursorSize,
            backgroundColor: cursorColor,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
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
            Create engaging user interactions with mouse tracking, image trails, custom cursors, and magnetic effects.
          </p>
        </motion.div>

        {/* Component Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoSections.map((section) => (
            <button
              key={section.component}
              type="button"
              onClick={() => {
                setActiveDemo(section.component);
                setAnimationKey(prev => prev + 1);
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeDemo === section.component
                  ? `bg-gradient-to-r ${section.gradient} text-white shadow-lg scale-105`
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Demo Section */}
        <motion.div
          key={`${activeDemo}-${animationKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-12"
        >
          {/* Mouse Tracking Demo */}
          {activeDemo === "MouseTracking" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Mouse Tracking Hook</h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <label className="text-sm text-gray-400 mr-3">Show Velocity</label>
                  <button
                    type="button"
                    onClick={() => setShowVelocity(!showVelocity)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      showVelocity ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        showVelocity ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Demo Area */}
              <div 
                ref={mouseContainerRef}
                className="relative h-96 bg-black/20 rounded-xl overflow-hidden cursor-crosshair"
                onMouseMove={(e) => {
                  const rect = mouseContainerRef.current?.getBoundingClientRect();
                  if (rect) {
                    const relX = e.clientX - rect.left;
                    const relY = e.clientY - rect.top;
                    // Update indicators to use relative position
                  }
                }}
              >
                {/* Position indicator */}
                <motion.div
                  className="absolute w-4 h-4 bg-purple-500 rounded-full pointer-events-none"
                  animate={{
                    left: mousePos.x,
                    top: mousePos.y,
                  }}
                  transition={{ type: "spring", damping: 100, stiffness: 1000 }}
                  style={{
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Smooth position indicator */}
                <motion.div
                  className="absolute w-8 h-8 bg-blue-500/30 rounded-full pointer-events-none"
                  animate={{
                    left: smoothPos.x,
                    top: smoothPos.y,
                  }}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  style={{
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Stats overlay */}
                <div className="absolute top-4 left-4 text-white text-sm space-y-2 bg-black/50 p-2 rounded">
                  <div>Position: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})</div>
                  {showVelocity && (
                    <div>Velocity: ({mouseVelocity.x.toFixed(2)}, {mouseVelocity.y.toFixed(2)})</div>
                  )}
                  <div>Distance: {mouseDistance.toFixed(2)}px</div>
                  <div>Moving: {isMouseMoving ? "Yes" : "No"}</div>
                </div>

                {/* Velocity vector */}
                {showVelocity && isMouseMoving && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <line
                      x1={mousePos.x}
                      y1={mousePos.y}
                      x2={mousePos.x + mouseVelocity.x * 100}
                      y2={mousePos.y + mouseVelocity.y * 100}
                      stroke="red"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { useMouseTracking } from "@tuel/interaction";

const tracking = useMouseTracking({
  smooth: true,
  smoothFactor: 0.1,
  trackVelocity: true
});

// Note: Returns refs that need custom state management for UI updates
// position, velocity, etc. are refs (.current) not reactive state
console.log(tracking.position); // { x: 0, y: 0 }
console.log(tracking.velocity); // { x: 0, y: 0 }
console.log(tracking.distance); // number
console.log(tracking.isMoving); // boolean`}</code>
                </pre>
              </div>
            </>
          )}

          {/* Image Trail Demo */}
          {activeDemo === "ImageTrail" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Image Trail Effect</h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label htmlFor="trail-count" className="text-sm text-gray-400 block mb-2">Trail Count</label>
                  <input
                    id="trail-count"
                    type="number"
                    min="1"
                    max="20"
                    value={trailCount}
                    onChange={(e) => setTrailCount(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="trail-distance" className="text-sm text-gray-400 block mb-2">Trail Distance</label>
                  <input
                    id="trail-distance"
                    type="number"
                    min="10"
                    max="100"
                    value={trailDistance}
                    onChange={(e) => setTrailDistance(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Demo Area */}
              <div 
                ref={trailContainerRef}
                className="relative h-96 bg-black/20 rounded-xl overflow-hidden cursor-none"
                style={{ position: 'relative' }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 pointer-events-none">
                  <p>Move your cursor here to see the image trail effect</p>
                </div>
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { useImageTrail } from "@tuel/interaction";

const { addImage } = useImageTrail({
  containerRef: containerRef,
  maxImages: 5,
  fadeTime: 1000,
  distance: 30
});

// Add images on mouse move
const handleMouseMove = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  addImage("/path/to/image.jpg", x, y);
};`}</code>
                </pre>
              </div>
            </>
          )}

          {/* Cursor Effects Demo */}
          {activeDemo === "CursorEffects" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Custom Cursor Effects</h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label htmlFor="cursor-size" className="text-sm text-gray-400 block mb-2">Cursor Size</label>
                  <input
                    id="cursor-size"
                    type="number"
                    min="16"
                    max="64"
                    value={cursorSize}
                    onChange={(e) => setCursorSize(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="cursor-color" className="text-sm text-gray-400 block mb-2">Cursor Color</label>
                  <input
                    id="cursor-color"
                    type="color"
                    value={cursorColor}
                    onChange={(e) => setCursorColor(e.target.value)}
                    className="w-full h-10 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none cursor-pointer"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => setShowCursor(!showCursor)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      showCursor 
                        ? "bg-red-500 hover:bg-red-600 text-white" 
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                    }`}
                  >
                    {showCursor ? "Hide" : "Show"} Custom Cursor
                  </button>
                </div>
              </div>

              {/* Demo Area */}
              <div className="bg-black/20 rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Scale on hover</p>
                    <button 
                      className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all hover:scale-110 cursor-pointer"
                      onMouseEnter={() => showCursor && cursorState.scale.set(1.5)}
                      onMouseLeave={() => showCursor && cursorState.scale.set(1)}
                    >
                      Button 1
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Rotate on hover</p>
                    <button 
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:rotate-3 cursor-pointer"
                      onMouseEnter={() => showCursor && cursorState.scale.set(0.5)}
                      onMouseLeave={() => showCursor && cursorState.scale.set(1)}
                    >
                      Button 2
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Glow effect</p>
                    <button 
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all hover:shadow-lg hover:shadow-green-500/50 cursor-pointer"
                      onMouseEnter={() => showCursor && cursorState.opacity.set(0.3)}
                      onMouseLeave={() => showCursor && cursorState.opacity.set(1)}
                    >
                      Button 3
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-300 text-sm mb-2">💡 <strong>Tip:</strong> Click "Show Custom Cursor" above to see how the cursor changes when hovering over these buttons:</p>
                  <ul className="text-gray-400 text-sm space-y-1 ml-4">
                    <li>• Button 1: Makes the cursor 1.5x larger</li>
                    <li>• Button 2: Makes the cursor 0.5x smaller</li>
                    <li>• Button 3: Makes the cursor semi-transparent (30% opacity)</li>
                  </ul>
                </div>
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { CursorFollower, useCursorFollower } from "@tuel/interaction";

// Component usage
<CursorFollower
  size={32}
  color="#8b5cf6"
  smoothing={0.15}
  className="mix-blend-difference"
/>

// Hook usage
const { cursorRef, isHovering } = useCursorFollower({
  size: 32,
  smoothing: 0.15
});`}</code>
                </pre>
              </div>
            </>
          )}

          {/* Magnetic Elements Demo */}
          {activeDemo === "MagneticElements" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Magnetic Hover Effects</h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label htmlFor="magnetic-strength" className="text-sm text-gray-400 block mb-2">Magnetic Strength</label>
                  <input
                    id="magnetic-strength"
                    type="range"
                    min="0.1"
                    max="0.5"
                    step="0.05"
                    value={magneticStrength}
                    onChange={(e) => setMagneticStrength(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-gray-400 text-sm mt-1">{magneticStrength.toFixed(2)}</div>
                </div>
              </div>

              {/* Demo Area */}
              <div className="bg-black/20 rounded-xl p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex justify-center">
                    <MagneticElement strength={magneticStrength}>
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </MagneticElement>
                  </div>
                  <div className="flex justify-center">
                    <MagneticElement strength={magneticStrength}>
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </MagneticElement>
                  </div>
                  <div className="flex justify-center">
                    <MagneticElement strength={magneticStrength}>
                      <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold">
                        Button
                      </button>
                    </MagneticElement>
                  </div>
                  <div className="flex justify-center">
                    <MagneticElement strength={magneticStrength}>
                      <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-white">
                        Text
                      </div>
                    </MagneticElement>
                  </div>
                </div>

                <div className="mt-8 text-center text-gray-400">
                  Hover over the elements to see the magnetic effect
                </div>
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`// Magnetic element implementation
const MagneticElement = ({ children, strength = 0.3 }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength
    });
  };

  return (
    <motion.div
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
};`}</code>
                </pre>
              </div>
            </>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-purple-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Mouse Tracking</h3>
            <p className="text-gray-400 text-sm">
              Real-time position, velocity, and movement detection
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Image Trails</h3>
            <p className="text-gray-400 text-sm">
              Beautiful trailing images with customizable effects
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Custom Cursors</h3>
            <p className="text-gray-400 text-sm">
              Fully customizable cursor with spring physics
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-pink-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Magnetic Effects</h3>
            <p className="text-gray-400 text-sm">
              Elements that respond to cursor proximity
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}