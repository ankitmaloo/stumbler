import { useEffect, useState } from 'react';
import { Minimize2, AlertCircle } from 'lucide-react';
import type { AccentStyle } from '../../lib/stumber-types';

interface FocusModeProps {
  url: string;
  title: string;
  accent: AccentStyle;
  onExit: () => void;
}

export function FocusMode({ url, title, accent, onExit }: FocusModeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">Focus Mode</span>
          <p className="text-gray-300 truncate max-w-2xl text-sm">{title}</p>
        </div>
        <button
          type="button"
          onClick={onExit}
          className={`${accent.highlight} px-4 py-2 rounded-lg flex items-center space-x-2 transition-fast hover:scale-105`}
        >
          <Minimize2 className="w-4 h-4" />
          <span className="text-sm">Exit</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white overflow-hidden w-full">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <p className="text-gray-600 text-sm">Loading...</p>
            </div>
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 text-center px-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <div>
                <p className="text-gray-800 font-medium">Unable to load page</p>
                <p className="text-gray-600 text-sm mt-1">{url}</p>
              </div>
              <button
                type="button"
                onClick={onExit}
                className={`${accent.highlight} px-4 py-2 rounded-lg text-sm font-medium mt-4`}
              >
                Go back
              </button>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
