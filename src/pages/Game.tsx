
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Map, Globe, Award, X, Camera, Image, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import StreetViewScene from "../components/StreetViewScene";
import RealWorldGraphics from "../components/RealWorldGraphics";

const Character = () => (
  <motion.div 
    className="relative w-24 h-24"
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <div className="absolute inset-0 bg-olivia-lightPink rounded-full opacity-60"></div>
    <div className="absolute inset-2 bg-olivia-pink rounded-full overflow-hidden flex items-center justify-center">
      <Avatar className="w-full h-full">
        <AvatarImage src="/lovable-uploads/76f990e9-2b04-4dd4-89d1-5a6e28ec0512.png" alt="Olivia" />
        <AvatarFallback className="text-white font-bold text-xs">Olivia</AvatarFallback>
      </Avatar>
    </div>
  </motion.div>
);

interface Location3DViewProps {
  locationId: string;
  onClose: () => void;
}

const Location3DView: React.FC<Location3DViewProps> = ({ locationId, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 z-10" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="aspect-video">
          <StreetViewScene locationId={locationId} />
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-serif text-xl font-bold">
            {locations.find(loc => loc.id === locationId)?.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Explore this famous landmark in 3D
          </p>
        </div>
      </div>
    </div>
  );
};

interface LocationCardProps {
  location: {
    id: string;
    name: string;
    facts: string[];
  };
  onExplore: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onExplore }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
    <h3 className="font-serif text-xl font-medium mb-4">{location.name}</h3>
    <ul className="mb-4 space-y-2">
      {location.facts.map((fact, index) => (
        <li key={index} className="flex items-start">
          <GraduationCap className="text-olivia-purple mr-2 mt-1 flex-shrink-0" size={16} />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
    <Button 
      onClick={onExplore} 
      className="bg-olivia-purple hover:bg-olivia-darkPurple w-full"
    >
      <Compass className="mr-2 h-4 w-4" />
      Explore in 3D
    </Button>
  </div>
);

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
  },
  {
    id: "newyork",
    name: "New York, USA",
    facts: [
      "The Statue of Liberty was a gift from France in 1886.",
      "Central Park spans 843 acres in the heart of Manhattan.",
      "New York's subway system has 472 stations, the most of any system worldwide."
    ]
  },
  {
    id: "sydney",
    name: "Sydney, Australia",
    facts: [
      "The Sydney Opera House took 14 years to build, from 1959 to 1973.",
      "Sydney Harbour Bridge is the world's largest steel arch bridge.",
      "Sydney's Bondi Beach is one of the world's most famous beaches."
    ]
  },
  {
    id: "rome",
    name: "Rome, Italy",
    facts: [
      "The Colosseum could hold up to 80,000 spectators in ancient times.",
      "Romans toss about €1.5 million into the Trevi Fountain each year.",
      "The Vatican City, located in Rome, is the smallest country in the world."
    ]
  },
  {
    id: "beijing",
    name: "Beijing, China",
    facts: [
      "The Forbidden City has 9,999 rooms, just short of the mythical 10,000 that would belong to heaven.",
      "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
      "Beijing has served as China's capital for over 800 years."
    ]
  },
  {
    id: "marrakech",
    name: "Marrakech, Morocco",
    facts: [
      "Jemaa el-Fnaa square transforms from a market by day to an open-air restaurant by night.",
      "The city is known as the 'Red City' because of its buildings and walls of red sandstone.",
      "Marrakech contains the largest traditional Berber market in Morocco."
    ]
  },
  {
    id: "capetown",
    name: "Cape Town, South Africa",
    facts: [
      "Table Mountain is one of the oldest mountains in the world at approximately 600 million years old.",
      "Cape Town was the first European settlement in South Africa, established in 1652.",
      "The city is known for having the highest commercial bungee jump in the world at 216 meters."
    ]
  },
  {
    id: "mumbai",
    name: "Mumbai, India",
    facts: [
      "The Gateway of India was built to commemorate the visit of King George V and Queen Mary in 1911.",
      "Mumbai's Dharavi is one of the largest slums in Asia but also one of the most productive.",
      "The city has the world's most expensive private residence, Antilia, valued at over $1 billion."
    ]
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    facts: [
      "The Burj Khalifa is the tallest building in the world at 828 meters.",
      "Only about 15% of Dubai's population are UAE nationals.",
      "Dubai has built the world's largest artificial islands, the Palm Islands."
    ]
  },
  {
    id: "istanbul",
    name: "Istanbul, Turkey",
    facts: [
      "Istanbul is the only city in the world that spans two continents: Europe and Asia.",
      "The Grand Bazaar is one of the world's oldest and largest covered markets with over 4,000 shops.",
      "The Hagia Sophia has served as a church, mosque, and museum throughout its 1,500-year history."
    ]
  },
  {
    id: "moscow",
    name: "Moscow, Russia",
    facts: [
      "The Moscow Kremlin is the largest active fortress in Europe.",
      "Red Square got its name not from the color of its bricks but from the word 'krasnyi', which once meant 'beautiful'.",
      "The Moscow Metro is known for its ornate stations decorated with chandeliers, mosaics and marble."
    ]
  },
  {
    id: "buenosaires",
    name: "Buenos Aires, Argentina",
    facts: [
      "The city has the highest concentration of theaters in the world.",
      "The Obelisk, built in 1936, is the iconic symbol of Buenos Aires.",
      "The city's Recoleta Cemetery is where Eva Perón is buried, among other notable figures."
    ]
  },
  {
    id: "vancouver",
    name: "Vancouver, Canada",
    facts: [
      "Stanley Park is larger than New York's Central Park at 1,001 acres.",
      "Vancouver has been consistently ranked as one of the most livable cities in the world.",
      "The city has the third largest film production industry in North America, nicknamed 'Hollywood North'."
    ]
  }
];

const realWorldAssets = [
  {
    id: "grand-canyon",
    name: "Grand Canyon",
    type: "environment" as const,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Grand_Canyon_view_from_Pima_Point_2010.jpg/1920px-Grand_Canyon_view_from_Pima_Point_2010.jpg",
    description: "Experience the breathtaking view of the Grand Canyon"
  },
  {
    id: "ancient-ruins",
    name: "Ancient Temple Ruins",
    type: "texture" as const,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Parthenon_from_west.jpg/1920px-Parthenon_from_west.jpg",
    description: "Explore ancient architecture with realistic stone textures"
  },
  {
    id: "wildlife",
    name: "Safari Wildlife",
    type: "sprite" as const,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1920px-Lion_waiting_in_Namibia.jpg",
    description: "Encounter wildlife from different continents"
  }
];

interface RealWorldAssetCardProps {
  asset: {
    id: string;
    name: string;
    type: 'texture' | 'environment' | 'sprite' | 'model';
    imageUrl: string;
    description: string;
  };
  onClick: () => void;
}

const RealWorldAssetCard: React.FC<RealWorldAssetCardProps> = ({ asset, onClick }) => (
  <div 
    className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
  >
    <div className="h-40 mb-4 rounded-md overflow-hidden bg-gray-200 relative">
      <img 
        src={asset.imageUrl} 
        alt={asset.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 bg-olivia-purple/80 text-white text-xs px-2 py-1 rounded-full">
        {asset.type}
      </div>
    </div>
    <h3 className="font-serif text-xl font-medium mb-2">{asset.name}</h3>
    <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
    <Button 
      className="bg-olivia-purple hover:bg-olivia-darkPurple w-full"
      onClick={onClick}
    >
      <Camera className="mr-2 h-4 w-4" />
      View in 3D
    </Button>
  </div>
);

interface RealWorld3DViewerProps {
  asset: {
    id: string;
    name: string;
    type: 'texture' | 'environment' | 'sprite' | 'model';
    imageUrl: string;
    description?: string;
  };
  onClose: () => void;
}

const RealWorld3DViewer: React.FC<RealWorld3DViewerProps> = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 z-10" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="aspect-video">
          <RealWorldGraphics 
            type={asset.type} 
            imageUrl={asset.imageUrl}
            position={[0, 0, 0]}
            scale={asset.type === 'sprite' ? [3, 3, 1] : [2, 2, 2]}
            rotation={[0, asset.type === 'texture' ? Math.PI / 4 : 0, 0]}
          />
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-serif text-xl font-bold">
            {asset.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {asset.description || "Explore this real-world element in 3D"}
          </p>
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  const [points, setPoints] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("landmarks");
  const [viewing3DLocation, setViewing3DLocation] = useState<string | null>(null);
  const [viewing3DAsset, setViewing3DAsset] = useState<string | null>(null);

  const handleExploreLocation = (locationId: string) => {
    setViewing3DLocation(locationId);
    
    if (!visitedLocations.includes(locationId)) {
      setPoints(prev => prev + 10);
      setVisitedLocations(prev => [...prev, locationId]);
    }
  };

  const closeLocation3DView = () => {
    setViewing3DLocation(null);
  };

  const handleViewAsset = (assetId: string) => {
    setViewing3DAsset(assetId);
    
    if (!visitedLocations.includes(`rw-${assetId}`)) {
      setPoints(prev => prev + 15);
      setVisitedLocations(prev => [...prev, `rw-${assetId}`]);
    }
  };

  const closeAsset3DView = () => {
    setViewing3DAsset(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="olivia-gradient-text">Olivia's 3D World Adventure</span>
        </h1>
        
        <div className="bg-gradient-to-br from-olivia-lightPurple/20 to-olivia-lightPink/20 p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Character />
              <div>
                <h2 className="font-serif text-xl">Detective Olivia</h2>
                <p className="text-sm text-muted-foreground">3D Explorer</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-medium">Points: </span>
              <span className="text-olivia-purple font-bold">{points}</span>
            </div>
          </div>
          
          <p className="mb-6 glass-card p-4 rounded-lg">
            Join Olivia as she explores famous 3D locations around the world! Learn interesting facts about each place and collect points on your immersive journey.
          </p>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="landmarks" className="flex items-center space-x-2">
                <Globe size={16} />
                <span>3D Landmarks</span>
              </TabsTrigger>
              <TabsTrigger value="elements" className="flex items-center space-x-2">
                <Image size={16} />
                <span>3D Elements</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="landmarks" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((location) => (
                  <LocationCard 
                    key={location.id}
                    location={location}
                    onExplore={() => handleExploreLocation(location.id)}
                  />
                ))}
              </div>
              
              {visitedLocations.filter(loc => !loc.startsWith('rw-')).length > 0 && (
                <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                  <h3 className="font-serif text-xl font-medium mb-2">Your 3D Journey</h3>
                  <p className="text-sm mb-3">
                    You've explored {visitedLocations.filter(loc => !loc.startsWith('rw-')).length} out of {locations.length} landmarks!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {visitedLocations
                      .filter(loc => !loc.startsWith('rw-'))
                      .map(locId => {
                        const location = locations.find(loc => loc.id === locId);
                        return location ? (
                          <Button 
                            key={locId} 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleExploreLocation(locId)}
                            className="flex items-center"
                          >
                            <Award className="mr-1 h-3 w-3 text-olivia-purple" />
                            {location.name}
                          </Button>
                        ) : null;
                      })
                    }
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="elements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {realWorldAssets.map((asset) => (
                  <RealWorldAssetCard
                    key={asset.id}
                    asset={asset}
                    onClick={() => handleViewAsset(asset.id)}
                  />
                ))}
              </div>
              
              {visitedLocations.filter(loc => loc.startsWith('rw-')).length > 0 && (
                <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                  <h3 className="font-serif text-xl font-medium mb-2">3D Elements Discovered</h3>
                  <p className="text-sm mb-2">
                    You've earned {visitedLocations.filter(loc => loc.startsWith('rw-')).length * 15} points by exploring 3D elements!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {visitedLocations
                      .filter(loc => loc.startsWith('rw-'))
                      .map(loc => {
                        const assetId = loc.replace('rw-', '');
                        const asset = realWorldAssets.find(a => a.id === assetId);
                        return asset ? (
                          <Button 
                            key={loc} 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewAsset(asset.id)}
                            className="flex items-center"
                          >
                            <Award className="mr-1 h-3 w-3 text-olivia-purple" />
                            {asset.name}
                          </Button>
                        ) : null;
                      })
                    }
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AnimatePresence>
        {viewing3DLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Location3DView 
              locationId={viewing3DLocation}
              onClose={closeLocation3DView}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewing3DAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RealWorld3DViewer 
              asset={realWorldAssets.find(asset => asset.id === viewing3DAsset)!}
              onClose={closeAsset3DView}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Game;
