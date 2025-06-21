export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images: { url: string; subtitle: string }[];
  categories: ('all' | 'web' | 'aiml' | 'blockchain' | 'devops')[];
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  overview: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  link: string;
  skills: string[];
}

export interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  points: string[];
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  points: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Skill {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  keywords: string[];
  type: 'journal' | 'conference' | 'preprint';
  status: 'published' | 'accepted' | 'under-review';
  link?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface HeroSection {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  typingPhrases: string[];
}