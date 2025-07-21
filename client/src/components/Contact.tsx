import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import cvData from '@/data/cv.json';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FloatingLabel: React.FC<{
    htmlFor: string;
    children: React.ReactNode;
    value: string;
  }> = ({ htmlFor, children, value }) => (
    <label 
      htmlFor={htmlFor}
      className={cn(
        "absolute left-4 transition-all duration-300 pointer-events-none",
        value || document.activeElement?.id === htmlFor
          ? "-top-2 left-2 text-primary bg-white dark:bg-slate-900 px-2 text-sm"
          : "top-3 text-slate-500 dark:text-slate-400"
      )}
    >
      {children}
    </label>
  );

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Get In Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ready to collaborate on your next project? I'd love to hear from you. Let's discuss how we can work together to create something amazing.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">{cvData.personal.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-400">{cvData.personal.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Location</h3>
                  <p className="text-slate-600 dark:text-slate-400">{cvData.personal.location}</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input 
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder=" "
                />
                <FloatingLabel htmlFor="name" value={formData.name}>Full Name</FloatingLabel>
              </div>
              
              <div className="relative">
                <input 
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder=" "
                />
                <FloatingLabel htmlFor="email" value={formData.email}>Email Address</FloatingLabel>
              </div>
              
              <div className="relative">
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder=" "
                />
                <FloatingLabel htmlFor="subject" value={formData.subject}>Subject</FloatingLabel>
              </div>
              
              <div className="relative">
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder=" "
                />
                <FloatingLabel htmlFor="message" value={formData.message}>Message</FloatingLabel>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-primary hover:bg-secondary disabled:bg-blue-400 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
