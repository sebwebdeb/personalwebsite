# Sebastian Mateus - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing cloud technology expertise and IT operations background. Features a complete markdown-based blog system for sharing technical insights and professional journey. Built with React 19, TypeScript, and Vite for optimal performance and developer experience.

## 🚀 Tech Stack

### Core Framework
- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Language**: TypeScript (~5.8.3)
- **Routing**: React Router DOM 7.8.2

### Styling & UI
- **Styling**: Tailwind CSS 4.1.11 + Custom CSS (BEM methodology)
- **Responsive Design**: Mobile-first approach
- **Icons & Assets**: SVG icons, optimized images

### Blog System
- **Markdown Rendering**: React Markdown 10.1.0
- **Syntax Highlighting**: React Syntax Highlighter 15.6.6
- **GitHub Flavored Markdown**: Remark GFM 4.0.1
- **Content Management**: File-based markdown posts

### Development Tools
- **Linting**: ESLint 9.30.1 with TypeScript ESLint
- **Type Checking**: TypeScript ~5.8.3
- **Package Manager**: npm

## 📁 Project Structure

```
personal-website/
├── src/
│   ├── components/
│   │   └── Blog/             # Blog-specific components
│   │       ├── BlogCard.tsx        # Reusable blog post card
│   │       ├── BlogList.tsx        # Blog listing with search/filters
│   │       ├── BlogPost.tsx        # Individual blog post renderer
│   │       └── BlogPreview.tsx     # Homepage blog preview section
│   ├── pages/
│   │   ├── Home.tsx          # Homepage with all main sections
│   │   └── BlogPage.tsx      # Full blog listing page
│   ├── data/
│   │   ├── blogPosts.ts      # Blog metadata and content imports
│   │   └── posts/            # Individual markdown blog posts
│   │       ├── azure-fundamentals-journey.md
│   │       ├── powershell-automation-tips.md
│   │       └── intune-device-management.md
│   ├── types/
│   │   └── blog.ts           # TypeScript interfaces for blog
│   ├── utils/
│   │   └── blogUtils.ts      # Helper functions (search, filtering)
│   ├── assets/
│   │   └── react.svg         # React logo asset
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Main router component
│   ├── App.css               # Global styles (includes blog styles)
│   ├── index.css             # CSS resets and base styles
│   └── vite-env.d.ts         # Vite type definitions
├── public/
│   ├── blog-images/          # Blog post images
│   ├── vite.svg              # Vite favicon
│   ├── propicv1.png          # Profile picture
│   ├── microsoft-azure.svg   # Azure service icon
│   ├── entra-icon.png        # Microsoft Entra ID icon
│   └── microsoft-intune.png  # Microsoft Intune icon
├── blog-implementation-guide.md  # Comprehensive blog system documentation
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript project references
├── tsconfig.app.json         # TypeScript app configuration
├── tsconfig.node.json        # TypeScript Node.js configuration
└── eslint.config.js          # ESLint configuration
```

## 🏗️ Architecture Overview

### Multi-Page Application with React Router
The website is built as a multi-page application using React Router for client-side navigation. This architecture provides:
- **Fast navigation** between routes
- **SEO-friendly URLs** for each page/blog post
- **Code splitting** capabilities for performance
- **Bookmarkable content** with direct URL access

### Routing Structure
```typescript
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />                    // Homepage
        <Route path="/blog" element={<BlogPage />} />            // Blog listing
        <Route path="/blog/:slug" element={<BlogPost />} />      // Individual posts
      </Routes>
    </Router>
  );
}
```

### Page Components Structure

#### Home Page (`src/pages/Home.tsx`)
```typescript
function Home() {
  return (
    <div className="site-wrapper">
      <Header />              // Navigation with blog link
      <HeroSection />         // Introduction and call-to-action
      <AboutSection />        // Personal journey and credentials  
      <ServicesSection />     // Learning roadmap and focus areas
      <BlogPreview />         // Latest 3 blog posts preview
      <ContactSection />      // Contact form and information
      <Footer />             // Copyright and additional branding
    </div>
  );
}
```

