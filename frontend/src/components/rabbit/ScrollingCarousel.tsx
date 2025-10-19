interface CarouselItem {
  title: string;
  author: string;
  date: string;
  image: string;
}

const carouselItems: CarouselItem[] = [
  {
    title: "Gemini's Top Features: What Developers Love Most",
    author: "DEV WEEKLY",
    date: "10.17.25",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop"
  },
  {
    title: "Building Chat Apps with Gemini API",
    author: "CODE TUTORIALS",
    date: "10.17.25",
    image: "https://images.unsplash.com/photo-1676277791608-ac54525aa07e?w=300&h=200&fit=crop"
  },
  {
    title: "The Ethics of AI: Gemini's Safety Measures",
    author: "AI ETHICS LAB",
    date: "10.17.25",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=300&h=200&fit=crop"
  },
  {
    title: "Gemini vs Claude: Performance Benchmarks",
    author: "AI COMPARE",
    date: "10.16.25",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=200&fit=crop"
  },
  {
    title: "Vision AI with Gemini: Real Applications",
    author: "COMPUTER VISION",
    date: "10.16.25",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
  }
];

import ScrollButton from './ScrollButton';

const ScrollingCarousel = () => {
  return (
    <div className="relative mb-8 bg-gray-100 border-t-2 border-b-2 border-black">
      <div className="flex items-center">
        {/* MORE Button */}
        <div className="flex-shrink-0 pl-6">
          <ScrollButton />
        </div>
        
        {/* Vertical Divider */}
        <div className="h-32 w-0.5 bg-black mx-6"></div>
        
        {/* Article Items */}
        <div className="flex flex-1 items-center justify-between py-6 px-4">
          {carouselItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center max-w-[200px] px-2 cursor-pointer hover:opacity-80 transition-opacity">
                <h4 className="font-serif font-bold text-base mb-1 leading-tight">{item.title}</h4>
                <p className="text-red-600 text-[10px] font-bold tracking-wide">{item.author} — {item.date}</p>
              </div>
              {index < carouselItems.length - 1 && <div className="h-20 w-0.5 bg-black mx-4"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingCarousel;
