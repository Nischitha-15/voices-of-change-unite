import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SocialProblemCardProps {
  title: string;
  description: string;
  imageUrl: string;
  postCount: number;
  category: string;
  onClick: () => void;
}

const SocialProblemCard = ({ 
  title, 
  description, 
  imageUrl, 
  postCount, 
  category, 
  onClick 
}: SocialProblemCardProps) => {
  return (
    <Card 
      className="flex-shrink-0 w-80 cursor-pointer transition-all duration-300 hover:shadow-hover hover:scale-105 group"
      onClick={onClick}
    >
      <div 
        className="h-48 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="h-full bg-gradient-to-t from-black/60 to-transparent rounded-t-lg flex items-end p-4">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary font-medium">
            {postCount} stories shared
          </span>
          <span className="text-xs text-muted-foreground">
            Click to read →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialProblemCard;