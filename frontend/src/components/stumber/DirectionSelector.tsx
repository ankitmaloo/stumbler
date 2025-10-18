import { useState } from 'react';
import { Mic, Upload } from 'lucide-react';
import type { AccentStyle } from '../../lib/stumber-types';

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
  const [direction, setDirection] = useState('');
  const [voiceListening, setVoiceListening] = useState(false);

  const handleVoiceInput = () => {
    setVoiceListening(!voiceListening);
    if (!voiceListening) {
      console.log('Voice input started...');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Image uploaded:', file.name);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setDirection(suggestion);
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
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Voice and Image Upload */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleVoiceInput}
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
            <span>Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            type="button"
            className={`px-6 py-2 rounded-lg font-medium text-white transition-fast ${accent.highlight}`}
          >
            Go
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
              className="text-left p-3 rounded-lg border border-gray-600 hover:border-blue-400 hover:bg-gray-700 transition-all text-sm text-gray-300 flex items-center space-x-3 group"
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
