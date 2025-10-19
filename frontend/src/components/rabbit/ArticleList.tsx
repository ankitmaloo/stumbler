interface ListItem {
  title: string;
  author: string;
  date: string;
}

const listItems: ListItem[] = [
  {
    title: "Gemini's Latest Updates: New Features and Improvements",
    author: "AI NEWS DAILY",
    date: "10.16.25"
  },
  {
    title: "Weekly AI Digest: Gemini in the Enterprise",
    author: "ENTERPRISE TECH",
    date: "10.12.25"
  },
  {
    title: "Best Practices: Optimizing Gemini for Large Scale Applications",
    author: "CLOUD ARCHITECTS",
    date: "10.18.25"
  }
];

const ArticleList = () => {
  return (
    <div className="rounded-lg p-6 cursor-pointer">
      <div className="space-y-4">
        {listItems.map((item, index) => (
          <div key={index} className="border-l-4 border-gray-900 pl-4">
            <div>
              <h4 className="font-extrabold text-base mb-1 font-serif tracking-tight">{item.title}</h4>
              <p className="text-red-600 text-xs font-bold">{item.author} — {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
