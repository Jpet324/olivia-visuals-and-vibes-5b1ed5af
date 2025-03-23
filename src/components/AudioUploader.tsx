
import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface AudioUploaderProps {
  onAudioUpload: (file: File, metadata: AudioMetadata) => void;
}

export interface AudioMetadata {
  title: string;
  artist: string;
  album: string;
}

const AudioUploader = ({ onAudioUpload }: AudioUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<AudioMetadata>({
    title: "",
    artist: "",
    album: "",
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    if (!file) return;
    
    // Check if file is audio/mp3 or audio/wav
    if (!file.type.match('audio/mpeg|audio/wav|audio/x-wav')) {
      toast({
        title: "Invalid file type",
        description: "Please upload MP3 or WAV files only.",
        variant: "destructive",
      });
      return;
    }
    
    // Limit file size to 15MB
    const maxSize = 15 * 1024 * 1024; // 15MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload audio files smaller than 15MB.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Pre-fill title with filename (without extension)
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    setMetadata(prev => ({
      ...prev,
      title: fileName
    }));
    
    setShowMetadataForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFile && metadata.title) {
      onAudioUpload(selectedFile, metadata);
      resetForm();
      
      toast({
        title: "Audio uploaded",
        description: `${metadata.title} has been added to your library.`,
      });
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setShowMetadataForm(false);
    setMetadata({
      title: "",
      artist: "",
      album: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  return (
    <div className="mb-6">
      {!showMetadataForm ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging 
              ? "border-olivia-purple bg-olivia-purple/5" 
              : "border-gray-300 hover:border-olivia-purple/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
            accept=".mp3,.wav"
          />
          
          <Upload size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Audio Files</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your MP3 or WAV files here, or click to browse
          </p>
          <Button 
            variant="outline"
            onClick={triggerFileInput}
            className="bg-white/80"
          >
            Select Audio File
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Maximum file size: 15MB
          </p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Song Details</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={resetForm}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={metadata.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olivia-purple"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="artist">
                Artist
              </label>
              <input
                type="text"
                id="artist"
                name="artist"
                value={metadata.artist}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olivia-purple"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="album">
                Album
              </label>
              <input
                type="text"
                id="album"
                name="album"
                value={metadata.album}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olivia-purple"
              />
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-2">
                Selected file: <span className="font-medium">{selectedFile?.name}</span>
              </p>
              <Button type="submit" className="w-full">
                Add to Library
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
