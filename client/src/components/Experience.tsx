import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Briefcase } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Modal, ModalHeader, ModalContent } from '@/components/ui/modal';
import cvData from '@/data/cv.json';

export const Experience: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [experienceType, setExperienceType] = useState<'organization' | 'committee'>('organization');

  const experiences = experienceType === 'organization' ? cvData.experience : cvData.committeeExperience;

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [experienceType]);

  const openModal = (experienceId: string) => {
    setSelectedExperience(experienceId);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };

  const getExperienceById = (id: string) => {
    return [...cvData.experience, ...cvData.committeeExperience].find(exp => exp.id === id);
  };

  const rotateCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCardIndex((prev) => (prev + 1) % experiences.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getCardPosition = (index: number) => {
    const relativeIndex = (index - currentCardIndex + experiences.length) % experiences.length;
    return relativeIndex;
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Experience</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Explore my organizational and committee experiences.</p>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setExperienceType('organization')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  experienceType === 'organization'
                    ? 'bg-primary text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <Users size={16} />
                <span>Organization</span>
              </button>
              <button
                onClick={() => setExperienceType('committee')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  experienceType === 'committee'
                    ? 'bg-primary text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <Briefcase size={16} />
                <span>Committee</span>
              </button>
            </div>
          </div>
          
          {/* Desktop Card Stack */}
          <div className="hidden lg:block">
            <div className="relative flex justify-center items-center min-h-[500px]">
              {experiences.map((exp, index) => {
                const position = getCardPosition(index);
                const isTop = position === 0;
                const isVisible = position < 4; // Show only top 4 cards
                
                if (!isVisible) return null;
                
                return (
                  <div
                    key={exp.id}
                    className={`absolute w-96 transition-all duration-500 ease-in-out ${
                      isAnimating ? 'pointer-events-none' : 'cursor-pointer'
                    }`}
                    style={{
                      transform: `
                        translateX(${position * 8}px) 
                        translateY(${position * 8}px) 
                        scale(${1 - position * 0.05})
                        rotateZ(${position * 2}deg)
                      `,
                      zIndex: 10 - position,
                      opacity: 1 - position * 0.15
                    }}
                    onClick={isTop ? rotateCards : undefined}
                  >
                    <div className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden ${
                      isTop ? 'shadow-2xl ring-2 ring-primary/20' : 'shadow-lg'
                    }`}>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Card indicator */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-3 h-3 rounded-full ${
                          isTop ? 'bg-primary animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
                        }`}></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-center mb-4">
                          <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {exp.period}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white text-center">{exp.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-3 font-medium text-center">{exp.organization}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mb-4 text-center">{exp.description}</p>
                        
                        {isTop && (
                          <div className="flex items-center justify-center space-x-4 text-xs text-primary">
                            <span>Click to rotate</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(exp.id);
                              }}
                              className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Simple Stack */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Current card indicator */}
              <div className="text-center mb-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {currentCardIndex + 1} of {experiences.length}
                </span>
              </div>
              
              {/* Mobile card stack */}
              <div className="relative flex justify-center items-center min-h-[400px]">
                {experiences.map((exp, index) => {
                  const position = getCardPosition(index);
                  const isTop = position === 0;
                  const isVisible = position < 2; // Show only top 2 cards on mobile
                  
                  if (!isVisible) return null;
                  
                  return (
                    <div
                      key={exp.id}
                      className={`absolute w-80 transition-all duration-500 ease-in-out ${
                        isAnimating ? 'pointer-events-none' : 'cursor-pointer'
                      }`}
                      style={{
                        transform: `
                          translateX(${position * 6}px) 
                          translateY(${position * 6}px) 
                          scale(${1 - position * 0.1})
                        `,
                        zIndex: 10 - position,
                        opacity: 1 - position * 0.3
                      }}
                      onClick={isTop ? rotateCards : undefined}
                    >
                      <div className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden ${
                        isTop ? 'shadow-2xl ring-2 ring-primary/20' : 'shadow-lg'
                      }`}>
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-center mb-4">
                            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {exp.period}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white text-center">{exp.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-3 font-medium text-center">{exp.organization}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-500 mb-4 text-center">{exp.description}</p>
                          
                          {isTop && (
                            <div className="flex items-center justify-center space-x-4 text-xs text-primary">
                              <span>Tap to rotate</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openModal(exp.id);
                                }}
                                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition-colors"
                              >
                                View Details
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
