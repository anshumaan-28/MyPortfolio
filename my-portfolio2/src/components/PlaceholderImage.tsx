"use client";

import React from "react";

interface PlaceholderImageProps {
  text?: string;
  width?: number | string;
  height?: number | string;
  bgClassName?: string;
  textClassName?: string;
}

export default function PlaceholderImage({
  text = "Image",
  width = "100%",
  height = "100%",
  bgClassName = "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800",
  textClassName = "text-gray-500 dark:text-gray-400",
}: PlaceholderImageProps) {
  return (
    <div 
      style={{ width, height }} 
      className={`flex items-center justify-center overflow-hidden ${bgClassName}`}
    >
      <div className={`text-center p-4 ${textClassName}`}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2 opacity-50"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>{text}</span>
      </div>
    </div>
  );
} 