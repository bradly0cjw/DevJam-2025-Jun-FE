
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, HandHeart } from 'lucide-react';
import { APP_NAME, NAV_LINKS } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <HandHeart className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl font-headline text-red-600">{APP_NAME}</span>
        </Link>
        <nav className="hidden flex-1 md:flex md:items-center md:gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.icon && <link.icon className="mr-1.5 h-4 w-4 inline-block" />}
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground flex items-center"
                  >
                    {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                    {link.label}
                  </Link>
                ))}
                 <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    