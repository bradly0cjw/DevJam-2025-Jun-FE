
import Link from 'next/link';
import { APP_NAME, FOOTER_LINKS } from '@/lib/constants';
import { HandHeart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <HandHeart className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-headline text-primary">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-foreground/70">
              Giving clothes a second life, connecting creators with sustainable materials.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold font-headline text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.slice(0,2).map((link) => ( 
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold font-headline text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
             {FOOTER_LINKS.slice(2).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

    