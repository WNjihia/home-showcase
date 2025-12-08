import { useState, useEffect } from 'react';

export default function RoomModal({ room, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [room]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!room) return null;

  const getImageUrl = (imagePath) => {
    const filename = imagePath.split('/').pop();
    return `/src/assets/${filename}`;
  };

  const images = room.images || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          
          {hasMultipleImages && (
            <span className="text-sm text-gray-500">
              {currentImageIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full overflow-y-auto pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative mb-8">
              {/* Main Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(images[currentImageIndex])}
                  alt={`${room.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow-md flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow-md flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {hasMultipleImages && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? 'ring-2 ring-gray-900 opacity-100'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${room.name} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Room Info */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{room.name}</h1>
            {room.dimensions && (
              <p className="text-gray-500 mt-1">{room.dimensions}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About this room</h2>
            <p className="text-gray-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Features */}
          {room.features && room.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Room features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 py-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