#### Blog Architecture
The blog system follows a component-based architecture:
- **BlogPreview**: Homepage integration showing latest posts
- **BlogPage**: Full blog listing with search and filtering
- **BlogPost**: Individual post renderer with markdown support
- **BlogCard**: Reusable post preview component

### Styling Architecture
- **Global Styles**: `src/index.css` - Contains CSS resets, root variables, and base element styles
- **Component Styles**: `src/App.css` - All component styling using BEM methodology (includes blog styles)
- **Tailwind CSS**: Utility classes for rapid development and consistent spacing
- **CSS Custom Properties**: Used for theme colors and consistent design tokens
- **Blog Styling**: Fully integrated with existing design system for consistency

### Content Management
The blog uses a file-based content management approach:
- **Markdown Posts**: Individual `.md` files in `src/data/posts/`
- **Metadata**: Centralized in `src/data/blogPosts.ts` with imports
- **Type Safety**: Full TypeScript interfaces for blog data
- **Search & Filtering**: Client-side functionality with utility functions

### TypeScript Configuration
The project uses a modern TypeScript setup with:
- **Strict Mode**: Enabled for type safety
- **ES2022 Target**: Modern JavaScript features
- **Module Resolution**: Bundler mode for Vite compatibility
- **JSX Transform**: React 17+ automatic JSX runtime

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot module replacement |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🎨 Key Features

### Portfolio Features
- **Professional Design**: Modern, clean interface with consistent branding
- **Responsive Layout**: Mobile-first approach with flexible grid systems
- **Performance Optimized**: Vite's fast build system and optimized assets
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation

### Blog System Features
- **Markdown Support**: Full GitHub Flavored Markdown rendering
- **Syntax Highlighting**: Code blocks with language-specific highlighting
- **Search & Filter**: Real-time search and tag-based filtering
- **SEO Friendly**: Individual URLs for each blog post
- **Responsive Design**: Mobile-optimized blog reading experience
- **Navigation**: Previous/next post navigation within blog posts

### Technical Features
- **TypeScript**: Full type safety across all components
- **Modern React**: React 19 with latest features and patterns
- **Client-side Routing**: Fast navigation with React Router
- **Performance**: Optimized builds with code splitting capabilities
- **Developer Experience**: Hot module replacement, ESLint, and modern tooling

### Content Features
- **Technical Blog Posts**: Azure, PowerShell, and Intune expertise
- **Portfolio Sections**: About, services, credentials, and contact
- **Asset Management**: Optimized images and icons

## 🧩 Component Breakdown

### Core Components

#### Header Component (`src/pages/Home.tsx` & `src/pages/BlogPage.tsx`)
- **Features**: Logo with SVG icon, navigation menu, blog link, contact button
- **Styling**: Fixed positioning, subtle shadow, responsive design
- **Navigation**: Links to home sections and blog

#### Hero Section (`src/pages/Home.tsx`)
- **Features**: Profile image, name/title, description, CTA button
- **Assets**: Uses `propicv1.png` from public folder
- **Purpose**: First impression and professional introduction

#### About Section (`src/pages/Home.tsx`)
- **Features**: Personal bio, core values list, statistics badges, certifications
- **Layout**: Two-column design with bio and credentials
- **Content**: IT experience, Azure expertise, bilingual capability

#### Services Section (`src/pages/Home.tsx`)
- **Features**: Six service cards with icons and descriptions
- **Focus Areas**: Azure Infrastructure, IAM, Endpoint Management, IaC, Security, Evangelism
- **Styling**: Grid layout with hover effects

### Blog Components

#### BlogPreview (`src/components/Blog/BlogPreview.tsx`)
- **Location**: Integrated into homepage between Services and Contact
- **Features**: Shows 3 latest blog posts, "View All Posts" button
- **Purpose**: Homepage blog integration

#### BlogCard (`src/components/Blog/BlogCard.tsx`)
- **Features**: Post title, excerpt, date, read time, tags, featured image
- **Reusable**: Used in both BlogPreview and BlogList components
- **Styling**: Card design with hover effects matching site theme

