import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
    // Scroll to top when component mounts
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className="bg-navora-dark py-24"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Unlock the Power of AI with Navora
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover, create, and monetize AI agents.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/marketplace">
                <Button className="bg-navora-red hover:bg-navora-red/90 text-white">
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/dashboard/upload">
                <Button variant="outline" className="border-navora-red text-navora-red hover:bg-navora-red/10">
                  Become a Creator
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="bg-background py-16"
          variants={featuresVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center">
                <Sparkles className="mx-auto h-10 w-10 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Discover AI Agents
                </h3>
                <p className="text-muted-foreground">
                  Explore a wide range of AI agents for various use cases.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <Sparkles className="mx-auto h-10 w-10 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Create Your Own
                </h3>
                <p className="text-muted-foreground">
                  Build and deploy custom AI agents with ease.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <Sparkles className="mx-auto h-10 w-10 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Monetize Your Work
                </h3>
                <p className="text-muted-foreground">
                  Earn revenue by selling your AI agents on our marketplace.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="bg-navora-dark py-16"
          variants={testimonialsVariants}
          initial="hidden"
          animate="visible"
        >
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
