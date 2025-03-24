
import { useState, useRef } from "react";
import { Upload, X, Cube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ModelUploaderProps {
  onModelUpload: (file: File, metadata: ModelMetadata) => void;
}

export interface ModelMetadata {
  title: string;
  creator: string;
  description: string;
}

const ModelUploader = ({ onModelUpload }: ModelUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ModelMetadata>({
    title: "",
    creator: "",
    description: "",
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
    
    // Check if file is a 3D model format
    const validExtensions = ['.obj', '.glb', '.gltf', '.fbx', '.stl', '.3ds', '.dae'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload 3D model files (OBJ, GLB, GLTF, FBX, STL, 3DS, DAE)",
        variant: "destructive",
      });
      return;
    }
    
    // Limit file size to 50MB
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload model files smaller than 50MB.",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFile && metadata.title) {
      onModelUpload(selectedFile, metadata);
      resetForm();
      
      toast({
        title: "3D Model uploaded",
        description: `${metadata.title} has been added to your collection.`,
      });
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setShowMetadataForm(false);
    setMetadata({
      title: "",
      creator: "",
      description: "",
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
            accept=".obj,.glb,.gltf,.fbx,.stl,.3ds,.dae"
          />
          
          <Cube size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload 3D Models</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your 3D model files here, or click to browse
          </p>
          <Button 
            variant="outline"
            onClick={triggerFileInput}
            className="bg-white/80"
          >
            Select 3D Model
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: OBJ, GLB, GLTF, FBX, STL, 3DS, DAE (Max 50MB)
          </p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">3D Model Details</h3>
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
              <label className="block text-sm font-medium mb-1" htmlFor="creator">
                Creator
              </label>
              <input
                type="text"
                id="creator"
                name="creator"
                value={metadata.creator}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olivia-purple"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={metadata.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olivia-purple"
                rows={3}
              />
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-2">
                Selected file: <span className="font-medium">{selectedFile?.name}</span>
              </p>
              <Button type="submit" className="w-full">
                Add to Collection
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModelUploader;
