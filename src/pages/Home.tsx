import { Link } from 'react-router-dom';
import { BlogPreview } from '../components/Blog/BlogPreview';
import { ContactForm } from '../components/ContactForm';

export const Home = () => {
  return (
    <div className="site-wrapper">
      <div className="mobile-backdrop" onClick={() => {
        document.querySelector('.header__nav')?.classList.remove('active');
        document.querySelector('.header__hamburger')?.classList.remove('active');
        document.querySelector('.mobile-backdrop')?.classList.remove('active');
      }}></div>
      {/* Header */}
      <header className="header header--sticky">
        <div className="header__logo">{/* Logo */}
          <svg className="logo-icon" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 6.5C19.5 6.5 21.5 6.5 21.5 8.5C21.5 10.5 19.5 10.5 19.5 10.5H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 10.5C16.5 10.5 20.5 10.5 20.5 13.5C20.5 16.5 16.5 16.5 16.5 16.5H4.5C4.5 16.5 1.5 16.5 1.5 13.5C1.5 10.5 4.5 10.5 4.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 10.5C4.5 10.5 2.5 10.5 2.5 8.5C2.5 6.5 4.5 6.5 4.5 6.5H12.5C12.5 6.5 15.5 6.5 15.5 3.5C15.5 1.5 12.5 1.5 12.5 1.5H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">Sebastian Mateus</span>
        </div>
        <button className="header__hamburger" onClick={() => {
          const nav = document.querySelector('.header__nav');
          const hamburger = document.querySelector('.header__hamburger');
          const backdrop = document.querySelector('.mobile-backdrop');
          nav?.classList.toggle('active');
          hamburger?.classList.toggle('active');
          backdrop?.classList.toggle('active');
        }}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="header__nav">
          <a href="#about" onClick={() => {
            document.querySelector('.header__nav')?.classList.remove('active');
            document.querySelector('.header__hamburger')?.classList.remove('active');
          }}>My Journey</a>
          <a href="#services" onClick={() => {
            document.querySelector('.header__nav')?.classList.remove('active');
            document.querySelector('.header__hamburger')?.classList.remove('active');
          }}>My Roadmap</a>
          <Link to="/blog" onClick={() => {
            document.querySelector('.header__nav')?.classList.remove('active');
            document.querySelector('.header__hamburger')?.classList.remove('active');
          }}>Blog</Link>
          <a href="/resume.pdf" target="_blank" className="header__resume-btn">Resume</a>
          <a href="#contact" className="header__contact-btn" onClick={() => {
            document.querySelector('.header__nav')?.classList.remove('active');
            document.querySelector('.header__hamburger')?.classList.remove('active');
          }}>Contact Me</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__avatar">
          <img src="/propicv1.png" alt="J. Sebastian Mateus" className="avatar-image" />
        </div>
        <h1 className="hero__title">J. Sebastian Mateus</h1>
        <h2 className="hero__subtitle">Guiding Businesses into the Future with the Power of the Cloud</h2>
        <p className="hero__desc">A passionate technologist documenting my journey from large-scale IT operations to becoming an expert in Azure cloud infrastructure and automation.</p>
        <button className="hero__cta">Let's Connect</button>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2 className="about__heading">My Journey Into the Cloud</h2>
        <div className="about__content">
          <div className="about__bio">
            <p>
              My fascination with technology didn't start in the cloud, it started on the ground. For over five years, I've supported and managed the technology that people depend on every day, from mobile devices to complex enterprise endpoints. This experience taught me the real-world challenges businesses face with security, scalability, and efficiency. Now, my passion is focused on solving those challenges at their core—with robust, automated, and scalable cloud infrastructure on Microsoft Azure. This website is a living portfolio of my journey, my projects, and my learnings as I build my expertise and share my knowledge with the community.
            </p>
            <div className="about__diffs">
              <h3>My Core Values:</h3>
              <ul>
                <li><span className="about__icon">✔️</span> From Hands-On to Cloud-Scale</li>
                <li><span className="about__icon">✔️</span> Evangelist at Heart</li>
                <li><span className="about__icon">✔️</span> Bilingual Communicator</li>
              </ul>
            </div>
          </div>
          <div className="about__credentials">
            <div className="credentials__stats">
              <div className="stat-badge">
                <div className="stat-badge__number">5+</div>
                <div className="stat-badge__label">Years Enterprise IT Experience</div>
              </div>
              <div className="stat-badge">
                <div className="stat-badge__number">5000+</div>
                <div className="stat-badge__label">Devices Managed</div>
              </div>
              <div className="stat-badge">
                <div className="stat-badge__text">Bilingual</div>
                <div className="stat-badge__label">English/Spanish Support</div>
              </div>
              <div className="stat-badge">
                <div className="stat-badge__text">Atlanta Metro</div>
                <div className="stat-badge__label">Service Area</div>
              </div>
            </div>
            <div className="credentials__certifications">
              <div className="cert-badge">
                <div className="cert-badge__logos">
                  <span className="cert-logo azure-logo">⚡</span>
                  <span className="cert-logo m365-logo">📊</span>
                </div>
                <div className="cert-badge__title">Cloud Specialist</div>
                <div className="cert-badge__subtitle">Azure & Microsoft 365</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Offer Section */}
      <section className="services" id="services">
        <h2 className="services__heading">My Learning Roadmap & Areas of Focus</h2>
        <p className="services__subtitle">I believe in continuous learning. These are the key areas of cloud technology I am currently mastering, building upon my foundation in enterprise IT operations.</p>
        <div className="services__grid">
          <div className="service-card">
            <div className="service-card__icon">
              <img src="/microsoft-azure.svg" alt="Microsoft Azure" className="service-icon-image" />
            </div>
            <h3 className="service-card__title">Core Azure Infrastructure</h3>
            <p className="service-card__desc">Building expertise in Azure's IaaS offerings. My focus is on deploying and managing scalable virtual machines, storage solutions, and secure virtual networks, leveraging my strong understanding of networking fundamentals like TCP/IP, DNS, and NSGs.</p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <img src="/entra-icon.png" alt="Entra ID" className="service-icon-image entra-icon" />
            </div>
            <h3 className="service-card__title">Identity & Access Management (IAM)</h3>
            <p className="service-card__desc">Deepening my skills in modern identity solutions. Building on my hands-on experience with Azure AD/Entra ID, I am now focused on mastering Conditional Access, Privileged Identity Management (PIM), and complex hybrid identity scenarios.</p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <img src="/microsoft-intune.png" alt="Microsoft Intune" className="service-icon-image" />
            </div>
            <h3 className="service-card__title">Cloud-Native Endpoint Management</h3>
            <p className="service-card__desc">Evolving my current expertise in endpoint management into a cloud-first approach. My goal is to design and implement strategies using Microsoft Intune and Autopilot to manage and secure a diverse fleet of devices entirely from the cloud.</p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">⚙️</div>
            <h3 className="service-card__title">Infrastructure as Code (IaC) & Automation</h3>
            <p className="service-card__desc">Moving beyond manual configuration to automated deployments. I am actively learning Infrastructure as Code principles with Bicep and Terraform, expanding on my current proficiency with PowerShell to automate every aspect of the cloud lifecycle.</p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">🛡️</div>
            <h3 className="service-card__title">Cloud Security & Compliance</h3>
            <p className="service-card__desc">Applying my background in enterprise security compliance to the cloud. I am learning to implement robust security postures using Microsoft Defender for Cloud and to enforce governance through Azure Policy, building on my experience with rigorous QA protocols.</p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">📢</div>
            <h3 className="service-card__title">Technical Evangelism & Communication</h3>
            <p className="service-card__desc">My passion is not just to learn, but to share knowledge. I am dedicated to creating clear, accessible technical content, including articles and demos, in both English and Spanish to help demystify cloud technology for a wider audience.</p>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <BlogPreview />

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2 className="contact__heading">Let's Talk Tech</h2>
        <p className="contact__subtitle">Whether you want to discuss the future of cloud, dive into a technical project, or just connect with a fellow tech enthusiast, my inbox is always open.</p>
        <div className="contact__content">
          <ContactForm />
          <div className="contact__info">
            <div className="contact__info-card">
              <h4>Direct Contact Information</h4>
              <div className="contact__info-item"><span className="contact__info-icon">✉️</span> contact@techfluent.example.com</div>
              <div className="contact__info-item"><span className="contact__info-icon">📞</span> +1 (555) 123-4567</div>
            </div>
            <div className="contact__info-card">
              <h4>Connect on Social Media</h4>
              <div className="contact__socials">
                <a href="#" className="contact__social-link" aria-label="LinkedIn">🔗</a>
                <a href="#" className="contact__social-link" aria-label="Twitter">🐦</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__logo">
            <svg className="logo-icon" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 6.5C19.5 6.5 21.5 6.5 21.5 8.5C21.5 10.5 19.5 10.5 19.5 10.5H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 10.5C16.5 10.5 20.5 10.5 20.5 13.5C20.5 16.5 16.5 16.5 16.5 16.5H4.5C4.5 16.5 1.5 16.5 1.5 13.5C1.5 10.5 4.5 10.5 4.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 10.5C4.5 10.5 2.5 10.5 2.5 8.5C2.5 6.5 4.5 6.5 4.5 6.5H12.5C12.5 6.5 15.5 6.5 15.5 3.5C15.5 1.5 12.5 1.5 12.5 1.5H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Sebastian Mateus</span>
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