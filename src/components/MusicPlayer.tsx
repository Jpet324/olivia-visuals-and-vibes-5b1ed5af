
import React, { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc?: string;
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
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
    if (isPlaying && audioRef.current) {
      // We need to reload the audio with the new track and then play it
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  
  const handleNext = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
    if (isPlaying && audioRef.current) {
      // We need to reload the audio with the new track and then play it
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  
  const updateProgress = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newProgress = parseFloat(e.target.value);
      const newTime = (audioRef.current.duration / 100) * newProgress;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };
  
  const formatTime = (seconds: number) => {
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
            {audioRef.current && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(audioRef.current.currentTime)}</span>
                <span>{formatTime(audioRef.current.duration || 0)}</span>
              </div>
            )}
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
        src={currentTrack.audioSrc}
        preload="metadata"
      />
    </div>
  );
};

export default MusicPlayer;
