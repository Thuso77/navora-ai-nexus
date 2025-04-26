
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agents } from '@/utils/mockData';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryFilters from '../components/marketplace/CategoryFilters';
import AgentCard from '../components/marketplace/AgentCard';
import AdvancedFiltersDialog from '../components/marketplace/AdvancedFiltersDialog';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filteredAgents, setFilteredAgents] = useState(agents);
  
  // Advanced filters state
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [rating, setRating] = useState(0);
  const [modelTypes, setModelTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const categories = ['All', ...new Set(agents.map(agent => agent.category))];
    setAvailableCategories(categories);
    applyFiltersAndSorting();
    window.scrollTo(0, 0);
  }, [searchTerm, categoryFilter, sortBy, priceRange, rating, modelTypes, tags]);

  const applyFiltersAndSorting = () => {
    let tempAgents = [...agents];

    if (searchTerm) {
      tempAgents = tempAgents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      tempAgents = tempAgents.filter(agent => agent.category === categoryFilter);
    }
    
    tempAgents = tempAgents.filter(agent => 
      agent.price >= priceRange.min && 
      agent.price <= priceRange.max
    );
    
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
    }

    setFilteredAgents(tempAgents);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    searchParams.set('search', newSearchTerm);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    searchParams.set('category', category);
    setSearchParams(searchParams);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    searchParams.set('sort', sortOption);
    setSearchParams(searchParams);
  };
  
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
  
  const resetFilters = () => {
    setPriceRange({ min: 0, max: 200 });
    setRating(0);
    setModelTypes([]);
    setTags([]);
  };

  const availableModelTypes = [...new Set(agents.map(agent => agent.modelType))];
  const availableTags = [...new Set(agents.flatMap(agent => agent.tags))];

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
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="bg-navora-dark py-6">
        <div className="container mx-auto px-4">
          <CategoryFilters 
            categories={availableCategories}
            selectedCategory={categoryFilter}
            onCategoryChange={handleCategoryChange}
          />
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
                <AgentCard key={agent.id} agent={agent} />
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
      
      <Footer />
      
      {/* Advanced Filters Dialog */}
      <AdvancedFiltersDialog
        isOpen={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        rating={rating}
        setRating={setRating}
        modelTypes={modelTypes}
        toggleModelType={toggleModelType}
        tags={tags}
        toggleTag={toggleTag}
        resetFilters={resetFilters}
        availableModelTypes={availableModelTypes}
        availableTags={availableTags}
      />
    </div>
  );
};

export default Marketplace;
