
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const featureData = [
  {
    icon: '🚀',
    title: 'No-Code Builder',
    description: 'Create and customize AI agents with an intuitive drag-and-drop interface, no programming required.'
  },
  {
    icon: '⚡',
    title: 'Instant Deployment',
    description: 'Deploy your AI agents to websites, apps, and platforms with just a few clicks.'
  },
  {
    icon: '📊',
    title: 'Revenue Dashboard',
    description: 'Track sales, customer usage, and revenue with detailed analytics and insights.'
  },
  {
    icon: '🔄',
    title: 'Continuous Learning',
    description: 'Your agents improve over time based on user interactions and feedback.'
  },
  {
    icon: '🔐',
    title: 'Secure Transactions',
    description: 'End-to-end encryption and secure payment processing for all purchases.'
  },
  {
    icon: '🌐',
    title: 'Global Marketplace',
    description: 'Reach customers worldwide through our extensive network and platform.'
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentTestimonial, isAnimating]);

  // Gradient animation variants
  const gradientVariants = {
    initial: { opacity: 0.5, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } 
    }
  };

  // Hero section animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-navora-red/20 rounded-full blur-[100px]"
            initial="initial"
            animate="animate"
            variants={gradientVariants}
          />
          <motion.div
            className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[100px]"
            initial="initial"
            animate="animate"
            variants={{
              ...gradientVariants,
              animate: {
                ...gradientVariants.animate,
                transition: { duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }
              }
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Where <span className="text-navora-red">AI Agents</span> Meet Human <span className="text-navora-red">Creativity</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-10"
              variants={itemVariants}
            >
              Discover, purchase, and deploy AI agents created by the world's most innovative minds.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link to="/marketplace">
                <Button size="lg" className="button-primary font-semibold text-lg px-8">
                  Explore Agents <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="button-outline font-semibold text-lg px-8">
                  Sell Your Agent
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-16 relative"
              variants={itemVariants}
            >
              <div className="relative mx-auto w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1470&h=800" 
                  alt="Navora AI Platform" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navora-dark/80 to-transparent flex items-end justify-center pb-8">
                  <Button size="sm" variant="default" className="bg-white text-navora-dark hover:bg-white/90">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Grid Section */}
      <section className="py-20 bg-navora-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Creators & Buyers</h2>
            <p className="text-lg text-muted-foreground">Everything you need to create, sell, and integrate intelligent AI agents into your workflow.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureData.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-navora-dark rounded-xl p-6 shadow-lg hover:shadow-navora-red/5 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-navora-darker relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navora-red/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-navora-red text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">AI Agents</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-navora-red text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg">Active Users</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-navora-red text-4xl font-bold mb-2">$2.5M+</div>
              <div className="text-lg">Creator Earnings</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-navora-red text-4xl font-bold mb-2">98%</div>
              <div className="text-lg">Satisfaction Rate</div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-navora-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Navora Works</h2>
            <p className="text-lg text-muted-foreground">A simple process for both creators and customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-navora-red/10 flex items-center justify-center text-navora-red text-2xl font-bold mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3">Create & Upload</h3>
              <p className="text-muted-foreground mb-4">Build your AI agent with our no-code tools or upload your custom-built solution.</p>
              <ul className="text-left text-sm space-y-2">
                {['No-code builder', 'Custom code support', 'Multiple model types'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-navora-red/10 flex items-center justify-center text-navora-red text-2xl font-bold mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3">Sell & Market</h3>
              <p className="text-muted-foreground mb-4">List your agent on our marketplace with flexible pricing and subscription options.</p>
              <ul className="text-left text-sm space-y-2">
                {['Set your own price', 'Marketing tools', 'Sales analytics'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-20 h-20 rounded-full bg-navora-red/10 flex items-center justify-center text-navora-red text-2xl font-bold mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Earn & Grow</h3>
              <p className="text-muted-foreground mb-4">Earn revenue as customers purchase and use your AI agents.</p>
              <ul className="text-left text-sm space-y-2">
                {['Recurring revenue', 'Usage analytics', 'Customer feedback'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-navora-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div className="text-center mt-16">
            <Link to="/signup">
              <Button size="lg" className="button-primary font-semibold">
                Start Creating Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-navora-gray relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">Join thousands of satisfied creators and customers</p>
          </div>
          
          <div 
            className="relative max-w-4xl mx-auto"
            ref={testimonialRef}
          >
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-navora-dark rounded-xl p-8 md:p-10 shadow-lg"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-navora-red"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg md:text-xl italic mb-6">"{testimonials[currentTestimonial].comment}"</div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-muted-foreground">
                          {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mt-3 md:mt-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    currentTestimonial === index ? "bg-navora-red" : "bg-navora-red/30"
                  )}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 bg-navora-dark/70 rounded-full flex items-center justify-center text-white hover:bg-navora-red transition-colors duration-200 -ml-5 md:ml-0"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 bg-navora-dark/70 rounded-full flex items-center justify-center text-white hover:bg-navora-red transition-colors duration-200 -mr-5 md:mr-0"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navora-dark to-navora-gray relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workflow with AI?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of innovators who are already leveraging the power of AI agents to save time, increase productivity, and unlock new possibilities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/marketplace">
                <Button size="lg" className="button-primary font-semibold text-lg px-8 w-full sm:w-auto">
                  Explore the Marketplace
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="button-outline font-semibold text-lg px-8 w-full sm:w-auto">
                  Become a Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
