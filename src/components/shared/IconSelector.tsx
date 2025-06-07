import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IconSelectItem } from "@/lib/types";

interface IconSelectorProps<T extends string> {
  options: IconSelectItem[];
  value: T | undefined;
  onChange: (value: T) => void;
  gridCols?: string; // e.g. "grid-cols-2 sm:grid-cols-3"
}

export function IconSelector<T extends string>({
  options,
  value,
  onChange,
  gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
}: IconSelectorProps<T>) {
  return (
    <div className={cn("grid gap-4", gridCols)}>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className={cn(
            "h-auto min-h-[120px] w-full p-4 flex flex-col items-center justify-center text-center space-y-2 border-2",
            value === option.id
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          )}
          onClick={() => onChange(option.id as T)}
        >
          {option.icon && <option.icon className={cn("h-8 w-8 mb-2", value === option.id ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />}
          <span className={cn("font-medium w-full", value === option.id ? "text-primary" : "text-foreground")}>{option.name}</span>
          {option.description && (
            <span className={cn("text-xs text-center w-full break-words whitespace-normal", value === option.id ? "text-primary/80" : "text-muted-foreground")}>{option.description}</span>
          )}
        </Button>
      ))}
    </div>
  );
}
