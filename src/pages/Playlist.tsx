
import React, { useState } from "react";
import Layout from "../components/Layout";
import AlbumCard from "../components/AlbumCard";
import MusicPlayer from "../components/MusicPlayer";
import { albums, tracks } from "../data/music";
import { Album, Music, Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Playlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.album.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAlbumClick = (albumId: number) => {
    const trackIndex = tracks.findIndex(track => track.album === albums.find(a => a.id === albumId)?.title);
    if (trackIndex !== -1) {
      setSelectedTrackIndex(trackIndex);
    }
  };
  
  const handleTrackClick = (trackId: number) => {
    const trackIndex = tracks.findIndex(track => track.id === trackId);
    if (trackIndex !== -1) {
      setSelectedTrackIndex(trackIndex);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center">
          <span className="olivia-gradient-text">My Music Collection</span>
        </h1>
        
        {/* Music player */}
        <div className="animate-fade-in">
          <MusicPlayer tracks={tracks} initialTrackIndex={selectedTrackIndex} />
        </div>
        
        {/* Search bar */}
        <div className="relative animate-slide-up">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search albums, artists, or tracks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 bg-white/50 backdrop-blur-sm border-olivia-purple/10 focus:border-olivia-purple/30 focus:ring-1 focus:ring-olivia-purple/20 transition-all rounded-xl"
          />
        </div>
        
        {/* Albums and tracks tabs */}
        <Tabs defaultValue="albums" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="albums" className="flex items-center gap-2">
              <Album size={16} />
              <span>Albums</span>
            </TabsTrigger>
            <TabsTrigger value="tracks" className="flex items-center gap-2">
              <Music size={16} />
              <span>Tracks</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="albums" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAlbums.length > 0 ? (
                filteredAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    title={album.title}
                    artist={album.artist}
                    coverArt={album.coverArt}
                    releaseYear={album.releaseYear}
                    onClick={() => handleAlbumClick(album.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No albums found matching "{searchTerm}"
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tracks" className="mt-0">
            <div className="glass-card rounded-xl divide-y divide-border">
              {filteredTracks.length > 0 ? (
                filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-4 p-4 hover:bg-background/50 cursor-pointer transition-colors"
                    onClick={() => handleTrackClick(track.id)}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={track.coverArt}
                        alt={`${track.album} cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{track.title}</h3>
                      <p className="text-sm text-muted-foreground">{track.artist} • {track.album}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Play size={20} className="text-olivia-purple" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No tracks found matching "{searchTerm}"
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Playlist;
