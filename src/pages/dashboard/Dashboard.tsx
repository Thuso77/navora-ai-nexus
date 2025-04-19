
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Package,
  ChevronRight,
  Bell,
  Clock,
  BarChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Legend
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';

// Sample dashboard data
const dashboardData = {
  stats: {
    monthlyRevenue: 3745.89,
    monthlyChange: 12.5,
    totalSales: 152,
    salesChange: 8.3,
    activeAgents: 8,
    agentsChange: 2,
    averageRating: 4.7,
    ratingChange: 0.2
  },
  recentSales: [
    { id: 1, agent: 'CopyGenius', customer: 'Jane Smith', amount: 49.99, date: '2025-04-18T10:30:00Z' },
    { id: 2, agent: 'DataVizPro', customer: 'John Anderson', amount: 79.99, date: '2025-04-17T15:45:00Z' },
    { id: 3, agent: 'CopyGenius', customer: 'Robert Chen', amount: 49.99, date: '2025-04-16T09:15:00Z' },
    { id: 4, agent: 'VoiceGenius', customer: 'Emily Parker', amount: 59.99, date: '2025-04-15T14:20:00Z' },
    { id: 5, agent: 'CopyGenius', customer: 'Michael Brown', amount: 49.99, date: '2025-04-14T11:10:00Z' }
  ],
  revenueData: [
    { date: 'Apr 13', revenue: 590 },
    { date: 'Apr 14', revenue: 868 },
    { date: 'Apr 15', revenue: 1397 },
    { date: 'Apr 16', revenue: 1480 },
    { date: 'Apr 17', revenue: 1520 },
    { date: 'Apr 18', revenue: 1400 },
    { date: 'Apr 19', revenue: 1480 }
  ],
  salesByAgentData: [
    { name: 'CopyGenius', sales: 87 },
    { name: 'DataVizPro', sales: 32 },
    { name: 'CodeCompanion', sales: 24 },
    { name: 'VoiceGenius', sales: 9 }
  ],
  notifications: [
    { id: 1, type: 'sale', message: 'New purchase of CopyGenius', time: '10 minutes ago' },
    { id: 2, type: 'review', message: 'New 5-star review for DataVizPro', time: '1 hour ago' },
    { id: 3, type: 'system', message: 'Your agent was featured on the marketplace', time: '3 hours ago' },
    { id: 4, type: 'sale', message: 'New purchase of CodeCompanion', time: '5 hours ago' }
  ]
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDismissNotification = (id: number) => {
    toast({
      title: "Notification Dismissed",
      description: "The notification has been removed from your list.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-navora-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your creator activity.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link to="/dashboard/upload">
            <Button className="bg-navora-red hover:bg-navora-red/90">
              Upload New Agent
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(dashboardData.stats.monthlyRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={dashboardData.stats.monthlyChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {dashboardData.stats.monthlyChange >= 0 ? "+" : ""}{dashboardData.stats.monthlyChange}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.stats.totalSales}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={dashboardData.stats.salesChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {dashboardData.stats.salesChange >= 0 ? "+" : ""}{dashboardData.stats.salesChange}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Agents
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.stats.activeAgents}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={dashboardData.stats.agentsChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {dashboardData.stats.agentsChange >= 0 ? "+" : ""}{dashboardData.stats.agentsChange}
                </span>{" "}
                new this month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.stats.averageRating}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={dashboardData.stats.ratingChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {dashboardData.stats.ratingChange >= 0 ? "+" : ""}{dashboardData.stats.ratingChange}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Revenue Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Daily revenue for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F44336" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F44336" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E1E1E',
                        borderColor: '#2A2A2A',
                        color: '#FFFFFF'
                      }}
                      formatter={(value: any) => [`$${value}`, 'Revenue']}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F44336"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recent Sales List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You sold {dashboardData.recentSales.length} agents recently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarImage src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`} alt={sale.customer} />
                      <AvatarFallback>{sale.customer.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.agent}
                      </p>
                    </div>
                    <div className="font-medium">
                      {formatPrice(sale.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/dashboard/revenue">
                  <Button variant="outline" className="w-full">
                    View All Sales
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Additional Insights */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Sales by Agent */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader>
              <CardTitle>Sales by Agent</CardTitle>
              <CardDescription>
                Distribution of sales across your agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={dashboardData.salesByAgentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E1E1E',
                        borderColor: '#2A2A2A',
                        color: '#FFFFFF'
                      }}
                    />
                    <Bar dataKey="sales" fill="#F44336" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="bg-navora-dark border-navora-lightgray">
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Recent activity on your account
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      {notification.type === 'sale' && (
                        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Sale
                        </Badge>
                      )}
                      {notification.type === 'review' && (
                        <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">
                          <Star className="h-3 w-3 mr-1" />
                          Review
                        </Badge>
                      )}
                      {notification.type === 'system' && (
                        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
                          <Bell className="h-3 w-3 mr-1" />
                          System
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{notification.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleDismissNotification(notification.id)}
                    >
                      <span className="sr-only">Dismiss</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
