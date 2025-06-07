import type { Icon as LucideIcon } from 'lucide-react';
import type { Icon as LucideIconType } from 'lucide-react'; // Renamed to avoid conflict if LucideIcon is also a value
import { Shirt, Footprints, Sparkles, HandHeart, HelpCircle, CheckCircle, XCircle, MapPin, Palette, Tag, Filter, ListChecks, Users, Recycle, Wind, Search, Settings, Save, Trash2, Square, Home, ShoppingBag, Info, Phone, ThumbsUp, Meh } from 'lucide-react';
import type { IconSelectItem } from './types';

export const APP_NAME = "AI衣循環";

export const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/list-item", label: "Give Clothes", icon: HandHeart },
  { href: "/designers/search", label: "Find Materials", icon: ShoppingBag },
];

export const FOOTER_LINKS = [
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

export const HOW_IT_WORKS_STEPS: { title: string; description: string; icon: typeof ListChecks }[] = [
  { title: "List Your Clothes", description: "Easily upload photos and details of items you no longer need.", icon: ListChecks },
  { title: "Connect with a Creator", description: "Designers discover your items and can request them for their projects.", icon: Users },
  { title: "Give a Second Life", description: "Your old clothes become part of something new and beautiful, reducing waste.", icon: Recycle },
];

export const ITEM_CATEGORIES: IconSelectItem[] = [
  { id: 'tops', name: 'Tops', icon: Shirt },
  { id: 'bottoms', name: 'Bottoms', icon: Square /* Using Square as a generic icon for bottoms */ },
  { id: 'outerwear', name: 'Outerwear', icon: Wind },
  { id: 'footwear', name: 'Footwear', icon: Footprints },
  { id: 'accessories', name: 'Accessories', icon: Sparkles },
  { id: 'other', name: 'Other', icon: HelpCircle },
];

export const ITEM_CONDITIONS: IconSelectItem[] = [
  { id: 'new', name: 'New with Tags', description: 'Unworn, with original tags or packaging.', icon: CheckCircle },
  { id: 'excellent', name: 'Excellent', description: 'Like new, worn once or twice, no flaws.', icon: CheckCircle },
  { id: 'good', name: 'Good', description: 'Gently used, minor signs of wear.', icon: ThumbsUp },
  { id: 'fair', name: 'Fair', description: 'Visible wear, but still functional and usable.', icon: Meh },
  { id: 'material', name: 'For Materials', description: 'Significant wear, best for upcycling materials.', icon: Trash2 },
];


export const COMMON_MATERIALS: string[] = ["Cotton", "Polyester", "Wool", "Silk", "Linen", "Denim", "Leather", "Rayon", "Spandex", "Nylon"];

export const COLOR_SWATCHES: { name: string; value: string; tailwindClass: string }[] = [
  { name: 'Red', value: '#EF4444', tailwindClass: 'bg-red-500' },
  { name: 'Orange', value: '#F97316', tailwindClass: 'bg-orange-500' },
  { name: 'Yellow', value: '#EAB308', tailwindClass: 'bg-yellow-500' },
  { name: 'Green', value: '#22C55E', tailwindClass: 'bg-green-500' },
  { name: 'Blue', value: '#3B82F6', tailwindClass: 'bg-blue-500' },
  { name: 'Purple', value: '#8B5CF6', tailwindClass: 'bg-purple-500' },
  { name: 'Pink', value: '#EC4899', tailwindClass: 'bg-pink-500' },
  { name: 'Brown', value: '#78350F', tailwindClass: 'bg-yellow-900' },
  { name: 'Black', value: '#1F2937', tailwindClass: 'bg-gray-800' },
  { name: 'White', value: '#F9FAFB', tailwindClass: 'bg-gray-50 border border-gray-300' },
  { name: 'Gray', value: '#6B7280', tailwindClass: 'bg-gray-500' },
  { name: 'Beige', value: '#F5F5DC', tailwindClass: 'bg-beige-300' /* Custom beige, ensure defined if not standard */ },
];

export const LIST_ITEM_STEPS = [
  { id: 'details', name: 'Item Details & Photo' },
  { id: 'description', name: 'Description & Tags' },
  { id: 'review', name: 'Review & List' },
];

export const DESIGNER_FILTER_OPTIONS = {
  categories: ITEM_CATEGORIES.map(c => ({id: c.id, label: c.name})),
  conditions: ITEM_CONDITIONS.map(c => ({id: c.id, label: c.name})),
  materials: COMMON_MATERIALS.map(m => ({id: m.toLowerCase(), label: m})),
  // locations might be dynamic based on item data
};

// Icons for filter sections
export const FilterSectionIcons = {
  category: Shirt,
  condition: CheckCircle,
  material: Tag,
  location: MapPin,
  color: Palette,
  search: Search,
  filters: Filter,
  settings: Settings,
  save: Save,
};

// Placeholder: KGs rethreaded
export const INITIAL_KG_RETHREADED = 12345;

export const CLOTHING_ITEMS = [
  {
    id: 'item-1',
    title: 'Vintage Leather Bag',
    description: 'Handcrafted leather bag with unique patina and brass hardware',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    designer: 'Elena Moreau',
    category: 'Accessories',
    condition: 'Excellent',
    size: 'M',
    color: 'Brown',
    material: 'Leather',
    style: 'Vintage',
    measurements: {
      width: '12"',
      height: '10"',
      depth: '4"',
      strap: '24"'
    },
    care: 'Professional leather care',
    giverLocation: 'Paris, France',
    shipping: 'Worldwide',
    returnPolicy: '14 days',
    authenticity: 'Verified',
    story: 'This exquisite leather bag was crafted by Elena Moreau in her Paris atelier. The natural patina tells a story of its journey through time, while the quality craftsmanship ensures it will continue to age beautifully. Features brass hardware and a spacious interior.',
    tags: ['vintage', 'leather', 'bag', 'handcrafted', 'accessories'],
    likes: 156,
    views: 892,
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    isNewItem: true,
    matchesRequest: false,
    localPickup: true,
    dateAdded: '2024-03-15T10:30:00Z'
  },
  {
    id: 'item-3',
    title: 'Leather Jacket',
    description: 'Vintage leather jacket with unique patina',
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    designer: 'Aisha Khan',
    category: 'Outerwear',
    condition: 'Good',
    size: 'L',
    color: 'Brown',
    material: 'Leather',
    style: 'Vintage',
    measurements: {
      chest: '44"',
      waist: '42"',
      hips: '46"',
      length: '28"'
    },
    care: 'Professional leather care',
    giverLocation: 'London, UK',
    shipping: 'Worldwide',
    returnPolicy: '14 days',
    authenticity: 'Verified',
    story: 'This vintage leather jacket was sourced from a 1970s collection and restored by Aisha Khan. The natural patina tells a story of its journey through time, while the quality craftsmanship ensures it will continue to age beautifully.',
    tags: ['vintage', 'leather', 'jacket', 'patina', 'restored'],
    likes: 234,
    views: 1234,
    createdAt: '2024-03-13T09:15:00Z',
    updatedAt: '2024-03-13T09:15:00Z',
    isNewItem: false,
    matchesRequest: true,
    localPickup: true,
    dateAdded: '2024-03-13T09:15:00Z'
  },
  {
    id: 'item-4',
    title: 'Cotton Summer Dress',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60',
    material: 'Cotton',
    giverLocation: 'Miami, FL',
    condition: 'good',
    category: 'Dresses',
    tags: ['summer', 'cotton', 'dress', 'floral'],
    isNewItem: true,
    matchesRequest: false,
    localPickup: true,
    dateAdded: new Date().toISOString(),
    description: 'A light and airy cotton summer dress with a beautiful floral pattern. Perfect for warm weather or redesigning into new pieces.'
  },
  {
    id: 'item-6',
    title: 'Cashmere Sweater',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60',
    material: 'Cashmere',
    giverLocation: 'Seattle, WA',
    condition: 'excellent',
    category: 'Tops',
    tags: ['cashmere', 'sweater', 'luxury', 'warm'],
    isNewItem: true,
    matchesRequest: false,
    localPickup: false,
    dateAdded: new Date().toISOString(),
    description: 'A luxurious cashmere sweater in excellent condition. Perfect for cold weather or creative redesign projects.'
  },
  {
    id: 'item-10',
    title: 'Cotton T-Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
    material: 'Cotton',
    giverLocation: 'Austin, TX',
    condition: 'excellent',
    category: 'Tops',
    tags: ['cotton', 'tshirt', 'casual', 'basic'],
    isNewItem: true,
    matchesRequest: false,
    localPickup: true,
    dateAdded: new Date().toISOString(),
    description: 'A classic cotton t-shirt in excellent condition. Perfect for everyday wear or creative redesign projects.'
  },
  {
    id: 'item-11',
    title: 'Wool Blend Trousers',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=60',
    material: 'Wool',
    giverLocation: 'Boston, MA',
    condition: 'excellent',
    category: 'Bottoms',
    tags: ['wool', 'trousers', 'formal', 'tailored'],
    isNewItem: false,
    matchesRequest: true,
    localPickup: true,
    dateAdded: new Date().toISOString(),
    description: 'High-quality wool blend trousers in excellent condition. Perfect for formal occasions or creative redesign projects. Features a classic tailored fit and premium fabric.'
  },
  {
    id: 'item-12',
    title: 'Vintage T-Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=60',
    material: 'Cotton',
    giverLocation: 'Los Angeles, CA',
    condition: 'good',
    category: 'Tops',
    tags: ['cotton', 'tshirt', 'vintage', 'casual'],
    isNewItem: true,
    matchesRequest: false,
    localPickup: true,
    dateAdded: new Date().toISOString(),
    description: 'A classic vintage t-shirt with a perfect worn-in look. Features a comfortable fit and authentic vintage details. Great for everyday wear or creative redesign projects.'
  },
  {
    id: 'item-13',
    title: 'Silk Maxi Dress',
    imageUrl: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&auto=format&fit=crop&q=60',
    material: 'Silk',
    giverLocation: 'San Francisco, CA',
    condition: 'excellent',
    category: 'Dresses',
    tags: ['silk', 'dress', 'elegant', 'maxi'],
    isNewItem: true,
    matchesRequest: true,
    localPickup: false,
    dateAdded: new Date().toISOString(),
    description: 'A stunning silk maxi dress in excellent condition. Features a flowing silhouette and delicate fabric that catches the light beautifully. Perfect for special occasions or creative redesign.'
  }
];
