export default function PropertyDescription({ property }) {
  if (!property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="description" className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Host/Property Type Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Apartment in {property.city}
                </h2>
                <p className="text-gray-600 mt-1">
                  {property.bedrooms} bedroom · {property.bathrooms} bath · {property.sqft} sq ft
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>

            {/* Highlights */}
            <div className="py-6 border-b border-gray-200 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">River views</p>
                  <p className="text-sm text-gray-500">Enjoy stunning views of the water from your living room</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Private balcony</p>
                  <p className="text-sm text-gray-500">Step outside to your own outdoor space</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Built in {property.year_built}</p>
                  <p className="text-sm text-gray-500">Well-maintained property with modern updates</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
                {/* Price */}
                <div className="mb-6">
                  <span className="text-2xl font-semibold text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="border border-gray-300 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Bedrooms</p>
                    <p className="text-lg font-semibold text-gray-900">{property.bedrooms}</p>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Bathrooms</p>
                    <p className="text-lg font-semibold text-gray-900">{property.bathrooms}</p>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Size</p>
                    <p className="text-lg font-semibold text-gray-900">{property.sqft}</p>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Year</p>
                    <p className="text-lg font-semibold text-gray-900">{property.year_built}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#request-viewing"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                >
                  Request a viewing
                </a>

                {/* Disclaimer */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  No commitment required
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}