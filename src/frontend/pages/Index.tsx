import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Rocket, 
  Globe, 
  Trophy,
  Cloud, 
  Lightbulb,
  Database,
  Clock,
  Scale
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
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Tech Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navora-dark via-navora-dark/95 to-navora-dark z-20" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
              alt="" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px]"
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px]"
            animate={{
              backgroundPosition: ["0px 0px", "-60px 60px"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
      </div>

      <NavBar />

      {/* Rest of the content */}
      <main className="flex-grow relative z-10">
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
            <Cloud className="h-12 w-12" />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 right-20 text-navora-red opacity-50"
            variants={floatingAnimation}
            animate="animate"
          >
            <Database className="h-16 w-16" />
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
              <Cloud className="h-10 w-10 text-navora-red" />
              Cloud DevOps & Automation Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Streamline your workflows, scale with ease, and maximize efficiency with Navora.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/marketplace">
                <Button className="bg-navora-red hover:bg-navora-red/90 text-white">
                  <Cloud className="mr-2 h-5 w-5" />
                  Our Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-navora-red text-navora-red hover:bg-navora-red/10">
                  <Database className="mr-2 h-5 w-5" />
                  Start Automating
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
            <Database className="h-20 w-20" />
          </motion.div>
          
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-navora-red" />
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature cards with enhanced styling */}
              <motion.div 
                className="bg-navora-dark p-6 rounded-lg border border-navora-lightgray hover:border-navora-red transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Cloud className="mx-auto h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  AWS Cloud DevOps
                </h3>
                <p className="text-muted-foreground">
                  Expert cloud infrastructure management and optimization on AWS.
                </p>
              </motion.div>

              <motion.div 
                className="bg-navora-dark p-6 rounded-lg border border-navora-lightgray hover:border-navora-red transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Database className="mx-auto h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Workflow Automation
                </h3>
                <p className="text-muted-foreground">
                  Automate data entry and customer retention workflows for maximum efficiency.
                </p>
              </motion.div>

              <motion.div 
                className="bg-navora-dark p-6 rounded-lg border border-navora-lightgray hover:border-navora-red transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Lightbulb className="mx-auto h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Training & Expertise
                </h3>
                <p className="text-muted-foreground">
                  Learn to automate your daily workflows to minimize errors and save time.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="bg-navora-darker py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Navora</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Automate repetitive tasks and free up your team to focus on growth.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Database className="h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">Minimize Errors</h3>
                <p className="text-muted-foreground">
                  Reduce human errors with reliable, consistent automated workflows.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Scale className="h-12 w-12 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">Scale Effortlessly</h3>
                <p className="text-muted-foreground">
                  Grow your business with systems that scale alongside your needs.
                </p>
              </div>
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
            <Database className="h-16 w-16" />
          </motion.div>

          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Clients Say
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
