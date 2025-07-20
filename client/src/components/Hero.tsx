import React from 'react';
import { Linkedin, Mail, Phone, Download, ArrowDown } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import cvData from '@/data/cv.json';
import './Hero.css';

export const Hero: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadCV = () => {
    // TODO: Implement CV download functionality
    alert('CV download functionality would be implemented here.');
  };

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${
          hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Professional headshot placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span>{cvData.personal.initials}</span>
          </div>
          
          <div className="flex flex-col items-start max-w-3xl mx-auto">
            {/* Chat bubble */}
            <div className="relative inline-block mb-4 ml-40">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tl-none text-base font-medium shadow-lg">
                hi there!
              </div>
              <div className="absolute -left-2 top-0 w-3 h-3 bg-primary transform rotate-45"></div>
            </div>
            
            <div className="min-h-[4rem] w-full text-center"> {/* Fixed height container to prevent layout shift */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground typewriter">
                I'm Adam Daniam
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 text-center w-full">
              Leadership-focused Fisheries Product Technology Student & Organizational Development Specialist
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a 
              href={cvData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href={`mailto:${cvData.personal.email}`}
              className="w-12 h-12 bg-primary hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href={`tel:${cvData.personal.phone}`}
              className="w-12 h-12 bg-primary hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Phone"
            >
              <Phone size={20} />
            </a>
          </div>
          
          <div className="flex justify-center space-x-4 mb-12">
            <button 
              onClick={scrollToContact}
              className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg active:scale-95"
            >
              Get In Touch
            </button>
            <button 
              onClick={downloadCV}
              className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <Download size={18} />
              <span>Download CV</span>
            </button>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="mx-auto text-slate-400 dark:text-slate-500" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};
