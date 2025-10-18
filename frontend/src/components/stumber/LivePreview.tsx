interface LivePreviewProps {
  url: string;
  title: string;
}

export function LivePreview({ url, title }: LivePreviewProps) {
  return (
    <div className="relative bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden h-96">
      <iframe src={url} title={title} className="w-full h-full border-0" loading="lazy" />
      <div className="absolute top-4 left-4 bg-gray-700 px-3 py-1 rounded-full flex items-center space-x-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Live</span>
      </div>
    </div>
  );
}
