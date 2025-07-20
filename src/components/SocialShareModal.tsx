import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Share2, 
  Copy, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Instagram,
  Send
} from "lucide-react";

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    text: string;
    url: string;
  };
}

const SocialShareModal = ({ isOpen, onClose, shareData }: SocialShareModalProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast({
        title: "Link copied!",
        description: "Share this story to spread awareness.",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`;
    window.open(url, '_blank', 'width=600,height=400');
    onClose();
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}&hashtags=VoicesOfChange,WomenEmpowerment`;
    window.open(url, '_blank', 'width=600,height=400');
    onClose();
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&summary=${encodeURIComponent(shareData.text)}`;
    window.open(url, '_blank', 'width=600,height=400');
    onClose();
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`)}`;
    window.open(url, '_blank');
    onClose();
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(`${shareData.title}\n\n${shareData.text}`)}`;
    window.open(url, '_blank');
    onClose();
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Important story: ${shareData.title}`);
    const body = encodeURIComponent(`I wanted to share this important story with you:\n\n${shareData.text}\n\nRead more: ${shareData.url}\n\nShared from Voices of Change Unite`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.open(url);
    onClose();
  };

  const useNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        onClose();
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          toast({
            title: "Sharing failed",
            description: "Please try another sharing method.",
            variant: "destructive"
          });
        }
      }
    }
  };

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      action: shareToFacebook,
      color: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950"
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: shareToTwitter,
      color: "hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: shareToLinkedIn,
      color: "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: shareToWhatsApp,
      color: "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950"
    },
    {
      name: "Telegram",
      icon: Send,
      action: shareToTelegram,
      color: "hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-950"
    },
    {
      name: "Email",
      icon: Mail,
      action: shareViaEmail,
      color: "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share This Story
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            Help spread awareness by sharing this story with your network
          </p>

          {/* Native Share (if available) */}
          {navigator.share && (
            <Button onClick={useNativeShare} variant="outline" className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share via Device
            </Button>
          )}

          {/* Social Media Platforms */}
          <div className="grid grid-cols-2 gap-2">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.name}
                variant="ghost"
                onClick={platform.action}
                className={`flex items-center justify-start gap-3 h-12 ${platform.color}`}
              >
                <platform.icon className="h-5 w-5" />
                <span className="text-sm">{platform.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="pt-2 border-t">
            <Button onClick={copyToClipboard} variant="outline" className="w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;