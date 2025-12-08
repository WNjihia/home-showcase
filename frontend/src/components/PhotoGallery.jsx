import { useState, useEffect } from 'react';

export default function PhotoGallery({ images, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'grid'

  const getImageUrl = (imagePath) => {
    const filename = imagePath.split('/').pop();
    return `/src/assets/${filename}`;
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 md:p-4 bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 md:gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm font-medium hidden sm:inline">Close</span>
        </button>

        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setViewMode('single')}
            className={`p-1.5 md:p-2 rounded-lg transition-colors ${
              viewMode === 'single' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 md:p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'single' ? (
        /* Single Image View */
        <div className="h-full flex items-center justify-center p-2 md:p-4 pt-14 md:pt-16 pb-20 md:pb-24">
          {/* Previous Button */}
          <button
            onClick={goPrev}
            className="absolute left-2 md:left-4 z-10 p-1.5 md:p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Image */}
          <img
            src={getImageUrl(images[currentIndex])}
            alt={`Photo ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />

          {/* Next Button */}
          <button
            onClick={goNext}
            className="absolute right-2 md:right-4 z-10 p-1.5 md:p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        /* Grid View */
        <div className="h-full overflow-y-auto pt-14 md:pt-16 pb-4 px-2 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setViewMode('single');
                }}
                className="aspect-square overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Thumbnail Strip (Single View Only - Hidden on small mobile) */}
      {viewMode === 'single' && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 md:p-4">
          <div className="flex gap-1.5 md:gap-2 overflow-x-auto justify-start md:justify-center pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-md md:rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-white opacity-100'
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
