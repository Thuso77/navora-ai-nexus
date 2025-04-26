
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative flex-grow">
      <Input 
        type="text" 
        placeholder="Search for agents..." 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-12"
      />
      <Search className="absolute right-4 top-3 h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