#### BlogList (`src/components/Blog/BlogList.tsx`)
- **Features**: All posts display, search functionality, tag filtering
- **Interactive**: Real-time search and filter by tags
- **Layout**: Responsive grid with "no results" state

#### BlogPost (`src/components/Blog/BlogPost.tsx`)
- **Features**: Full markdown rendering, syntax highlighting, navigation
- **Components**: Back button, post metadata, content, prev/next navigation
- **Markdown**: GitHub Flavored Markdown with code syntax highlighting

### Footer Component
- **Location**: All pages
- **Features**: Logo repetition, copyright notice, brand message

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow React functional component patterns
- Use descriptive component and variable names
- Maintain consistent indentation (2 spaces)

### CSS Conventions
- Follow BEM (Block Element Modifier) methodology
- Use semantic class names
- Maintain consistent spacing units
- Group related styles together

### Asset Management
- Store static assets in the `public/` folder
- Blog images go in `public/blog-images/` folder
- Use appropriate image formats (PNG for photos, SVG for icons)
- Optimize images for web delivery
- Include alt text for all images

### Blog Content Guidelines
- Create markdown files in `src/data/posts/` with descriptive filenames
- Add post metadata to `src/data/blogPosts.ts` with proper imports
- Follow consistent frontmatter structure
- Use appropriate tags for categorization
- Include estimated read time calculations

## 🚀 Deployment

### Build Process
```bash
npm run build
```

This creates a `dist/` folder with:
- Optimized and minified JavaScript bundles
- Processed CSS files
- Static assets with cache-friendly filenames
- Production-ready `index.html`

### Deployment Options
The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

## 🔮 Future Enhancements

### Content & Features
- **Backend Integration**: Contact form functionality with email service
- **Blog Enhancements**: RSS feed, blog post categories, author bio sections
- **Project Portfolio**: Dedicated section for technical projects and demos
- **Multi-language Support**: Full English/Spanish implementation for global audience
- **Comments System**: Blog post commenting and engagement features

### Technical Improvements
- **Dark Mode**: Theme switching capability with user preference persistence
- **Analytics Integration**: Visitor tracking and insights (Google Analytics, Plausible)
- **SEO Optimization**: Enhanced meta tags, structured data, and sitemap generation
- **Performance**: Image optimization, lazy loading, and advanced caching strategies
- **Search**: Full-text search across all blog content with search indexing

### User Experience
- **Newsletter**: Email subscription for blog updates
- **Social Sharing**: Enhanced social media integration for blog posts
- **Reading Progress**: Progress indicators for longer blog posts
- **Bookmarking**: User ability to bookmark and save favorite posts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is personal portfolio website. All rights reserved.

## 📚 Blog Content

The website features technical blog posts covering:

### Current Posts
1. **"My Journey to Azure Fundamentals Certification"** (`azure-fundamentals-journey`)
   - Personal experience with AZ-900 certification
   - Study strategies and key takeaways
   - Career transition insights

2. **"PowerShell Automation: 5 Scripts Every IT Pro Should Know"** (`powershell-automation-tips`)
   - Practical PowerShell automation scripts
   - Real-world IT operations examples
   - Code snippets with explanations

3. **"Modern Device Management with Microsoft Intune"** (`intune-device-management`)
   - Cloud-native device management strategies
   - Implementation best practices
   - Remote work considerations

### Content Focus Areas
- **Azure Cloud Infrastructure**: IaaS, networking, security
- **PowerShell Automation**: Scripts, workflows, operations
- **Microsoft Intune**: Device management, policies, deployment
- **IT Operations**: Enterprise environments, troubleshooting
- **Career Development**: Cloud transition, certifications, learning paths

## 🌐 Live Demo

The development server runs on `http://localhost:5173` with:
- Homepage with portfolio and blog preview
- Full blog listing at `/blog`
- Individual blog posts at `/blog/[post-slug]`
- Real-time hot module replacement for development

---

**Built with ❤️ by Sebastian Mateus**  
*Empowering businesses through technology*

**Blog System Implementation**: Complete markdown-based blog with search, filtering, and syntax highlighting
**Architecture**: Modern React 19 + TypeScript + Vite with client-side routing
