import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Designer } from '@/lib/types';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const placeholderDesigners: Designer[] = [
  {
    id: '1',
    name: 'Elena Moreau',
    workImageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&auto=format&fit=crop&q=60',
    dataAiHint: 'fashion designer portrait',
    specialties: ['Upcycled Denim', 'Avant-Garde'],
    profileUrl: '/designers/1'
  },
  {
    id: '2',
    name: 'Kenji Tanaka',
    workImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    dataAiHint: 'textile artist workshop',
    specialties: ['Kintsugi Textiles', 'Minimalist'],
    profileUrl: '/designers/2'
  },
  {
    id: '3',
    name: 'Aisha Khan',
    workImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    dataAiHint: 'sustainable fashion piece',
    specialties: ['Bohemian Chic', 'Natural Dyes'],
    profileUrl: '/designers/3'
  },
];

export function FeaturedDesigners() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-headline text-center text-primary mb-12">
          Featured Designers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderDesigners.map((designer) => (
            <Card key={designer.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-0">
                <div className="relative h-80 w-full">
                  <Image
                    src={designer.workImageUrl}
                    alt={`Portrait of ${designer.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={designer.dataAiHint}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-headline text-primary mb-1">{designer.name}</h3>
                  {designer.specialties && (
                     <p className="text-sm text-foreground/70 mb-2">{designer.specialties.join(', ')}</p>
                  )}
                  <Link href={designer.profileUrl || `/designers/${designer.id}`} passHref>
                    <Button variant="link" className="p-0 text-accent h-auto">
                      View Profile <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
