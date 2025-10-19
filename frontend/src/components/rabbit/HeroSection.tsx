const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-lg overflow-hidden shadow-2xl relative h-full min-h-[600px]">
      <img 
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop" 
        alt="AI Technology" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 font-serif leading-tight tracking-tight">
          WELCOME TO<br />GEMINI 3.0 PRO
        </h1>
        <p className="text-white/90 text-sm md:text-base mb-4 max-w-2xl mx-auto">
          Discover the power of advanced AI reasoning, multimodal understanding, and breakthrough performance. 
          From code generation to creative writing, Gemini redefines what's possible.
        </p>
        <div className="flex items-center justify-center space-x-3 text-sm text-white/80 mb-2">
          <span>44 comments</span>
          <span>·</span>
          <span>132 likes</span>
        </div>
        <p className="text-white font-bold text-xs">AI Innovation Hub — 10.18.25</p>
      </div>
    </div>
  );
};

export default HeroSection;
