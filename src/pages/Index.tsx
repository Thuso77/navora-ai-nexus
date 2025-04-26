import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Rocket, 
  Globe, 
  Trophy,
  Brain, 
  Lightbulb,
  Flower
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { testimonials } from '@/utils/mockData';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Index = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Success",
      description: "Your message has been sent!",
    });
    setEmail('');
    setMessage('');
  };

  // Animation variants for the hero section
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  // Animation variants for the features section
  const featuresVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  // Animation variants for the testimonials section
  const testimonialsVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  // Animation variants for the contact section
  const contactVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  // Fix the animation variant to use a proper repeatType value
  const pulseAnimation = {
    initial: { opacity: 0.8, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        // Change string to proper enum value
        repeatType: "reverse" as const
      } 
    }
  };

  // Animation variants for floating icons
  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section with Enhanced Visuals */}
        <motion.section
          className="bg-navora-dark py-24 relative overflow-hidden"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-10 left-10 text-navora-red opacity-50"
            variants={floatingAnimation}
            animate="animate"
          >
            <Sparkles className="h-12 w-12" />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 right-20 text-navora-red opacity-50"
            variants={floatingAnimation}
            animate="animate"
          >
            <Rocket className="h-16 w-16" />
          </motion.div>
          <motion.div 
            className="absolute top-20 right-32 text-navora-red opacity-30"
            variants={floatingAnimation}
            animate="animate"
          >
            <Globe className="h-10 w-10" />
          </motion.div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-4">
              <Lightbulb className="h-10 w-10 text-navora-red" />
              Unlock the Power of AI with Navora
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover, create, and monetize AI agents.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/marketplace">
                <Button className="bg-navora-red hover:bg-navora-red/90 text-white">
                  <Rocket className="mr-2 h-5 w-5" />
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/dashboard/upload">
                <Button variant="outline" className="border-navora-red text-navora-red hover:bg-navora-red/10">
                  <Trophy className="mr-2 h-5 w-5" />
                  Become a Creator
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Features Section with Icons */}
        <motion.section
          className="bg-background py-16 relative"
          variants={featuresVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="absolute top-10 right-10 text-navora-red opacity-30"
            variants={floatingAnimation}
            animate="animate"
          >
            <Brain className="h-20 w-20" />
          </motion.div>
          
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-navora-red" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature cards with enhanced styling */}
              <motion.div 
                className="bg-navora-dark p-6 rounded-lg border border-navora-lightgray hover:border-navora-red transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Globe className="mx-auto h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Discover AI Agents
                </h3>
                <p className="text-muted-foreground">
                  Explore a wide range of AI agents for various use cases.
                </p>
              </motion.div>

              <motion.div 
                className="bg-navora-dark p-6 rounded-lg border border-navora-lightgray hover:border-navora-red transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Lightbulb className="mx-auto h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Create Your Own
                </h3>
                <p className="text-muted-foreground">
                  Build and deploy custom AI agents with ease.
                </p>
              </motion.div>

              <motion.div 
                className="bg-navora-dark p-6 rounded-lg border border-navora-lightgray hover:border-navora-red transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Trophy className="mx-auto h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Monetize Your Work
                </h3>
                <p className="text-muted-foreground">
                  Earn revenue by selling your AI agents on our marketplace.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section with Enhanced Cards */}
        <motion.section
          className="bg-navora-dark py-16 relative"
          variants={testimonialsVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="absolute bottom-10 left-10 text-navora-red opacity-30"
            variants={floatingAnimation}
            animate="animate"
          >
            <Flower className="h-16 w-16" />
          </motion.div>

          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card-hover">
                  <Card className="h-full bg-navora-gray border-navora-lightgray">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {testimonial.comment}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="bg-background py-16"
          variants={contactVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Contact Us
            </h2>
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-navora-lightgray border-navora-lightgray text-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="bg-navora-lightgray border-navora-lightgray text-white min-h-[100px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-navora-red hover:bg-navora-red/90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
