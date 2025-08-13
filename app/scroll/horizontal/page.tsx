"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    
    if (!container || !slider) return;

    const slides = slider.children;
    const slideWidth = slides[0].clientWidth;
    const totalWidth = slideWidth * slides.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.to(slider, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
    });

    // Parallax effect for images
    gsap.utils.toArray(".slide-image").forEach((image: unknown, i) => {
      gsap.to(image, {
        x: -100 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const slides = [
    { id: 1, title: "Discover", image: "/images/img1.jpg", color: "from-blue-600 to-purple-600" },
    { id: 2, title: "Create", image: "/images/img2.jpg", color: "from-purple-600 to-pink-600" },
    { id: 3, title: "Innovate", image: "/images/img3.jpg", color: "from-pink-600 to-red-600" },
    { id: 4, title: "Transform", image: "/images/img4.jpg", color: "from-red-600 to-orange-600" },
    { id: 5, title: "Evolve", image: "/images/img5.jpg", color: "from-orange-600 to-yellow-600" },
    { id: 6, title: "Inspire", image: "/images/img6.jpg", color: "from-yellow-600 to-green-600" },
    { id: 7, title: "Achieve", image: "/images/img7.jpg", color: "from-green-600 to-blue-600" },
  ];

  return (
    <div className="bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/scroll" className="text-white hover:text-blue-400 transition-colors">
              ← Back
            </Link>
            <h1 className="text-xl font-semibold text-white">Horizontal Scroll</h1>
          </div>
        </div>
      </header>

      {/* Horizontal Scroll Section */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex h-full absolute top-0 left-0"
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className="slide flex-shrink-0 w-screen h-full relative flex items-center justify-center"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-30`} />
              
              {/* Image */}
              <div className="slide-image absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-50"
                  priority={index === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center px-6">
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-gray-300 max-w-md mx-auto">
                  Scroll horizontally to explore amazing content with smooth parallax effects.
                </p>
              </div>

              {/* Slide Number */}
              <div className="absolute bottom-10 right-10 text-white/50 text-6xl font-bold">
                0{slide.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">Implementation Details</h2>
          <div className="bg-black/50 rounded-lg p-6">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`// Horizontal scroll with GSAP ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: () => \`+=\${totalWidth}\`,
    scrub: 1,
    pin: true,
  }
});

tl.to(slider, {
  x: () => -(totalWidth - window.innerWidth),
  ease: "none",
});`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}