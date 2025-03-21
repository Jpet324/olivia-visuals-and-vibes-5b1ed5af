
import React from "react";
import Navbar from "./Navbar";
import MusicVisualizer from "./MusicVisualizer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-olivia-lightPurple/30 via-white to-olivia-lightPink/30 -z-10" />
      
      {/* Music visualizer background */}
      <div className="fixed inset-0 opacity-30 -z-5">
        <MusicVisualizer />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow px-4 md:px-8 py-20 max-w-7xl mx-auto w-full animate-page-transition-in">
          {children}
        </main>
        <footer className="py-6 px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Olivia Branchaud</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
