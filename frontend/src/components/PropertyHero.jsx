export default function PropertyHero({ property, onShowAllPhotos }) {
  if (!property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get images from property and rooms
  const getImageUrl = (imagePath) => {
    const filename = imagePath.split('/').pop();
    return `/src/assets/${filename}`;
  };

  // Collect all images
  const allImages = [
    ...(property.images || []),
    ...(property.rooms?.flatMap(room => room.images) || [])
  ];

  const displayImages = allImages.slice(0, 5);

  return (
    <section className="bg-white">
      {/* Title Section */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {property.address}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
          <span className="text-gray-700">{property.city}, {property.state}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-700">{property.bedrooms} bedroom</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-700">{property.bathrooms} bath</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-700">{property.sqft} sq ft</span>
        </div>
      </div>

      {/* Image Grid - Airbnb Style */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="relative rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[400px]">
            {/* Main Large Image */}
            <div className="md:col-span-2 md:row-span-2 relative">
              {displayImages[0] && (
                <img
                  src={getImageUrl(displayImages[0])}
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Smaller Images */}
            {displayImages.slice(1, 5).map((image, index) => (
              <div key={index} className="hidden md:block relative">
                <img
                  src={getImageUrl(image)}
                  alt={`${property.address} - ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Show All Photos Button */}
            {allImages.length > 5 && (
              <button
                onClick={onShowAllPhotos}
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white hover:bg-gray-100 text-gray-900 text-xs md:text-sm font-medium py-1.5 px-3 md:py-2 md:px-4 rounded-lg border border-gray-900 transition-colors flex items-center gap-1.5 md:gap-2 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="hidden sm:inline">Show all photos</span>
                <span className="sm:hidden">Photos</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
