"use client";

import { useRef, useEffect, ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowLeft } from "react-icons/fi";
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiPython
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { useRouter } from "next/navigation";

// Types
interface Technology {
  name: string;
  icon: ReactNode;
  color: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
  imageSrc: string;
}

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "Crop Prediction",
    description: "An AI-powered application that helps farmers predict the best crops to plant based on soil conditions and climate data.",
    technologies: ["Python", "Machine Learning", "React", "Flask", "Scikit-learn"],
    liveLink: "#",
    githubLink: "#",
    imageSrc: "/cropprediction.png"
  },
  {
    id: 2,
    title: "Studyffy",
    description: "A comprehensive learning platform for students with study materials, quiz tools, and collaborative features.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    liveLink: "#",
    githubLink: "#",
    imageSrc: "/Studyffy.png"
  },
  {
    id: 3,
    title: "Kiki Beauty",
    description: "An e-commerce platform for beauty products with personalized recommendations and virtual try-on features.",
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Prisma", "PostgreSQL"],
    liveLink: "#",
    githubLink: "#",
    imageSrc: "/kikibeauty.png"
  },
];

// Tech stack data
const techStack: Technology[] = [
  { name: "HTML", icon: <SiHtml5 className="w-10 h-10" />, color: "text-orange-500" },
  { name: "CSS", icon: <SiCss3 className="w-10 h-10" />, color: "text-blue-500" },
  { name: "JavaScript", icon: <SiJavascript className="w-10 h-10" />, color: "text-yellow-400" },
  { name: "React", icon: <SiReact className="w-10 h-10" />, color: "text-cyan-400" },
  { name: "Next.js", icon: <SiNextdotjs className="w-10 h-10" />, color: "text-gray-800 dark:text-white" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="w-10 h-10" />, color: "text-cyan-500" },
  { name: "Node.js", icon: <SiNodedotjs className="w-10 h-10" />, color: "text-green-600" },
  { name: "Express.js", icon: <SiExpress className="w-10 h-10" />, color: "text-gray-600 dark:text-gray-300" },
  { name: "MongoDB", icon: <SiMongodb className="w-10 h-10" />, color: "text-green-500" },
  { name: "Python", icon: <SiPython className="w-10 h-10" />, color: "text-blue-600" },
  { name: "Java", icon: <DiJava className="w-10 h-10" />, color: "text-red-600" },
];

// Project Card Component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="flex flex-col bg-background dark:bg-foreground/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-full"
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/20 z-10" />
        <Image 
          src={project.imageSrc} 
          alt={project.title}
          className="object-cover object-left" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-foreground/10 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href={project.liveLink}
            className="flex items-center gap-2 text-foreground hover:underline"
          >
            <FiExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </Link>
          <Link
            href={project.githubLink}
            className="flex items-center gap-2 text-foreground hover:underline"
          >
            <FiGithub className="w-4 h-4" />
            <span>Source Code</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Tech Stack Carousel Component
const TechStackCarousel = () => {
  // Calculate total width for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(2000);
  
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="overflow-hidden py-10 bg-foreground/5 rounded-xl">
      <div className="relative" ref={containerRef}>
        <motion.div
          className="flex gap-12 items-center justify-center"
          animate={{ 
            x: [-containerWidth/4, -containerWidth - (containerWidth/4)]
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
            times: [0, 1]
          }}
        >
          {/* Duplicate tech stack multiple times for a seamless loop */}
          {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
            <motion.div 
              key={`${tech.name}-${index}`} 
              className="flex flex-col items-center gap-3 min-w-28 py-6"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-foreground/5 rounded-full flex items-center justify-center" />
                <div className={`relative w-full h-full flex items-center justify-center ${tech.color}`}>
                  {tech.icon}
                </div>
              </div>
              <span className="text-sm font-medium mt-2">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle navigation back to home with transition
  const navigateToHome = () => {
    // Create a sliding transition effect before navigation
    if (contentRef.current) {
      contentRef.current.style.transform = 'translateX(100%)';
      contentRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    }
    
    setTimeout(() => {
      router.push('/');
    }, 350);
  };

  // Reset opacity when component mounts
  useEffect(() => {
    // Handle incoming transition
    const currentRef = contentRef.current;
    
    if (currentRef) {
      // Start from the right side (for sliding in from right to left)
      currentRef.style.transform = 'translateX(100%)';
      
      // Small delay to ensure the initial state is applied before animating
      setTimeout(() => {
        if (currentRef) {
          currentRef.style.transform = 'translateX(0)';
          currentRef.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }
      }, 30);
    }
    
    return () => {
      // Cleanup
      if (currentRef) {
        currentRef.style.transform = '';
        currentRef.style.transition = '';
      }
    };
  }, []);

  return (
    <div 
      ref={contentRef}
      className="min-h-screen py-12 w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.button
          onClick={navigateToHome}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8 text-foreground/70 hover:text-foreground transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>
        
        {/* Portfolio Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Portfolio</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            A showcase of my latest projects and work. Each project reflects my skills
            and experience in different technologies and problem domains.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Technologies I Work With
          </motion.h2>
          
          <TechStackCarousel />
        </div>
      </div>
    </div>
  );
} 
