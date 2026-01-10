import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getColorScheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  
  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/karnamshyam1947', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Mail size={20} />, href: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-2xl font-bold">
              <span className={colors.accent}>S</span>hyam
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-600 dark:text-slate-300 ${colors.accentHover} transition-colors`}
                // className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#home" className={`text-slate-600 dark:text-slate-300 ${colors.accentHover} transition-colors`}>
              Home
            </a>
            <a href="#about" className={`text-slate-600 dark:text-slate-300 ${colors.accentHover} transition-colors`}>
              About
            </a>
            <a href="#skills" className={`text-slate-600 dark:text-slate-300 ${colors.accentHover} transition-colors`}>
              Skills
            </a>
            <a href="#projects" className={`text-slate-600 dark:text-slate-300 ${colors.accentHover} transition-colors`}>
              Projects
            </a>
            <a href="#contact" className={`text-slate-600 dark:text-slate-300 ${colors.accentHover} transition-colors`}>
              Contact
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            © {currentYear} Karnam Shyam. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;