from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class Property(Base):
    """Model representing a property listing."""
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(50), nullable=False)
    zip_code = Column(String(20), nullable=False)
    price = Column(Integer, nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Float, nullable=False)
    sqft = Column(Integer, nullable=False)
    year_built = Column(Integer, nullable=False)
    lot_size = Column(Float, nullable=True)
    description = Column(Text, nullable=False)
    features = Column(JSON, default=list)
    images = Column(JSON, default=list)

    # Relationships
    rooms = relationship("Room", back_populates="property", cascade="all, delete-orphan")
    viewing_requests = relationship("ViewingRequest", back_populates="property", cascade="all, delete-orphan")


class Room(Base):
    """Model representing a room within a property."""
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    name = Column(String(100), nullable=False)
    room_type = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    dimensions = Column(String(50), nullable=True)
    features = Column(JSON, default=list)
    images = Column(JSON, default=list)
    display_order = Column(Integer, default=0)

    # Relationships
    property = relationship("Property", back_populates="rooms")


class ViewingRequest(Base):
    """Model representing a request to view the property."""
    __tablename__ = "viewing_requests"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(30), nullable=False)
    preferred_date = Column(String(20), nullable=False)
    preferred_time = Column(String(20), nullable=True)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20), default="pending")

    # Relationships
    property = relationship("Property", back_populates="viewing_requests")
 