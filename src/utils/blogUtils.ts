import type { BlogPost } from '../types/blog';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const getPostBySlug = (posts: BlogPost[], slug: string): BlogPost | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (posts: BlogPost[]): BlogPost[] => {
  return posts.filter(post => post.featured).slice(0, 3);
};

export const getLatestPosts = (posts: BlogPost[], limit: number = 3): BlogPost[] => {
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const filterPostsByTag = (posts: BlogPost[], tag: string): BlogPost[] => {
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
};

export const searchPosts = (posts: BlogPost[], query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};