import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SocialProblemsSection from "@/components/SocialProblemsSection";
import CreatePostModal from "@/components/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MessageCircle, Shield } from "lucide-react";

const Index = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Voice.
            <br />
            Your Strength.
            <br />
            <span className="text-primary-glow">Our Unity.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join a supportive community where women share their experiences, find strength in solidarity, and create positive change together.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
            onClick={() => setIsCreatePostOpen(true)}
          >
            <Heart className="h-5 w-5 mr-2" />
            Start Your Journey
          </Button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Heart className="h-8 w-8" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Users className="h-8 w-8" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Our Community Matters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe every woman's story deserves to be heard and every experience can help another find strength.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safe Space</h3>
                <p className="text-muted-foreground">
                  A secure, anonymous environment where you can share without judgment and find understanding.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-supportive/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-supportive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with women who understand your journey and offer genuine support and encouragement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/50 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Stories</h3>
                <p className="text-muted-foreground">
                  Share your authentic experiences and read others' stories that inspire resilience and hope.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Social Problems Section */}
      <SocialProblemsSection />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-supportive text-supportive-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Your experiences matter. By sharing your story, you're not just healing yourself – you're lighting the way for others.
          </p>
          <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-supportive" asChild>
            <Link to="/signin">
              <Heart className="h-5 w-5 mr-2" />
              Join Our Community
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-foreground text-background">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6" />
            <span className="text-lg font-semibold">Voices of Change Unite</span>
          </div>
          <p className="text-sm opacity-75">
            Empowering women through shared stories and mutual support. Together, we are stronger.
          </p>
        </div>
      </footer>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />
    </div>
  );
};

export default Index;
