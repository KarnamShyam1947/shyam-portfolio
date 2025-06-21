import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useDataStore } from '../store/dataStore';

const Timeline: React.FC = () => {
  const { colorScheme } = useTheme();
  const { education, experience } = useDataStore();

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className={`w-6 h-6 text-${colorScheme}-500`} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Education</h2>
            </div>
            
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 ml-4">
              {education.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-12 last:mb-0 relative"
                >
                  <div className={`absolute -left-10 w-4 h-4 rounded-full bg-${colorScheme}-500 border-4 border-white dark:border-slate-900`} />
                  <div className={`text-sm font-medium text-${colorScheme}-500 mb-1`}>
                    {item.period}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                    {item.degree}
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                    {item.institution}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    {item.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className={`w-6 h-6 text-${colorScheme}-500`} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Experience</h2>
            </div>
            
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 ml-4">
              {experience.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-12 last:mb-0 relative"
                >
                  <div className={`absolute -left-10 w-4 h-4 rounded-full bg-${colorScheme}-500 border-4 border-white dark:border-slate-900`} />
                  <div className={`text-sm font-medium text-${colorScheme}-500 mb-1`}>
                    {item.period}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                    {item.role}
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                    {item.company}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    {item.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;