from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional

from .database import get_db
from . import crud, schemas
from .seed import create_tables, seed_data


# Create FastAPI app
app = FastAPI(
    title="HomeShowCase API",
    description="API for showcasing a home to potential buyers",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize database and seed data on startup."""
    create_tables()
    seed_data()


@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "healthy"}


# Get property details
@app.get("/api/property", response_model=schemas.PropertyResponse, tags=["Property"])
async def get_property(db: Session = Depends(get_db)):
    """Get the showcase property details."""
    property_obj = crud.get_default_property(db)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_obj


# Get property with rooms
@app.get("/api/property/full", response_model=schemas.PropertyWithRoomsResponse, tags=["Property"])
async def get_property_with_rooms(db: Session = Depends(get_db)):
    """Get property with all room details included."""
    property_obj = crud.get_default_property(db)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_obj


# List all rooms
@app.get("/api/rooms", response_model=list[schemas.RoomResponse], tags=["Rooms"])
async def get_rooms(
    property_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    """Get all rooms for the property."""
    if property_id is None:
        property_obj = crud.get_default_property(db)
        if not property_obj:
            raise HTTPException(status_code=404, detail="No property found")
        property_id = property_obj.id
    
    return crud.get_rooms_by_property(db, property_id)


# Get single room
@app.get("/api/rooms/{room_id}", response_model=schemas.RoomResponse, tags=["Rooms"])
async def get_room(room_id: int, db: Session = Depends(get_db)):
    """Get details for a specific room."""
    room = crud.get_room(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room


# Post viewing request
@app.post("/api/viewing-requests", response_model=schemas.ViewingRequestResponse, status_code=201, tags=["Viewing Requests"])
async def create_viewing_request(
    request: schemas.ViewingRequestCreate,
    db: Session = Depends(get_db)
):
    """Submit a request to view the property."""
    property_obj = crud.get_property(db, request.property_id)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    
    return crud.create_viewing_request(db, request)


# List all requests
@app.get("/api/viewing-requests", response_model=schemas.ViewingRequestListResponse, tags=["Viewing Requests"])
async def list_viewing_requests(
    property_id: Optional[int] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """List all viewing requests."""
    requests, total = crud.get_viewing_requests(db, property_id, skip, limit)
    return {"requests": requests, "total": total}
