export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  image?: string;
  readTime: string;
  featured: boolean;
  content: string;
}