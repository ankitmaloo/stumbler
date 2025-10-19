import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Search, Image as ImageIcon, X, Radio, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MultimodalInputBoxProps {
  onFeelingLucky?: () => void;
  showFeelingLucky?: boolean;
  source?: 'home' | 'stumber';
}

const MultimodalInputBox = ({ onFeelingLucky, showFeelingLucky = false, source = 'home' }: MultimodalInputBoxProps) => {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we have any input
    if (!textInput.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true);

    try {
      navigate('/rabbit', { 
        state: { 
          query: textInput,
          searchParams: {
            text: textInput,
            image: selectedImage,
            source,
            isLive,
          }
        } 
      });
    } catch (error) {
      console.error('Error submitting search:', error);
      navigate('/rabbit', { state: { query: textInput } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div 
        className={`rounded-3xl border transition-all duration-300 ${
          isHovered || textInput || selectedImage
            ? 'border-primary scale-[1.02]' 
            : 'border-border'
        }`}
        style={{ 
          backgroundColor: 'var(--input-bg)',
          boxShadow: isHovered || textInput || selectedImage
            ? `var(--input-shadow-hover), 0 0 0 1px var(--primary)` 
            : 'var(--input-shadow)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Preview Section */}
        {imagePreview && (
          <div className="px-6 pt-4">
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-24 w-24 object-cover rounded-xl border-2 border-border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-fast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="flex items-center px-6 py-4">
          <Search className="w-5 h-5 text-muted-foreground mr-4 flex-shrink-0" />
          
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="What do you want to discover? (text or image)"
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-base"
            autoFocus
            disabled={isLoading}
          />

          {/* Action Icons */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Image Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
              disabled={isLoading}
            />
            <label
              htmlFor="image-upload"
              className={`p-2 rounded-full hover:bg-secondary transition-fast cursor-pointer ${
                selectedImage ? 'bg-primary/10' : ''
              }`}
              title="Upload image"
            >
              <ImageIcon className={`w-5 h-5 ${
                selectedImage ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`} />
            </label>

            {/* Live Button (Dummy) */}
            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className={`p-2 rounded-full transition-fast ${
                isLive 
                  ? 'bg-destructive/20 hover:bg-destructive/30' 
                  : 'hover:bg-secondary'
              }`}
              title={isLive ? "Live mode ON" : "Live mode OFF"}
              disabled={isLoading}
            >
              <Radio className={`w-5 h-5 ${
                isLive ? 'text-destructive animate-pulse' : 'text-muted-foreground hover:text-foreground'
              }`} />
            </button>

            {/* Loading Indicator */}
            {isLoading && (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="px-6 pb-4">
            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary animate-[shimmer_1.5s_ease-in-out_infinite]"
                style={{
                  background: 'var(--gradient-primary)',
                  animation: 'shimmer 1.5s ease-in-out infinite',
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Processing your request...
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <button
          type="submit"
          disabled={isLoading || (!textInput.trim() && !selectedImage)}
          className="px-6 py-3 rounded-xl bg-card hover:bg-accent border border-border text-foreground font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover-glow-primary"
        >
          {isLoading ? 'Searching...' : 'Discover'}
        </button>
        
        {showFeelingLucky && onFeelingLucky && (
          <button
            type="button"
            onClick={onFeelingLucky}
            className="px-6 py-3 rounded-xl gradient-primary text-white font-medium transition-all duration-200 hover:scale-105 hover-glow-primary"
          >
            I'm Feeling Lucky
          </button>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </form>
  );
};

export default MultimodalInputBox;
