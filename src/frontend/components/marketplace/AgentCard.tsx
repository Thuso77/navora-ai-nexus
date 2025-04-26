
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from '@/utils/mockData';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    price: number;
    shortDescription: string;
  };
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover"
    >
      <Card className="overflow-hidden h-full bg-navora-dark border-navora-lightgray">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img 
            src={agent.avatar} 
            alt={agent.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardHeader className="py-4">
          <CardTitle className="text-base">{agent.name}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
              <span>{agent.rating.toFixed(1)}</span>
            </div>
            <span className="text-navora-red font-bold ml-auto">{formatPrice(agent.price)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {agent.shortDescription}
          </p>
        </CardContent>
        <CardFooter className="py-4">
          <Link to={`/agent/${agent.id}`} className="w-full">
            <Button className="w-full bg-navora-red hover:bg-navora-red/90">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
