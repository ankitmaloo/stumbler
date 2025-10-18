import { getTintedAccentClass } from '../../lib/stumber-utils';

interface AIWhisperProps {
  whisper: string;
  category?: string;
}

export function AIWhisper({ whisper, category }: AIWhisperProps) {
  return (
    <div className="fixed bottom-8 left-8 right-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 max-w-2xl mx-auto">
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${getTintedAccentClass(category)}`}>
          🤖
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">AI Whisper</p>
          <p className="text-sm text-gray-200">{whisper}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-3 text-xs text-gray-400">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
        <span>Serendipity engine breathing.</span>
      </div>
    </div>
  );
}
