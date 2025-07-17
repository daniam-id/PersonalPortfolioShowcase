import React from 'react';
import { GraduationCap, School } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import cvData from '@/data/cv.json';

export const Education: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Education</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {cvData.education.map((edu, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  hasIntersected ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    {index === 0 ? (
                      <GraduationCap className="text-white" size={24} />
                    ) : (
                      <School className="text-white" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{edu.degree}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">{edu.institution}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{edu.faculty}</p>
                    <div className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium">
                      {edu.status === 'Current' ? (
                        <span className="bg-primary/10 text-primary">{edu.status}</span>
                      ) : (
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{edu.period}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
