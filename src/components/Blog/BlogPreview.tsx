import { Link } from 'react-router-dom';
import { BlogCard } from './BlogCard';
import { blogPosts } from '../../data/blogPosts';
import { getLatestPosts } from '../../utils/blogUtils';

export const BlogPreview = () => {
  const latestPosts = getLatestPosts(blogPosts, 3);

  return (
    <section className="blog-preview" id="blog">
      <div className="blog-preview__header">
        <h2 className="blog-preview__heading">Latest from My Tech Journey</h2>
        <p className="blog-preview__subtitle">
          Sharing insights, learnings, and practical guides from my cloud technology journey.
        </p>
      </div>
      
      <div className="blog-preview__grid">
        {latestPosts.map((post) => (
          <BlogCard key={post.id} post={post} featured={post.featured} />
        ))}
      </div>
      
      <div className="blog-preview__footer">
        <Link to="/blog" className="blog-preview__view-all">
          View All Posts →
        </Link>
      </div>
    </section>
  );
};