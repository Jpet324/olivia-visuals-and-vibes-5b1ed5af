
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Map, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";

// Game character
const Character = () => (
  <motion.div 
    className="relative w-24 h-24"
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <div className="absolute inset-0 bg-olivia-lightPink rounded-full opacity-60"></div>
    <div className="absolute inset-2 bg-olivia-pink rounded-full opacity-80 flex items-center justify-center">
      <span className="text-white font-bold text-xs">Olivia</span>
    </div>
  </motion.div>
);

// Location component
interface LocationProps {
  name: string;
  facts: string[];
  onExplore: () => void;
}

const Location: React.FC<LocationProps> = ({ name, facts, onExplore }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
    <h3 className="font-serif text-xl font-medium mb-4">{name}</h3>
    <ul className="mb-4 space-y-2">
      {facts.map((fact, index) => (
        <li key={index} className="flex items-start">
          <GraduationCap className="text-olivia-purple mr-2 mt-1 flex-shrink-0" size={16} />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
    <Button 
      onClick={onExplore} 
      className="bg-olivia-purple hover:bg-olivia-darkPurple"
    >
      Explore this location
    </Button>
  </div>
);

// Locations data
const locations = [
  {
    id: "paris",
    name: "Paris, France",
    facts: [
      "The Eiffel Tower was built in 1889 for the World Fair.",
      "The Louvre Museum houses over 380,000 objects.",
      "Paris has 37 bridges crossing the Seine River."
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo, Japan",
    facts: [
      "Tokyo was originally known as Edo.",
      "The Tokyo Skytree is the tallest tower in the world at 634 meters.",
      "Tokyo has over 200 train stations."
    ]
  },
  {
    id: "cairo",
    name: "Cairo, Egypt",
    facts: [
      "The Great Pyramid of Giza is the only surviving structure of the Seven Wonders of the Ancient World.",
      "Cairo is the largest city in Africa.",
      "The city's name means 'The Victorious' in Arabic."
    ]
  },
  {
    id: "rio",
    name: "Rio de Janeiro, Brazil",
    facts: [
      "The Christ the Redeemer statue stands 30 meters tall.",
      "Rio hosted the 2016 Summer Olympics.",
      "The Tijuca Forest is the world's largest urban forest."
    ]
  }
];

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);

  const handleExplore = (locationId: string) => {
    if (!visitedLocations.includes(locationId)) {
      setPoints(prev => prev + 10);
      setVisitedLocations(prev => [...prev, locationId]);
    }
    setCurrentLocation(locationId);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="olivia-gradient-text">Olivia's World Adventure</span>
        </h1>
        
        <div className="bg-gradient-to-br from-olivia-lightPurple/20 to-olivia-lightPink/20 p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Character />
              <div>
                <h2 className="font-serif text-xl">Detective Olivia</h2>
                <p className="text-sm text-muted-foreground">Educational Explorer</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-medium">Points: </span>
              <span className="text-olivia-purple font-bold">{points}</span>
            </div>
          </div>
          
          <p className="mb-6 glass-card p-4 rounded-lg">
            Join Olivia as she explores famous locations around the world! Learn interesting facts about each place and collect points on your educational journey.
          </p>
          
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="map" className="flex items-center space-x-2">
                <Map size={16} />
                <span>World Map</span>
              </TabsTrigger>
              <TabsTrigger value="journey" className="flex items-center space-x-2">
                <Globe size={16} />
                <span>Journey</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="space-y-4">
              <div className="relative h-64 md:h-96 bg-blue-50 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Globe size={48} className="mx-auto mb-2 text-olivia-purple/50" />
                    <p>Interactive world map coming soon!</p>
                  </div>
                </div>
                
                {/* Clickable location markers */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                  <button 
                    onClick={() => handleExplore("paris")}
                    className={`w-6 h-6 rounded-full bg-olivia-purple ${visitedLocations.includes("paris") ? "ring-2 ring-olivia-pink" : ""}`} 
                    title="Paris, France"
                  ></button>
                </div>
                <div className="absolute top-1/3 left-2/3">
                  <button 
                    onClick={() => handleExplore("tokyo")}
                    className={`w-6 h-6 rounded-full bg-olivia-purple ${visitedLocations.includes("tokyo") ? "ring-2 ring-olivia-pink" : ""}`} 
                    title="Tokyo, Japan"
                  ></button>
                </div>
                <div className="absolute top-1/2 left-1/3">
                  <button 
                    onClick={() => handleExplore("cairo")}
                    className={`w-6 h-6 rounded-full bg-olivia-purple ${visitedLocations.includes("cairo") ? "ring-2 ring-olivia-pink" : ""}`} 
                    title="Cairo, Egypt"
                  ></button>
                </div>
                <div className="absolute bottom-1/3 right-1/3">
                  <button 
                    onClick={() => handleExplore("rio")}
                    className={`w-6 h-6 rounded-full bg-olivia-purple ${visitedLocations.includes("rio") ? "ring-2 ring-olivia-pink" : ""}`} 
                    title="Rio de Janeiro, Brazil"
                  ></button>
                </div>
              </div>
              
              {currentLocation && (
                <div className="mt-6 animate-fade-in">
                  <Location 
                    name={locations.find(loc => loc.id === currentLocation)?.name || ""}
                    facts={locations.find(loc => loc.id === currentLocation)?.facts || []}
                    onExplore={() => setCurrentLocation(null)}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="journey" className="space-y-4">
              {visitedLocations.length === 0 ? (
                <div className="text-center py-12">
                  <GraduationCap size={48} className="mx-auto mb-4 text-olivia-purple/50" />
                  <h3 className="text-xl font-medium mb-2">Your journey hasn't started yet!</h3>
                  <p className="text-muted-foreground">
                    Explore locations on the map to start your educational adventure
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-medium">Places You've Visited</h3>
                  {visitedLocations.map((locId) => {
                    const location = locations.find(loc => loc.id === locId);
                    return location ? (
                      <div key={locId} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
                        <Award className="text-olivia-purple flex-shrink-0" />
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">+10 knowledge points</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                  
                  {visitedLocations.length === locations.length && (
                    <div className="mt-6 p-4 bg-olivia-lightPink/20 border border-olivia-pink rounded-lg text-center">
                      <h3 className="font-serif text-xl font-medium mb-2">Congratulations!</h3>
                      <p>You've visited all locations and earned {locations.length * 10} points!</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Game;
