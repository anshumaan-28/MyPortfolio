"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  SiGithub, SiLinkedin, SiMedium, SiInstagram, SiPinterest, SiX 
} from "react-icons/si";
import { FiSend, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";

// Social media links with modern icons
const socialLinks = [
  {
    name: "GitHub",
    icon: <SiGithub size={24} />,
    url: "https://github.com/anshumaan-28",
    color: "bg-gradient-to-br from-neutral-800 to-neutral-700 hover:from-neutral-800 hover:to-neutral-600",
    textColor: "text-white",
    hoverScale: 1.05
  },
  {
    name: "LinkedIn",
    icon: <SiLinkedin size={24} />,
    url: "https://www.linkedin.com/in/anshumaansharma28/",
    color: "bg-gradient-to-br from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500",
    textColor: "text-white",
    hoverScale: 1.05
  },
  {
    name: "X",
    icon: <SiX size={24} />,
    url: "https://x.com/anshumaan_28",
    color: "bg-gradient-to-br from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700",
    textColor: "text-white",
    hoverScale: 1.05
  },
  {
    name: "Medium",
    icon: <SiMedium size={24} />,
    url: "https://medium.com/@anshumaansharma",
    color: "bg-gradient-to-br from-neutral-200 to-neutral-100 hover:from-white hover:to-neutral-200",
    textColor: "text-black",
    hoverScale: 1.05
  },
  {
    name: "Instagram",
    icon: <SiInstagram size={24} />,
    url: "https://www.instagram.com/anshumaansharma_/",
    color: "bg-gradient-to-br from-pink-600 via-purple-500 to-orange-400 hover:from-pink-500 hover:via-purple-400 hover:to-orange-300",
    textColor: "text-white",
    hoverScale: 1.05
  },
  {
    name: "Pinterest",
    icon: <SiPinterest size={24} />,
    url: "https://in.pinterest.com/Anshumaan_28/",
    color: "bg-gradient-to-br from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
    textColor: "text-white",
    hoverScale: 1.05
  },
];

export default function Connect() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'social'>('social');
  
  // Handle navigation with animation
  const navigateToHome = () => {
    if (contentRef.current) {
      contentRef.current.style.transform = 'translateX(100%)';
      contentRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    }
    
    setTimeout(() => {
      router.push('/');
    }, 350);
  };

  // Entry animation
  useEffect(() => {
    const currentRef = contentRef.current;
    
    if (currentRef) {
      currentRef.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        if (currentRef) {
          currentRef.style.transform = 'translateX(0)';
          currentRef.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }
      }, 30);
    }
    
    return () => {
      if (currentRef) {
        currentRef.style.transform = '';
        currentRef.style.transition = '';
      }
    };
  }, []);
  
  useEffect(() => {
    if (isFormInView) {
      controls.start('visible');
    }
  }, [isFormInView, controls]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <div 
      ref={contentRef}
      className="min-h-screen w-full bg-gradient-to-b from-background to-foreground/5 dark:from-background dark:to-foreground/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back button */}
        <motion.button
          onClick={navigateToHome}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-12 text-foreground/70 hover:text-foreground transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header with animated gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            animate={{ 
              background: [
                'linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)',
                'linear-gradient(90deg, #8a2387 0%, #e94057 50%, #f27121 100%)',
                'linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)'
              ]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
            className="absolute inset-0 opacity-10 rounded-3xl"
          />
          <div className="relative z-10 py-16 px-4">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              Let&apos;s Connect
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="text-xl text-foreground/70 max-w-2xl mx-auto"
            >
              I&apos;m always interested in new opportunities, collaborations, or just a friendly chat.
            </motion.p>
          </div>
        </motion.div>

        {/* Tabs for switching between social and contact form */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="flex justify-center gap-4 mb-10">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('social')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                activeTab === 'social' 
                  ? 'bg-foreground text-background shadow-lg' 
                  : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
              }`}
            >
              Social Networks
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                activeTab === 'form' 
                  ? 'bg-foreground text-background shadow-lg' 
                  : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
              }`}
            >
              Contact Form
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'social' ? (
              /* Social Media Grid with beautiful cards */
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={index}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: link.hoverScale }}
                    className={`${link.color} ${link.textColor} rounded-xl overflow-hidden shadow-lg group`}
                  >
                    <div className="h-full p-8 flex flex-col justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full">
                          {link.icon}
                        </div>
                        <span className="text-xl font-bold">{link.name}</span>
                      </div>
                      
                      <div className="mt-6 flex justify-between items-center">
                        <span className="text-sm opacity-90">
                          {link.name === 'X' ? '@anshumaan_28' : 
                           link.name === 'Medium' ? '@anshumaansharma' : 
                           link.name === 'Instagram' ? '@anshumaansharma_' :
                           link.name === 'GitHub' ? 'anshumaan-28' :
                           link.name === 'LinkedIn' ? 'anshumaansharma28' :
                           'Anshumaan_28'}
                        </span>
                        <motion.div 
                          whileHover={{ x: 5 }} 
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
                        >
                          <FiArrowRight size={14} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              /* Contact Form with modern styling */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-2xl shadow-xl p-8 border border-foreground/10 max-w-2xl mx-auto"
                ref={formRef}
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 mb-6 rounded-full bg-green-500 flex items-center justify-center">
                      <FiCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                    <p className="text-foreground/70 mb-8 max-w-md">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <motion.button 
                      onClick={() => setIsSubmitted(false)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-full font-medium transition-colors"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      custom={0}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/70">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={1}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={2}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/70">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                        placeholder="I'm interested in discussing a potential collaboration..."
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={3}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      className="pt-2"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            Sending message...
                            <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <FiSend className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 