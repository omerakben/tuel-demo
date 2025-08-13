"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ImageGallery, Carousel, MediaGrid, VideoGallery } from "@tuel/gallery";
import type { GalleryImage, CarouselSlide, MediaItem, VideoItem } from "@tuel/gallery";

// Sample image data
const sampleImages: GalleryImage[] = [
  { id: "1", src: "/images/img1.jpg", alt: "Mountain landscape", title: "Mountain Vista", description: "Beautiful mountain scenery at dawn" },
  { id: "2", src: "/images/img2.jpg", alt: "Ocean waves", title: "Ocean Waves", description: "Serene ocean view with waves" },
  { id: "3", src: "/images/img3.jpg", alt: "Forest path", title: "Forest Trail", description: "Peaceful forest pathway" },
  { id: "4", src: "/images/img4.jpg", alt: "City lights", title: "City Nights", description: "Urban landscape at night" },
  { id: "5", src: "/images/img5.jpg", alt: "Desert dunes", title: "Desert Dunes", description: "Golden sand dunes at sunset" },
  { id: "6", src: "/images/img6.jpg", alt: "Northern lights", title: "Aurora", description: "Northern lights display" },
  { id: "7", src: "/images/img7.jpg", alt: "Waterfall", title: "Waterfall", description: "Majestic waterfall in nature" },
  { id: "8", src: "/images/img_1.jpg", alt: "Abstract art 1", title: "Abstract I", description: "Modern abstract composition" },
  { id: "9", src: "/images/img_2.jpg", alt: "Abstract art 2", title: "Abstract II", description: "Colorful abstract design" },
  { id: "10", src: "/images/img_3.jpg", alt: "Abstract art 3", title: "Abstract III", description: "Geometric patterns" },
  { id: "11", src: "/images/img_4.jpg", alt: "Portrait 1", title: "Portrait Study", description: "Character portrait" },
  { id: "12", src: "/images/img_5.jpg", alt: "Architecture", title: "Modern Architecture", description: "Contemporary building design" },
];

// Carousel slides data
const carouselSlides: CarouselSlide[] = sampleImages.slice(0, 6).map(img => ({
  id: img.id,
  content: (
    <div className="relative w-full h-full">
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h3 className="text-white text-2xl font-bold">{img.title}</h3>
        <p className="text-gray-200">{img.description}</p>
      </div>
    </div>
  ),
  image: img.src,
  title: img.title,
  description: img.description
}));

// Media grid items
const mediaItems: MediaItem[] = [
  ...sampleImages.slice(0, 8).map(img => ({
    id: img.id,
    type: 'image' as const,
    src: img.src,
    alt: img.alt,
    title: img.title,
    thumbnail: img.src
  })),
];

// Video gallery items
const videoItems: VideoItem[] = [
  { 
    id: "v1", 
    src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Sample YouTube Video",
    description: "A demo YouTube video",
    duration: "3:52",
    type: "youtube"
  },
  { 
    id: "v2", 
    src: "https://vimeo.com/253989945",
    title: "Sample Vimeo Video",
    description: "A demo Vimeo video",
    duration: "2:15",
    type: "vimeo"
  },
  { 
    id: "v3", 
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "/images/img1.jpg",
    title: "Big Buck Bunny",
    description: "An open-source animated short",
    duration: "9:56"
  },
  { 
    id: "v4", 
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "/images/img2.jpg",
    title: "Elephants Dream",
    description: "The world's first open movie",
    duration: "10:53"
  },
  { 
    id: "v5", 
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "/images/img3.jpg",
    title: "For Bigger Blazes",
    description: "HBO GO now works with Chromecast",
    duration: "0:15"
  },
  { 
    id: "v6", 
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "/images/img4.jpg",
    title: "For Bigger Escapes",
    description: "Introducing Chromecast",
    duration: "0:15"
  }
];

type DemoSection = {
  title: string;
  description: string;
  component: string;
  gradient: string;
};

