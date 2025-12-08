import { useState } from 'react';
import { usePropertyWithRooms } from './hooks/useApi';
import PropertyHero from './components/PropertyHero';
import PropertyDescription from './components/PropertyDescription';
import RoomGrid from './components/RoomGrid';
import ViewingForm from './components/ViewingForm';
import PhotoGallery from './components/PhotoGallery';

export default function App() {
  const { data: property, loading, error } = usePropertyWithRooms();
  const [showGallery, setShowGallery] = useState(false);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading property...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 mb-6 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-gray-900 font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // No Property Found
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            No property found
          </h1>
          <p className="text-gray-500 text-sm">
            There are no properties available at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-gray-900 text-lg hidden sm:block">HomeShowcase</span>
            </a>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <a
                href="#description"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block"
              >
                Description
              </a>
              <a
                href="#rooms"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block"
              >
                Rooms
              </a>
              <a
                href="#request-viewing"
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Request viewing
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <PropertyHero property={property} onShowAllPhotos={() => setShowGallery(true)} />
        <PropertyDescription property={property} />
        <div id="rooms">
          <RoomGrid rooms={property.rooms} />
        </div>
        <ViewingForm propertyId={property.id} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} HomeShowcase. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Photo Gallery Modal */}
      {showGallery && (
        <PhotoGallery
          images={[
            ...(property.images || []),
            ...(property.rooms?.flatMap(room => room.images) || [])
          ]}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}