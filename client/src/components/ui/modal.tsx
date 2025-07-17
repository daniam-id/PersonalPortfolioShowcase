import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={cn(
          "bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  period?: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, period, onClose }) => (
  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        {subtitle && <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>}
        {period && <p className="text-sm text-primary font-medium">{period}</p>}
      </div>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>
    </div>
  </div>
);

interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);
