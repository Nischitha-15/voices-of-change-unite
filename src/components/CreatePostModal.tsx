import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const { toast } = useToast();

  const socialProblems = [
    { id: "0", title: "Your Story", category: "Personal Journey" },
    { id: "1", title: "Domestic Violence", category: "Safety & Support" },
    { id: "2", title: "Workplace Discrimination", category: "Professional Rights" },
    { id: "3", title: "Harassment", category: "Safety & Support" },
    { id: "4", title: "Education Inequality", category: "Education & Growth" },
    { id: "5", title: "Period Poverty", category: "Health & Wellness" },
    { id: "6", title: "Child Marriage", category: "Rights & Protection" },
    { id: "7", title: "Lack of Legal Support", category: "Legal & Rights" },
    { id: "8", title: "Mental Health", category: "Health & Wellness" }
  ];

  const handleSubmit = () => {
    if (!postContent.trim() || !selectedProblem) {
      toast({
        title: "Please complete all fields",
        description: "Both post content and problem selection are required.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save the post to a database
    toast({
      title: "Post shared successfully!",
      description: "Your voice has been added to the community. Thank you for sharing.",
    });

    // Reset form and close modal
    setPostContent("");
    setSelectedProblem("");
    onClose();
  };

  const handleClose = () => {
    setPostContent("");
    setSelectedProblem("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-primary" />
            Share Your Story
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-muted-foreground">
              Your voice matters. Share your experience to help others feel less alone and create positive change.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="problem-select" className="text-sm font-medium">
                Which topic does your story relate to? *
              </Label>
              <Select value={selectedProblem} onValueChange={setSelectedProblem}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a social issue..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/20">
                  {socialProblems.map((problem) => (
                    <SelectItem key={problem.id} value={problem.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{problem.title}</span>
                        <span className="text-xs text-muted-foreground">{problem.category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="post-content" className="text-sm font-medium">
                Share your story *
              </Label>
              <Textarea
                id="post-content"
                placeholder="Your story can inspire others. Share your experience, challenges, victories, or thoughts. This is a safe space where your voice will be heard and respected..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="mt-2 min-h-[120px] resize-none"
                maxLength={1000}
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {postContent.length}/1000 characters
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Share Your Voice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;