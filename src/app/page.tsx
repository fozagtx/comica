"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, BookOpen, Palette, Users, ArrowRight, Star, Play, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* Cursor glow effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 229, 255, 0.06), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        {/* Floating Header */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-[slideDown_0.6s_ease-out]">
          <nav className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/20 hover:shadow-primary/10 transition-all duration-500">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="https://avatars.githubusercontent.com/u/160292135?v=4"
                alt="ComicFlow Logo"
                width={36}
                height={36}
                className="rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="font-display text-xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-primary">
                ComicFlow
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-interface text-muted-foreground hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-interface text-muted-foreground hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                How It Works
              </a>
              <a href="#examples" className="text-sm font-interface text-muted-foreground hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                Examples
              </a>
            </div>
            <Link href="/studio">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-interface font-semibold px-5 h-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95">
                Start Creating
              </Button>
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-[fadeInUp_0.6s_ease-out_0.2s_both] hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-default group">
              <Sparkles className="w-4 h-4 text-primary animate-pulse group-hover:animate-spin" />
              <span className="text-sm font-interface text-primary font-medium">
                AI-Powered Comic Creation for Kids
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-foreground leading-tight mb-6 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              Create Magical
              <span className="block text-primary bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] bg-clip-text">Comic Stories</span>
              <span className="block">for Children</span>
            </h1>
            
            <p className="text-xl text-muted-foreground font-interface max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              Transform your imagination into beautiful comic panels. Design consistent characters 
              and bring their adventures to life with AI-powered illustration — perfect for 
              bedtime stories, educational content, and creative fun.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
              <Link href="/studio">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-interface font-semibold px-8 h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Play className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Start Creating Free
                </Button>
              </Link>
              <Button variant="outline" className="border-border text-foreground font-interface font-semibold px-8 h-14 text-lg rounded-xl hover:bg-card transition-all duration-300 hover:scale-105 active:scale-95 group">
                Watch Demo
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-border/50 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <div className="flex items-center gap-2 group cursor-default">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-secondary border-2 border-background transition-all duration-300 hover:scale-110 hover:z-10" 
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-interface group-hover:text-foreground transition-colors duration-300">
                  <strong className="text-foreground">10,000+</strong> stories created
                </span>
              </div>
              <div className="flex items-center gap-1 group cursor-default">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-warning text-warning transition-all duration-300 hover:scale-125" 
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
                <span className="text-sm text-muted-foreground font-interface ml-2 group-hover:text-foreground transition-colors duration-300">
                  Loved by parents
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
            <div 
              className="relative rounded-2xl overflow-hidden border-4 border-primary shadow-2xl shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 hover:scale-[1.02] group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Image
                src="https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=1200&q=80"
                alt="Comic creation preview"
                width={1200}
                height={675}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:bottom-8">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border transition-all duration-300 group-hover:bg-card group-hover:shadow-lg">
                  <p className="text-sm text-muted-foreground font-interface group-hover:text-foreground transition-colors duration-300">
                    Create consistent characters that appear across all your comic panels
                  </p>
                </div>
              </div>
              {/* Floating sparkles on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground font-interface max-w-xl mx-auto">
                Powerful tools designed specifically for creating children's comic stories
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:rotate-3">
                  <Users className="w-7 h-7 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                  Character Consistency
                </h3>
                <p className="text-muted-foreground font-interface leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  Define your character once and watch them appear consistently across every panel. 
                  Perfect for storytelling with recurring heroes.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border hover:border-warning/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-warning/10 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-warning/20 group-hover:-rotate-3">
                  <Palette className="w-7 h-7 text-warning transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-warning">
                  Kid-Friendly Styles
                </h3>
                <p className="text-muted-foreground font-interface leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  Choose from colorful, age-appropriate art styles that children love. 
                  From whimsical watercolors to bold cartoon aesthetics.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border hover:border-green-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-green-500/20 group-hover:rotate-3">
                  <BookOpen className="w-7 h-7 text-green-500 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-green-500">
                  Story Board Builder
                </h3>
                <p className="text-muted-foreground font-interface leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  Arrange your panels into complete stories. Export as printable PDFs 
                  or share digitally with family and friends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                Create in 3 Simple Steps
              </h2>
              <p className="text-lg text-muted-foreground font-interface max-w-xl mx-auto">
                From imagination to illustration in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Describe Your Character",
                  description: "Tell us about your hero — their appearance, personality, and unique features. This becomes their visual DNA."
                },
                {
                  step: "02",
                  title: "Set the Scene",
                  description: "Describe what's happening in each panel. Our AI brings your scenes to life while keeping your character consistent."
                },
                {
                  step: "03",
                  title: "Build Your Story",
                  description: "Generate multiple panels and arrange them into a complete comic story. Share or print your creation!"
                }
              ].map((item, index) => (
                <div key={index} className="relative group cursor-default">
                  <div className="text-8xl font-display font-extrabold text-primary/10 absolute -top-4 -left-2 transition-all duration-500 group-hover:text-primary/20 group-hover:scale-110">
                    {item.step}
                  </div>
                  <div className="relative pt-12 transition-all duration-300 group-hover:translate-x-2">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-interface leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                      {item.description}
                    </p>
                  </div>
                  {/* Connecting line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border group-hover:bg-primary/50 transition-colors duration-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="py-24 px-6 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                Stories Created by Parents
              </h2>
              <p className="text-lg text-muted-foreground font-interface max-w-xl mx-auto">
                See what other families are creating with ComicFlow
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
                "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80",
                "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80",
                "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80"
              ].map((src, index) => (
                <div 
                  key={index} 
                  className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`Example comic ${index + 1}`}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <p className="text-white text-sm font-interface">View Story →</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/20 via-card to-warning/10 rounded-3xl p-12 border border-primary/30 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-warning/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "500ms" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1000ms" }} />
              </div>
              
              <div className="relative z-10">
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4 transition-transform duration-300 group-hover:scale-105">
                  Ready to Create Magic?
                </h2>
                <p className="text-lg text-muted-foreground font-interface max-w-xl mx-auto mb-8">
                  Start creating beautiful comic stories for your children today. 
                  No artistic skills required — just your imagination.
                </p>
                <Link href="/studio">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-interface font-semibold px-10 h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 group/btn relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <Sparkles className="w-5 h-5 mr-2 transition-all duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                    Start Creating Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="https://avatars.githubusercontent.com/u/160292135?v=4"
                  alt="ComicFlow Logo"
                  width={36}
                  height={36}
                  className="rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                />
                <span className="font-display text-xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-primary">
                  ComicFlow
                </span>
              </Link>
              <p className="text-sm text-muted-foreground font-interface">
                Making comic stories for children, one panel at a time.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary font-interface transition-all duration-300 hover:translate-y-[-2px]">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary font-interface transition-all duration-300 hover:translate-y-[-2px]">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary font-interface transition-all duration-300 hover:translate-y-[-2px]">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
