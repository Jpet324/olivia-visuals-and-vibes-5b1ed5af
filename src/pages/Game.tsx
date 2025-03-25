
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Map, Globe, Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Game character
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

// Street View component
interface StreetViewProps {
  locationId: string;
  onClose: () => void;
}

const StreetView: React.FC<StreetViewProps> = ({ locationId, onClose }) => {
  const getStreetViewUrl = (id: string) => {
    const coordinates = {
      paris: "48.8584,2.2945", // Eiffel Tower
      tokyo: "35.6762,139.6503", // Tokyo Tower
      cairo: "29.9773,31.1325", // Great Pyramid of Giza
      rio: "-22.9519,-43.2106", // Christ the Redeemer
      newyork: "40.7484,-73.9857", // Empire State Building
      sydney: "-33.8568,151.2153", // Sydney Opera House
      rome: "41.8902,12.4922", // Colosseum
      beijing: "39.9042,116.3914", // Forbidden City
      marrakech: "31.6295,-7.9811", // Jemaa el-Fnaa
      capetown: "-33.9249,18.4241", // Table Mountain
      mumbai: "18.9220,72.8347", // Gateway of India
      dubai: "25.1972,55.2744", // Burj Khalifa
      istanbul: "41.0082,28.9784", // Hagia Sophia
      moscow: "55.7539,37.6208", // Red Square
      buenosaires: "-34.6037,-58.3816", // Obelisco
      vancouver: "49.2827,-123.1207", // Stanley Park
    };

    return `https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${coordinates[id as keyof typeof coordinates]}&heading=210&pitch=10&fov=90`;
  };

  const mockStreetViewImages = {
    paris: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/640px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    tokyo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tokyo_Tower_perfect_night_time.jpg/640px-Tokyo_Tower_perfect_night_time.jpg",
    cairo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/640px-Kheops-Pyramid.jpg",
    rio: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/640px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
    newyork: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/640px-Empire_State_Building_%28aerial_view%29.jpg",
    sydney: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sydney_Opera_House%2C_botanic_gardens_1.jpg/640px-Sydney_Opera_House%2C_botanic_gardens_1.jpg",
    rome: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/640px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
    beijing: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Forbidden_City_Beijing_Shenwumen_Gate.jpg/640px-Forbidden_City_Beijing_Shenwumen_Gate.jpg",
    marrakech: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jemaa_el-Fnaa.JPG/640px-Jemaa_el-Fnaa.JPG",
    capetown: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Table_Mountain_DanieVDM.jpg/640px-Table_Mountain_DanieVDM.jpg",
    mumbai: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gateway_of_India_at_night.jpg/640px-Gateway_of_India_at_night.jpg",
    dubai: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/640px-Burj_Khalifa.jpg",
    istanbul: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/640px-Hagia_Sophia_Mars_2013.jpg",
    moscow: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Square%2C_Moscow.jpg/640px-Red_Square%2C_Moscow.jpg",
    buenosaires: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Obelisco-Buenos_Aires_city.jpg/640px-Obelisco-Buenos_Aires_city.jpg",
    vancouver: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Stanley-Park-2016.jpg/640px-Stanley-Park-2016.jpg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 z-10" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="aspect-video">
          <img 
            src={mockStreetViewImages[locationId as keyof typeof mockStreetViewImages]} 
            alt={`Street view of ${locationId}`}
            className="w-full h-full object-cover"
          />
          {/* In a real app with API key:
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={getStreetViewUrl(locationId)}
            allowFullScreen
          ></iframe> */}
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-serif text-xl font-bold">
            {locations.find(loc => loc.id === locationId)?.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Street view of this famous landmark
          </p>
        </div>
      </div>
    </div>
  );
};

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

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("map");
  const [zoomedLocation, setZoomedLocation] = useState<string | null>(null);
  const [showStreetView, setShowStreetView] = useState<string | null>(null);

  const handleExplore = (locationId: string) => {
    if (!visitedLocations.includes(locationId)) {
      setPoints(prev => prev + 10);
      setVisitedLocations(prev => [...prev, locationId]);
    }
    setCurrentLocation(locationId);
  };

  const handleJourneyClick = () => {
    setActiveTab("journey");
  };

  const handleMarkerClick = (locationId: string) => {
    setZoomedLocation(locationId);
    
    setTimeout(() => {
      handleExplore(locationId);
    }, 500);
  };

  const resetZoom = () => {
    setZoomedLocation(null);
  };

  const openStreetView = (locationId: string) => {
    setShowStreetView(locationId);
  };

  const closeStreetView = () => {
    setShowStreetView(null);
  };

  // More accurate coordinates for the world map
  const locationCoordinates = {
    paris: { top: "28%", left: "47%" },
    tokyo: { top: "32%", left: "82%" },
    cairo: { top: "38%", left: "54%" },
    rio: { top: "62%", left: "33%" },
    newyork: { top: "32%", left: "25%" },
    sydney: { top: "68%", left: "85%" },
    rome: { top: "32%", left: "50%" },
    beijing: { top: "30%", left: "78%" },
    marrakech: { top: "38%", left: "44%" },
    capetown: { top: "68%", left: "52%" },
    mumbai: { top: "42%", left: "65%" },
    dubai: { top: "40%", left: "60%" },
    istanbul: { top: "32%", left: "53%" },
    moscow: { top: "24%", left: "56%" },
    buenosaires: { top: "68%", left: "30%" },
    vancouver: { top: "26%", left: "17%" }
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                <AnimatePresence>
                  {zoomedLocation ? (
                    <motion.div 
                      key="zoom-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center"
                      onClick={resetZoom}
                    >
                      <motion.button
                        className="absolute top-4 right-4 bg-white/80 text-sm font-medium px-2 py-1 rounded-full z-20"
                        onClick={resetZoom}
                      >
                        Back to map
                      </motion.button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1920px-Equirectangular_projection_SW.jpg" 
                    alt="World Map"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                
                {Object.entries(locationCoordinates).map(([locationId, position]) => {
                  const isZoomed = zoomedLocation === locationId;
                  
                  return (
                    <motion.div 
                      key={locationId}
                      className={`absolute z-20`}
                      style={{ 
                        top: position.top, 
                        left: position.left,
                      }}
                      animate={isZoomed ? {
                        scale: [1, 8],
                        zIndex: 30,
                      } : {
                        scale: 1,
                        zIndex: 20,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.button 
                        onClick={() => handleMarkerClick(locationId)}
                        className={`w-4 h-4 md:w-6 md:h-6 rounded-full bg-olivia-purple ${visitedLocations.includes(locationId) ? "ring-2 ring-olivia-pink animate-pulse" : ""} hover:ring-2 hover:ring-olivia-pink transition-all`} 
                        title={locations.find(loc => loc.id === locationId)?.name || ""}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      ></motion.button>
                    </motion.div>
                  );
                })}
              </div>
              
              {currentLocation && !zoomedLocation && (
                <div className="mt-6 animate-fade-in">
                  <Location 
                    name={locations.find(loc => loc.id === currentLocation)?.name || ""}
                    facts={locations.find(loc => loc.id === currentLocation)?.facts || []}
                    onExplore={() => openStreetView(currentLocation)}
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
                      <div 
                        key={locId} 
                        className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/95 transition-colors"
                        onClick={() => openStreetView(locId)}
                      >
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

      {/* Street View Modal */}
      <AnimatePresence>
        {showStreetView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StreetView 
              locationId={showStreetView}
              onClose={closeStreetView}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Game;
