"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiMail, FiChevronDown, FiFileText, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const router = useRouter();
  
  // References for sections
  const aboutRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutEndRef = useRef<HTMLDivElement>(null);
  
  // Animation for about section when it comes into view
  const isAboutInView = useInView(aboutRef, { 
    once: false, 
    amount: 0.2
  });
  
  // Watch for when we're at the end of the about section
  const isAtEndOfAbout = useInView(aboutEndRef, {
    once: true,
    amount: 1.0 // Fully visible
  });
  
  // Scroll animation for the scroll indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform the opacity of the scroll indicator based on scroll progress
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Handle smooth scroll to about section
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Handle navigation with transition
  const navigateToPortfolio = useCallback(() => {
    // Create a smooth transition effect before navigation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
      router.push('/portfolio');
    }, 400);
  }, [router]);

  // Handle navigation with slide transition
  const navigateToPortfolioWithSlide = useCallback(() => {
    if (hasNavigated) return; // Prevent multiple navigations
    
    setHasNavigated(true);
    
    // Create a sliding transition effect before navigation
    const content = document.getElementById('main-content');
    if (content) {
      content.style.transform = 'translateX(-100%)';
      content.style.transition = 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
    }
    
    setTimeout(() => {
      router.push('/portfolio');
    }, 600);
  }, [router, hasNavigated]);
  
  // Handle scroll detection manually
  useEffect(() => {
    if (!isBrowser) return;
    
    const handleScroll = () => {
      if (hasNavigated) return;
      
      // We need to detect when we've scrolled past the about section
      // This happens when the about section is no longer visible and we've scrolled down
      if (aboutRef.current && aboutEndRef.current) {
        const aboutRect = aboutRef.current.getBoundingClientRect();
        
        // If the bottom of the about section is above the viewport
        // and we haven't already navigated
        if (aboutRect.bottom < 0) {
          navigateToPortfolioWithSlide();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBrowser, navigateToPortfolioWithSlide, hasNavigated]);
  
  // Handle auto navigation when reaching end of about section
  useEffect(() => {
    if (isAtEndOfAbout && isBrowser && !hasNavigated) {
      navigateToPortfolioWithSlide();
    }
  }, [isAtEndOfAbout, isBrowser, navigateToPortfolioWithSlide, hasNavigated]);
  
  // Handle client-side hydration
  useEffect(() => {
    setIsBrowser(true);
    
    // Reset opacity and transform when component mounts
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.4s ease';
    
    const content = document.getElementById('main-content');
    if (content) {
      content.style.transform = 'translateX(0)';
      content.style.transition = 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
    }
    
    return () => {
      document.body.style.opacity = '1';
    };
  }, []);

  return (
    <div 
      id="main-content"
      ref={containerRef}
      className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth"
    >
      {/* Intro Section - First full screen */}
      <section className="h-screen w-full flex items-center snap-start relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Intro Text */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-medium mb-2">Hi there, I&apos;m</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Anshumaan</h1>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-xl mb-8">
                A passionate web developer focused on creating beautiful, functional, and user-friendly websites and applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={navigateToPortfolio}
                  whileHover={{ scale: 1.05, backgroundColor: "#0070f3" }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>View My Work</span>
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
                
                <motion.a
                  href="/Anshumaan_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-foreground/10 text-foreground px-6 py-3 rounded-md font-medium transition-colors shadow-sm hover:bg-foreground/20"
                >
                  <FiFileText className="w-4 h-4" />
                  Resume
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              className="flex-1 max-w-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-background dark:bg-foreground/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  <Image 
                    src="/Portfolioprofile.PNG" 
                    alt="Profile Photo"
                    className="object-cover" 
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
                </div>
                <div className="p-6 flex flex-col items-center">
                  <div className="flex space-x-4 mt-2">
                    <motion.a 
                      href="mailto:mail@anshumaan.me" 
                      className="p-3 bg-foreground/10 rounded-full hover:bg-foreground/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiMail className="w-5 h-5" />
                    </motion.a>
                    <motion.a 
                      href="https://linkedin.com/in/anshumaan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-foreground/10 rounded-full hover:bg-foreground/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiLinkedin className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator (without text) */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToAbout}
          style={{ opacity: scrollOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="p-2 rounded-full border border-foreground/30 animate-pulse">
            <FiChevronDown className="w-5 h-5" />
          </div>
        </motion.div>
      </section>

      {/* About Me Section - Second full screen */}
      <section 
        ref={aboutRef} 
        className="h-screen w-full flex items-center snap-start overflow-hidden relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isBrowser && (
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-10 text-center"
              >
                About Me
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-lg"
                initial={{ opacity: 0, y: 60 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <p>
                  I am a dedicated web developer with a passion for creating clean, efficient, and user-friendly digital experiences. 
                  My journey in web development began with a curiosity about how websites work, which quickly grew into a full-fledged 
                  career path.
                </p>
                <p>
                  With expertise in modern front-end frameworks like React and Next.js, as well as experience with back-end 
                  technologies, I bring a full-stack perspective to my projects. I believe in writing clean, maintainable code 
                  and staying updated with the latest trends in web development.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or 
                  sharing knowledge with the developer community. I&apos;m always open to new challenges and opportunities to grow 
                  as a developer.
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
        
        {/* Invisible element at the bottom of about section to detect when it's visible */}
        <div 
          ref={aboutEndRef} 
          className="h-1 w-full absolute bottom-0 opacity-0 pointer-events-none"
        />
      </section>
    </div>
  );
}
