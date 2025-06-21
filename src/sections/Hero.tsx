import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getColorScheme, useTheme } from '../context/ThemeContext';
import { useDataStore } from '../store/dataStore';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const { heroSection } = useDataStore();

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const deleteSpeed = 50;
    const delayBetweenPhrases = 2000;
    
    const currentPhrase = heroSection.typingPhrases[currentPhraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenPhrases);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % heroSection.typingPhrases.length);
      } else if (isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }
    }, isDeleting ? deleteSpeed : typeSpeed);
    
    return () => clearTimeout(timer);
  }, [typedText, currentPhraseIndex, isDeleting, heroSection.typingPhrases]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center pt-16"
    >
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-${colorScheme}-300 dark:bg-${colorScheme}-500 rounded-full filter blur-3xl`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-${colorScheme}-300 dark:bg-${colorScheme}-500 rounded-full filter blur-3xl`}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* <div className="grid md:grid-cols-2 gap-12 items-center"> */}
          <div className="max-w-3xl">
            <p className={`${colors.accent} font-medium mb-4 animate-fadeIn`}>Hello, my name is</p>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4 animate-slideUp">
              {heroSection.name}
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-600 dark:text-slate-300 mb-6 h-12 animate-slideUp animation-delay-200">
              I'm a <span className={colors.accent}>{typedText}</span>
              <span className="animate-blink">|</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-8 max-w-2xl animate-slideUp animation-delay-400">
              {heroSection.description}
            </p>
            <div className="flex flex-wrap gap-4 animate-slideUp animation-delay-600">
              <a 
                href={heroSection.primaryButtonLink} 
                className={`px-6 py-3 ${colors.button} text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg`}
              >
                {heroSection.primaryButtonText}
              </a>
              <a 
                href={heroSection.secondaryButtonLink} 
                className={`px-6 py-3 bg-transparent border-2 ${colors.border} ${colors.accent} hover:bg-${colorScheme}-500/10 font-medium rounded-md transition-colors`}
              >
                {heroSection.secondaryButtonText}
              </a>
            </div>
          </div>
        {/* </div> */}
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ChevronDown className={colors.accent} size={30} />
        </a>
      </div>
    </section>
  );
};

export default Hero;