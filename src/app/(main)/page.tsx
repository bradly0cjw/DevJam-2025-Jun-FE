import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedDesigners } from '@/components/landing/FeaturedDesigners';
import { Testimonials } from '@/components/landing/Testimonials';
import { StatsCounter } from '@/components/landing/StatsCounter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedDesigners />
      <StatsCounter />
      <Testimonials />
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-foreground/80 max-w-xl mx-auto mb-8">
            Whether you're decluttering or designing, ReThread is your partner in sustainable fashion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/list-item">
                Give Clothes Away <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg transform hover:scale-105 transition-transform border-primary text-primary hover:bg-primary/10">
              <Link href="/designers/search">
                Find Your Materials <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
