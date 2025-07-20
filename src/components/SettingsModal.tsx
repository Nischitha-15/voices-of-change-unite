import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Monitor, 
  Moon, 
  Sun, 
  Type, 
  Globe, 
  Bell, 
  Shield, 
  RotateCcw,
  Check
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { 
    theme, 
    fontSize, 
    language, 
    notifications, 
    privacy,
    setTheme,
    setFontSize,
    setLanguage,
    updateNotifications,
    updatePrivacy,
    resetSettings
  } = useSettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"appearance" | "notifications" | "privacy" | "account">("appearance");

  const handleResetSettings = () => {
    resetSettings();
    toast({
      title: "✨ Settings Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  const languages = {
    en: "English",
    es: "Español",
    fr: "Français", 
    ar: "العربية"
  };

  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Settings</DialogTitle>
        </DialogHeader>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Settings Navigation */}
          <div className="w-64 border-r pr-6">
            <nav className="space-y-2">
              {[
                { id: "appearance", label: "Appearance", icon: Monitor },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "privacy", label: "Privacy", icon: Shield },
                { id: "account", label: "Account", icon: Type },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.id as any)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 pl-6 overflow-y-auto">
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ThemeIcon className="h-5 w-5 mr-2" />
                      Theme
                    </CardTitle>
                    <CardDescription>
                      Choose how Voices of Change Unite looks to you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Monitor className="h-4 w-4 mr-2" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Type className="h-5 w-5 mr-2" />
                      Font Size
                    </CardTitle>
                    <CardDescription>
                      Adjust the text size for better readability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium (Recommended)</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Language
                    </CardTitle>
                    <CardDescription>
                      Select your preferred language
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(languages).map(([code, name]) => (
                          <SelectItem key={code} value={code}>
                            {name}
                            {code === "en" && <Badge variant="secondary" className="ml-2">Default</Badge>}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose what notifications you'd like to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Posts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new posts in your followed topics
                        </p>
                      </div>
                      <Switch
                        checked={notifications.posts}
                        onCheckedChange={(checked) => updateNotifications({ posts: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Comments</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone comments on your posts
                        </p>
                      </div>
                      <Switch
                        checked={notifications.comments}
                        onCheckedChange={(checked) => updateNotifications({ comments: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mentions</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone mentions you
                        </p>
                      </div>
                      <Switch
                        checked={notifications.mentions}
                        onCheckedChange={(checked) => updateNotifications({ mentions: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control who can see your information and activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Profile</p>
                        <p className="text-sm text-muted-foreground">
                          Allow others to view your profile information
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showProfile}
                        onCheckedChange={(checked) => updatePrivacy({ showProfile: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Messages</p>
                        <p className="text-sm text-muted-foreground">
                          Let other community members send you direct messages
                        </p>
                      </div>
                      <Switch
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => updatePrivacy({ allowMessages: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Activity</p>
                        <p className="text-sm text-muted-foreground">
                          Display your activity status to other users
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showActivity}
                        onCheckedChange={(checked) => updatePrivacy({ showActivity: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>
                      Manage your account settings and data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Current Settings Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Theme:</span>
                          <Badge variant="outline">{theme}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Font Size:</span>
                          <Badge variant="outline">{fontSize}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Language:</span>
                          <Badge variant="outline">{languages[language]}</Badge>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-destructive">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Reset all your settings to default values. This action cannot be undone.
                      </p>
                      <Button 
                        variant="destructive" 
                        onClick={handleResetSettings}
                        className="w-full"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset All Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onClose} variant="supportive">
            <Check className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;