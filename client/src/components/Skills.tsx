import React from 'react';
import { Users, MessageSquare, Settings, Lightbulb, RefreshCw, Award } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import cvData from '@/data/cv.json';

const skillIcons = {
  leadership: Users,
  communication: MessageSquare,
  management: Settings,
  problemSolving: Lightbulb,
  adaptability: RefreshCw,
  languages: Award
};

const skillTitles = {
  leadership: 'Leadership',
  communication: 'Communication',
  management: 'Management',
  problemSolving: 'Problem Solving',
  adaptability: 'Adaptability',
  languages: 'Languages'
};

export const Skills: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Skills & Competencies</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(cvData.skills).map(([category, skills], index) => {
              const IconComponent = skillIcons[category as keyof typeof skillIcons];
              const title = skillTitles[category as keyof typeof skillTitles];
              
              return (
                <div 
                  key={category}
                  className={`bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    hasIntersected ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                  </div>
                  <div className="space-y-2">
                    {skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-slate-600 dark:text-slate-400">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
