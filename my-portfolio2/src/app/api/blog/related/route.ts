import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags')?.split(',') || [];
    const excludeSlug = searchParams.get('exclude') || '';

    if (!tags.length) {
      // If no tags provided, return some posts but exclude the current one
      return NextResponse.json(
        blogPosts
          .filter(post => post.slug !== excludeSlug)
          .slice(0, 2)
      );
    }

    // Simple related posts logic: just return other posts
    // In a real implementation, you would match by tags
    const relatedPosts = blogPosts
      .filter(post => post.slug !== excludeSlug)
      .slice(0, 2);

    return NextResponse.json(relatedPosts);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related posts' },
      { status: 500 }
    );
  }
} 