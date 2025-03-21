
import React from "react";

interface AlbumCardProps {
  title: string;
  artist: string;
  coverArt: string;
  releaseYear: number;
  onClick?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, coverArt, releaseYear, onClick }) => {
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={coverArt} 
          alt={`${title} by ${artist}`} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium truncate">{title}</h3>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
        <p className="text-xs text-muted-foreground mt-1">{releaseYear}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
