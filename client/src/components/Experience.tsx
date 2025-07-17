import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Modal, ModalHeader, ModalContent } from '@/components/ui/modal';
import cvData from '@/data/cv.json';

export const Experience: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const openModal = (experienceId: string) => {
    setSelectedExperience(experienceId);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };

  const getExperienceById = (id: string) => {
    return cvData.experience.find(exp => exp.id === id);
  };

  const selectedExp = selectedExperience ? getExperienceById(selectedExperience) : null;

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Experience Timeline</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Horizontal Timeline Line */}
              <div className="absolute top-72 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-blue-600 shadow-sm"></div>
              
              {/* Timeline Items */}
              <div className="flex justify-between items-start space-x-4 overflow-x-auto pb-8">
                {cvData.experience.map((exp, index) => {
                  const hasIntersected = useIntersectionObserver(exp.id);
                  
                  return (
                    <div key={exp.id} className="flex-shrink-0 w-72 relative" id={exp.id}>
                      {/* Experience Card */}
                      <div 
                        className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-slate-100 dark:border-slate-800 relative overflow-hidden ${
                          hasIntersected ? 'animate-fade-in' : ''
                        }`}
                        style={{ animationDelay: `${index * 200}ms` }}
                        onClick={() => openModal(exp.id)}
                      >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-center mb-3">
                            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {exp.period}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white text-center">{exp.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium text-center">{exp.organization}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-500 mb-3 text-center">{exp.description}</p>
                          <div className="flex items-center justify-center text-xs text-primary">
                            <span>Click to view details</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connecting Line */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/60 to-transparent"></div>
                      
                      {/* Timeline Dot */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-7 w-12 h-12 bg-gradient-to-br from-primary via-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-900 z-10">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        {/* Glowing effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-blue-600 opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile Vertical Timeline */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Mobile Timeline Line */}
              <div className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-blue-600 shadow-sm" 
                   style={{ height: `${cvData.experience.length * 180}px` }}></div>

              {cvData.experience.map((exp, index) => {
                const hasIntersected = useIntersectionObserver(exp.id);
                
                return (
                  <div key={exp.id} className="relative mb-12" id={exp.id}>
                    {/* Mobile Layout */}
                    <div className="w-full pl-16">
                      <div 
                        className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-slate-100 dark:border-slate-800 relative overflow-hidden ${
                          hasIntersected ? 'animate-fade-in' : ''
                        }`}
                        style={{ animationDelay: `${index * 200}ms` }}
                        onClick={() => openModal(exp.id)}
                      >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center mb-3">
                            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {exp.period}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{exp.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">{exp.organization}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">{exp.description}</p>
                          <div className="flex items-center text-xs text-primary">
                            <span>Click to view details</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile timeline dot */}
                    <div className="absolute left-4 top-6 w-5 h-5 bg-gradient-to-br from-primary via-blue-500 to-blue-600 rounded-full border-2 border-white dark:border-slate-900 shadow-lg">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-blue-600 opacity-20 animate-pulse"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Detail Modal */}
      <Modal isOpen={!!selectedExperience} onClose={closeModal}>
        {selectedExp && (
          <>
            <ModalHeader
              title={selectedExp.title}
              subtitle={selectedExp.organization}
              period={selectedExp.period}
              onClose={closeModal}
            />
            <ModalContent>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Key Responsibilities & Achievements:</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                {selectedExp.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-primary mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </ModalContent>
          </>
        )}
      </Modal>
    </section>
  );
};
