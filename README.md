# HomeShowCase

An interactive property viewing web application that allows a seller to showcase their home to potential buyers. Built with FastAPI and React.

![Home Showcase](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-green.svg)
![React](https://img.shields.io/badge/react-18+-61DAFB.svg)

---

## Features

- **Property Showcase**: Display property details with an Airbnb-style image grid
- **Interactive Room Explorer**: Browse rooms with detailed information and photo galleries
- **Viewing Request System**: Validated contact form with backend storage
- **Responsive Design**: Mobile-first approach, works on all devices
- **Performance Optimized**: Lazy-loaded images, debounced form submission

---

## Technology Stack

### Development

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Python + FastAPI |
| **Database** | PostgreSQL |
| **API Testing** | Swagger / OpenAPI |
| **State Management** | React state / Context API |
| **Styling** | Tailwind CSS |

### Main Considerations for Production

| Layer | Technology |
|-------|------------|
| **Frontend Hosting** | Vercel / Netlify |
| **Backend Hosting** | AWS ECS |
| **Database** | PostgreSQL (Supabase / AWS RDS) |
| **File Storage** | S3 / Cloudflare R2 |
| **CDN** | CloudFront
| **Monitoring** | Sentry + UptimeRobot / DataDog |
| **Containerization** | Docker + Docker Compose |

#### 1. Scalability
- Horizontal scaling of backend behind a load balancer
- Managed PostgreSQL with read replicas
- Redis caching for API responses

#### 2. Performance
- Serve images via CDN
- Use responsive images and WebP format

#### 3. Security
- Input validation - already handled by Pydantic
- HTTPS enforced, CORS restricted
- Rate limiting for viewing requests
- JWT-based authentication for admin features

#### 4. Reliability & Monitoring
- Health checks and uptime monitoring
- Structured logging and correlation IDs
- Error tracking (Sentry)
- Automated DB backups

#### 5. Developer Experience & Maintainability
- TypeScript for frontend type safety
- Testing: pytest (backend), Vitest (frontend)
- CI/CD: GitHub Actions
- Code quality tools: ESLint, Prettier, Black, Ruff

#### 6. Future Enhancements
- User authentication (Auth0, FastAPI OAuth2)
- Admin dashboard (React Admin or custom panel)
- Email notifications (SendGrid, AWS SES)
- Full-text search (PostgreSQL, Elasticsearch)
- Analytics (PostHog, Plausible)
- Real-time updates (WebSockets)

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### Database Setup
```bash
# Create PostgreSQL database
createdb home_showcase
```

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variable (optional - defaults to localhost)
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/home_showcase"

# Run the server
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

- Swagger UI: http://localhost:8000/docs

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at http://localhost:5173

---

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/property` | Get showcase property |
| GET | `/api/property/full` | Get property with all rooms |
| GET | `/api/rooms` | List all rooms |
| GET | `/api/rooms/{id}` | Get single room |
| POST | `/api/viewing-requests` | Submit viewing request |
| GET | `/api/viewing-requests` | List all requests |

### Example: Submit Viewing Request
```bash
curl -X POST http://localhost:8000/api/viewing-requests \
  -H "Content-Type: application/json" \
  -d '{
    "property_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+31612345678",
    "preferred_date": "2025-01-15",
    "preferred_time": "morning",
    "message": "Looking forward to viewing!"
  }'
```

---

## Production Considerations
