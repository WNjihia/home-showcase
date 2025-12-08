# HomeShowCase

An interactive property viewing web application that allows sellers to showcase their home to potential buyers through an engaging floor plan interface.

## Installation

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv home-showcase
   source home-showcase/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up PostgreSQL database:
   ```bash
   createdb home_showcase
   ```

5. Create a `.env` file in the backend directory with your database connection:
   ```
   DATABASE_URL=postgresql://username@localhost:5432/home_showcase
   ```
   Replace `username` with your PostgreSQL username. Add `:password` after the username if required.

6. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at http://localhost:8000

7. API documentation is available at:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```