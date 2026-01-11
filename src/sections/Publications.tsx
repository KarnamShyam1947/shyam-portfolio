import React from 'react';
import { BookOpen, ExternalLink, Calendar, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getColorScheme } from '../context/ThemeContext';
import { useDataStore } from '../store/dataStore';

const Publications: React.FC = () => {
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const { publications } = useDataStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal':
        return '📄';
      case 'conference':
        return '🎤';
      case 'preprint':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <section id="publications" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className={`w-8 h-8 text-${colorScheme}-500`} />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Publications</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Research papers and publications showcasing my contributions to the field of computer science and web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {publications.map((publication, index) => (
            <div
              key={publication._id}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(publication.type)}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(publication.status)}`}>
                    {publication.status.replace('-', ' ')}
                  </span>
                </div>
                {publication.link && (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 ${colors.button} text-white rounded-full hover:scale-110 transition-transform`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                {publication.title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{publication.authors.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{publication.year}</span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">
                {publication.journal}
              </p>

              {publication.doi && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  DOI: {publication.doi}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((keyword, keywordIndex) => (
                  <span
                    key={keywordIndex}
                    className={`px-2 py-1 text-xs bg-${colorScheme}-50 dark:bg-${colorScheme}-900/10 text-${colorScheme}-700 dark:text-${colorScheme}-300 rounded-full`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {publications.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No publications available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;