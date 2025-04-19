
import { motion } from 'framer-motion';
import { Building2, Users, Rocket, Globe } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  const features = [
    {
      icon: <Building2 className="h-12 w-12 text-navora-red" />,
      title: "Our Mission",
      description: "To revolutionize creative workflows by making powerful AI agents accessible to everyone."
    },
    {
      icon: <Users className="h-12 w-12 text-navora-red" />,
      title: "Our Team",
      description: "A diverse group of AI experts, developers, and creatives working to shape the future of digital creation."
    },
    {
      icon: <Rocket className="h-12 w-12 text-navora-red" />,
      title: "Innovation",
      description: "Continuously pushing boundaries to develop cutting-edge AI solutions that empower creators."
    },
    {
      icon: <Globe className="h-12 w-12 text-navora-red" />,
      title: "Global Impact",
      description: "Serving creators and businesses worldwide with AI tools that transform ideas into reality."
    }
  ];

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-navora-dark py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Empowering Creativity Through AI
              </h1>
              <p className="text-xl text-muted-foreground">
                Navora Creative Solutions is building the future of creative AI, 
                making powerful tools accessible to creators worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-navora-dark p-8 rounded-lg"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-navora-darker">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We envision a world where AI amplifies human creativity, enabling everyone 
                to bring their ideas to life with unprecedented ease and precision. Our platform 
                serves as a bridge between imagination and reality, powered by cutting-edge AI technology.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
