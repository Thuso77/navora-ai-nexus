
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter,
  Star,
  Grid,
  List,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Slider,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { agents, formatPrice } from '@/utils/mockData';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Category filter options
const categories = [
  'All Categories',
  'Content Creation',
  'Data Analysis',
  'Development',
  'Audio & Voice',
  'Design',
  'Marketing',
  'Sales',
  'Legal'
];

// Model type filter options
const modelTypes = [
  'GPT-4',
  'Codex',
  'WaveNet',
  'DALL-E',
  'Custom AI'
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [selectedModelTypes, setSelectedModelTypes] = useState<string[]>([]);
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Filter agents based on search, category, price, and model type
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay
    const timeoutId = setTimeout(() => {
      const filtered = agents.filter(agent => {
        // Search filter
        const matchesSearch = searchQuery === '' || 
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Category filter
        const matchesCategory = selectedCategory === 'All Categories' || agent.category === selectedCategory;
        
        // Price filter
        const matchesPrice = agent.price >= priceRange[0] && agent.price <= priceRange[1];
        
        // Model type filter
        const matchesModelType = selectedModelTypes.length === 0 || selectedModelTypes.includes(agent.modelType);
        
        return matchesSearch && matchesCategory && matchesPrice && matchesModelType;
      });
      
      setFilteredAgents(filtered);
      setIsLoading(false);
    }, 500); // Simulate loading delay
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, priceRange, selectedModelTypes]);

  // Toggle model type selection
  const toggleModelType = (modelType: string) => {
    setSelectedModelTypes(prev => 
      prev.includes(modelType)
        ? prev.filter(type => type !== modelType)
        : [...prev, modelType]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setPriceRange([0, 150]);
    setSelectedModelTypes([]);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Render each agent card
  const renderAgentCard = (agent: any, index: number) => (
    <motion.div
      key={agent.id}
      variants={itemVariants}
      className={cn(
        "card-hover",
        viewMode === 'list' ? 'col-span-full flex' : ''
      )}
    >
      <Card className={cn(
        "overflow-hidden h-full bg-navora-dark border-navora-lightgray",
        viewMode === 'list' ? 'flex flex-row' : ''
      )}>
        {/* Image Section */}
        <div className={cn(
          "relative overflow-hidden",
          viewMode === 'grid' ? "aspect-[3/2]" : "w-1/4 flex-shrink-0 hidden md:block"
        )}>
          <img 
            src={agent.avatar} 
            alt={agent.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {agent.featured && (
            <Badge className="absolute top-2 right-2 bg-navora-red">Featured</Badge>
          )}
        </div>
        
        {/* Content Section */}
        <div className={cn(
          viewMode === 'list' ? 'flex-grow flex flex-col' : ''
        )}>
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <span>{agent.name}</span>
              <span className="text-navora-red font-bold">{formatPrice(agent.price)}</span>
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span className="text-sm">by {agent.creator}</span>
              <div className="flex items-center ml-auto">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                <span>{agent.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">({agent.reviewCount})</span>
              </div>
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{agent.shortDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-navora-lightgray/50">
                {agent.category}
              </Badge>
              <Badge variant="outline" className="bg-navora-lightgray/50">
                {agent.modelType}
              </Badge>
            </div>
          </CardContent>
          
          <CardFooter className={cn(
            "mt-auto",
            viewMode === 'list' ? 'justify-end' : ''
          )}>
            <Link to={`/agent/${agent.id}`} className="w-full">
              <Button variant="default" className="w-full bg-navora-red hover:bg-navora-red/90">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-20">
        {/* Hero Banner */}
        <section className="bg-navora-darker py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse AI Agent Marketplace</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Discover powerful AI agents created by expert developers and creative minds.
              </p>
              
              {/* Large Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search agents by name, category or description..."
                  className="py-6 pl-12 pr-4 rounded-lg bg-navora-dark border-navora-lightgray text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content with Sidebar */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Mobile Filter Button */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    isMobileSidebarOpen ? "transform rotate-180" : ""
                  )} />
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-navora-red hover:bg-navora-red/90' : ''}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-navora-red hover:bg-navora-red/90' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Sidebar - Filters */}
              <aside className={cn(
                "lg:w-1/4 space-y-6 bg-navora-dark rounded-lg p-6 h-fit",
                isMobileSidebarOpen ? "block" : "hidden lg:block"
              )}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button 
                    variant="link" 
                    className="text-navora-red p-0 h-auto"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left hover:text-white hover:bg-navora-lightgray/40",
                          selectedCategory === category ? "bg-navora-red/10 text-navora-red" : "text-muted-foreground"
                        )}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 150]}
                      max={150}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Model Type Filter */}
                <div>
                  <h3 className="font-medium mb-3">Model Type</h3>
                  <div className="space-y-2">
                    {modelTypes.map((modelType) => (
                      <div key={modelType} className="flex items-center space-x-2">
                        <Checkbox
                          id={`model-${modelType}`}
                          checked={selectedModelTypes.includes(modelType)}
                          onCheckedChange={() => toggleModelType(modelType)}
                          className="data-[state=checked]:bg-navora-red data-[state=checked]:border-navora-red"
                        />
                        <label
                          htmlFor={`model-${modelType}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {modelType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tags" className="border-navora-lightgray">
                    <AccordionTrigger className="hover:text-white hover:no-underline">
                      Popular Tags
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['copywriting', 'data visualization', 'coding', 'design', 'marketing', 'voice', 'analytics', 'sales', 'legal'].map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-navora-lightgray/30 hover:bg-navora-red/20 cursor-pointer"
                            onClick={() => setSearchQuery(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Apply Filters Button - Mobile Only */}
                <div className="lg:hidden">
                  <Button 
                    className="w-full bg-navora-red hover:bg-navora-red/90"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </aside>
              
              {/* Main Content - Agent Grid */}
              <div className="lg:w-3/4">
                {/* Top Controls - Desktop */}
                <div className="hidden lg:flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {filteredAgents.length} {filteredAgents.length === 1 ? 'Agent' : 'Agents'} {selectedCategory !== 'All Categories' ? `in ${selectedCategory}` : ''}
                    </h2>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-navora-red hover:bg-navora-red/90' : ''}
                    >
                      <Grid className="h-4 w-4 mr-2" />
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-navora-red hover:bg-navora-red/90' : ''}
                    >
                      <List className="h-4 w-4 mr-2" />
                      List
                    </Button>
                  </div>
                </div>
                
                {/* Agent Grid/List */}
                {isLoading ? (
                  // Loading skeleton
                  <div className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                  )}>
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <div key={index} className="bg-navora-dark rounded-lg overflow-hidden animate-pulse">
                        <div className="aspect-[3/2] bg-navora-lightgray/20" />
                        <div className="p-4 space-y-3">
                          <div className="h-6 bg-navora-lightgray/20 rounded w-3/4" />
                          <div className="h-4 bg-navora-lightgray/20 rounded w-1/2" />
                          <div className="h-4 bg-navora-lightgray/20 rounded w-full" />
                          <div className="h-4 bg-navora-lightgray/20 rounded w-full" />
                          <div className="h-10 bg-navora-lightgray/20 rounded w-full mt-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredAgents.length > 0 ? (
                  <motion.div
                    className={cn(
                      "grid gap-6",
                      viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                    )}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredAgents.map((agent, index) => renderAgentCard(agent, index))}
                  </motion.div>
                ) : (
                  <div className="text-center py-16 bg-navora-dark rounded-lg">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No Agents Found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any agents matching your current filters.
                    </p>
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="border-navora-red text-navora-red hover:bg-navora-red/10"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
                
                {/* Pagination Section */}
                {filteredAgents.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" disabled>
                        <ChevronDown className="h-4 w-4 rotate-90" />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-navora-red hover:bg-navora-red/90 border-none">
                        1
                      </Button>
                      <Button variant="outline" size="icon">
                        2
                      </Button>
                      <Button variant="outline" size="icon">
                        3
                      </Button>
                      <Button variant="outline" size="icon">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
