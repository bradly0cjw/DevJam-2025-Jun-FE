"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { COLOR_SWATCHES, DESIGNER_FILTER_OPTIONS, FilterSectionIcons as Icons } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, RotateCcw } from 'lucide-react';

// Define a type for filters for clarity
type Filters = {
  searchTerm?: string;
  categories: string[];
  conditions: string[];
  materials: string[];
  location?: string;
  maxDistance?: number; // Example for a slider
  colors: string[];
};

const initialFilters: Filters = {
  categories: [],
  conditions: [],
  materials: [],
  colors: [],
  maxDistance: 50, // default 50km/miles
};

interface FiltersSidebarProps {
  onFiltersChange: (filters: Filters) => void;
}

export function FiltersSidebar({ onFiltersChange }: FiltersSidebarProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleCheckboxChange = (group: keyof Pick<Filters, 'categories' | 'conditions' | 'materials'>, value: string) => {
    setFilters(prev => {
      const currentGroupValues = prev[group] as string[];
      const newGroupValues = currentGroupValues.includes(value)
        ? currentGroupValues.filter(v => v !== value)
        : [...currentGroupValues, value];
      const updatedFilters = { ...prev, [group]: newGroupValues };
      onFiltersChange(updatedFilters);
      return updatedFilters;
    });
  };
  
  const handleColorChange = (colorValue: string) => {
    setFilters(prev => {
      const newColors = prev.colors.includes(colorValue)
        ? prev.colors.filter(c => c !== colorValue)
        : [...prev.colors, colorValue];
      const updatedFilters = { ...prev, colors: newColors };
      onFiltersChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleInputChange = (field: keyof Pick<Filters, 'searchTerm' | 'location'>, value: string) => {
    setFilters(prev => {
      const updatedFilters = { ...prev, [field]: value };
      onFiltersChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleSliderChange = (field: keyof Pick<Filters, 'maxDistance'>, value: number[]) => {
     setFilters(prev => {
      const updatedFilters = { ...prev, [field]: value[0] };
      onFiltersChange(updatedFilters);
      return updatedFilters;
    });
  };
  
  const resetFilters = () => {
    setFilters(initialFilters);
    onFiltersChange(initialFilters);
  };

  return (
    <aside className="w-full md:w-72 lg:w-80 p-4 border-r h-full bg-card sticky top-16">
      <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-xl font-semibold font-headline text-primary">Filters</h3>
             <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
               <RotateCcw className="w-3 h-3 mr-1" /> Reset
             </Button>
          </div>
         
          <Input
            placeholder="Search items..."
            value={filters.searchTerm || ""}
            onChange={e => handleInputChange('searchTerm', e.target.value)}
            className="mb-4"
            aria-label="Search items"
          />

          <Accordion type="multiple" defaultValue={['category', 'condition']} className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger className="text-base font-medium"><Icons.category className="w-5 h-5 mr-2 text-primary/80" /> Category</AccordionTrigger>
              <AccordionContent className="space-y-2 pl-2">
                {DESIGNER_FILTER_OPTIONS.categories.map(cat => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${cat.id}`}
                      checked={filters.categories.includes(cat.id)}
                      onCheckedChange={() => handleCheckboxChange('categories', cat.id)}
                    />
                    <Label htmlFor={`cat-${cat.id}`} className="font-normal cursor-pointer">{cat.label}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="condition">
              <AccordionTrigger className="text-base font-medium"><Icons.condition className="w-5 h-5 mr-2 text-primary/80" /> Condition</AccordionTrigger>
              <AccordionContent className="space-y-2 pl-2">
                {DESIGNER_FILTER_OPTIONS.conditions.map(cond => (
                  <div key={cond.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cond-${cond.id}`}
                      checked={filters.conditions.includes(cond.id)}
                      onCheckedChange={() => handleCheckboxChange('conditions', cond.id)}
                    />
                    <Label htmlFor={`cond-${cond.id}`} className="font-normal cursor-pointer">{cond.label}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="material">
              <AccordionTrigger className="text-base font-medium"><Icons.material className="w-5 h-5 mr-2 text-primary/80" /> Material</AccordionTrigger>
              <AccordionContent className="space-y-2 pl-2">
                {DESIGNER_FILTER_OPTIONS.materials.map(mat => (
                  <div key={mat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mat-${mat.id}`}
                      checked={filters.materials.includes(mat.id)}
                      onCheckedChange={() => handleCheckboxChange('materials', mat.id)}
                    />
                    <Label htmlFor={`mat-${mat.id}`} className="font-normal cursor-pointer">{mat.label}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="color">
              <AccordionTrigger className="text-base font-medium"><Icons.color className="w-5 h-5 mr-2 text-primary/80" /> Color</AccordionTrigger>
              <AccordionContent className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-2">
                {COLOR_SWATCHES.map(color => (
                  <button
                    key={color.name}
                    title={color.name}
                    aria-label={color.name}
                    onClick={() => handleColorChange(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${filters.colors.includes(color.value) ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent hover:border-muted-foreground/50'} ${color.tailwindClass}`}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger className="text-base font-medium"><Icons.location className="w-5 h-5 mr-2 text-primary/80" /> Location</AccordionTrigger>
              <AccordionContent className="space-y-4 p-2">
                <Input
                  placeholder="City, State or Zip Code"
                  value={filters.location || ""}
                  onChange={e => handleInputChange('location', e.target.value)}
                  aria-label="Location filter"
                />
                <div>
                  <Label htmlFor="distance-slider">Max Distance ({filters.maxDistance} miles)</Label>
                  <Slider
                    id="distance-slider"
                    defaultValue={[50]}
                    max={200}
                    step={5}
                    onValueChange={(value) => handleSliderChange('maxDistance', value)}
                    className="mt-2"
                    aria-label="Maximum distance slider"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Save className="w-4 h-4 mr-2" /> Save this Search
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}
