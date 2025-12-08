import { useState } from 'react';
import RoomCard from './RoomCard';
import RoomModal from './RoomModal';

export default function RoomGrid({ rooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  if (!rooms || rooms.length === 0) {
    return null;
  }

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Explore the rooms
          </h2>
          <p className="text-gray-500 mt-1">
            {rooms.length} rooms in this property
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onClick={setSelectedRoom}
            />
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </section>
  );
}
