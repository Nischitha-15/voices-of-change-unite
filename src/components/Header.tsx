import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Settings, Shuffle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SettingsModal from "./SettingsModal";

interface RandomProblem {
  title: string;
  category: string;
  description: string;
}

interface HeaderProps {
  onRandomProblemSelect?: (problem: RandomProblem) => void;
}

const Header = ({ onRandomProblemSelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();

  const socialProblems = [
    { title: "Domestic Violence", category: "Safety & Support", description: "Support and resources for survivors of domestic violence." },
    { title: "Workplace Discrimination", category: "Professional Rights", description: "Addressing gender inequality and pay gaps in professional environments." },
    { title: "Harassment", category: "Safety & Support", description: "Creating safe spaces to discuss experiences with harassment." },
    { title: "Education Inequality", category: "Education & Growth", description: "Breaking barriers to education and supporting women's access to learning." },
    { title: "Period Poverty", category: "Health & Wellness", description: "Addressing the lack of access to menstrual products." },
    { title: "Child Marriage", category: "Rights & Protection", description: "Advocating against child marriage and supporting those affected." },
    { title: "Lack of Legal Support", category: "Legal & Rights", description: "Navigating legal challenges and finding accessible legal resources." },
    { title: "Mental Health", category: "Health & Wellness", description: "Supporting women's mental health and breaking stigmas." },
    { title: "Economic Empowerment", category: "Financial Rights", description: "Supporting women's financial independence and entrepreneurship." },
    { title: "Body Autonomy", category: "Health & Rights", description: "Advocating for women's rights over their own bodies and reproductive choices." },
    { title: "Digital Safety", category: "Safety & Support", description: "Addressing online harassment, cyberbullying, and digital privacy concerns." },
    { title: "Elder Care Burden", category: "Family & Society", description: "Supporting women who bear disproportionate caregiving responsibilities." },
    { title: "Political Representation", category: "Leadership & Rights", description: "Encouraging women's participation in politics and leadership roles." },
    { title: "Sports & Recreation Access", category: "Health & Equality", description: "Ensuring equal opportunities in sports and recreational activities." }
  ];

  const handleRandomOption = () => {
    const motivationalQuotes = [
      "Your voice matters. Your story can inspire change.",
      "Together we are stronger. You are not alone.",
      "Every challenge you overcome makes you more resilient.",
      "Your courage today creates hope for tomorrow.",
      "Believe in your power to make a difference."
    ];
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    toast({
      title: "💜 Motivation for You",
      description: randomQuote,
    });
  };

  const handleRandomProblem = () => {
    const randomProblem = socialProblems[Math.floor(Math.random() * socialProblems.length)];
    
    if (onRandomProblemSelect) {
      // Open the post panel with the random problem
      onRandomProblemSelect(randomProblem);
    } else {
      // Fallback to showing toast if no callback provided
      toast({
        title: `🎲 Random Focus: ${randomProblem.title}`,
        description: `${randomProblem.description} Category: ${randomProblem.category}`,
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Voices of Change Unite
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Shuffle className="h-4 w-4 mr-2" />
                Random Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleRandomOption}>
                <Heart className="h-4 w-4 mr-2" />
                Motivational Quote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRandomProblem}>
                <Shuffle className="h-4 w-4 mr-2" />
                Random Problem
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="hero" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                🌙 Dark/Light Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                🌍 Language Options
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                📝 Font Size Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                🔔 Notification Preferences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                🔒 Privacy Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                📧 Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                ❓ Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleRandomOption}>
                <Heart className="h-4 w-4 mr-2" />
                Motivational Quote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRandomProblem}>
                <Shuffle className="h-4 w-4 mr-2" />
                Random Problem
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  );
};

export default Header;