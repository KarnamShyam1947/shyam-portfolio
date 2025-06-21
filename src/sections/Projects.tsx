import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { useDataStore } from '../store/dataStore';
import { useTheme } from '../context/ThemeContext';
import { getColorScheme } from '../context/ThemeContext';

type ProjectCategory = 'all' | 'web' | 'aiml' | 'blockchain' | 'devops';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const { projects } = useDataStore();

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'aiml', label: 'AI / ML' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'devops', label: 'Cloud & DevOps' },
  ];
  
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.categories.includes(activeCategory));

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">My Projects</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project represents a unique challenge and demonstrates different aspects of my skills and expertise.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                  ? colors.button + ' text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Projects Yet</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Projects will appear here once they are added through the dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;