from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional

from . import models, schemas


def get_property(db: Session, property_id: int) -> Optional[models.Property]:
    """Get a single property by ID."""
    return db.query(models.Property).filter(models.Property.id == property_id).one_or_none()

def get_default_property(db: Session) -> Optional[models.Property]:
    """Get the first/default property (for single-property showcase)."""
    return db.query(models.Property).one_or_none()

def get_room(db: Session, room_id: int) -> Optional[models.Room]:
    """Get a single room by ID."""
    return db.query(models.Room).filter(models.Room.id == room_id).one_or_none()

def get_rooms_by_property(db: Session, property_id: int) -> list[models.Room]:
    """Get all rooms for a property, ordered by display_order."""
    return (
        db.query(models.Room)
        .filter(models.Room.property_id == property_id)
        .order_by(models.Room.display_order)
        .all()
    )


ALLOWED_STATUSES = {"pending", "approved", "rejected"}


def create_viewing_request(
    db: Session, 
    request: schemas.ViewingRequestCreate
) -> models.ViewingRequest:
    """Create a new viewing request."""
    db_request = models.ViewingRequest(
        property_id=request.property_id,
        name=request.name,
        email=request.email,
        phone=request.phone,
        preferred_date=request.preferred_date,
        preferred_time=request.preferred_time,
        message=request.message
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def get_viewing_requests(
    db: Session, 
    property_id: Optional[int] = None,
    skip: int = 0, 
    limit: int = 100
) -> tuple[list[models.ViewingRequest], int]:
    """Get viewing requests with optional property filter."""
    query = db.query(models.ViewingRequest)
    
    if property_id:
        query = query.filter(models.ViewingRequest.property_id == property_id)
    
    total = query.count()
    requests = query.order_by(desc(models.ViewingRequest.created_at)).offset(skip).limit(min(limit, 100)).all()
    
    return requests, total

def get_viewing_request(db: Session, request_id: int) -> Optional[models.ViewingRequest]:
    """Get a single viewing request by ID."""
    return db.query(models.ViewingRequest).filter(models.ViewingRequest.id == request_id).one_or_none()

def update_viewing_request_status(
    db: Session, 
    request_id: int, 
    status: str
) -> Optional[models.ViewingRequest]:
    """Update the status of a viewing request."""

    if status not in ALLOWED_STATUSES:
        raise ValueError("Invalid status")

    db_request = get_viewing_request(db, request_id)
    
    if db_request:
        db_request.status = status
        db.commit()
        db.refresh(db_request)
    return db_request