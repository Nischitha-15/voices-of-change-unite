import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Heart, MessageCircle, Share2, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  username: string;
  content: string;
  date: string;
  likes: number;
  comments: Comment[];
  isOwner: boolean;
}

interface Comment {
  id: string;
  username: string;
  content: string;
  date: string;
}

interface PostPanelProps {
  isOpen: boolean;
  onClose: () => void;
  problemTitle: string;
  problemCategory: string;
}

const PostPanel = ({ isOpen, onClose, problemTitle, problemCategory }: PostPanelProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    if (isOpen) {
      const samplePosts: Post[] = [
        {
          id: "1",
          username: "Sarah_K",
          content: "I've been dealing with this issue for months. It's so isolating, but finding this community has given me hope. Thank you all for sharing your stories.",
          date: "2 hours ago",
          likes: 15,
          comments: [
            { id: "c1", username: "Maya_R", content: "You're so brave for sharing this. We're here for you! 💜", date: "1 hour ago" },
            { id: "c2", username: "Lisa_M", content: "Your story resonates with me so much. Stay strong!", date: "45 minutes ago" }
          ],
          isOwner: false
        },
        {
          id: "2",
          username: "Anonymous_User",
          content: "This platform has been a lifeline for me. I never thought I'd find the courage to speak up, but seeing others share their experiences gave me strength.",
          date: "5 hours ago",
          likes: 23,
          comments: [],
          isOwner: true
        },
        {
          id: "3",
          username: "Maria_C",
          content: "To anyone reading this who's going through something similar - you are not alone. There are resources available and people who care. Please reach out.",
          date: "1 day ago",
          likes: 42,
          comments: [
            { id: "c3", username: "Priya_S", content: "Thank you for this reminder. Sometimes we forget we're not alone.", date: "12 hours ago" }
          ],
          isOwner: false
        }
      ];
      setPosts(samplePosts);
    }
  }, [isOpen, problemTitle]);

  const handleAddPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      username: "You",
      content: newPost,
      date: "Just now",
      likes: 0,
      comments: [],
      isOwner: true
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "✨ Post shared successfully",
      description: "Your story has been added to the community.",
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
    toast({
      title: "Post deleted",
      description: "Your post has been removed.",
    });
  };

  const handleEditPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost(postId);
      setEditContent(post.content);
    }
  };

  const handleSaveEdit = (postId: string) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, content: editContent } : p
    ));
    setEditingPost(null);
    setEditContent("");
    toast({
      title: "Post updated",
      description: "Your changes have been saved.",
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      username: "You",
      content: newComment,
      date: "Just now"
    };

    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, comments: [...p.comments, comment] }
        : p
    ));
    setNewComment("");
    setActiveCommentPost(null);
    toast({
      title: "💬 Comment added",
      description: "Your support has been shared.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, likes: p.likes + 1 }
        : p
    ));
  };

  const handleShare = (post: Post) => {
    // In a real app, this would integrate with actual social sharing APIs
    if (navigator.share) {
      navigator.share({
        title: `Story from ${problemTitle}`,
        text: post.content.substring(0, 100) + "...",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share this story to spread awareness.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">{problemTitle}</h2>
              <Badge variant="secondary" className="mt-1">{problemCategory}</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[calc(90vh-200px)]">
          {/* New Post Section */}
          <Card className="mb-6">
            <CardHeader>
              <h3 className="font-semibold">Share Your Story</h3>
              <p className="text-sm text-muted-foreground">
                Your voice matters. Share your experience to help others feel less alone.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your story, thoughts, or support for others..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
              />
              <Button onClick={handleAddPost} variant="hero" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Share Your Story
              </Button>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{post.username}</p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                        {post.isOwner && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditPost(post.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {editingPost === post.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleSaveEdit(post.id)}>
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setEditingPost(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-foreground mb-4">{post.content}</p>
                      )}

                      <div className="flex items-center space-x-4 mb-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setActiveCommentPost(
                            activeCommentPost === post.id ? null : post.id
                          )}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments.length}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShare(post)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>

                      {/* Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-2 ml-4 border-l-2 border-secondary pl-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="text-sm">
                              <p className="font-medium">{comment.username}</p>
                              <p className="text-muted-foreground">{comment.content}</p>
                              <p className="text-xs text-muted-foreground">{comment.date}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment */}
                      {activeCommentPost === post.id && (
                        <div className="mt-4 space-y-2">
                          <Textarea
                            placeholder="Add a supportive comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={2}
                          />
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="supportive"
                              onClick={() => handleAddComment(post.id)}
                            >
                              Add Comment
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setActiveCommentPost(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostPanel;