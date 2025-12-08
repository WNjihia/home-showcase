export default function RoomCard({ room, onClick }) {
  const getImageUrl = (imagePath) => {
    const filename = imagePath.split('/').pop();
    return `/src/assets/${filename}`;
  };

  const thumbnail = room.images?.[0] ? getImageUrl(room.images[0]) : null;
  const imageCount = room.images?.length || 0;

  // Get icon based on room type
  const getRoomIcon = (type) => {
    const icons = {
      living: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bedroom: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 12v6a1 1 0 001 1h16a1 1 0 001-1v-6M3 12V8a4 4 0 014-4h10a4 4 0 014 4v4" />
        </svg>
      ),
      kitchen: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21H5a2 2 0 01-2-2v-8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2zM9 9V5a2 2 0 012-2h2a2 2 0 012 2v4" />
        </svg>
      ),
      bathroom: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16h16M4 16l-1-8h18l-1 8M12 4v4m-4 0h8" />
        </svg>
      ),
      hallway: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 3v18M16 3v18M3 12h18" />
        </svg>
      ),
      balcony: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      storage: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    };
    return icons[type] || icons.living;
  };

  return (
    <button
      onClick={() => onClick(room)}
      className="group text-left w-full focus:outline-none"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {getRoomIcon(room.room_type)}
          </div>
        )}

        {/* Image Count Badge */}
        {imageCount > 1 && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium py-1 px-2 rounded-md flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {imageCount}
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{room.name}</h3>
          <span className="text-gray-500">
            {getRoomIcon(room.room_type)}
          </span>
        </div>
        
        {room.dimensions && (
          <p className="text-sm text-gray-500 mt-1">{room.dimensions}</p>
        )}

        {room.features && room.features.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {room.features.slice(0, 2).join(' · ')}
          </p>
        )}
      </div>
    </button>
  );
}
