import type { BlogPost } from '../types/blog';
import azureFundamentalsContent from './posts/azure-fundamentals-journey.md?raw';
import powershellAutomationContent from './posts/powershell-automation-tips.md?raw';
import intuneDeviceManagementContent from './posts/intune-device-management.md?raw';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My Journey to Azure Fundamentals Certification',
    slug: 'azure-fundamentals-journey',
    excerpt: 'After years of working in traditional on-premises IT environments, I decided it was time to embrace the cloud. Learn about my experience getting certified in Azure Fundamentals and how it transformed my career perspective.',
    date: '2024-03-15',
    tags: ['Azure', 'Certification', 'Cloud', 'Career'],
    image: '/blog-images/azure-fundamentals.jpg',
    readTime: '5 min read',
    featured: true,
    content: azureFundamentalsContent
  },
  {
    id: '2',
    title: 'PowerShell Automation: 5 Scripts Every IT Pro Should Know',
    slug: 'powershell-automation-tips',
    excerpt: 'PowerShell has revolutionized how IT professionals manage Windows environments. Discover five essential automation scripts that will save you countless hours of repetitive work and improve your workflow efficiency.',
    date: '2024-02-28',
    tags: ['PowerShell', 'Automation', 'IT Operations', 'Scripts'],
    image: '/blog-images/powershell-automation.jpg',
    readTime: '7 min read',
    featured: true,
    content: powershellAutomationContent
  },
  {
    id: '3',
    title: 'Modern Device Management with Microsoft Intune',
    slug: 'intune-device-management',
    excerpt: 'The shift to remote work has fundamentally changed how organizations manage devices. Explore how Microsoft Intune provides comprehensive mobile device management and application management for the modern workplace.',
    date: '2024-02-10',
    tags: ['Intune', 'Device Management', 'Cloud', 'Security'],
    image: '/blog-images/intune-device-management.jpg',
    readTime: '6 min read',
    featured: true,
    content: intuneDeviceManagementContent
  }
];