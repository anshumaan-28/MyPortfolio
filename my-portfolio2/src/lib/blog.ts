import blogData from '../data/blog-posts.json';

interface BlogSection {
  title: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  htmlFile: string;
  tags: string[];
  content: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = blogData.posts; 