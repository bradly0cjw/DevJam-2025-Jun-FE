"use client";

import { useState, useEffect } from 'react';
import { FiltersSidebar } from '@/components/designers/FiltersSidebar';
import { ItemCard } from '@/components/designers/ItemCard';
import type { ClothingItem } from '@/lib/types';
import { Loader2, SearchX } from 'lucide-react';

// Placeholder data for items
const placeholderItems: ClothingItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `item-${i + 1}`,
  title: `Vintage Silk Scarf ${i + 1}`,
  imageUrl: `https://placehold.co/400x${Math.floor(300 + Math.random() * 300)}.png`, // Random height for masonry
  material: i % 3 === 0 ? 'Silk' : (i % 3 === 1 ? 'Cotton' : 'Wool'),
  giverLocation: 'New York, NY',
  condition: i % 2 === 0 ? 'good' : 'excellent',
  category: i % 4 === 0 ? 'Accessories' : (i % 4 === 1 ? 'Tops' : (i % 4 === 2 ? 'Bottoms' : 'Outerwear')),
  tags: ['vintage', i % 2 === 0 ? 'floral' : 'geometric', 'unique'],
  isNewItem: i < 3,
  matchesRequest: i === 1 || i === 5,
  localPickup: i % 3 === 0,
  dateAdded: new Date().toISOString(),
  description: `A beautiful piece of clothing item number ${i+1}. Perfect for your next creative project.`,
}));


export default function DesignerSearchPage() {
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<any>({}); // Replace any with a proper Filter type

  useEffect(() => {
    // Simulate fetching items
    setIsLoading(true);
    setTimeout(() => {
      // Basic filtering simulation (replace with actual logic)
      let items = placeholderItems;
      if (activeFilters.searchTerm) {
        items = items.filter(item => item.title.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()));
      }
      if (activeFilters.categories?.length > 0) {
        items = items.filter(item => activeFilters.categories.includes(item.category.toLowerCase()));
      }
      // Add more filter logic here based on activeFilters
      
      setFilteredItems(items);
      setIsLoading(false);
    }, 500);
  }, [activeFilters]);

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]"> {/* Adjust min-h based on header height */}
      <FiltersSidebar onFiltersChange={handleFiltersChange} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold font-headline text-primary mb-6">
          Discover Materials
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Loading materials...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="masonry-grid">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No Materials Found</h2>
            <p className="text-muted-foreground">Try adjusting your filters or broadening your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
