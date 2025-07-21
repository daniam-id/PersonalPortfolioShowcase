import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Project {
  id: string;
  title: string;
  description: string;
  color: string;
  link: string;
  technologies: string[];
}

const websiteProjects: Project[] = [
  {
    id: 'web-1',
    title: 'E-commerce Store',
    description: 'A fully functional e-commerce platform with user authentication, product listings, shopping cart, and checkout process.',
    color: 'from-blue-500 to-purple-600',
    link: 'https://example.com/ecommerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: 'web-2',
    title: 'Blog Platform',
    description: 'A responsive blog platform with rich text editor, comment section, and admin panel for content management.',
    color: 'from-green-400 to-teal-500',
    link: 'https://example.com/blog',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity.io']
  },
  {
    id: 'web-3',
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects, skills, and contact information with a modern UI.',
    color: 'from-red-500 to-orange-600',
    link: 'https://example.com/portfolio',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP']
  }
];

const WebsitePortfolioPage: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="website-portfolio" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80">
            <Link href="/">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-white">My Web Projects</h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A collection of my web development work, showcasing diverse skills and creative solutions.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteProjects.map(project => {
              const { ref: cardRef, hasIntersected: cardHasIntersected } = useIntersectionObserver({ threshold: 0.1 });
              return (
                <Card 
                  key={project.id} 
                  ref={cardRef}
                  className={`flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group ${
                    cardHasIntersected ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                >
                  <div className="relative w-full">
                    <AspectRatio ratio={16 / 9}>
                      <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {project.title}
                      </div>
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between p-4 pt-2">
                    <p className="text-slate-600 dark:text-slate-400 text-base mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="text-sm">{tech}</Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-secondary text-white h-10">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                        <ExternalLink size={16} />
                        <span>View Project</span>
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Button asChild className="px-8 py-3 bg-primary hover:bg-secondary text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg active:scale-95">
              <a href="#contact">More About My Services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsitePortfolioPage;
