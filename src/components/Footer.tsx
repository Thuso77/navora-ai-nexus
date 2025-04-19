
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navora-darker pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img 
                src="/lovable-uploads/e10c76e4-2a5b-423f-873d-677c804a9693.png" 
                alt="Navora Creative Solutions" 
                className="h-10 mb-4" 
              />
            </Link>
            <p className="text-muted-foreground mb-4">
              Navora Creative Solutions is a marketplace where AI agents meet human creativity, enabling innovation at scale.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-navora-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-navora-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-navora-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-navora-red transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-white transition-colors inline-flex items-center">
                  <ArrowRight size={16} className="mr-2 text-navora-red" />
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="input-primary w-full"
              />
              <textarea 
                placeholder="Your Message" 
                rows={3} 
                className="input-primary w-full"
              ></textarea>
              <button 
                type="submit" 
                className="button-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <hr className="border-muted my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Navora Creative Solutions. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
