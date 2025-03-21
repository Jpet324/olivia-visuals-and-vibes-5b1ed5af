
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold olivia-gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This page is playing hide and seek.</p>
        <Button asChild className="rounded-full bg-olivia-purple hover:bg-olivia-darkPurple">
          <Link to="/" className="flex items-center space-x-2">
            <Home size={18} />
            <span>Return Home</span>
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
