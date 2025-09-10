import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BlogList } from '../components/Blog/BlogList';
import { ContactModal } from '../components/ContactModal';

export const BlogPage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <div className="site-wrapper">
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
          <button 
            onClick={() => setIsContactModalOpen(true)} 
            className="header__contact-btn"
          >
            Contact Me
          </button>
        </nav>
      </header>

      {/* Blog Content */}
      <main className="main-content">
        <BlogList />
      </main>

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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};