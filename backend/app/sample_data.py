"""
Script to populate the database with sample property data.
"""

from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models import Property, Room


def create_tables():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)


def seed_data():
    """Seed the database with sample property data."""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing = db.query(Property).first()
        if existing:
            print("Database already seeded. Skipping...")
            return
        
        property_data = Property(
            address="Karen Road",
            city="Nairobi",
            state="Nairobi County",
            zip_code="00502",
            price=45000000,
            bedrooms=4,
            bathrooms=3.5,
            sqft=3200,
            year_built=2018,
            lot_size=0.5,
            description="Modern family home with large garden.",
            features=["Garden", "Parking", "Security"],
            images=["/assets/house.jpg"]
        )
        
        db.add(property_data)
        db.flush()  # Get the property ID
        
        rooms_data = [
            {
                "name": "Living Room",
                "room_type": "living",
                "description": "Spacious living area with natural light.",
                "dimensions": "6m x 5m",
                "features": ["Large windows"],
                "floor_plan_coords": [{"x": 120, "y": 200}],
                "images": ["/assets/living-room.jpg"],
                "display_order": 1
            },
            {
                "name": "Master Bedroom",
                "room_type": "bedroom",
                "description": "Large master bedroom with en-suite bathroom.",
                "dimensions": "5m x 4m",
                "features": ["En-suite", "Balcony"],
                "floor_plan_coords": [{"x": 300, "y": 150}],
                "images": ["/assets/bedroom.jpg"],
                "display_order": 2
            }
        ]

        # Create room records
        for room_data in rooms_data:
            room = Room(property_id=property_data.id, **room_data)
            db.add(room)

        db.commit()

        print("Database seeded successfully!")
        print(f"Created property: {property_data.address}")
        print(f"Created {len(rooms_data)} rooms")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    create_tables()
    seed_data()
