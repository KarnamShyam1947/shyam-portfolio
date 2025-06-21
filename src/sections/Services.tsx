import React from 'react';
import { Code, Server, Cloud, Brain, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
  const { colorScheme } = useTheme();

  const services = [
    {
      title: 'Web Development',
      icon: <Code className={`w-12 h-12 text-${colorScheme}-500`} />,
      description: 'Building responsive and dynamic web applications using modern frameworks and technologies. Specializing in creating seamless user experiences with React, Next.js, and other cutting-edge tools. Focus on performance, accessibility, and maintainable code practices.'
    },
    {
      title: 'AI/ML Solutions',
      icon: <Brain className={`w-12 h-12 text-${colorScheme}-500`} />,
      description: 'Implementing intelligent solutions using cutting-edge AI and machine learning technologies. From natural language processing to computer vision applications, we help businesses leverage AI to solve complex problems and automate processes effectively.'
    },
    {
      title: 'Blockchain Development',
      icon: <Database className={`w-12 h-12 text-${colorScheme}-500`} />,
      description: 'Creating secure and decentralized solutions using blockchain technology. Expertise in smart contracts, DApp development, and Web3 integration. Building transparent and trustworthy systems for the decentralized future.'
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud className={`w-12 h-12 text-${colorScheme}-500`} />,
      description: 'Providing comprehensive cloud solutions and implementing DevOps practices for efficient deployment. Expertise in AWS, Azure, and GCP. Implementing CI/CD pipelines, container orchestration, and infrastructure as code for scalable applications.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Services</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Comprehensive solutions tailored to meet your technical needs and business objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center mb-6">
                {service.icon}
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mt-4">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;