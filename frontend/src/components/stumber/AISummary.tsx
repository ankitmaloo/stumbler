import { getCategoryClass } from '../../lib/stumber-utils';

interface AISummaryProps {
  summary: string;
  visible: boolean;
  category?: string;
}

export function AISummary({ summary, visible, category }: AISummaryProps) {
  return (
    <div className={`${getCategoryClass(category)} rounded-lg shadow-sm border border-gray-700 p-6`}>
      <h3 className="text-lg font-semibold text-white mb-2">AI TL;DR</h3>
      {visible ? (
        <p className="text-gray-200 text-sm">{summary}</p>
      ) : (
        <p className="text-gray-400 italic text-sm">Tap "AI Summary" above to wake the engine.</p>
      )}
    </div>
  );
}
