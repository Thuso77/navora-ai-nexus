import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Tag, 
  Share2, 
  Heart, 
  ShoppingCart, 
  ChevronDown, 
  ThumbsUp, 
  ThumbsDown,
  Check,
  Info,
  MessageSquare,
  BarChart,
  RocketIcon,
  Send
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { getAgentById, getReviewsByAgentId, formatPrice, formatDate, agents } from '@/utils/mockData';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [demoInput, setDemoInput] = useState<string>('');
  const [demoOutput, setDemoOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      const agentData = getAgentById(id || '');
      const reviewsData = getReviewsByAgentId(id || '');
      
      if (agentData) {
        setAgent(agentData);
        setReviews(reviewsData);
      }
      
      setIsLoading(false);
    }, 800);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-navora-red border-t-transparent rounded-full animate-spin mb-8"></div>
            <h2 className="text-xl font-semibold">Loading Agent Details...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <Alert variant="destructive">
            <Info className="h-5 w-5" />
            <AlertTitle>Agent Not Found</AlertTitle>
            <AlertDescription>
              The agent you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
          <div className="mt-8 text-center">
            <Link to="/marketplace">
              <Button className="bg-navora-red hover:bg-navora-red/90">
                Return to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate rating distribution
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    ratingCounts[review.rating as keyof typeof ratingCounts]++;
  });

  // Calculate percentages
  const reviewCount = reviews.length;
  const ratingPercentages = Object.entries(ratingCounts).map(([rating, count]) => ({
    rating: Number(rating),
    percentage: reviewCount > 0 ? (count / reviewCount) * 100 : 0
  })).reverse();

  // Demo functionality
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate response delay
    setTimeout(() => {
      const responses = [
        `Based on your input, I recommend focusing on improving your ${agent.category.toLowerCase()} strategy by implementing AI solutions that can automate repetitive tasks while maintaining quality.`,
        `I've analyzed your request and created a tailored ${agent.category.toLowerCase()} approach that leverages cutting-edge AI technologies to maximize your results with minimal human intervention.`,
        `Your input has been processed. Here's a custom ${agent.category.toLowerCase()} solution that utilizes advanced algorithms to optimize performance while reducing costs by up to 40%.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setDemoOutput(randomResponse);
      setIsProcessing(false);
    }, 1500);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    setIsInCart(true);
    toast({
      title: "Added to Cart",
      description: `${agent.name} has been added to your cart.`,
    });
  };

  // Toggle wishlist functionality
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${agent.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-navora-darker py-4">
          <div className="container mx-auto px-4">
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/marketplace" className="hover:text-white">Marketplace</Link>
              <span className="mx-2">/</span>
              <Link to={`/marketplace?category=${agent.category}`} className="hover:text-white">{agent.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{agent.name}</span>
            </div>
          </div>
        </div>
        
        {/* Agent Header Section */}
        <section className="bg-navora-dark py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Agent Image */}
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={agent.avatar} 
                    alt={agent.name}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
              </div>
              
              {/* Agent Info */}
              <div className="md:w-2/3">
                <div className="flex flex-col h-full">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <h1 className="text-3xl font-bold">{agent.name}</h1>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={toggleWishlist}
                                className={isWishlisted ? "text-navora-red" : ""}
                              >
                                <Heart className={cn("h-5 w-5", isWishlisted ? "fill-navora-red" : "")} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Share2 className="h-5 w-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Share this Agent
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 mr-1" />
                        <span className="font-bold">{agent.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground ml-1">({agent.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Updated {formatDate(agent.updatedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-lg mb-4">{agent.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-navora-red">{agent.category}</Badge>
                        <Badge variant="outline">{agent.modelType}</Badge>
                        {agent.tags.map((tag: string) => (
                          <Badge 
                            key={tag} 
                            variant="outline"
                            className="bg-navora-lightgray/20"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`} />
                          <AvatarFallback>{agent.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Created by {agent.creator}</div>
                          <div className="text-sm text-muted-foreground">Verified Creator</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="text-3xl font-bold text-navora-red">
                        {formatPrice(agent.price)}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                        {!isInCart ? (
                          <Button 
                            className="bg-navora-red hover:bg-navora-red/90 text-white px-8"
                            onClick={handleAddToCart}
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                          </Button>
                        ) : (
                          <Button 
                            variant="outline"
                            className="border-green-500 text-green-500 px-8 hover:bg-green-500/10"
                            disabled
                          >
                            <Check className="h-5 w-5 mr-2" />
                            Added to Cart
                          </Button>
                        )}
                        <Link to="/checkout">
                          <Button variant="default" className="px-8 bg-navora-dark border border-navora-red text-navora-red hover:bg-navora-red hover:text-white">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full max-w-3xl mx-auto mb-8 bg-navora-dark">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="demo" className="flex-1">Live Demo</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="deployment" className="flex-1">Deployment</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <div className="bg-navora-dark rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">About this AI Agent</h2>
                      <p className="text-muted-foreground mb-4">{agent.description}</p>
                      <p className="text-muted-foreground">
                        Designed to work seamlessly with your existing workflows, {agent.name} integrates with popular platforms and tools to enhance your productivity without disrupting your process.
                      </p>
                    </div>
                    
                    <div className="bg-navora-dark rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Key Features</h2>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <li key={item} className="flex">
                            <Check className="h-5 w-5 text-navora-red mr-3 flex-shrink-0 mt-0.5" />
                            <span>
                              {item === 1 && `Advanced ${agent.category} capabilities powered by ${agent.modelType} technology.`}
                              {item === 2 && 'Seamless integration with popular tools and platforms.'}
                              {item === 3 && 'Regular updates and improvements at no additional cost.'}
                              {item === 4 && 'Detailed analytics and performance tracking.'}
                              {item === 5 && '24/7 customer support and comprehensive documentation.'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-navora-dark rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Use Cases</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="p-4 border border-navora-lightgray rounded-lg">
                            <h3 className="font-semibold mb-2">
                              {item === 1 && 'Enterprise Integration'}
                              {item === 2 && 'Individual Productivity'}
                              {item === 3 && 'Team Collaboration'}
                              {item === 4 && 'Customer Service'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item === 1 && `Scale ${agent.category.toLowerCase()} operations across your organization with enterprise-grade security and controls.`}
                              {item === 2 && `Boost your personal productivity by automating ${agent.category.toLowerCase()} tasks.`}
                              {item === 3 && `Enhance team collaboration with shared ${agent.category.toLowerCase()} tools and resources.`}
                              {item === 4 && `Improve customer satisfaction by implementing AI-powered ${agent.category.toLowerCase()} solutions.`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-navora-dark rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Specifications</h2>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-navora-lightgray pb-2">
                          <span className="text-muted-foreground">Model Type</span>
                          <span>{agent.modelType}</span>
                        </div>
                        <div className="flex justify-between border-b border-navora-lightgray pb-2">
                          <span className="text-muted-foreground">Category</span>
                          <span>{agent.category}</span>
                        </div>
                        <div className="flex justify-between border-b border-navora-lightgray pb-2">
                          <span className="text-muted-foreground">Version</span>
                          <span>2.1.4</span>
                        </div>
                        <div className="flex justify-between border-b border-navora-lightgray pb-2">
                          <span className="text-muted-foreground">Last Updated</span>
                          <span>{formatDate(agent.updatedAt)}</span>
                        </div>
                        <div className="flex justify-between border-b border-navora-lightgray pb-2">
                          <span className="text-muted-foreground">Released</span>
                          <span>{formatDate(agent.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">License</span>
                          <span>Commercial</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-navora-dark rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Compatibility</h2>
                      <ul className="space-y-2">
                        {['Windows', 'macOS', 'Linux', 'Web Browsers', 'API'].map((platform) => (
                          <li key={platform} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>{platform}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-navora-dark rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Support</h2>
                      <p className="text-muted-foreground mb-4">
                        Our team is here to help you get the most out of {agent.name}.
                      </p>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Live Demo Tab */}
              <TabsContent value="demo" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-navora-dark rounded-lg p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-2">Try {agent.name} Live</h2>
                      <p className="text-muted-foreground">
                        Test the capabilities of this AI agent with your own input.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-navora-darker rounded-lg mb-6">
                      <h3 className="font-semibold mb-3">Sample Prompts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          `Help me create a ${agent.category.toLowerCase()} strategy for my small business`,
                          `How can I improve my ${agent.category.toLowerCase()} performance?`,
                          `Generate a ${agent.category.toLowerCase()} report based on this data`,
                          `What are the best ${agent.category.toLowerCase()} practices in 2025?`
                        ].map((prompt, idx) => (
                          <Button 
                            key={idx} 
                            variant="outline" 
                            className="justify-start h-auto py-2 border-navora-lightgray hover:bg-navora-red/10 hover:border-navora-red"
                            onClick={() => setDemoInput(prompt)}
                          >
                            {prompt}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <form onSubmit={handleDemoSubmit} className="mb-6">
                      <div className="mb-4">
                        <textarea
                          className="w-full bg-navora-darker border border-navora-lightgray rounded-lg p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-navora-red/50"
                          placeholder={`Enter your ${agent.category.toLowerCase()} query or request...`}
                          value={demoInput}
                          onChange={(e) => setDemoInput(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-navora-red hover:bg-navora-red/90"
                          disabled={isProcessing || !demoInput.trim()}
                        >
                          {isProcessing ? (
                            <>
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Request
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                    
                    {demoOutput && (
                      <div className="p-4 bg-navora-darker rounded-lg border border-navora-lightgray">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{agent.name} Response</h3>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{demoOutput}</p>
                      </div>
                    )}
                    
                    <div className="mt-8 bg-navora-red/10 border border-navora-red/30 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-navora-red mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            This is a limited demo of {agent.name}. The full version includes additional features, higher processing capacity, and integration options.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="bg-navora-dark rounded-lg p-6">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold mb-2">{agent.rating.toFixed(1)}</div>
                        <div className="flex items-center justify-center mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={cn(
                                "h-5 w-5 mr-1", 
                                star <= agent.rating 
                                  ? "fill-yellow-500 text-yellow-500" 
                                  : "text-muted-foreground"
                              )} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">Based on {agent.reviewCount} reviews</div>
                      </div>
                      
                      <div className="space-y-3">
                        {ratingPercentages.map((item) => (
                          <div key={item.rating} className="flex items-center">
                            <div className="w-16 text-sm">{item.rating} stars</div>
                            <div className="flex-grow mx-2">
                              <Progress value={item.percentage} className="h-2" />
                            </div>
                            <div className="w-12 text-sm text-right">
                              {item.percentage.toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-navora-lightgray">
                        <h3 className="font-semibold mb-3">Leave a Review</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Share your experience with this agent. You must purchase the agent before leaving a review.
                        </p>
                        <Button className="w-full bg-navora-red hover:bg-navora-red/90">
                          Write a Review
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <motion.div 
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-navora-dark rounded-lg p-6"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={review.userAvatar} />
                                  <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-semibold">{review.userName}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatDate(review.date)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={cn(
                                      "h-4 w-4", 
                                      star <= review.rating 
                                        ? "fill-yellow-500 text-yellow-500" 
                                        : "text-muted-foreground"
                                    )} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                            <div className="flex items-center justify-end mt-4 text-sm">
                              <Button variant="ghost" size="sm" className="text-muted-foreground">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="text-muted-foreground">
                                <Flag className="h-3 w-3 mr-1" />
                                Report
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                        
                        <div className="flex justify-center mt-4">
                          <Button variant="outline" className="text-muted-foreground">
                            Load More Reviews
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-navora-dark rounded-lg p-6 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Be the first to share your experience with this agent.
                        </p>
                        <Button className="bg-navora-red hover:bg-navora-red/90">
                          Write a Review
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Deployment Tab */}
              <TabsContent value="deployment" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-navora-dark rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Deployment Options</h2>
                    <p className="text-muted-foreground mb-6">
                      {agent.name} offers flexible deployment options to fit your technical requirements and infrastructure.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          icon: <RocketIcon className="h-10 w-10 text-navora-red" />,
                          title: 'One-Click Deploy',
                          description: 'Deploy directly to your Navora dashboard with a single click after purchase.'
                        },
                        {
                          icon: <BarChart className="h-10 w-10 text-navora-red" />,
                          title: 'API Integration',
                          description: 'Access via our RESTful API with comprehensive documentation and examples.'
                        },
                        {
                          icon: <Code className="h-10 w-10 text-navora-red" />,
                          title: 'Custom Integration',
                          description: 'Download source files for self-hosting and custom integration scenarios.'
                        }
                      ].map((option, idx) => (
                        <div key={idx} className="border border-navora-lightgray rounded-lg p-6 text-center">
                          <div className="flex justify-center mb-4">
                            {option.icon}
                          </div>
                          <h3 className="font-semibold mb-2">{option.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-navora-darker rounded-lg p-6 mb-8">
                      <h3 className="font-semibold mb-3">System Requirements</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                          <span>Modern web browser or server environment</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                          <span>Internet connection for API-based deployments</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                          <span>4GB RAM minimum for self-hosted deployments</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                          <span>Node.js 16+ or Python 3.8+ for custom integrations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-t border-navora-lightgray pt-6">
                      <h3 className="font-semibold mb-4">Ready to Deploy {agent.name}?</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-navora-red hover:bg-navora-red/90">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Purchase & Deploy
                        </Button>
                        <Button variant="outline">
                          Contact Sales for Enterprise Options
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related Agents Section */}
        <section className="py-10 bg-navora-gray">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Similar Agents You Might Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents
                .filter(a => a.id !== agent.id && a.category === agent.category)
                .slice(0, 4)
                .map((relatedAgent) => (
                  <div key={relatedAgent.id} className="card-hover">
                    <Card className="overflow-hidden h-full bg-navora-dark border-navora-lightgray">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <img 
                          src={relatedAgent.avatar} 
                          alt={relatedAgent.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">{relatedAgent.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
