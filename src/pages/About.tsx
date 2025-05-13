
import { motion } from 'framer-motion';
import { Building2, Users, Cloud, Database, Code, Clock, Scale } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  const features = [
    {
      icon: <Building2 className="h-12 w-12 text-navora-red" />,
      title: "Our Mission",
      description: "To empower businesses through cloud technology and automation, making complex workflows simple and efficient."
    },
    {
      icon: <Users className="h-12 w-12 text-navora-red" />,
      title: "Our Team",
      description: "A diverse group of cloud experts, DevOps engineers, and automation specialists dedicated to transforming your business operations."
    },
    {
      icon: <Cloud className="h-12 w-12 text-navora-red" />,
      title: "AWS Expertise",
      description: "Specialized in AWS cloud infrastructure, we optimize deployments, manage resources, and implement best practices for security and performance."
    },
    {
      icon: <Code className="h-12 w-12 text-navora-red" />,
      title: "Automation Solutions",
      description: "From custom workflow automation to data entry systems, we build tools that reduce manual work and increase productivity."
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
                Simplifying Cloud & Automation
              </h1>
              <p className="text-xl text-muted-foreground">
                Navora specializes in AWS cloud infrastructure and business workflow automation,
                helping companies minimize errors, save time, and scale efficiently.
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

        {/* Services Section */}
        <section className="py-20 bg-navora-darker">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-navora-dark p-6 rounded-lg">
                <Cloud className="h-10 w-10 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-3">AWS Cloud DevOps</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Infrastructure as Code (IaC)</li>
                  <li>• CI/CD Pipeline Implementation</li>
                  <li>• Cloud Security & Compliance</li>
                  <li>• Cost Optimization</li>
                </ul>
              </div>
              
              <div className="bg-navora-dark p-6 rounded-lg">
                <Database className="h-10 w-10 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-3">Workflow Automation</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Custom Data Entry Automation</li>
                  <li>• Customer Retention Systems</li>
                  <li>• Business Process Automation</li>
                  <li>• Legacy System Integration</li>
                </ul>
              </div>
              
              <div className="bg-navora-dark p-6 rounded-lg">
                <Clock className="h-10 w-10 text-navora-red mb-4" />
                <h3 className="text-xl font-semibold mb-3">Training & Consulting</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Automation Workshops</li>
                  <li>• AWS Certification Training</li>
                  <li>• Custom DevOps Training</li>
                  <li>• Digital Transformation Consulting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Choose Navora</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col items-center">
                  <Clock className="h-12 w-12 text-navora-red mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                  <p className="text-muted-foreground">Reduce manual processes and free up valuable resources</p>
                </div>
                <div className="flex flex-col items-center">
                  <Database className="h-12 w-12 text-navora-red mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Minimize Errors</h3>
                  <p className="text-muted-foreground">Eliminate human errors through automated workflows</p>
                </div>
                <div className="flex flex-col items-center">
                  <Scale className="h-12 w-12 text-navora-red mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Scale Efficiently</h3>
                  <p className="text-muted-foreground">Grow your business with minimal additional resources</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
