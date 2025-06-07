
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit } from 'lucide-react'; // Added BrainCircuit
import { APP_NAME } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/30 via-background to-background py-20 md:py-32">
      {/* Placeholder for looping video */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 overflow-hidden opacity-20"
        data-ai-hint="clothing lifecycle fashion"
      >
        {/* Replace this div with your <video> element */}
        {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
         <img src="https://placehold.co/1920x1080.png?text=Hero+Video+Placeholder" alt="Placeholder for hero video" className="w-full h-full object-cover" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary mb-6 tracking-tight">
          Reimagine Fashion. ReThread Your Wardrobe with {APP_NAME}.
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
          Connect with designers, give your clothes a new purpose, and champion sustainable style.
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
          <Button size="lg" variant="outline" asChild className="shadow-lg transform hover:scale-105 transition-transform border-primary text-primary hover:bg-primary/10">
            <Link href="/smart-matching">
              <BrainCircuit className="mr-2 h-5 w-5" /> Smart Matching
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

    