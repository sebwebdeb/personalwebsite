import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/blogUtils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <article className={`blog-card ${featured ? 'blog-card--featured' : ''}`}>
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        {post.image && (
          <div className="blog-card__image">
            <img src={post.image} alt={post.title} />
          </div>
        )}
        <div className="blog-card__content">
          <div className="blog-card__meta">
            <time className="blog-card__date">{formatDate(post.date)}</time>
            <span className="blog-card__read-time">{post.readTime}</span>
          </div>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};