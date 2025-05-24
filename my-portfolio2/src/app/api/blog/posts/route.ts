import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog';

export async function GET() {
  try {
    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 