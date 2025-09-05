import { useState, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import { blogPosts } from '../../data/blogPosts';
import { filterPostsByTag, searchPosts } from '../../utils/blogUtils';

export const BlogList = () => {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];
    
    if (searchQuery) {
      posts = searchPosts(posts, searchQuery);
    }
    
    if (selectedTag) {
      posts = filterPostsByTag(posts, selectedTag);
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedTag, searchQuery]);

  return (
    <div className="blog-list">
      <div className="blog-list__header">
        <h1 className="blog-list__title">Tech Articles & Insights</h1>
        <p className="blog-list__subtitle">
          Documenting my journey from enterprise IT operations to cloud expertise
        </p>
      </div>

      <div className="blog-list__filters">
        <div className="blog-list__search">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-list__search-input"
          />
        </div>
        
        <div className="blog-list__tags">
          <button
            onClick={() => setSelectedTag('')}
            className={`blog-list__tag-filter ${!selectedTag ? 'blog-list__tag-filter--active' : ''}`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`blog-list__tag-filter ${selectedTag === tag ? 'blog-list__tag-filter--active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-list__grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <div className="blog-list__no-results">
            <p>No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};