
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Tag,
  DollarSign,
  X,
  HelpCircle,
  Check,
  Loader2,
  Image,
  Code
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const categories = [
  'Content Creation',
  'Data Analysis',
  'Development',
  'Audio & Voice',
  'Design',
  'Marketing',
  'Sales',
  'Legal',
  'Customer Service',
  'Education',
  'Finance',
  'Healthcare'
];

const modelTypes = [
  'GPT-4',
  'Codex',
  'WaveNet',
  'DALL-E',
  'Custom AI'
];

const UploadAgent = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    category: '',
    modelType: '',
    price: '',
    tags: [] as string[],
    imageFile: null as File | null,
    imagePreview: '',
    agentFile: null as File | null,
    featured: false,
    privateAgent: false,
    subscriptionPricing: false,
  });
  const [currentTag, setCurrentTag] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (formData.tags.includes(currentTag.trim())) {
        toast({
          title: "Duplicate Tag",
          description: "This tag has already been added.",
          variant: "destructive"
        });
        return;
      }
      if (formData.tags.length >= 10) {
        toast({
          title: "Tag Limit Reached",
          description: "You can add a maximum of 10 tags.",
          variant: "destructive"
        });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleAgentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        agentFile: e.target.files![0]
      }));
    }
  };
  
  const validateForm = (tab: string) => {
    switch (tab) {
      case 'basic':
        if (!formData.name || !formData.shortDescription || !formData.description) {
          toast({
            title: "Missing Fields",
            description: "Please fill in all required fields.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'details':
        if (!formData.category || !formData.modelType || formData.tags.length === 0) {
          toast({
            title: "Missing Fields",
            description: "Please provide category, model type, and at least one tag.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'pricing':
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
          toast({
            title: "Invalid Price",
            description: "Please enter a valid price greater than 0.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'upload':
        if (!formData.imageFile) {
          toast({
            title: "Missing Image",
            description: "Please upload an image for your agent.",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.agentFile) {
          toast({
            title: "Missing Agent File",
            description: "Please upload your agent file.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };
  
  const nextTab = () => {
    if (!validateForm(activeTab)) {
      return;
    }
    
    switch (activeTab) {
      case 'basic':
        setActiveTab('details');
        break;
      case 'details':
        setActiveTab('pricing');
        break;
      case 'pricing':
        setActiveTab('upload');
        break;
      case 'upload':
        handleSubmit();
        break;
      default:
        break;
    }
  };
  
  const prevTab = () => {
    switch (activeTab) {
      case 'details':
        setActiveTab('basic');
        break;
      case 'pricing':
        setActiveTab('details');
        break;
      case 'upload':
        setActiveTab('pricing');
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = () => {
    if (!validateForm('upload')) {
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API request delay
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        toast({
          title: "Agent Uploaded Successfully",
          description: "Your agent has been uploaded and is now being reviewed.",
        });
        
        navigate('/dashboard/agents');
      }, 500);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload New Agent</h1>
        <p className="text-muted-foreground">
          Create and publish your AI agent to the Navora marketplace.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basic" className="data-[state=active]:bg-navora-red">Basic Info</TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:bg-navora-red">Details</TabsTrigger>
          <TabsTrigger value="pricing" className="data-[state=active]:bg-navora-red">Pricing</TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-navora-red">Files</TabsTrigger>
        </TabsList>
        
        <Card className="bg-navora-dark border-navora-lightgray">
          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide essential information about your agent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Agent Name <span className="text-navora-red">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter a unique and descriptive name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  Choose a clear, unique name (max 50 characters)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shortDescription">
                  Short Description <span className="text-navora-red">*</span>
                </Label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Brief description of what your agent does"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  maxLength={120}
                />
                <p className="text-sm text-muted-foreground">
                  A concise summary (max 120 characters)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">
                  Full Description <span className="text-navora-red">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Detailed description of features, capabilities, and use cases"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                />
                <p className="text-sm text-muted-foreground">
                  Comprehensive details about your agent (min 100 characters)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-navora-red hover:bg-navora-red/90" onClick={nextTab}>
                Next Step
              </Button>
            </CardFooter>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details">
            <CardHeader>
              <CardTitle>Agent Details</CardTitle>
              <CardDescription>
                Categorize and tag your agent for better discoverability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-navora-red">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose the most relevant category for your agent
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="modelType">
                  Model Type <span className="text-navora-red">*</span>
                </Label>
                <Select
                  value={formData.modelType}
                  onValueChange={(value) => handleSelectChange('modelType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model type" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelTypes.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Specify the underlying AI model used by your agent
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">
                  Tags <span className="text-navora-red">*</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="tags"
                    placeholder="Add tags (press Enter after each tag)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    disabled={!currentTag.trim() || formData.tags.includes(currentTag.trim()) || formData.tags.length >= 10}
                    onClick={() => {
                      if (currentTag.trim()) {
                        setFormData((prev) => ({
                          ...prev,
                          tags: [...prev.tags, currentTag.trim()]
                        }));
                        setCurrentTag('');
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} className="flex items-center space-x-1 px-3 py-1 bg-navora-lightgray/40">
                      <span>{tag}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 hover:bg-transparent hover:text-navora-red"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Add up to 10 relevant tags to improve discoverability
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevTab}>
                Previous Step
              </Button>
              <Button className="bg-navora-red hover:bg-navora-red/90" onClick={nextTab}>
                Next Step
              </Button>
            </CardFooter>
          </TabsContent>
          
          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <CardHeader>
              <CardTitle>Pricing & Options</CardTitle>
              <CardDescription>
                Set your agent's price and additional options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-navora-red">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="49.99"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="pl-10"
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Set a competitive price (Navora takes a 15% commission)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricing-model">Pricing Model</Label>
                <RadioGroup defaultValue="one-time" className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time" className="font-normal">
                      One-time Purchase
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <Label htmlFor="subscription" className="font-normal">
                      Subscription (coming soon)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured Agent</Label>
                    <p className="text-sm text-muted-foreground">
                      Request to have your agent featured on the marketplace
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privateAgent">Private Agent</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this agent private (only available by direct link)
                    </p>
                  </div>
                  <Switch
                    id="privateAgent"
                    checked={formData.privateAgent}
                    onCheckedChange={(checked) => handleSwitchChange('privateAgent', checked)}
                  />
                </div>
              </div>
              
              <Card className="bg-navora-dark border-navora-red/30">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <HelpCircle className="h-5 w-5 text-navora-red" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Pricing Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Most successful agents on Navora are priced between $29 and $99. Consider the complexity and value of your agent when setting a price. You can always adjust pricing later based on feedback and performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevTab}>
                Previous Step
              </Button>
              <Button className="bg-navora-red hover:bg-navora-red/90" onClick={nextTab}>
                Next Step
              </Button>
            </CardFooter>
          </TabsContent>
          
          {/* Upload Tab */}
          <TabsContent value="upload">
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Upload your agent files and preview image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label>
                  Agent Image <span className="text-navora-red">*</span>
                </Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-navora-lightgray rounded-md p-6">
                  {formData.imagePreview ? (
                    <div className="relative w-full max-w-md">
                      <img 
                        src={formData.imagePreview} 
                        alt="Preview" 
                        className="rounded-md w-full h-auto"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-navora-dark/80 hover:bg-navora-dark"
                        onClick={() => setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: '' }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">Upload Agent Image</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        PNG, JPG, or WebP (min. 600x600px, square ratio recommended)
                      </p>
                      <Button variant="outline" asChild>
                        <label>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          Choose Image
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>
                  Agent File <span className="text-navora-red">*</span>
                </Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-navora-lightgray rounded-md p-6">
                  {formData.agentFile ? (
                    <div className="w-full p-4 bg-navora-lightgray/20 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-navora-red mr-3" />
                        <div>
                          <p className="font-medium">{formData.agentFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(formData.agentFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-navora-red"
                        onClick={() => setFormData((prev) => ({ ...prev, agentFile: null }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Code className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">Upload Agent File</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        JSON, JS, PY, or ZIP (max 50MB)
                      </p>
                      <Button variant="outline" asChild>
                        <label>
                          <input
                            type="file"
                            className="hidden"
                            accept=".json,.js,.py,.zip"
                            onChange={handleAgentFileChange}
                          />
                          Choose File
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <Card className="bg-navora-dark border-navora-lightgray/60">
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Detailed information for reviewing your submission and ensuring compliance.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    Review Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Name</div>
                      <div className="col-span-2 text-muted-foreground">{formData.name || 'Not provided'}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Category</div>
                      <div className="col-span-2 text-muted-foreground">{formData.category || 'Not selected'}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Price</div>
                      <div className="col-span-2 text-muted-foreground">
                        {formData.price ? `$${formData.price}` : 'Not set'}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Model Type</div>
                      <div className="col-span-2 text-muted-foreground">{formData.modelType || 'Not selected'}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Tags</div>
                      <div className="col-span-2 text-muted-foreground">
                        {formData.tags.length > 0 ? formData.tags.join(', ') : 'No tags'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Previous Step
                </Button>
                <Button 
                  className="bg-navora-red hover:bg-navora-red/90"
                  onClick={handleSubmit}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Publish Agent
                    </>
                  )}
                </Button>
              </div>
              
              {isUploading && (
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-navora-lightgray/30 rounded-full h-2.5">
                    <div 
                      className="bg-navora-red h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  {uploadProgress === 100 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center text-green-500 mt-2"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      <span>Upload Complete</span>
                    </motion.div>
                  )}
                </div>
              )}
            </CardFooter>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default UploadAgent;
