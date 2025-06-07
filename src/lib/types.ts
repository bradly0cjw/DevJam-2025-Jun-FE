
import type { LucideIcon } from 'lucide-react';

export interface ClothingItem {
  id: string;
  title: string;
  imageUrl: string;
  material: string;
  giverLocation: string;
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'material'; // Updated this line
  category: string;
  tags: string[];
  isNewItem?: boolean;
  matchesRequest?: boolean;
  localPickup?: boolean;
  description?: string;
  dateAdded: string;
}

export interface Designer {
  id: string;
  name: string;
  workImageUrl: string;
  profileUrl?: string;
  specialties?: string[];
  dataAiHint?: string; // Added from FeaturedDesigners.tsx
}

export interface Testimonial {
  id: string;
  quote: string;
  giverName: string;
  giverLocation?: string;
  avatarUrl?: string;
  dataAiHint?: string; // Added from Testimonials.tsx
}

export interface IconSelectItem {
  id: string;
  name: string;
  icon?: LucideIcon;
  description?: string;
}
