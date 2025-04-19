
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock,
  Eye, 
  EyeOff, 
  LogIn,
  Github,
  Twitter,
  Facebook
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // Demo credentials for easy testing
      if (email === 'demo@navora.ai' && password === 'password') {
        toast({
          title: "Success",
          description: "You have been signed in successfully.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password. Try demo@navora.ai / password",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialSignIn = (provider: string) => {
    toast({
      title: "Social Sign In",
      description: `${provider} authentication is not implemented in this demo.`,
    });
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="py-20">
        <div className="container mx-auto px-4 pt-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-navora-dark border-navora-lightgray">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Eye className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remember-me" 
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          className="data-[state=checked]:bg-navora-red data-[state=checked]:border-navora-red"
                        />
                        <label
                          htmlFor="remember-me"
                          className="text-sm font-medium leading-none"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-navora-red hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-navora-red hover:bg-navora-red/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <LogIn className="h-5 w-5 mr-2" />
                          Sign in
                        </>
                      )}
                    </Button>
                    
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-navora-lightgray"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-navora-dark px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignIn('GitHub')}
                        className="border-navora-lightgray"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignIn('Twitter')}
                        className="border-navora-lightgray"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignIn('Facebook')}
                        className="border-navora-lightgray"
                      >
                        <Facebook className="h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-navora-red hover:underline">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
