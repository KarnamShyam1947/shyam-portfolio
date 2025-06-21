import React from 'react';
import { Code, Layout, Server, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useDataStore } from '../store/dataStore';

const Skills: React.FC = () => {
  const { colorScheme } = useTheme();
  const { skills } = useDataStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className={`w-6 h-6 text-${colorScheme}-500`} />;
      case 'Server':
        return <Server className={`w-6 h-6 text-${colorScheme}-500`} />;
      case 'Database':
        return <Database className={`w-6 h-6 text-${colorScheme}-500`} />;
      default:
        return <Code className={`w-6 h-6 text-${colorScheme}-500`} />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Skills & Expertise</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, index) => (
            <div 
              key={category.id}
              className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                {getIcon(category.icon)}
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className={`flex items-center text-slate-700 dark:text-slate-300`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-${colorScheme}-500 mr-3`}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;