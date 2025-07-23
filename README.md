# Cover Letter Builder

## Setup

```bash
git clone https://github.com/career-desire/cover-letter-builder.git
cd cover-letter-builder
npm install
npm run dev
```

## Build 

```bash
npm run build
```

## Project Structure

/src
│
├── components/        # Cover letter UI components (input fields, templates, preview)
├── context/           # Global context providers (auth, alerts, cover letter data sharing)
├── layout/            # Small UI Components
├── pages/             
├── services/          # API communication and helper functions
├── styles/            
└── utils/             # Utility functions (download, edit, delete, add sections)

## Environment Variables

VITE_SERVER_URL = "http://localhost:5000/api"
VITE_FIREBASE_API_KEY = ""
VITE_FIREBASE_AUTH_DOMAIN = ""
VITE_FIREBASE_PROJECT_ID = ""
VITE_FIREBASE_STORAGE_BUCKET = ""
VITE_FIREBASE_MESSAGE_SENDER_ID = ""
VITE_FIREBASE_APP_ID = ""
VITE_FIREBASE_MEASUREMENT_ID = ""

## API Endpoints 

## Authentication Endpoints

POST /api/auth/validate-user
POST /api/auth/register
POST /api/auth/login 
GET /api/auth/me (Fetch log in user’s information)
POST /api/auth/refresh (Refresh access token if session expired)
POST /api/auth/forgot-password
POST /api/auth/verify-password
POST /api/auth/logout 

## Cover Letter Endpoints

POST /api/cover-letter/view-only/:id (View Shared resume)
POST /api/cover-letter/ (Save new cover letter)
GET /api/cover-letter/ (To get all saved cover letters)
GET /api/cover-letter/:id (To get specific cover letter)
PUT /api/cover-letter/:id (To update specific cover letter)
DELETE /api/cover-letter/:id (To delete specific cover letter)