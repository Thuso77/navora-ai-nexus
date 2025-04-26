import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User,
  Mail, 
  Lock,
  Eye, 
  EyeOff, 
  UserPlus,
  Github,
  Twitter,
  Facebook,
  CheckCircle
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

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "You must accept the terms and conditions to create an account.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration delay
    setTimeout(() => {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      
      // Navigate to dashboard or creator dashboard based on selection
      navigate(isCreator ? '/dashboard/upload' : '/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialSignUp = (provider: string) => {
    toast({
      title: "Social Sign Up",
      description: `${provider} registration is not implemented in this demo.`,
    });
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: 'No password' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    return { 
      strength, 
      label: labels[strength - 1] || 'Weak',
      color: ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][strength - 1] || 'bg-red-500'
    };
  };

  const passwordStrength = getPasswordStrength();

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
                  <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                  <CardDescription>
                    Join Navora and access the world of AI agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
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
                      <div className="space-y-2">
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
                        
                        {password && (
                          <div className="space-y-1">
                            <div className="flex h-2 w-full overflow-hidden rounded-full bg-navora-lightgray/30">
                              <div
                                className={`h-full ${passwordStrength.color}`}
                                style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Password strength: {passwordStrength.label}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={termsAccepted}
                          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                          className="data-[state=checked]:bg-navora-red data-[state=checked]:border-navora-red"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none"
                        >
                          I agree to the{' '}
                          <Link to="/terms" className="text-navora-red hover:underline">
                            terms of service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-navora-red hover:underline">
                            privacy policy
                          </Link>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="creator" 
                          checked={isCreator}
                          onCheckedChange={(checked) => setIsCreator(checked as boolean)}
                          className="data-[state=checked]:bg-navora-red data-[state=checked]:border-navora-red"
                        />
                        <label
                          htmlFor="creator"
                          className="text-sm font-medium leading-none"
                        >
                          I want to create and sell AI agents
                        </label>
                      </div>
                      
                      {isCreator && (
                        <div className="rounded-md bg-navora-red/10 p-3 border border-navora-red/20">
                          <div className="flex">
                            <CheckCircle className="h-5 w-5 text-navora-red flex-shrink-0 mt-0.5 mr-3" />
                            <div className="text-sm">
                              <p className="font-medium">Creator features enabled</p>
                              <p className="text-muted-foreground">You'll have access to the creator dashboard, analytics, and revenue tools.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-navora-red hover:bg-navora-red/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5 mr-2" />
                          Create account
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
                        onClick={() => handleSocialSignUp('GitHub')}
                        className="border-navora-lightgray"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignUp('Twitter')}
                        className="border-navora-lightgray"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignUp('Facebook')}
                        className="border-navora-lightgray"
                      >
                        <Facebook className="h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-navora-red hover:underline">
                      Sign in
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

export default SignUp;
