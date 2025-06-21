import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useDataStore } from '../store/dataStore';

const AllCertificates: React.FC = () => {
  const { colorScheme } = useTheme();
  const { certificates } = useDataStore();



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 bg-white dark:bg-slate-800 rounded-full shadow hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <Award className={`w-8 h-8 text-${colorScheme}-500`} />
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">All Certifications</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-${colorScheme}-500/10`}></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  {cert.title}
                </h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Issuer:</span> {cert.issuer}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Date:</span> {cert.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Credential ID:</span>
                    <span className="text-sm">{cert.credentialId}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-3">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-2 py-1 text-sm bg-${colorScheme}-50 dark:bg-${colorScheme}-900/10 text-${colorScheme}-700 dark:text-${colorScheme}-300 rounded-full`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-4 py-2 rounded-lg bg-${colorScheme}-500 hover:bg-${colorScheme}-600 text-white transition-colors duration-300`}
                >
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCertificates;