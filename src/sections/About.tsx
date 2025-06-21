import React from 'react';
import { getColorScheme, useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0 animate-fadeIn">
            <div className="relative">
              <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl">
                <img 
                  src="./about.jpg" 
                  alt="Shyam Karnam" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-6 -right-6 w-full h-full ${colors.border} rounded-2xl -z-10`}></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-7/12 lg:w-8/12">
            <div className="mb-6 flex items-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">About Me</h2>
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-grow ml-6"></div>
            </div>
            
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p className="animate-slideUp">
                Hello, I’m a Karnam Shyam, Experienced and results-driven professional with a good background in full-stack Java development and a passion for leveraging Python for AI, ML, and deep learning applications. Proven track record demonstrated through research papers showcasing expertise in these areas. 
              </p>
            </div>
            
            <div className="mt-8 animate-slideUp animation-delay-500">
              <a 
                href="./Resume-Shyam.pdf"
                className={`px-6 py-3 ${colors.button} text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg inline-block`}
              >
                Download resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;