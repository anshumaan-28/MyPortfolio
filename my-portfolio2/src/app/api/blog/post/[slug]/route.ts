import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const post = blogPosts.find((post) => post.slug === slug);

    if (!post) {
      return NextResponse.json(
        { error: `Blog post with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 