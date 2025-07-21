import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PhotographyProject {
  id: string;
  imageUrl: string;
}

const photographyProjects: PhotographyProject[] = [
  {
    id: 'photo-1',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=Photo+1',
  },
  {
    id: 'photo-2',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=Photo+2',
  },
  {
    id: 'photo-3',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=Photo+3',
  },
  {
    id: 'photo-4',
    imageUrl: 'https://via.placeholder.com/400x250/F0F0F0/000000?text=Photo+4',
  }
];

const PhotographyPage: React.FC = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="photography-portfolio" className="py-20 bg-slate-50 dark:bg-slate-800">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-white">My Photography</h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A visual journey through my lens, capturing moments and stories.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {photographyProjects.map(project => {
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
                    <AspectRatio ratio={9 / 16}>
                      <img src={project.imageUrl} alt={`Photography project ${project.id}`} className="w-full h-full object-cover" />
                    </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    {/* Removed title from hover overlay as per user request */}
                  </div>
                </div>
                {/* Removed CardHeader and CardContent as per user request */}
                </Card>
              );
            })}
          </div>
          {/* Removed "More About My Services" section as per user request */}
        </div>
      </div>
    </section>
  );
};

export default PhotographyPage;
