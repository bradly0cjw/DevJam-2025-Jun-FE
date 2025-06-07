
"use client";

import { useState, useEffect } from 'react';
import { Recycle } from 'lucide-react';
import { INITIAL_KG_RETHREADED, APP_NAME } from '@/lib/constants';

export function StatsCounter() {
  const [count, setCount] = useState(0);
  const targetCount = INITIAL_KG_RETHREADED; // Target number of KGs

  useEffect(() => {
    if (count < targetCount) {
      const animationDuration = 2000; // 2 seconds
      const startTime = Date.now();

      const animateCount = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const currentAnimatedValue = Math.floor(progress * targetCount);
        
        setCount(currentAnimatedValue);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(targetCount); // Ensure it ends on the exact target
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [targetCount, count]); // Added count to dependencies to avoid stale closure warning if targetCount changes

  return (
    <section className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Recycle className="h-16 w-16 mx-auto mb-4 opacity-80" />
        <p className="text-4xl md:text-5xl font-bold font-headline">
          {count.toLocaleString()} KGs
        </p>
        <p className="text-lg md:text-xl opacity-90">
          of clothing re-threaded by {APP_NAME} to date!
        </p>
      </div>
    </section>
  );
}

    