
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AdvancedFiltersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  rating: number;
  setRating: (rating: number) => void;
  modelTypes: string[];
  toggleModelType: (modelType: string) => void;
  tags: string[];
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
  availableModelTypes: string[];
  availableTags: string[];
}

const AdvancedFiltersDialog = ({
  isOpen,
  onOpenChange,
  priceRange,
  setPriceRange,
  rating,
  setRating,
  modelTypes,
  toggleModelType,
  tags,
  toggleTag,
  resetFilters,
  availableModelTypes,
  availableTags,
}: AdvancedFiltersDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-navora-dark border-navora-lightgray">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
          <DialogDescription>
            Customize your search with advanced filter options.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="price">Price Range</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  id="price-min"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-24"
                />
                <Separator orientation="vertical" className="h-6" />
                <Input
                  type="number"
                  id="price-max"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-24"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="rating">Minimum Rating</Label>
              <Select value={String(rating)} onValueChange={(value) => setRating(Number(value))}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {[0, 1, 2, 3, 4, 5].map(r => (
                    <SelectItem key={r} value={String(r)}>
                      {r} Stars & Up
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Model Types</Label>
              <div className="mt-2 space-y-1">
                {availableModelTypes.map(modelType => (
                  <div key={modelType} className="flex items-center space-x-2">
                    <Switch 
                      id={`model-${modelType}`}
                      checked={modelTypes.includes(modelType)}
                      onCheckedChange={() => toggleModelType(modelType)}
                    />
                    <Label htmlFor={`model-${modelType}`}>{modelType}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Tags</Label>
              <div className="mt-2 space-y-1">
                {availableTags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Switch 
                      id={`tag-${tag}`}
                      checked={tags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-between mt-6">
          <Button variant="ghost" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFiltersDialog;
