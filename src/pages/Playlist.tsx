import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import AlbumCard from "../components/AlbumCard";
import MusicPlayer from "../components/MusicPlayer";
import AudioUploader from "../components/AudioUploader";
import { albums, tracks as initialTracks } from "../data/music";
import { Album, Music, Search, Play, Download, ExternalLink, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AudioMetadata } from "@/components/AudioUploader";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc?: string;
  audioFile?: File;
}

const Playlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const { toast } = useToast();

  useEffect(() => {
    const savedTracksInfo = localStorage.getItem('uploaded-tracks-info');
    
    if (savedTracksInfo) {
      try {
        const parsedTracksInfo = JSON.parse(savedTracksInfo);
        
        const baseTracksOnly = initialTracks.filter(track => 
          !track.hasOwnProperty('audioFile')
        );
        
        setTracks(baseTracksOnly);
      } catch (error) {
        console.error("Error parsing saved tracks:", error);
      }
    }
  }, []);
  
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

  const handleDownloadMusic = () => {
    window.open('/music/index.html', '_blank');
  };

  const showMusicError = () => {
    toast({
      title: "Music Player Issue",
      description: "The music player is currently experiencing issues. Please use the download option instead.",
      variant: "destructive",
    });
  };
  
  const handleAudioUpload = (file: File, metadata: AudioMetadata) => {
    const defaultCoverArt = "https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=300&auto=format&fit=crop";
    
    const newTrack: Track = {
      id: Date.now(),
      title: metadata.title,
      artist: metadata.artist || "Unknown Artist",
      album: metadata.album || "My Uploads",
      coverArt: defaultCoverArt,
      audioFile: file,
    };
    
    const updatedTracks = [...tracks, newTrack];
    setTracks(updatedTracks);
    
    setSelectedTrackIndex(updatedTracks.length - 1);
    
    try {
      const storableTrack = {
        id: newTrack.id,
        title: newTrack.title,
        artist: newTrack.artist,
        album: newTrack.album,
        coverArt: newTrack.coverArt,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString()
      };
      
      const existingData = localStorage.getItem('uploaded-tracks-info');
      const existingTracks = existingData ? JSON.parse(existingData) : [];
      
      existingTracks.push(storableTrack);
      localStorage.setItem('uploaded-tracks-info', JSON.stringify(existingTracks));
    } catch (error) {
      console.error("Error saving track to localStorage:", error);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center">
          <span className="olivia-gradient-text">My Music Collection</span>
        </h1>
        
        <div className="animate-fade-in">
          <div className="flex justify-center mb-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/80"
              onClick={handleDownloadMusic}
            >
              <Download size={16} />
              <span>Download Music Files</span>
            </Button>
          </div>
          <MusicPlayer tracks={tracks} initialTrackIndex={selectedTrackIndex} />
          <div className="text-center mt-4 text-muted-foreground text-sm">
            <p>Having issues with the music player? <button onClick={handleDownloadMusic} className="text-olivia-purple hover:underline">Download the tracks</button> or <button onClick={showMusicError} className="text-olivia-purple hover:underline">report an issue</button>.</p>
          </div>
        </div>
        
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
        
        <div className="animate-slide-up mt-4">
          <Tabs defaultValue="upload">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2 w-full">
                <Upload size={16} />
                <span>Upload Your Music</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <AudioUploader onAudioUpload={handleAudioUpload} />
            </TabsContent>
          </Tabs>
        </div>
        
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
                      <p className="text-sm text-muted-foreground">
                        {track.artist} • {track.album}
                        {track.audioFile && <span className="ml-2 text-olivia-pink">(Uploaded)</span>}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadMusic();
                      }} className="p-2 rounded-full hover:bg-olivia-purple/10">
                        <Download size={18} className="text-olivia-purple" />
                      </button>
                      <div className="p-2">
                        <Play size={20} className="text-olivia-purple" />
                      </div>
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
