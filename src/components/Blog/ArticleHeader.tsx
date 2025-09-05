import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/blogUtils';

interface ArticleHeaderProps {
  post: BlogPost;
}

export const ArticleHeader = ({ post }: ArticleHeaderProps) => {
  return (
    <header className="article-header">
      <nav className="article-header__nav">
        <Link to="/blog" className="article-header__back-link">
          ← Back to Blog
        </Link>
      </nav>
      
      <div className="article-header__content">
        <div className="article-header__meta">
          <time className="article-header__date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="article-header__separator">•</span>
          <span className="article-header__read-time">{post.readTime}</span>
        </div>
        
        <h1 className="article-header__title">{post.title}</h1>
        
        <div className="article-header__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="article-header__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {post.image && (
        <div className="article-header__hero">
          <img 
            src={post.image} 
            alt={post.title} 
            className="article-header__hero-image"
          />
        </div>
      )}
    </header>
  );
};