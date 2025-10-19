interface CarouselItem {
  title: string;
  caption: string;
}

interface ScrollingCarouselProps {
  headlines?: CarouselItem[];
}

import ScrollButton from './ScrollButton';

const ScrollingCarousel = ({ headlines }: ScrollingCarouselProps) => {
  if (!headlines || headlines.length === 0) return null;
  const carouselItems = headlines.slice(0, 4);
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
                <h4 className="font-serif font-bold text-base leading-tight">{item.title}</h4>
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
