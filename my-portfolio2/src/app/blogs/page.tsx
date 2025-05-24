"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiArrowUpRight, FiCalendar, FiClock, FiTag } from "react-icons/fi";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/blog";

// Client-side blog post fetching
export default function Blogs() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blog/posts');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  // Blog Card Component
  const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex flex-col bg-background dark:bg-foreground/5 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800 h-full hover:shadow-lg transition-shadow"
      >
        <div className="h-44 relative overflow-hidden">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            className="object-cover object-center transition-transform hover:scale-105" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-foreground/10 px-2 py-1 rounded-full flex items-center gap-1">
                <FiTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-foreground/60 flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <span className="text-xs text-foreground/60 flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {Math.ceil(post.content.length / 1000)} min read
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-foreground/70 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center text-sm text-foreground font-medium hover:underline mt-auto group"
          >
            Read More
            <FiArrowUpRight className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Blogs</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            Thoughts, ideas, and technical articles about web development and technology
          </p>
        </motion.div>

        {/* Medium and Hire Me Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <Link
            href="https://medium.com/@anshumaansharma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-foreground/10 hover:bg-foreground/15 transition-colors"
          >
            <svg 
              viewBox="0 0 1043.63 592.71" 
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
            </svg>
            <span>Follow me on Medium</span>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col bg-background dark:bg-foreground/5 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800 h-full animate-pulse">
                <div className="h-44 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex gap-2 mb-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-foreground/70">No blog posts found. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 