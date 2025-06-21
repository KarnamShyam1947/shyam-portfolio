import React, { useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { getColorScheme } from '../context/ThemeContext';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cs = {
    all: 'All Projects',
    web: 'Web Development',
    aiml: 'AI / ML',
    blockchain: 'Blockchain',
    devops: 'Cloud & DevOps'
  }


  return (
    <>
      <div
        className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fadeIn cursor-pointer group"
        style={{ animationDelay: `${index * 150}ms` }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white ${colors.button} p-2 rounded-full transition-colors`}
                  aria-label="Visit live site"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-slate-700 hover:bg-slate-800 p-2 rounded-full transition-colors"
                  aria-label="View source code"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex-grow">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className={`inline-block px-3 py-1 text-xs font-medium bg-${colorScheme}-100 dark:bg-${colorScheme}-900/20 text-${colorScheme}-800 dark:text-${colorScheme}-200 rounded-full`}
                >
                  {cs[cat]}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 text-xs bg-${colorScheme}-50 dark:bg-${colorScheme}-900/10 text-${colorScheme}-700 dark:text-${colorScheme}-300 rounded`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{project.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            <div className="p-6">
              {/* Main Image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Project Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Overview</h3>
                    <p className="text-slate-600 dark:text-slate-300">{project.overview}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm bg-${colorScheme}-100 dark:bg-${colorScheme}-900/20 text-${colorScheme}-800 dark:text-${colorScheme}-200`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
                      >
                        <ExternalLink size={18} />
                        Visit Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg flex items-center gap-2"
                      >
                        <Github size={18} />
                        View Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column - Additional Images with Subtitles */}
                <div className="space-y-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={`${project.title} - ${image.subtitle}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="bg-slate-50 dark:bg-slate-700 p-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          {image.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;