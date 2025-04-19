
// Types for our data models
export interface Agent {
  id: string;
  name: string;
  avatar: string;
  creator: string;
  creatorId: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  modelType: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface Review {
  id: string;
  agentId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  comment: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'creator' | 'admin';
  createdAt: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

// Sample agents data
export const agents: Agent[] = [
  {
    id: '1',
    name: 'CopyGenius',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'Alex Johnson',
    creatorId: 'user1',
    price: 49.99,
    rating: 4.8,
    reviewCount: 124,
    description: 'CopyGenius is an advanced AI copywriting assistant that generates high-converting marketing copy, product descriptions, and social media content. It understands your brand voice and adjusts its output to match your tone and style preferences. With over 20 templates and support for 12 languages, it\'s the perfect tool for marketers and content creators who need to produce quality content at scale.',
    shortDescription: 'Advanced AI copywriting assistant for marketing and content creation',
    category: 'Content Creation',
    tags: ['copywriting', 'marketing', 'content'],
    modelType: 'GPT-4',
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-09-22T14:45:00Z',
    featured: true
  },
  {
    id: '2',
    name: 'DataVizPro',
    avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'Samantha Lee',
    creatorId: 'user2',
    price: 79.99,
    rating: 4.6,
    reviewCount: 87,
    description: 'DataVizPro transforms your raw data into beautiful, interactive visualizations automatically. Upload CSV, Excel, or connect to your database and watch as it analyzes patterns and creates the most appropriate charts and graphs. Features include customizable themes, export options, and embedded analytics for your website.',
    shortDescription: 'AI-powered data visualization tool that transforms raw data into insightful charts',
    category: 'Data Analysis',
    tags: ['data visualization', 'analytics', 'charts'],
    modelType: 'Custom AI',
    createdAt: '2023-06-20T09:15:00Z',
    updatedAt: '2023-10-05T11:30:00Z',
    featured: true
  },
  {
    id: '3',
    name: 'CodeCompanion',
    avatar: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'David Chen',
    creatorId: 'user3',
    price: 39.99,
    rating: 4.9,
    reviewCount: 215,
    description: 'CodeCompanion is your AI pair programmer that helps you write better code faster. It suggests code completions, refactors your existing code, and helps debug issues with detailed explanations. Supports all major programming languages including JavaScript, Python, Java, C++, and more. Integration available for VS Code, JetBrains IDEs, and as a web application.',
    shortDescription: 'AI pair programmer that helps write, refactor, and debug code',
    category: 'Development',
    tags: ['coding', 'programming', 'development'],
    modelType: 'Codex',
    createdAt: '2023-04-10T13:20:00Z',
    updatedAt: '2023-09-15T08:45:00Z',
    featured: true
  },
  {
    id: '4',
    name: 'VoiceGenius',
    avatar: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'Maria Rodriguez',
    creatorId: 'user4',
    price: 59.99,
    rating: 4.7,
    reviewCount: 93,
    description: 'VoiceGenius converts your text into natural-sounding speech in over 30 languages and 100+ voice options. Perfect for creating voiceovers for videos, podcasts, audiobooks, and accessibility applications. Features include custom voice training, emotion control, and batch processing.',
    shortDescription: 'Text-to-speech AI that creates natural voiceovers in multiple languages',
    category: 'Audio & Voice',
    tags: ['voice', 'audio', 'text-to-speech'],
    modelType: 'WaveNet',
    createdAt: '2023-07-05T16:40:00Z',
    updatedAt: '2023-10-10T12:15:00Z',
    featured: false
  },
  {
    id: '5',
    name: 'DesignDreamer',
    avatar: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'James Wilson',
    creatorId: 'user5',
    price: 69.99,
    rating: 4.5,
    reviewCount: 152,
    description: 'DesignDreamer is an AI design assistant that helps you create professional graphics, logos, and UI designs. Simply describe what you want or upload a rough sketch, and it will generate multiple design options. Includes editing tools, brand asset management, and export in various formats.',
    shortDescription: 'AI design assistant for creating professional graphics and UI designs',
    category: 'Design',
    tags: ['design', 'graphics', 'UI/UX'],
    modelType: 'DALL-E',
    createdAt: '2023-03-25T11:10:00Z',
    updatedAt: '2023-09-30T14:20:00Z',
    featured: false
  },
  {
    id: '6',
    name: 'SEOMaster',
    avatar: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'Emily Parker',
    creatorId: 'user6',
    price: 89.99,
    rating: 4.7,
    reviewCount: 78,
    description: 'SEOMaster analyzes your website and provides actionable recommendations to improve your search engine rankings. It identifies keyword opportunities, technical SEO issues, and content optimization suggestions. Includes competitor analysis, backlink monitoring, and regular performance reports.',
    shortDescription: 'AI-powered SEO assistant that improves your website rankings',
    category: 'Marketing',
    tags: ['SEO', 'marketing', 'analytics'],
    modelType: 'Custom AI',
    createdAt: '2023-08-15T15:30:00Z',
    updatedAt: '2023-10-12T09:45:00Z',
    featured: false
  },
  {
    id: '7',
    name: 'SalesWhisperer',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'Michael Brown',
    creatorId: 'user7',
    price: 99.99,
    rating: 4.8,
    reviewCount: 65,
    description: 'SalesWhisperer is your AI sales coach that analyzes customer conversations and provides real-time suggestions to improve conversion. It identifies buying signals, objection patterns, and recommends the most effective responses. Integrates with major CRM systems and includes sales performance analytics.',
    shortDescription: 'AI sales coach that improves conversion rates through conversation analysis',
    category: 'Sales',
    tags: ['sales', 'CRM', 'conversion'],
    modelType: 'GPT-4',
    createdAt: '2023-05-30T12:50:00Z',
    updatedAt: '2023-09-25T10:30:00Z',
    featured: false
  },
  {
    id: '8',
    name: 'LegalDrafter',
    avatar: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=300',
    creator: 'Sarah Thompson',
    creatorId: 'user8',
    price: 129.99,
    rating: 4.6,
    reviewCount: 42,
    description: 'LegalDrafter creates and reviews legal documents using AI trained on millions of legal precedents. It generates contracts, agreements, and legal letters based on your requirements, highlighting potential issues and suggesting improvements. All documents are reviewed for compliance with current laws and regulations.',
    shortDescription: 'AI legal assistant that creates and reviews contracts and agreements',
    category: 'Legal',
    tags: ['legal', 'contracts', 'compliance'],
    modelType: 'GPT-4',
    createdAt: '2023-07-20T14:15:00Z',
    updatedAt: '2023-10-15T16:20:00Z',
    featured: false
  }
];

// Sample reviews data
export const reviews: Review[] = [
  {
    id: 'r1',
    agentId: '1',
    userId: 'u101',
    userName: 'Mark Wilson',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 5,
    comment: 'CopyGenius has transformed our marketing efforts. We\'re producing 3x more content with the same team size, and the quality is consistently excellent.',
    date: '2023-09-15T10:20:00Z'
  },
  {
    id: 'r2',
    agentId: '1',
    userId: 'u102',
    userName: 'Jennifer Adams',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 4,
    comment: 'Very impressed with the quality of copy this AI produces. It needed some training to match our brand voice perfectly, but now it\'s an indispensable part of our workflow.',
    date: '2023-08-22T14:30:00Z'
  },
  {
    id: 'r3',
    agentId: '1',
    userId: 'u103',
    userName: 'Robert Chen',
    userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 5,
    comment: 'As a solo entrepreneur, CopyGenius is like having a marketing team in my pocket. It\'s helped me create professional content that converts.',
    date: '2023-09-30T09:15:00Z'
  },
  {
    id: 'r4',
    agentId: '2',
    userId: 'u104',
    userName: 'Lisa Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 5,
    comment: 'DataVizPro has revolutionized how we present data to clients. What used to take hours now takes minutes, and the visualizations are stunning.',
    date: '2023-09-05T16:45:00Z'
  },
  {
    id: 'r5',
    agentId: '2',
    userId: 'u105',
    userName: 'Daniel Smith',
    userAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    rating: 4,
    comment: 'Great tool for quickly generating data visualizations. The pattern recognition is impressive and has helped us identify trends we would have missed.',
    date: '2023-08-18T11:20:00Z'
  },
  {
    id: 'r6',
    agentId: '3',
    userId: 'u106',
    userName: 'Michelle Park',
    userAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    rating: 5,
    comment: 'CodeCompanion is like having a senior developer looking over your shoulder. It\'s caught bugs I would have missed and suggested optimizations that significantly improved performance.',
    date: '2023-09-12T13:10:00Z'
  },
  {
    id: 'r7',
    agentId: '3',
    userId: 'u107',
    userName: 'Chris Taylor',
    userAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    rating: 5,
    comment: 'This tool has accelerated my coding speed by at least 40%. The suggestions are smart and context-aware, and the debugging help is invaluable.',
    date: '2023-08-29T15:35:00Z'
  }
];

// Sample testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    role: 'Marketing Director',
    company: 'GlobalTech Inc.',
    comment: 'Navora has completely transformed our approach to content creation. The AI agents we\'ve purchased have increased our productivity by 300% while maintaining our brand voice perfectly.'
  },
  {
    id: 't2',
    name: 'Jason Kim',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'Software Engineer',
    company: 'Innovate Solutions',
    comment: 'As a developer, I was skeptical about AI coding assistants. But the CodeCompanion agent from Navora has become an essential part of my workflow. It\'s like having a brilliant senior developer always available to help.'
  },
  {
    id: 't3',
    name: 'Sophia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    role: 'Founder & CEO',
    company: 'CreativeMinds Agency',
    comment: 'Not only am I a customer, but I\'m also a creator on Navora. The platform has given my AI agents global reach and provided a steady passive income stream that has exceeded my expectations.'
  },
  {
    id: 't4',
    name: 'David Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    role: 'Data Scientist',
    company: 'AnalyticsPro',
    comment: 'The quality of AI agents on Navora is unmatched. I\'ve tried similar marketplaces, but the combination of excellent technology and rigorous quality standards makes Navora stand out from the competition.'
  }
];

// Sample revenue data for creator dashboard
export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 1398 },
  { month: 'Mar', revenue: 9800 },
  { month: 'Apr', revenue: 3908 },
  { month: 'May', revenue: 4800 },
  { month: 'Jun', revenue: 3800 },
  { month: 'Jul', revenue: 4300 },
  { month: 'Aug', revenue: 5300 },
  { month: 'Sep', revenue: 4900 },
  { month: 'Oct', revenue: 6300 },
  { month: 'Nov', revenue: 5400 },
  { month: 'Dec', revenue: 7200 }
];

// Helper function to get agent by ID
export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};

// Helper function to get reviews by agent ID
export const getReviewsByAgentId = (agentId: string): Review[] => {
  return reviews.filter(review => review.agentId === agentId);
};

// Helper function to format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
