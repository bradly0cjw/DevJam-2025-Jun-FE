import type { Icon as LucideIcon } from 'lucide-react';
import { Shirt, Footprints, Sparkles, HandHeart, HelpCircle, CheckCircle, XCircle, MapPin, Palette, Tag, Filter, ListChecks, Users, Recycle, Wind, Search, Settings, Save, Trash2, Square, Home, ShoppingBag, Info, Phone, ThumbsUp, Meh } from 'lucide-react';
import type { IconSelectItem } from './types';

export const APP_NAME = "ReThread";

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

export const HOW_IT_WORKS_STEPS: { title: string; description: string; icon: LucideIcon }[] = [
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