const demoSections: DemoSection[] = [
  {
    title: "Image Gallery",
    description: "Multiple layouts with animations and effects",
    component: "ImageGallery",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Carousel",
    description: "Smooth sliding carousel with autoplay",
    component: "Carousel",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Video Gallery",
    description: "Rich video gallery with multiple sources",
    component: "VideoGallery",
    gradient: "from-red-500 to-orange-500"
  },
  {
    title: "Media Grid",
    description: "Responsive grid for mixed media content",
    component: "MediaGrid",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function GalleryPage() {
  const [activeDemo, setActiveDemo] = useState<string>("ImageGallery");
  const [galleryLayout, setGalleryLayout] = useState<"grid" | "masonry" | "carousel" | "stack" | "justified">("grid");
  const [galleryAnimation, setGalleryAnimation] = useState<"fade" | "slide" | "scale" | "flip" | "reveal">("fade");
  const [galleryHover, setGalleryHover] = useState<"zoom" | "tilt" | "overlay" | "parallax" | "lift" | "blur">("zoom");
  const [galleryColumns, setGalleryColumns] = useState(3);
  const [galleryLightbox, setGalleryLightbox] = useState(true);
  const [carouselAutoPlay, setCarouselAutoPlay] = useState(true);
  const [carouselInterval, setCarouselInterval] = useState(3000);
  const [videoLayout, setVideoLayout] = useState<"grid" | "list" | "carousel">("grid");
  const [videoColumns, setVideoColumns] = useState(2);
  const [videoAutoPlay, setVideoAutoPlay] = useState(false);
  const [videoLightbox, setVideoLightbox] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

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
            Beautiful, performant gallery components with multiple layouts, animations, and interactive effects.
          </p>
        </motion.div>

        {/* Component Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoSections.map((section) => (
            <button
              key={section.component}
              type="button"
              onClick={() => setActiveDemo(section.component)}
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
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-12"
        >
          {/* ImageGallery Demo */}
          {activeDemo === "ImageGallery" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Image Gallery Component</h2>
                <button
                  type="button"
                  onClick={() => setAnimationKey(prev => prev + 1)}
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors flex items-center gap-2"
                  title="Refresh animations"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Animation
                </button>
              </div>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div>
                  <label htmlFor="gallery-layout" className="text-sm text-gray-400 block mb-2">Layout</label>
                  <select
                    id="gallery-layout"
                    value={galleryLayout}
                    onChange={(e) => setGalleryLayout(e.target.value as any)}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  >
                    <option value="grid">Grid</option>
                    <option value="masonry">Masonry</option>
                    <option value="carousel">Carousel</option>
                    <option value="stack">Stack</option>
                    <option value="justified">Justified</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="gallery-animation" className="text-sm text-gray-400 block mb-2">Animation</label>
                  <select
                    id="gallery-animation"
                    value={galleryAnimation}
                    onChange={(e) => {
                      setGalleryAnimation(e.target.value as any);
                      setAnimationKey(prev => prev + 1); // Force re-render
                    }}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  >
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="scale">Scale</option>
                    <option value="flip">Flip</option>
                    <option value="reveal">Reveal</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gallery-hover" className="text-sm text-gray-400 block mb-2">Hover Effect</label>
                  <select
                    id="gallery-hover"
                    value={galleryHover}
                    onChange={(e) => setGalleryHover(e.target.value as any)}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  >
                    <option value="zoom">Zoom</option>
                    <option value="tilt">Tilt</option>
                    <option value="overlay">Overlay</option>
                    <option value="parallax">Parallax</option>
                    <option value="lift">Lift</option>
                    <option value="blur">Blur</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gallery-columns" className="text-sm text-gray-400 block mb-2">Columns</label>
                  <input
                    id="gallery-columns"
                    type="number"
                    min="1"
                    max="6"
                    value={galleryColumns}
                    onChange={(e) => setGalleryColumns(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label className="text-sm text-gray-400 mr-3">Lightbox</label>
                  <button
                    type="button"
                    onClick={() => setGalleryLightbox(!galleryLightbox)}
                    aria-label={galleryLightbox ? "Disable lightbox" : "Enable lightbox"}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      galleryLightbox ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        galleryLightbox ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Gallery Component */}
              <div className="bg-black/20 rounded-xl p-6">
                <ImageGallery
                  key={`${galleryAnimation}-${galleryLayout}-${animationKey}`}
                  images={sampleImages}
                  layout={galleryLayout}
                  columns={galleryColumns}
                  animationType={galleryAnimation}
                  hoverEffect={galleryHover}
                  lightbox={galleryLightbox}
                  gap={16}
                  className="w-full"
                />
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { ImageGallery } from "@tuel/gallery";

const images = [
  { id: "1", src: "/img1.jpg", alt: "Image 1", title: "Title" },
  // ... more images
];

<ImageGallery
  images={images}
  layout="${galleryLayout}"
  columns={${galleryColumns}}
  animationType="${galleryAnimation}"
  hoverEffect="${galleryHover}"
  lightbox={${galleryLightbox}}
/>`}</code>
                </pre>
              </div>
            </>
          )}

          {/* Carousel Demo */}
          {activeDemo === "Carousel" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Carousel Component</h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <label className="text-sm text-gray-400 mr-3">Auto Play</label>
                  <button
                    type="button"
                    onClick={() => setCarouselAutoPlay(!carouselAutoPlay)}
                    aria-label={carouselAutoPlay ? "Disable auto play" : "Enable auto play"}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      carouselAutoPlay ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        carouselAutoPlay ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label htmlFor="carousel-interval" className="text-sm text-gray-400 block mb-2">Interval (ms)</label>
                  <input
                    id="carousel-interval"
                    type="number"
                    min="1000"
                    max="10000"
                    step="500"
                    value={carouselInterval}
                    onChange={(e) => setCarouselInterval(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Carousel Component */}
              <div className="bg-black/20 rounded-xl p-6">
                <div className="h-[500px]">
                  <Carousel
                    slides={carouselSlides}
                    autoPlay={carouselAutoPlay}
                    autoPlayInterval={carouselInterval}
                    showIndicators={true}
                    showArrows={true}
                    className="h-full"
                  />
                </div>
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { Carousel } from "@tuel/gallery";

const slides = [
  {
    id: "1",
    content: <div>Slide Content</div>,
    image: "/slide1.jpg"
  },
  // ... more slides
];

<Carousel
  slides={slides}
  autoPlay={${carouselAutoPlay}}
  autoPlayInterval={${carouselInterval}}
  showIndicators={true}
  showArrows={true}
/>`}</code>
                </pre>
              </div>
            </>
          )}

          {/* VideoGallery Demo */}
          {activeDemo === "VideoGallery" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Video Gallery Component</h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label htmlFor="video-layout" className="text-sm text-gray-400 block mb-2">Layout</label>
                  <select
                    id="video-layout"
                    value={videoLayout}
                    onChange={(e) => setVideoLayout(e.target.value as any)}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="video-columns" className="text-sm text-gray-400 block mb-2">Columns</label>
                  <input
                    id="video-columns"
                    type="number"
                    min="1"
                    max="4"
                    value={videoColumns}
                    onChange={(e) => setVideoColumns(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <label className="text-sm text-gray-400 mr-3">Auto Play</label>
                    <button
                      type="button"
                      onClick={() => setVideoAutoPlay(!videoAutoPlay)}
                      aria-label={videoAutoPlay ? "Disable auto play" : "Enable auto play"}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        videoAutoPlay ? "bg-purple-500" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          videoAutoPlay ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center">
                    <label className="text-sm text-gray-400 mr-3">Lightbox</label>
                    <button
                      type="button"
                      onClick={() => setVideoLightbox(!videoLightbox)}
                      aria-label={videoLightbox ? "Disable lightbox" : "Enable lightbox"}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        videoLightbox ? "bg-purple-500" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          videoLightbox ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* VideoGallery Component */}
              <div className="bg-black/20 rounded-xl p-6">
                <VideoGallery
                  videos={videoItems}
                  layout={videoLayout}
                  columns={videoColumns}
                  autoPlay={videoAutoPlay}
                  controls={true}
                  muted={videoAutoPlay}
                  loop={false}
                  preload="metadata"
                  aspectRatio="16/9"
                  showThumbnails={true}
                  lightbox={videoLightbox}
                  className="w-full"
                />
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { VideoGallery } from "@tuel/gallery";

const videos = [
  {
    id: "1",
    src: "https://example.com/video.mp4",
    poster: "/poster.jpg",
    title: "Video Title",
    duration: "2:30"
  },
  // ... more videos
];

<VideoGallery
  videos={videos}
  layout="${videoLayout}"
  columns={${videoColumns}}
  autoPlay={${videoAutoPlay}}
  lightbox={${videoLightbox}}
/>`}</code>
                </pre>
              </div>
            </>
          )}

          {/* MediaGrid Demo */}
          {activeDemo === "MediaGrid" && (
            <>
              <h2 className="text-3xl font-bold text-white mb-6">Media Grid Component</h2>
              
              {/* MediaGrid Component */}
              <div className="bg-black/20 rounded-xl p-6">
                <MediaGrid
                  media={mediaItems}
                  columns={3}
                  gap={16}
                  aspectRatio="16/9"
                  className="w-full"
                />
              </div>

              {/* Code Example */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
                <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { MediaGrid } from "@tuel/gallery";

const mediaItems = [
  {
    id: "1",
    type: "image",
    src: "/img1.jpg",
    alt: "Image 1",
    thumbnail: "/thumb1.jpg"
  },
  // ... more items
];

<MediaGrid
  media={mediaItems}
  columns={3}
  gap={16}
  aspectRatio="16/9"
/>`}</code>
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
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v9H5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Layouts</h3>
            <p className="text-gray-400 text-sm">
              Grid, masonry, carousel, stack, and justified layouts
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-blue-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-8.31c.67 0 1.21.54 1.21 1.21s-.54 1.21-1.21 1.21-1.21-.54-1.21-1.21.54-1.21 1.21-1.21z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Rich Animations</h3>
            <p className="text-gray-400 text-sm">
              Fade, slide, scale, flip, and reveal animations
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-green-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Interactive Effects</h3>
            <p className="text-gray-400 text-sm">
              Zoom, tilt, overlay, parallax, lift, and blur hover effects
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-pink-400 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Built-in Lightbox</h3>
            <p className="text-gray-400 text-sm">
              Full-screen lightbox with smooth transitions
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}