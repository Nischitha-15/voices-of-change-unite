import { useState } from "react";
import SocialProblemCard from "./SocialProblemCard";
import PostPanel from "./PostPanel";

interface SocialProblem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  postCount: number;
  category: string;
}

const SocialProblemsSection = () => {
  const [selectedProblem, setSelectedProblem] = useState<SocialProblem | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const socialProblems: SocialProblem[] = [
    {
      id: "0",
      title: "Your Story",
      description: "Share your unique journey, experiences, and insights. Every story matters and can inspire others on their path to empowerment.",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=640&h=400&fit=crop",
      postCount: 423,
      category: "Personal Journey"
    },
    {
      id: "1",
      title: "Domestic Violence",
      description: "Support and resources for survivors of domestic violence. Share your story, find strength, and help others on their healing journey.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&h=400&fit=crop",
      postCount: 247,
      category: "Safety & Support"
    },
    {
      id: "2",
      title: "Workplace Discrimination",
      description: "Addressing gender inequality, pay gaps, and discrimination in professional environments. Together we can create change.",
      imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=640&h=400&fit=crop",
      postCount: 189,
      category: "Professional Rights"
    },
    {
      id: "3",
      title: "Harassment",
      description: "Creating safe spaces to discuss experiences with harassment and finding ways to protect and support each other.",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=640&h=400&fit=crop",
      postCount: 156,
      category: "Safety & Support"
    },
    {
      id: "4",
      title: "Education Inequality",
      description: "Breaking barriers to education and supporting women's access to learning opportunities at all levels.",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&h=400&fit=crop",
      postCount: 203,
      category: "Education & Growth"
    },
    {
      id: "5",
      title: "Period Poverty",
      description: "Addressing the lack of access to menstrual products and breaking the stigma around menstruation.",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&h=400&fit=crop",
      postCount: 134,
      category: "Health & Wellness"
    },
    {
      id: "6",
      title: "Child Marriage",
      description: "Advocating against child marriage and supporting those affected by this harmful practice.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=640&h=400&fit=crop",
      postCount: 89,
      category: "Rights & Protection"
    },
    {
      id: "7",
      title: "Lack of Legal Support",
      description: "Navigating legal challenges and finding accessible legal resources for women's rights issues.",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&h=400&fit=crop",
      postCount: 167,
      category: "Legal & Rights"
    },
    {
      id: "8",
      title: "Mental Health",
      description: "Supporting women's mental health and breaking stigmas around seeking help and healing.",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=400&fit=crop",
      postCount: 298,
      category: "Health & Wellness"
    }
  ];

  const handleCardClick = (problem: SocialProblem) => {
    setSelectedProblem(problem);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedProblem(null);
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Share Your Voice, Find Your Strength
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with a community of strong women sharing their experiences and supporting each other through life's challenges.
          </p>
        </div>

        {/* Horizontally Scrollable Cards */}
        <div className="overflow-x-auto pb-6">
          <div className="flex space-x-6 min-w-max">
            {socialProblems.map((problem) => (
              <SocialProblemCard
                key={problem.id}
                title={problem.title}
                description={problem.description}
                imageUrl={problem.imageUrl}
                postCount={problem.postCount}
                category={problem.category}
                onClick={() => handleCardClick(problem)}
              />
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            ← Scroll to explore more topics →
          </p>
        </div>
      </div>

      {/* Post Panel Modal */}
      {selectedProblem && (
        <PostPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          problemTitle={selectedProblem.title}
          problemCategory={selectedProblem.category}
        />
      )}
    </section>
  );
};

export default SocialProblemsSection;