import { getCategoryClass, getTintedAccentClass, getBarWidth } from '../../lib/stumber-utils';
import type { Reaction } from '../../lib/stumber-types';

interface CommunityPulseProps {
  reactions: Reaction[];
  category?: string;
}

export function CommunityPulse({ reactions, category }: CommunityPulseProps) {
  return (
    <div className={`${getCategoryClass(category)} rounded-lg shadow-sm border border-gray-700 p-6`}>
      <h3 className="text-lg font-semibold text-white mb-4">Community pulse</h3>
      <div className="space-y-4">
        {reactions.map((reaction) => (
          <div key={reaction.label} className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-2xl">{reaction.emoji}</span>
              <span className="text-sm text-gray-200">{reaction.label}</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-600 rounded-full h-2">
                <div className={`${getTintedAccentClass(category)} h-full rounded-full ${getBarWidth(reaction.intensity)}`} />
              </div>
            </div>
            <span className="text-sm text-gray-400 w-12 text-right">{reaction.intensity}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
