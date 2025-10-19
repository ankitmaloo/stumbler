interface ArticleCardProps {
  title: string;
  description?: string;
  author: string;
  date: string;
  image?: string;
  comments?: number;
  likes?: number;
  emojis?: string[];
  hasVideo?: boolean;
}

const ArticleCard = ({
  title,
  description,
  author,
  date,
  image,
  comments,
  likes,
  emojis,
  hasVideo = false
}: ArticleCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden cursor-pointer">
      {image && (
        <div className="relative">
          <img src={image} alt={title} className="w-full h-36 object-cover rounded-lg"/>
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-4 shadow-xl">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight font-serif tracking-tight">{title}</h3>
        {description && (
          <p className="text-gray-600 text-xs mb-4 leading-relaxed">{description}</p>
        )}
        {(comments !== undefined || likes !== undefined) && (
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-3">
            {comments !== undefined && (
              <span>{comments} comments</span>
            )}
            {(comments !== undefined && likes !== undefined) && <span>·</span>}
            {likes !== undefined && (
              <span>{likes} likes</span>
            )}
          </div>
        )}
        <p className="text-red-600 text-xs font-bold tracking-wide">{author} — {date}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
