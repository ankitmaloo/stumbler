interface SimpleCardProps {
  title: string;
  description?: string;
  author: string;
  date: string;
  comments?: number;
  likes?: number;
}

const SimpleCard = ({ title, description, author, date, comments, likes }: SimpleCardProps) => {
  return (
    <div className="rounded-lg p-6 cursor-pointer">
      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight font-serif tracking-tight">{title}</h3>
      {description && (
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{description}</p>
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
  );
};

export default SimpleCard;
