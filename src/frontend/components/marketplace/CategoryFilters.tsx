
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilters = ({ categories, selectedCategory, onCategoryChange }: CategoryFiltersProps) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex items-center space-x-4 pb-4">
        {categories.map(category => (
          <Button
            key={category}
            variant={category === selectedCategory ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full text-sm",
              category === selectedCategory ? "bg-navora-red hover:bg-navora-red/90" : "border-navora-lightgray text-muted-foreground hover:border-navora-red hover:text-navora-red"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryFilters;
