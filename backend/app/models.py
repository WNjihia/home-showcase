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
 