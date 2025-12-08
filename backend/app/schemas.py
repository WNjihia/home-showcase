from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import date, time, datetime
import re


class PropertyBase(BaseModel):
    address: str
    city: str
    state: str
    zip_code: str
    price: int
    bedrooms: int
    bathrooms: float
    sqft: int
    year_built: int
    lot_size: Optional[float] = None
    description: str
    features: List[str] = Field(default_factory=list)
    images: List[str] = Field(default_factory=list)


class PropertyResponse(PropertyBase):
    id: int

    class Config:
        from_attributes = True


class RoomResponse(BaseModel):
    id: int
    property_id: int
    name: str
    room_type: str
    description: str
    dimensions: Optional[str] = None
    features: List[str] = Field(default_factory=list)
    images: List[str] = Field(default_factory=list)
    display_order: int = 0

    class Config:
        from_attributes = True


class PropertyWithRoomsResponse(PropertyResponse):
    rooms: List[RoomResponse] = Field(default_factory=list)


class ViewingRequestCreate(BaseModel):
    """Schema for creating a viewing request."""
    property_id: int
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=30)
    preferred_date: date
    preferred_time: Optional[time] = None
    message: Optional[str] = Field(None, max_length=500)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)\.]", "", v)
        if not re.match(r"^\+?\d{10,15}$", cleaned):
            raise ValueError("Please enter a valid phone number (10–15 digits)")
        return v


class ViewingRequestResponse(BaseModel):
    """Schema returned after saving a viewing request."""
    id: int
    property_id: int
    name: str
    email: EmailStr
    phone: str
    preferred_date: date
    preferred_time: Optional[time]
    message: Optional[str]
    created_at: datetime
    status: str

    class Config:
        from_attributes = True


class ViewingRequestListResponse(BaseModel):
    """Schema for listing viewing requests."""
    requests: List[ViewingRequestResponse]
    total: int
