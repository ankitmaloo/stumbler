import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 overflow-x-hidden">
      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto p-8 relative">

        {/* Top Section - 3 Column Layout */}
        <div className="grid grid-cols-12 gap-6 mb-8">

          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            {/* Article 1 */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold leading-tight mb-3">
                America at 250: Our Technological Revolution
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  13
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  74
                </span>
              </div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                The Free Press — 10.18.25
              </p>
            </div>

            {/* Article 2 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="w-full h-32 bg-gray-200 mb-4">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" alt="placeholder" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-serif text-2xl font-bold leading-tight mb-3">
                The Girls Who Found God In a Podcast
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  123
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  13
                </span>
              </div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                Kara Adineny — 10.13.25
              </p>
              <div className="mt-2 flex gap-2">
                <span className="text-2xl">🔥</span>
                <span className="text-2xl">🙏</span>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold leading-tight mb-3">
                Second Thought: Victoria's Secret Is So Back
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                Fine Girls the chink eena hints and mud aunet que flatline Diary.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  23
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  74
                </span>
              </div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                Suzy Weiss — 10.14.25
              </p>
            </div>
          </div>

          {/* Center Column - Hero */}
          <div className="col-span-6">
            <div className="bg-white shadow-lg">
              {/* Hero Image with Neon Graphics */}
              <div className="relative w-full h-[400px] bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900 overflow-hidden">
                {/* Background cityscape blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 opacity-90"></div>

                {/* Neon SVG overlays */}
                {/* Rocket */}
                <svg className="absolute top-8 left-8 w-20 h-24" viewBox="0 0 100 120">
                  <path d="M50 10 L65 50 L55 90 L45 90 L35 50 Z" fill="none" stroke="#ff00ff" strokeWidth="3" opacity="0.9"/>
                  <circle cx="50" cy="25" r="8" fill="none" stroke="#00ffff" strokeWidth="2"/>
                  <rect x="47" y="50" width="6" height="12" fill="none" stroke="#ff00ff" strokeWidth="2"/>
                  <path d="M35 90 L30 105 L40 95 M65 90 L70 105 L60 95" stroke="#ff00ff" strokeWidth="2" fill="none"/>
                  <circle cx="50" cy="20" r="3" fill="#00ffff"/>
                </svg>

                {/* Fire emoji with stars */}
                <svg className="absolute top-10 right-20 w-20 h-20" viewBox="0 0 100 100">
                  <text x="50" y="60" fontSize="48" textAnchor="middle">🔥</text>
                </svg>

                <svg className="absolute top-8 right-12 w-8 h-8" viewBox="0 0 100 100">
                  <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" fill="#ffff00"/>
                </svg>

                <svg className="absolute top-16 right-8 w-6 h-6" viewBox="0 0 100 100">
                  <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" fill="#ffff00"/>
                </svg>

                {/* Hashtag */}
                <svg className="absolute top-20 left-28 w-12 h-12" viewBox="0 0 100 100">
                  <path d="M20 35 L80 35 M20 65 L80 65 M35 20 L30 80 M65 20 L60 80" stroke="#00ffff" strokeWidth="3" fill="none"/>
                </svg>

                {/* Question cloud */}
                <svg className="absolute top-8 right-[140px] w-32 h-24" viewBox="0 0 140 100">
                  <ellipse cx="70" cy="50" rx="55" ry="35" fill="white"/>
                  <ellipse cx="45" cy="55" rx="35" ry="30" fill="white"/>
                  <ellipse cx="95" cy="55" rx="30" ry="25" fill="white"/>
                  <text x="70" y="60" fontSize="40" fill="#4a90e2" fontWeight="bold" textAnchor="middle">?</text>
                </svg>

                {/* Photo/Image icon */}
                <svg className="absolute top-32 right-12 w-10 h-10" viewBox="0 0 100 100">
                  <rect x="20" y="30" width="60" height="50" fill="none" stroke="#ff00ff" strokeWidth="2"/>
                  <circle cx="40" cy="50" r="8" fill="none" stroke="#ff00ff" strokeWidth="2"/>
                  <path d="M50 65 L70 50 L80 60 L80 80 L20 80 L20 75" stroke="#ff00ff" strokeWidth="2" fill="none"/>
                </svg>

                {/* Microphone icon */}
                <svg className="absolute bottom-[120px] left-12 w-16 h-16" viewBox="0 0 100 100">
                  <rect x="40" y="15" width="20" height="35" rx="10" fill="none" stroke="#00ffff" strokeWidth="3"/>
                  <path d="M28 48 Q28 68 50 68 Q72 68 72 48" fill="none" stroke="#00ffff" strokeWidth="3"/>
                  <line x1="50" y1="68" x2="50" y2="85" stroke="#00ffff" strokeWidth="3"/>
                  <line x1="38" y1="85" x2="62" y2="85" stroke="#00ffff" strokeWidth="3"/>
                  <circle cx="45" cy="30" r="2" fill="#00ffff"/>
                  <circle cx="55" cy="30" r="2" fill="#00ffff"/>
                </svg>

                {/* Light bulb with rays */}
                <svg className="absolute bottom-[80px] left-28 w-20 h-20" viewBox="0 0 100 100">
                  <path d="M35 45 L40 50 M65 45 L60 50 M50 25 L50 30 M70 35 L65 38 M30 35 L35 38" stroke="#ffff00" strokeWidth="2"/>
                  <circle cx="50" cy="45" r="12" fill="none" stroke="#ffff00" strokeWidth="3"/>
                  <path d="M42 57 L42 68 L58 68 L58 57" fill="none" stroke="#ffff00" strokeWidth="2"/>
                  <line x1="42" y1="68" x2="58" y2="68" stroke="#ffff00" strokeWidth="3"/>
                  <path d="M45 68 L45 72 L55 72 L55 68" fill="none" stroke="#ffff00" strokeWidth="2"/>
                </svg>

                {/* Bridge */}
                <svg className="absolute bottom-12 right-12 w-40 h-24" viewBox="0 0 180 100">
                  <path d="M10 70 L10 75 M170 70 L170 75" stroke="#ff00ff" strokeWidth="3"/>
                  <path d="M10 70 Q90 20 170 70" fill="none" stroke="#ff00ff" strokeWidth="3"/>
                  <line x1="45" y1="52" x2="45" y2="75" stroke="#ff00ff" strokeWidth="2"/>
                  <line x1="90" y1="35" x2="90" y2="75" stroke="#ff00ff" strokeWidth="2"/>
                  <line x1="135" y1="52" x2="135" y2="75" stroke="#ff00ff" strokeWidth="2"/>
                  <path d="M5 75 L175 75" stroke="#ff00ff" strokeWidth="2"/>
                </svg>

                {/* Circle/Target */}
                <svg className="absolute bottom-[180px] right-28 w-14 h-14" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#00ffff" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="15" fill="none" stroke="#00ffff" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="5" fill="#00ffff"/>
                </svg>

                {/* More icons scattered */}
                <svg className="absolute top-[140px] left-[160px] w-10 h-10" viewBox="0 0 100 100">
                  <rect x="30" y="30" width="40" height="40" fill="none" stroke="#ff00ff" strokeWidth="2" transform="rotate(45 50 50)"/>
                </svg>

                <svg className="absolute bottom-32 right-32 w-10 h-10" viewBox="0 0 100 100">
                  <path d="M20 50 L50 20 L80 50 L50 80 Z" fill="none" stroke="#00ffff" strokeWidth="2"/>
                </svg>

                <svg className="absolute top-[180px] left-[120px] w-8 h-8" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#ff00ff" strokeWidth="2"/>
                </svg>

                {/* Person in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
                    alt="Person"
                    className="h-[110%] object-contain opacity-90"
                  />
                </div>
              </div>

              {/* Title Section */}
              <div className="p-8 text-center">
                <h1 className="font-serif text-5xl font-black uppercase mb-4">
                  Welcome to the<br />Weekend Press
                </h1>
                <p className="text-gray-700 leading-relaxed mb-4 max-w-lg mx-auto">
                  Meet the anphei ureive f err ang D alist in powelits, Soads an Puns to tive trut onsites. di o nallng incoiloang ouitss net non Is oarlds or He Hings....
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    44
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                    132
                  </span>
                </div>
                <p className="font-bold text-sm">The Free Press — 10.18.25</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-6">
            {/* Article 4 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="w-full h-32 bg-gray-200 mb-4">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" alt="placeholder" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-serif text-xl font-bold leading-tight mb-3">
                Mamdani Praises Imam Once on NYPD's Terrorist Watch List
              </h2>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                One day alter dodgeing and deflecting questions alrout Isurnas, New York Grty's likely next mayor straad beside and praised an imam once tied in...
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  6
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  34
                </span>
              </div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                Olivia Rofield — 10.18.25
              </p>
            </div>

            {/* Article 5 - Video */}
            <div className="bg-white p-6 shadow-sm">
              <div className="relative w-full h-32 bg-black mb-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="Video" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
              </div>
              <h2 className="font-serif text-xl font-bold leading-tight mb-3">
                Palmer Luckey and the Future of American Power
              </h2>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Bart Voiss and Pelmot Lackey sit down in B.C. for a multiprog convermaa d'univert: His ta sich anti tatpaa thad van ar int oqis tife.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  12
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  27
                </span>
              </div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                Bari Weiss — 10.18.25
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Up Button */}
        <div className="fixed bottom-8 left-8 z-50">
          <div className="bg-red-600 text-white font-bold uppercase px-6 py-4 shadow-lg flex flex-col items-center cursor-pointer hover:bg-red-700 transition-colors">
            <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a1 1 0 01-1-1V5.414L5.707 8.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 01-1 1z" clipRule="evenodd"/>
            </svg>
            <div className="text-center text-sm leading-tight">
              <div>More</div>
              <div className="mt-1">Scroll Up For</div>
              <div>More!</div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* Card 1 */}
            <div className="flex-shrink-0 w-64 bg-white p-4 shadow-sm">
              <div className="w-full h-32 bg-gray-200 mb-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="placeholder" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-shrink-0 w-64 bg-white p-4 shadow-sm">
              <div className="w-full h-32 bg-gray-200 mb-3">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" alt="placeholder" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-shrink-0 w-64 bg-white p-4 shadow-sm">
              <div className="w-full h-32 bg-gray-200 mb-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="placeholder" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-2">
                Bari Drinks Pouchas Found God in Tos Racs Povere
              </h3>
              <p className="text-red-500 font-semibold text-xs uppercase">
                Andy Bersal — 10.12.25
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex-shrink-0 w-64 bg-white p-4 shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-2">
                Pinecurekeso Mas Lasse Veno Hact om List
              </h3>
              <p className="text-red-500 font-semibold text-xs uppercase">
                The Editors — 10.10.25
              </p>
            </div>

            {/* Card 5 */}
            <div className="flex-shrink-0 w-64 bg-white p-4 shadow-sm">
              <div className="w-full h-32 bg-gray-200 mb-3">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" alt="placeholder" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - 2 Column Layout */}
        <div className="grid grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">
            {/* Video Article */}
            <div className="bg-white shadow-sm flex gap-4">
              <div className="relative w-48 h-48 bg-black flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="Video" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6 flex-1">
                <h2 className="font-serif text-2xl font-bold leading-tight mb-3">
                  What Steven Pinker Taught this Pro Bodybuilder about Genetics
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Dr. Mike Israetel shee the myth of limitlese potential.
                </p>
                <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                  Shilb Brooks — 18.18.25
                </p>
                <div className="mt-3">
                  <svg className="w-16 h-16 inline-block" viewBox="0 0 100 100">
                    <path d="M50 10 Q30 30 30 50 Q30 70 50 90 Q70 70 70 50 Q70 30 50 10" fill="#ff69b4" opacity="0.8"/>
                    <circle cx="35" cy="45" r="8" fill="white"/>
                    <circle cx="65" cy="45" r="8" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* List Articles */}
            <div className="bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v6c0 4.418 3.582 8 8 8s8-3.582 8-8V7l-7-5z"/>
                </svg>
                <div>
                  <h3 className="font-serif text-lg font-bold mb-1">
                    Harmeet Dhillon's Civil Rights Revolution. 117 Mamas Believe Want Peace. Plus . . .
                  </h3>
                  <p className="text-red-500 font-semibold text-xs uppercase">
                    The Free Press — 10.16.25
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v6c0 4.418 3.582 8 8 8s8-3.582 8-8V7l-7-5z"/>
                </svg>
                <div>
                  <h3 className="font-serif text-lg font-bold mb-1">
                    TGIF: Trump Treaty Summit
                  </h3>
                  <p className="text-red-500 font-semibold text-xs uppercase">
                    Nellie Bowles — 10.12.25
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v6c0 4.418 3.582 8 8 8s8-3.582 8-8V7l-7-5z"/>
                </svg>
                <div>
                  <h3 className="font-serif text-lg font-bold mb-1">
                    Things Worth Remembering: How to Save All the Lonely People
                  </h3>
                  <p className="text-red-500 font-semibold text-xs uppercase">
                    Ted Gioas — 10.18.25
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Featured Article with Illustration */}
            <div className="bg-white p-6 shadow-sm flex gap-4">
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-bold leading-tight mb-3">
                  Inside Harmeet Dhillon's Civil Rights Revolution
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Fooun fighting DEI to suing blue states, Harmeet Dhillons is remaking civil rights law in the age of MAGA.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    313
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                    377
                  </span>
                </div>
                <p className="text-red-500 font-semibold text-xs uppercase tracking-wide">
                  Eli Lake — 10.18.25
                </p>
              </div>
              <div className="w-32 h-32 bg-blue-600 flex-shrink-0 rounded-lg p-4">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="20" y="40" width="60" height="45" rx="5" fill="#FFD700"/>
                  <rect x="35" y="35" width="30" height="5" fill="#FFD700"/>
                  <path d="M25 45 L75 45 L70 70 L30 70 Z" fill="#FFA500"/>
                  <circle cx="50" cy="20" r="8" fill="#87CEEB"/>
                  <path d="M42 15 L50 5 L58 15" fill="none" stroke="#87CEEB" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            {/* Two Column Articles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 shadow-sm">
                <h3 className="font-serif text-lg font-bold mb-2 leading-tight">
                  Americans to Celebrate: The Man Who Put the World in a Box
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  How a Kaests Caroolun trucker trying to cootent conate become —wisu a little boost from the...
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                    84
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"/>
                    </svg>
                    71
                  </span>
                </div>
                <p className="text-red-500 font-semibold text-xs uppercase">
                  Mars Lexinson — 10.18.25
                </p>
              </div>

              <div className="bg-white p-4 shadow-sm">
                <h3 className="font-serif text-lg font-bold mb-2 leading-tight">
                  MAGA and Marijuana Might Become Best Pals
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  The presildent doesn't camake or detok—but is open to lsoosening federal cannebist rules. "IT's...
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                    173
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"/>
                    </svg>
                    83
                  </span>
                </div>
                <p className="text-red-500 font-semibold text-xs uppercase">
                  Bari Zakheest and Tanner Nau — 10.15.25
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
