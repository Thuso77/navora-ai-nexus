
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  SlidersHorizontal, 
  Search, 
  ChevronDown,
  ChevronsUpDown
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { agents, formatPrice } from '@/utils/mockData';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // State for advanced filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [rating, setRating] = useState(0);
  const [modelTypes, setModelTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Extract all available categories from agents data
    const categories = ['All', ...new Set(agents.map(agent => agent.category))];
    setAvailableCategories(categories);
    
    // Apply filters and sorting
    applyFiltersAndSorting();
    
    // Scroll to top when component mounts or filters change
    window.scrollTo(0, 0);
  }, [searchTerm, categoryFilter, sortBy, priceRange, rating, modelTypes, tags]);

  const applyFiltersAndSorting = () => {
    let tempAgents = [...agents];

    // Apply search filter
    if (searchTerm) {
      tempAgents = tempAgents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'All') {
      tempAgents = tempAgents.filter(agent => agent.category === categoryFilter);
    }
    
    // Apply advanced filters
    tempAgents = tempAgents.filter(agent => agent.price >= priceRange.min && agent.price <= priceRange.max);
    if (rating > 0) {
      tempAgents = tempAgents.filter(agent => agent.rating >= rating);
    }
    if (modelTypes.length > 0) {
      tempAgents = tempAgents.filter(agent => modelTypes.includes(agent.modelType));
    }
    if (tags.length > 0) {
      tempAgents = tempAgents.filter(agent => agent.tags.some(tag => tags.includes(tag)));
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      tempAgents.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      tempAgents.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      tempAgents.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'relevance') {
      // For relevance, we can shuffle the array or implement a more complex logic
      tempAgents = [...tempAgents].sort(() => Math.random() - 0.5);
    }

    setFilteredAgents(tempAgents);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Update URL
    searchParams.set('search', newSearchTerm);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);

    // Update URL
    searchParams.set('category', category);
    setSearchParams(searchParams);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);

    // Update URL
    searchParams.set('sort', sortOption);
    setSearchParams(searchParams);
  };
  
  // Toggle advanced filter
  const toggleModelType = (modelType: string) => {
    setModelTypes(prev =>
      prev.includes(modelType) ? prev.filter(item => item !== modelType) : [...prev, modelType]
    );
  };
  
  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
    );
  };
  
  // Reset filters
  const resetFilters = () => {
    setPriceRange({ min: 0, max: 200 });
    setRating(0);
    setModelTypes([]);
    setTags([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-navora-darker py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Explore AI Agents</h1>
          <p className="text-muted-foreground text-lg">
            Discover and deploy AI agents to automate tasks, improve productivity, and more.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="relative flex-grow">
              <Input 
                type="text" 
                placeholder="Search for agents..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="pr-12"
              />
              <Search className="absolute right-4 top-3 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline" onClick={() => setIsMobileFiltersOpen(true)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="bg-navora-dark py-6">
        <div className="container mx-auto px-4">
          <ScrollArea className="w-full">
            <div className="flex items-center space-x-4 pb-4">
              {availableCategories.map(category => (
                <Button
                  key={category}
                  variant={category === categoryFilter ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "rounded-full text-sm",
                    category === categoryFilter ? "bg-navora-red hover:bg-navora-red/90" : "border-navora-lightgray text-muted-foreground hover:border-navora-red hover:text-navora-red"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
      
      {/* Agent List Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {filteredAgents.length} Agents Found
            </h2>
            
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Agent Grid */}
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map(agent => (
                <motion.div 
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-hover"
                >
                  <Card className="overflow-hidden h-full bg-navora-dark border-navora-lightgray">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img 
                        src={agent.avatar} 
                        alt={agent.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">{agent.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span>{agent.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-navora-red font-bold ml-auto">{formatPrice(agent.price)}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {agent.shortDescription}
                      </p>
                    </CardContent>
                    <CardFooter className="py-4">
                      <Link to={`/agent/${agent.id}`} className="w-full">
                        <Button className="w-full bg-navora-red hover:bg-navora-red/90">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No agents found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter options.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* Filter Dialog (for desktop) */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-navora-dark border-navora-lightgray">
          <DialogHeader>
            <DialogTitle>Advanced Filters</DialogTitle>
            <DialogDescription>
              Customize your search with advanced filter options.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid gap-4 py-4">
              {/* Price Range */}
              <div>
                <Label htmlFor="price">Price Range</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    id="price-min"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-24"
                  />
                  <Separator orientation="vertical" className="h-6" />
                  <Input
                    type="number"
                    id="price-max"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-24"
                  />
                </div>
              </div>
              
              {/* Rating */}
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
              
              {/* Model Types */}
              <div>
                <Label>Model Types</Label>
                <div className="mt-2 space-y-1">
                  {[...new Set(agents.map(agent => agent.modelType))].map(modelType => (
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
              
              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="mt-2 space-y-1">
                  {/* Assuming tags are consistent across all agents for simplicity */}
                  {[...new Set(agents.flatMap(agent => agent.tags))].map(tag => (
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
            <Button onClick={() => setIsFilterDialogOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Mobile Filter Modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
          isMobileFiltersOpen ? "block" : "hidden"
        )}
      >
        <div className="fixed inset-y-0 right-0 w-3/4 bg-navora-dark border-l border-navora-lightgray shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <div className="grid gap-4 py-4">
              {/* Price Range */}
              <div>
                <Label htmlFor="price">Price Range</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    id="price-min"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-24"
                  />
                  <Separator orientation="vertical" className="h-6" />
                  <Input
                    type="number"
                    id="price-max"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-24"
                  />
                </div>
              </div>
              
              {/* Rating */}
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
              
              {/* Model Types */}
              <div>
                <Label>Model Types</Label>
                <div className="mt-2 space-y-1">
                  {[...new Set(agents.map(agent => agent.modelType))].map(modelType => (
                    <div key={modelType} className="flex items-center space-x-2">
                      <Switch 
                        id={`mobile-model-${modelType}`}
                        checked={modelTypes.includes(modelType)}
                        onCheckedChange={() => toggleModelType(modelType)}
                      />
                      <Label htmlFor={`mobile-model-${modelType}`}>{modelType}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="mt-2 space-y-1">
                  {/* Assuming tags are consistent across all agents for simplicity */}
                  {[...new Set(agents.flatMap(agent => agent.tags))].map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Switch 
                        id={`mobile-tag-${tag}`}
                        checked={tags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      <Label htmlFor={`mobile-tag-${tag}`}>{tag}</Label>
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
            <Button onClick={() => setIsMobileFiltersOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
