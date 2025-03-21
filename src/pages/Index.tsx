
import React from "react";
import Layout from "../components/Layout";
import Slideshow from "../components/Slideshow";
import MusicPlayer from "../components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { oliviaImages } from "../data/images";
import { tracks } from "../data/music";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero section */}
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="olivia-gradient-text">Olivia Branchaud</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring life through music, art, and everything in between
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline" className="rounded-full px-6 group">
              <Link to="/about">
                Get to know me
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="rounded-full px-6 bg-olivia-purple hover:bg-olivia-darkPurple">
              <Link to="/playlist">
                Explore my playlist
                <Heart size={16} className="ml-2 transition-transform group-hover:scale-110" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Slideshow section */}
        <section className="animate-slide-up">
          <Slideshow images={oliviaImages} interval={6000} />
        </section>
        
        {/* Featured music section */}
        <section className="space-y-6 animate-slide-up">
          <h2 className="font-serif text-2xl md:text-3xl text-center font-medium">
            Currently listening to
          </h2>
          <MusicPlayer tracks={tracks} />
          <div className="text-center">
            <Button asChild variant="link" className="text-olivia-purple">
              <Link to="/playlist">
                See all tracks
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Quote section */}
        <section className="text-center py-12 px-4 glass-card rounded-xl animate-scale-in">
          <blockquote className="font-serif text-xl md:text-2xl italic">
            "The beauty of music is that it connects people. It carries a message, and we, the musicians, are the messengers."
          </blockquote>
          <cite className="block mt-4 text-muted-foreground not-italic">— Olivia Branchaud</cite>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
