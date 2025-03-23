
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc?: string;
  audioFile?: File; // New property for uploaded audio files
}

interface MusicPlayerProps {
  tracks: Track[];
  initialTrackIndex?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, initialTrackIndex = 0 }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioObjectURL, setAudioObjectURL] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];
  
  // Set up audio element when component mounts
  useEffect(() => {
    if (audioRef.current) {
      // Handle metadata loaded to get duration
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, []);
  
  // Handle track change
  useEffect(() => {
    if (audioRef.current) {
      // Reset progress when track changes
      setProgress(0);
      
      // Create object URL for File objects
      if (currentTrack.audioFile) {
        // Revoke previous object URL to prevent memory leaks
        if (audioObjectURL) {
          URL.revokeObjectURL(audioObjectURL);
        }
        
        // Create new object URL from the File
        const newObjectURL = URL.createObjectURL(currentTrack.audioFile);
        setAudioObjectURL(newObjectURL);
      } else {
        // If no File object, ensure we're not using an object URL
        setAudioObjectURL(null);
      }
      
      if (isPlaying) {
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      }
    }
    
    // Cleanup function to revoke object URL when component unmounts
    return () => {
      if (audioObjectURL) {
        URL.revokeObjectURL(audioObjectURL);
      }
    };
  }, [currentTrackIndex, currentTrack.audioFile]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handlePrevious = () => {
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
  };
  
  const updateProgress = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration && isFinite(duration)) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newProgress = parseFloat(e.target.value);
      if (audioRef.current.duration && isFinite(audioRef.current.duration)) {
        const newTime = (audioRef.current.duration / 100) * newProgress;
        if (isFinite(newTime)) {
          audioRef.current.currentTime = newTime;
          setProgress(newProgress);
        }
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="glass-card rounded-xl p-4 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Album cover */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
          <img 
            src={currentTrack.coverArt} 
            alt={`${currentTrack.album} cover`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Track info */}
        <div className="flex flex-col flex-grow">
          <h3 className="font-medium text-lg truncate">{currentTrack.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist} • {currentTrack.album}</p>
          
          {/* Progress bar */}
          <div className="mt-2 space-y-1">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={handleProgressChange}
              className="w-full h-1 bg-olivia-lightPurple rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-olivia-purple [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-black/10"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(audioRef.current?.duration || 0)}</span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center md:justify-end space-x-4">
          <button 
            onClick={handlePrevious}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full"
            aria-label="Previous track"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="p-3 bg-olivia-purple text-white rounded-full hover:bg-olivia-darkPurple transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={handleNext}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full"
            aria-label="Next track"
          >
            <SkipForward size={20} />
          </button>
          
          <button 
            onClick={toggleMute}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={updateProgress}
        onEnded={handleNext}
        preload="metadata"
      >
        {audioObjectURL ? (
          <source src={audioObjectURL} type={currentTrack.audioFile?.type} />
        ) : (
          <source src={currentTrack.audioSrc} type="audio/mpeg" />
        )}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
