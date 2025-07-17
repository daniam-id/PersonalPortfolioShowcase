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
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary hidden lg:block"></div>
            
            {/* Timeline Items */}
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-12 flex items-center w-full">
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:order-2'}`}>
                  <div 
                    className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      hasIntersected ? 'animate-fade-in' : ''
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                    onClick={() => openModal(exp.id)}
                  >
                    <div className={`flex items-center justify-between mb-3 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <div className="text-sm font-medium text-primary">{exp.period}</div>
                      <div className="w-3 h-3 bg-primary rounded-full lg:hidden"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{exp.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">{exp.organization}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Click to view details</p>
                  </div>
                </div>
                
                <div className="hidden lg:flex w-8 h-8 bg-primary rounded-full items-center justify-center z-10 mx-auto">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}></div>
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
