"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome, FiExternalLink, FiClock, FiCalendar, FiTag } from "react-icons/fi";
import { blogPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const currentPost = blogPosts.find(p => p.slug === params.slug);
    if (currentPost) {
      setPost(currentPost);
    }
  }, [params.slug]);

  // Prevent hydration errors by not rendering until component is mounted
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900"></div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">Blog Post Not Found</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FiHome className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
            <div>
              <a
                href="https://medium.com/@anshumaansharma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Follow on Medium
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <main className="pt-24 pb-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  {Math.ceil(post.content.length / 1000)} min read
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    <FiTag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Main Content */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-8">{post.content}</p>
              
              {/* Table of Contents */}
              <div className="my-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  {post.sections.map((section: { title: string; content: string }, index: number) => (
                    <li key={index}>
                      <a
                        href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sections */}
              {post.sections.map((section: { title: string; content: string }, index: number) => (
                <section
                  key={index}
                  id={section.title.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        </article>
      </main>
    </div>
  );
} 