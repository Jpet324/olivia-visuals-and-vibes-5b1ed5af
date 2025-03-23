
import React from "react";
import Layout from "../components/Layout";
import Slideshow from "../components/Slideshow";
import { Button } from "@/components/ui/button";
import { oliviaImages } from "../data/images";
import { ArrowRight, Heart, GraduationCap } from "lucide-react";
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
            Exploring life through art, and everything in between
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline" className="rounded-full px-6 group">
              <Link to="/about">
                Get to know me
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="rounded-full px-6 bg-olivia-purple hover:bg-olivia-darkPurple">
              <Link to="/gallery">
                View my gallery
                <Heart size={16} className="ml-2 transition-transform group-hover:scale-110" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Slideshow section with animated heart background */}
        <section className="animate-slide-up relative">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <Heart 
              className="text-olivia-purple w-full h-full max-w-md" 
              fill="#F5A9DF" 
              strokeWidth={1}
              style={{
                animation: "pulse 2s infinite alternate ease-in-out"
              }}
            />
          </div>
          <style>
            {`
              @keyframes pulse {
                0% {
                  transform: scale(1);
                  opacity: 0.3;
                }
                100% {
                  transform: scale(1.15);
                  opacity: 0.5;
                }
              }
            `}
          </style>
          <div className="relative z-10">
            <Slideshow images={oliviaImages} interval={6000} />
          </div>
        </section>
        
        {/* Quote section */}
        <section className="text-center py-12 px-4 glass-card rounded-xl animate-scale-in">
          <blockquote className="font-serif text-xl md:text-2xl italic">
            "The beauty is in finding yourself through your passions and dreams."
          </blockquote>
          <cite className="block mt-4 text-muted-foreground not-italic">— Olivia Branchaud</cite>
        </section>
        
        {/* Game links */}
        <section className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="link" className="text-olivia-purple">
              <Link to="/tribute">
                View Tribute
                <Heart size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="link" className="text-olivia-purple">
              <Link to="/game">
                Play Educational Game
                <GraduationCap size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
