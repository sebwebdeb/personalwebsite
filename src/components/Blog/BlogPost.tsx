import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../../data/blogPosts';
import { getPostBySlug } from '../../utils/blogUtils';
import { ArticleHeader } from './ArticleHeader';
import { TableOfContents } from './TableOfContents';
import { ReadingProgress } from './ReadingProgress';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(blogPosts, slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;


  return (
    <div className="site-wrapper">
      <ReadingProgress />
      
      {/* Header */}
      <header className="header">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <svg className="logo-icon" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 6.5C19.5 6.5 21.5 6.5 21.5 8.5C21.5 10.5 19.5 10.5 19.5 10.5H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 10.5C16.5 10.5 20.5 10.5 20.5 13.5C20.5 16.5 16.5 16.5 16.5 16.5H4.5C4.5 16.5 1.5 16.5 1.5 13.5C1.5 10.5 4.5 10.5 4.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 10.5C4.5 10.5 2.5 10.5 2.5 8.5C2.5 6.5 4.5 6.5 4.5 6.5H12.5C12.5 6.5 15.5 6.5 15.5 3.5C15.5 1.5 12.5 1.5 12.5 1.5H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Sebastian Mateus</span>
          </Link>
        </div>
        <nav className="header__nav">
          <Link to="/#about">My Journey</Link>
          <Link to="/#services">My Roadmap</Link>
          <Link to="/blog">Blog</Link>
          <a href="/resume.pdf" target="_blank" className="header__resume-btn">Resume</a>
          <Link to="/#contact" className="header__contact-btn">Contact Me</Link>
        </nav>
      </header>
      
      <article className="blog-article">
        <ArticleHeader post={post} />
        
        <div className="blog-article__container">
          <aside className="blog-article__sidebar">
            <TableOfContents content={post.content} />
          </aside>
          
          <main className="blog-article__content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  return !isInline ? (
                    <div className="code-block">
                      <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag="div"
                        showLineNumbers
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                },
                blockquote({ children }) {
                  return <blockquote className="article-blockquote">{children}</blockquote>;
                },
                ul({ children }) {
                  return <ul className="article-list">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="article-list article-list--ordered">{children}</ol>;
                },
                img({ src, alt, ...props }) {
                  return (
                    <figure className="article-figure">
                      <img src={src} alt={alt} className="article-image" {...props} />
                      {alt && <figcaption className="article-caption">{alt}</figcaption>}
                    </figure>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </main>
        </div>

        <footer className="blog-article__footer">
          <div className="blog-article__author">
            <div className="author-bio">
              <h3 className="author-bio__title">About the Author</h3>
              <p className="author-bio__text">
                IT Professional passionate about cloud technologies, automation, and modern IT operations. 
                Sharing insights from real-world experience with Azure, PowerShell, and Intune.
              </p>
            </div>
          </div>
          
          <nav className="blog-article__navigation">
            {prevPost && (
              <Link to={`/blog/${prevPost.slug}`} className="blog-nav-link blog-nav-link--prev">
                <span className="blog-nav-link__direction">← Previous Article</span>
                <span className="blog-nav-link__title">{prevPost.title}</span>
              </Link>
            )}
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="blog-nav-link blog-nav-link--next">
                <span className="blog-nav-link__direction">Next Article →</span>
                <span className="blog-nav-link__title">{nextPost.title}</span>
              </Link>
            )}
          </nav>
        </footer>
      </article>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__logo">
            <Link to="/" className="footer__logo-link">
              <svg className="logo-icon" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 6.5C19.5 6.5 21.5 6.5 21.5 8.5C21.5 10.5 19.5 10.5 19.5 10.5H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 10.5C16.5 10.5 20.5 10.5 20.5 13.5C20.5 16.5 16.5 16.5 16.5 16.5H4.5C4.5 16.5 1.5 16.5 1.5 13.5C1.5 10.5 4.5 10.5 4.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10.5C4.5 10.5 2.5 10.5 2.5 8.5C2.5 6.5 4.5 6.5 4.5 6.5H12.5C12.5 6.5 15.5 6.5 15.5 3.5C15.5 1.5 12.5 1.5 12.5 1.5H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">Sebastian Mateus</span>
            </Link>
          </div>
          <div className="footer__copyright">
            © 2025 Sebastian Mateus. All rights reserved.<br />
            Empowering businesses through technology.
          </div>
        </div>
      </footer>
    </div>
  );
};