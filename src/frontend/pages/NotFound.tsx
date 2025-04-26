import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 max-w-md mx-auto">
            <h1 className="text-9xl font-bold text-navora-red">404</h1>
            <h2 className="text-3xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="pt-6">
              <Link to="/">
                <Button className="bg-navora-red hover:bg-navora-red/90">
                  <HomeIcon className="mr-2 h-5 w-5" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
