import { Mic, Radio } from 'lucide-react';

interface HeaderExpansionProps {
  voiceActive: boolean;
  onVoiceToggle: (active: boolean) => void;
}

export function HeaderExpansion({ voiceActive, onVoiceToggle }: HeaderExpansionProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-700">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onVoiceToggle(!voiceActive)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-fast ${
            voiceActive
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{voiceActive ? 'Voice On' : 'Voice'}</span>
        </button>

        <button
          type="button"
          className="px-4 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <Radio className="w-4 h-4" />
          <span>AI Filter</span>
        </button>

        <button
          type="button"
          className="px-4 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <span>⚙️</span>
          <span>Preferences</span>
        </button>
      </div>
    </div>
  );
}
