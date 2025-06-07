
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ClothingItem } from '@/lib/types';
import { MapPin, Tag, CheckCircle, ShoppingBag, Zap, Heart } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full masonry-grid-item">
      <CardHeader className="p-0 relative aspect-[3/4]">
        <Link href={`/item/${item.id}`} passHref>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="clothing fashion item"
            priority={item.isNewItem}
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {item.isNewItem && <Badge variant="default" className="bg-accent text-accent-foreground"><Zap className="w-3 h-3 mr-1" /> New!</Badge>}
          {item.matchesRequest && <Badge variant="secondary">Matches Request</Badge>}
          {item.localPickup && <Badge variant="outline">Local Pickup</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/item/${item.id}`} passHref>
          <CardTitle className="text-lg font-semibold font-headline text-primary mb-1 hover:underline cursor-pointer truncate max-w-full">
            {item.title}
          </CardTitle>
        </Link>
        <div className="text-sm text-foreground/80 space-y-1 mb-2">
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1.5 text-primary/70" />
            <span className="line-clamp-1">{item.material} - {item.category}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1.5 text-primary/70" />
            <span className="line-clamp-1">{item.giverLocation}</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1.5 text-primary/70" />
            <span>Condition: {item.condition}</span>
          </div>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-sm">{tag}</Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-sm">+{item.tags.length - 3}</Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <Button variant="outline" size="sm" className="w-full group/button border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
          Quick Request
          <ShoppingBag className="ml-2 h-4 w-4 group-hover/button:text-accent transition-colors" />
        </Button>
        {/* Add a favorite button or similar action if needed */}
        {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-pink-500">
          <Heart className="h-5 w-5"/>
        </Button> */}
      </CardFooter>
    </Card>
  );
}

    