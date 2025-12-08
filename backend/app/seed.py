from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from .models import Base, Property, Room


# Sample property data to populate the database

def create_tables():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)


def seed_data():
    """Seed the database with sample property and room data."""
    db = SessionLocal()

    try:
        # Check if data already exists
        existing_property = db.query(Property).first()
        if existing_property:
            return

        # Create sample property
        property_data = Property(
            address="Nijlanstate 54",
            city="Leeuwarden",
            state="Friesland",
            zip_code="8934 AH",
            price=195000,
            bedrooms=1,
            bathrooms=1,
            sqft=753,
            year_built=1975,
            lot_size=0.0,
            description="Charming apartment with beautiful views over the river and surrounding green spaces. This well-maintained home features a spacious living room with large windows providing abundant natural light, a functional kitchen, comfortable bedroom with built-in wardrobes, and a private balcony perfect for enjoying the scenic views.",
            features=[
                "River views",
                "Private balcony",
                "Built-in wardrobes",
                "Central heating",
                "Elevator access",
                "Storage unit"
            ],
            images=[
                "/src/assets/846_2160.jpg",
                "/src/assets/832_2160.jpg",
                "/src/assets/860_2160.jpg"
            ]
        )

        db.add(property_data)
        db.flush()

        # Create rooms
        rooms = [
            Room(
                property_id=property_data.id,
                name="Living Room",
                room_type="living",
                description="Spacious living room with large panoramic windows offering stunning views of the river and surrounding landscape. Features elegant furnishings, comfortable seating area, and excellent natural light throughout the day.",
                dimensions="3.96m x 7.10m",
                features=[
                    "Panoramic windows",
                    "River views",
                    "Natural light",
                    "Radiator heating"
                ],
                images=[
                    "/src/assets/860_2160.jpg",
                    "/src/assets/861_2160.jpg",
                    "/src/assets/863_2160.jpg",
                    "/src/assets/824_2160.jpg"
                ],
                display_order=1
            ),
            Room(
                property_id=property_data.id,
                name="Bedroom",
                room_type="bedroom",
                description="Comfortable bedroom with built-in floor-to-ceiling wardrobes providing ample storage space. Features access to the balcony and receives plenty of natural light.",
                dimensions="3.03m x 4.94m",
                features=[
                    "Built-in wardrobes",
                    "Balcony access",
                    "Natural light",
                    "Carpet flooring"
                ],
                images=[
                    "/src/assets/864_2160.jpg",
                    "/src/assets/831_2160.jpg",
                    "/src/assets/865_2160.jpg"
                ],
                display_order=2
            ),
            Room(
                property_id=property_data.id,
                name="Kitchen",
                room_type="kitchen",
                description="Functional L-shaped kitchen with cream-colored cabinetry and wooden trim. Includes ample counter space, built-in storage, and all essential appliances.",
                dimensions="2.43m x 1.98m",
                features=[
                    "L-shaped layout",
                    "Built-in cabinets",
                    "Tile backsplash",
                    "Counter space"
                ],
                images=[
                    "/src/assets/825_2160.jpg",
                    "/src/assets/855_2160.jpg"
                ],
                display_order=3
            ),
            Room(
                property_id=property_data.id,
                name="Bathroom",
                room_type="bathroom",
                description="Modern bathroom with corner shower enclosure, vanity with mirror cabinet, and in-unit washing machine. Finished with neutral tiles and practical storage solutions.",
                dimensions="3.03m x 1.98m",
                features=[
                    "Corner shower",
                    "Vanity with mirror",
                    "Washing machine",
                    "Heated towel rail"
                ],
                images=[
                    "/src/assets/826_2160.jpg",
                    "/src/assets/856_2160.jpg"
                ],
                display_order=4
            ),
            Room(
                property_id=property_data.id,
                name="Hallway",
                room_type="hallway",
                description="Entry hallway with coat storage area and access to all rooms. Clean and functional space connecting the living areas.",
                dimensions="1.43m x 1.98m",
                features=[
                    "Coat storage",
                    "Central access"
                ],
                images=[
                    "/src/assets/853_2160.jpg"
                ],
                display_order=5
            ),
            Room(
                property_id=property_data.id,
                name="Balcony",
                room_type="balcony",
                description="Private balcony with beautiful views over the river and green surroundings. Perfect for enjoying morning coffee or evening relaxation.",
                dimensions="3.03m x 1.26m",
                features=[
                    "River views",
                    "Private outdoor space"
                ],
                images=[
                    "/src/assets/866_2160.jpg"
                ],
                display_order=6
            ),
            Room(
                property_id=property_data.id,
                name="Storage",
                room_type="storage",
                description="Built-in storage closet with shelving and utility connections. Houses the electrical panel and provides additional storage space.",
                dimensions="1.5m x 1.0m",
                features=[
                    "Utility connections",
                    "Shelving",
                    "Electrical panel"
                ],
                images=[
                    "/src/assets/873_2160.jpg"
                ],
                display_order=7
            )
        ]

        db.add_all(rooms)
        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()
