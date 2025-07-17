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
          
          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary hidden lg:block" 
                 style={{ height: `${cvData.experience.length * 200}px` }}></div>
            
            {/* Mobile Timeline Line */}
            <div className="absolute left-6 top-0 w-0.5 bg-primary lg:hidden" 
                 style={{ height: `${cvData.experience.length * 180}px` }}></div>
            
            {/* Timeline Items */}
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-8 lg:mb-12 relative">
                <div className="flex items-center w-full">
                  {/* Desktop Layout */}
                  <div className={`hidden lg:block w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 order-2'}`}>
                    <div 
                      className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        hasIntersected ? 'animate-fade-in' : ''
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => openModal(exp.id)}
                    >
                      <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {exp.period}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{exp.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">{exp.organization}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">{exp.description}</p>
                      <div className={`flex items-center text-xs text-primary ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <span>Click to view details</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Layout */}
                  <div className="lg:hidden w-full pl-16">
                    <div 
                      className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        hasIntersected ? 'animate-fade-in' : ''
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => openModal(exp.id)}
                    >
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
                  
                  {/* Desktop Center timeline dot */}
                  <div className="hidden lg:flex w-10 h-10 bg-primary rounded-full items-center justify-center z-10 mx-auto shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Desktop Right side placeholder */}
                  <div className={`hidden lg:block w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
                </div>
                
                {/* Mobile timeline dot */}
                <div className="lg:hidden absolute left-4 top-6 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
            ))}
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
