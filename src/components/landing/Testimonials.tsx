
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/lib/types';
import { Quote } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const placeholderTestimonials: Testimonial[] = [
  { id: '1', quote: `${APP_NAME} made it so easy to clear out my closet responsibly. Knowing my old clothes are getting a new life with a creative designer feels amazing!`, giverName: 'Sarah M.', giverLocation: 'Austin, TX', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'happy person profile' },
  { id: '2', quote: `As a small designer, finding unique, sustainable materials is crucial. ${APP_NAME} has been a game-changer for sourcing fabrics with history.`, giverName: 'David L.', giverLocation: 'Brooklyn, NY', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'smiling individual face' },
  { id: '3', quote: "I love the concept and the execution. The platform is user-friendly and connects givers and takers seamlessly. Highly recommend!", giverName: 'Priya K.', giverLocation: 'Oakland, CA', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person outdoor background' },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-headline text-center text-primary mb-12">
          Loved by Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholderTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                <Quote className="h-8 w-8 text-primary/50 mb-4" />
                <p className="text-foreground/80 italic mb-6 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center mt-auto">
                  {testimonial.avatarUrl && (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.giverName}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                      data-ai-hint={testimonial.dataAiHint}
                    />
                  )}
                  <div>
                    <p className="font-semibold text-primary">{testimonial.giverName}</p>
                    {testimonial.giverLocation && <p className="text-sm text-foreground/60">{testimonial.giverLocation}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

    