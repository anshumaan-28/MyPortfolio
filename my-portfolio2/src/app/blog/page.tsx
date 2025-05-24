"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiPenTool, FiCalendar } from "react-icons/fi";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration errors by not rendering content until client-side
  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"></div>;
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
            My Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exploring technology, AI, and the future of digital innovation through thoughtful analysis and engaging storytelling.
          </p>
        </motion.div>

        {/* All Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-24"
        >
          <h2 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-3">Latest Articles</h2>
          
          <div className="grid md:grid-cols-1 gap-10">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="md:flex">
                      <div className="md:w-2/5 relative overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover min-h-[200px] md:h-auto group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-8 md:w-3/5">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <FiCalendar className="mr-2" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                          <span className="mr-2">Read Article</span>
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Writing Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-10 shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-5 mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl">
                <FiPenTool className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Hire Me as a Content Writer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              Looking for engaging, well-researched content for your tech blog or publication? I specialize in creating compelling articles about technology, AI, and digital innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:anshumaan.sharma@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
              >
                <FiPenTool className="w-5 h-5" />
                Get in Touch
              </a>
              <a
                href="https://medium.com/@anshumaan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <FiBookOpen className="w-5 h-5" />
                Follow on Medium
              </a>
            </div>
          </div>
        </motion.div>

        {/* Content Writing Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Content Writing Journey</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              With over 2 years of experience in technical writing and content creation, I've helped numerous tech companies and publications communicate complex ideas in an engaging and accessible way. My journey in content writing began with a passion for technology and a desire to make it more understandable to everyone.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 