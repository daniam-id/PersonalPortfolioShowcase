import React from 'react';
import { Linkedin, Mail, Download } from 'lucide-react';
import cvData from '@/data/cv.json';

export const Footer: React.FC = () => {
  const downloadCV = () => {
    // TODO: Implement CV download functionality
    alert('CV download functionality would be implemented here.');
  };

  return (
    <footer className="py-12 bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400">&copy; 2024 {cvData.personal.name}. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href={cvData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href={`mailto:${cvData.personal.email}`}
              className="text-slate-400 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <button 
              onClick={downloadCV}
              className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
