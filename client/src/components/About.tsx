import React from 'react';
import { MapPin, GraduationCap, Languages, Award } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import cvData from '@/data/cv.json';

export const About: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">About Me</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Leadership & Innovation</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {cvData.summary}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  My expertise spans critical thinking, communication, team collaboration, and event management. I'm dedicated to creating innovative solutions that benefit both organizations and communities, with a track record of successfully managing programs that reach over 1000 students.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary flex-shrink-0" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">{cvData.personal.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="text-primary flex-shrink-0" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">{cvData.education[0].institution}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Languages className="text-primary flex-shrink-0" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">Indonesian (Native), English (Intermediate)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="text-primary flex-shrink-0" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">TOEFL Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
