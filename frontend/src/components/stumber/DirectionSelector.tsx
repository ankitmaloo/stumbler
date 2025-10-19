import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Mic, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AccentStyle } from '../../lib/stumber-types';
import { startSearch } from '@/lib/api';

interface DirectionSelectorProps {
  accent: AccentStyle;
}

const suggestions = [
  { emoji: '🌐', text: 'Show me hidden internet gems' },
  { emoji: '🔬', text: 'Latest breakthrough research' },
  { emoji: '🎨', text: 'Creative inspiration' },
  { emoji: '📚', text: 'Deep learning resources' },
  { emoji: '🚀', text: 'Innovative startups' },
  { emoji: '🧩', text: 'Mind-bending puzzles' },
];

export function DirectionSelector({ accent }: DirectionSelectorProps) {
  const navigate = useNavigate();
  const [direction, setDirection] = useState('');
  const [voiceListening, setVoiceListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVoiceInput = () => {
    setVoiceListening(!voiceListening);
    if (!voiceListening) {
      console.log('Voice input started...');
      // TODO: Implement actual voice recognition
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      console.log('Image uploaded:', file.name);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setDirection(suggestion);
  };

  const handleSubmit = async () => {
    if (!direction.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true);

    try {
      const { job_id } = await startSearch({
        text: direction,
        image: selectedImage,
        isLive: false,
        source: 'stumber',
      });
      navigate(`/rabbit?job=${job_id}`, { state: { query: direction } });
    } catch (error) {
      console.error('Error submitting search:', error);
      navigate('/rabbit', { state: { query: direction } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Methods */}
      <div className="flex flex-col space-y-3">
        {/* Text Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Where do you want to stumble? Tell me..."
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isLoading}
          />
        </div>

        {/* Voice and Image Upload */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-fast ${
              voiceListening
                ? 'bg-green-600 text-white animate-pulse'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{voiceListening ? 'Listening...' : 'Voice'}</span>
          </button>

          <label className="px-4 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 flex items-center space-x-2 cursor-pointer transition-fast">
            <Upload className="w-4 h-4" />
            <span>{selectedImage ? selectedImage.name.slice(0, 10) + '...' : 'Image'}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isLoading}
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || (!direction.trim() && !selectedImage)}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-fast ${accent.highlight} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Searching...' : 'Go'}
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Or Pick a Vibe</p>
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestion(suggestion.text)}
              disabled={isLoading}
              className="text-left p-3 rounded-lg border border-gray-600 hover:border-blue-400 hover:bg-gray-700 transition-all text-sm text-gray-300 flex items-center space-x-3 group disabled:opacity-50"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">{suggestion.emoji}</span>
              <span className="group-hover:text-white transition-colors">{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
