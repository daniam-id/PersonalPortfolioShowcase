import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  technologies: string[];
}

const websiteProjects: Project[] = [
  {
    id: 'web-1',
    title: 'E-commerce Store',
    description: 'A fully functional e-commerce platform with user authentication, product listings, shopping cart, and checkout process.',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=E-commerce+Store',
    link: 'https://example.com/ecommerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: 'web-2',
    title: 'Blog Platform',
    description: 'A responsive blog platform with rich text editor, comment section, and admin panel for content management.',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=Blog+Platform',
    link: 'https://example.com/blog',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity.io']
  },
  {
    id: 'web-3',
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects, skills, and contact information with a modern UI.',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=Portfolio+Website',
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
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Website Portfolio</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Here are some of my web development projects, showcasing my skills in front-end and back-end development.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteProjects.map(project => (
              <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full bg-primary hover:bg-secondary text-white">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                      <ExternalLink size={16} />
                      <span>View Project</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
