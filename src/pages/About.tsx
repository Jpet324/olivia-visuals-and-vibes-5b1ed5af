
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { oliviaImages } from "../data/images";
import { Link } from "react-router-dom";
import { Music, Camera, Heart } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4 animate-fade-in">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">
            <span className="olivia-gradient-text">About Olivia</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into who I am, what I love, and what inspires me
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src={oliviaImages[2]} 
              alt="Olivia portrait" 
              className="w-full h-full object-cover animate-float"
            />
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="font-serif text-2xl font-medium">
              Hello, I'm Olivia
            </h2>
            <p className="text-muted-foreground">
              I'm a music enthusiast, photographer, and art lover. I'm passionate about capturing beautiful moments and finding inspiration in the melodies that surround us.
            </p>
            <p className="text-muted-foreground">
              My journey has been shaped by the artists I admire, from Twenty One Pilots to Hotel Mira, and the visual stories I love to tell through my photography.
            </p>
            <div className="flex space-x-4 pt-4">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/playlist" className="flex items-center space-x-2">
                  <Music size={18} />
                  <span>My Music</span>
                </Link>
              </Button>
              <Button asChild className="rounded-full bg-olivia-purple hover:bg-olivia-darkPurple">
                <Link to="/gallery" className="flex items-center space-x-2">
                  <Camera size={18} />
                  <span>Gallery</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="glass-card rounded-xl p-8 space-y-6 animate-scale-in">
          <h2 className="font-serif text-2xl font-medium text-center">
            What I Love
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-olivia-lightPink/50">
                <Music size={24} className="text-olivia-purple" />
              </div>
              <h3 className="font-medium">Music</h3>
              <p className="text-sm text-muted-foreground">
                From indie rock to alternative pop, music is my primary source of inspiration and joy.
              </p>
            </div>
            
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-olivia-lightPink/50">
                <Camera size={24} className="text-olivia-purple" />
              </div>
              <h3 className="font-medium">Photography</h3>
              <p className="text-sm text-muted-foreground">
                Capturing moments and telling stories through my lens is my creative outlet.
              </p>
            </div>
            
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-olivia-lightPink/50">
                <Heart size={24} className="text-olivia-purple" />
              </div>
              <h3 className="font-medium">Art & Design</h3>
              <p className="text-sm text-muted-foreground">
                I'm drawn to minimalist aesthetics and thoughtful design that balances form and function.
              </p>
            </div>
          </div>
        </section>
        
        <section className="text-center space-y-4 py-8 animate-fade-in">
          <h2 className="font-serif text-2xl font-medium">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always excited to connect with fellow music lovers, photographers, and creatives. Feel free to reach out and share your favorite tracks or artistic inspirations.
          </p>
          <Button className="mt-4 rounded-full bg-olivia-purple hover:bg-olivia-darkPurple">
            Say Hello
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default About;
