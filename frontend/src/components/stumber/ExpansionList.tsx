import { getCategoryClass, getTintedAccentClass } from '../../lib/stumber-utils';
import type { Expansion, AccentStyle } from '../../lib/stumber-types';
import { DirectionSelector } from './DirectionSelector';

interface ExpansionListProps {
  expansions: Expansion[];
  category?: string;
  accent: AccentStyle;
}

export function ExpansionList({ expansions, category, accent }: ExpansionListProps) {
  return (
    <div className={`${getCategoryClass(category)} rounded-lg shadow-sm border border-gray-700 p-6`}>
      <h3 className="text-lg font-semibold text-white mb-4">Expand the rabbit hole</h3>
      
      <div className="space-y-6">
        {/* Direction Selector - Guide the stumble */}
        <DirectionSelector accent={accent} />

        {/* Divider */}
        <div className="border-t border-gray-600" />

        {/* Suggested paths */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Suggested Paths</h4>
          <ul className="space-y-4">
            {expansions.map((exp) => (
              <li key={exp.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getTintedAccentClass(category)}`} />
                <div>
                  <p className="font-medium text-white">{exp.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{exp.detail}</p>
                  <p className={`text-xs font-semibold uppercase tracking-widest mt-2 ${accent.tag}`}>{exp.source}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
