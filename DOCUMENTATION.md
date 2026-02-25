
# 📚 StudyVault — Complete & In-Depth Documentation

**Version:** 1.0.0  
**Author:** Harsh Koundal   
**Project Repository:** [Harsh-Koundal/College-Project](https://github.com/Harsh-Koundal/College-Project)
**Live Link:** [studyvault.com](https://studyvault-eight.vercel.app)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview & Vision](#project-overview--vision)
3. [User Personas & Journeys](#user-personas--journeys)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Backend Deep Dive](#backend-deep-dive)
   - [Server Setup & Configuration](#server-setup--configuration)
   - [API Routes & Endpoints](#api-routes--endpoints)
   - [Authentication System](#authentication-system)
   - [Controllers & Business Logic](#controllers--business-logic)
   - [Middleware](#middleware)
   - [Data Models](#data-models)
7. [Frontend Overview](#frontend-overview)
8. [Database & Data Models](#database--data-models)
9. [Security & Compliance](#security--compliance)
10. [Installation & Setup](#installation--setup)
11. [API Reference](#api-reference)
12. [Future Enhancements](#future-enhancements)

---

## Executive Summary

**StudyVault** is a full-stack, cloud-ready platform that democratizes access to educational resources. Students can upload, share, download, and discover high-quality study materials in a secure, user-friendly environment. Built with **React**, **Node.js**, **MongoDB**, and **Cloudinary**, StudyVault exemplifies modern web development practices with JWT-based authentication, scalable architecture, and comprehensive error handling.

---

## Project Overview & Vision

### Mission
To create an accessible repository of educational resources where students collaborate, share knowledge, and enhance their academic performance without barriers.

### Key Features
- ✅ Upload & share study materials (PDFs, documents, slides)
- ✅ Download high-quality resources with one click
- ✅ Favorites system for personalized collections
- ✅ View & download tracking for analytics
- ✅ Secure user authentication & email verification
- ✅ Responsive design with smooth animations
- ✅ User profiles showcasing contributions

### Core Benefits
| Stakeholder | Benefit |
|-------------|---------|
| **Students** | Easy access to varied resources; community support |
| **Contributors** | Recognition, visibility, peer feedback |
| **Institutions** | Curriculum insights; resource usage analytics |

---

## User Personas & Journeys

### Persona 1: Sarah (Student / Downloader)
- **Goal:** Find quality notes for upcoming exams
- **Journey:**
  1. Discovers StudyVault via search
  2. Browses materials by subject
  3. Downloads and favoritos resources
  4. Returns for updates in specific subjects

### Persona 2: Rohan (Contributor / Uploader)
- **Goal:** Help peers and build a reputation
- **Journey:**
  1. Registers and creates a profile
  2. Uploads well-organized notes with descriptions
  3. Monitors downloads & feedback
  4. Gains recognition in the community

### Persona 3: Admin (Future Enhancement)
- **Goal:** Ensure quality and manage platform
- **Journey:**
  1. Reviews uploaded materials
  2. Moderates user content
  3. Analyzes platform metrics
  4. Manages user accounts

---

## System Architecture

### Microservices-Inspired Design

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (React)                   │
│     Vite, Tailwind CSS, Framer Motion              │
└────────────────┬────────────────────────────────────┘
                 │ HTTP/REST
┌────────────────▼────────────────────────────────────┐
│            API Gateway (Express.js)                 │
│    Port: 5020 (default)                            │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼────┐  ┌───▼────┐  ┌────▼────┐
│ Auth   │  │Profile │  │Material │
│Service │  │Service │  │ Service │
└───┬────┘  └───┬────┘  └────┬────┘
    │           │             │
    └───────────┼─────────────┘
                │
        ┌───────▼────────┐
        │   MongoDB      │
        │   Database     │
        └────────────────┘
        
        ┌──────────────┐
        │  Cloudinary  │
        │  (File CDN)  │
        └──────────────┘
```

### Data Flow

1. **User Interaction** → Frontend captures input
2. **API Request** → Sent to backend with JWT
3. **Authentication** → `authMiddleware` validates token
4. **Route Handler** → Appropriate controller processes request
5. **Database Operation** → MongoDB stores/retrieves data
6. **File Handling** → Multer + Cloudinary for uploads
7. **Response** → JSON sent back to frontend
8. **UI Update** → Frontend updates with new data

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React.js | Latest | Interactive UI |
| | Vite | ^4.x | Fast bundler & dev server |
| | Tailwind CSS | ^3.x | Utility-first CSS |
| | Framer Motion | Latest | Smooth animations |
| | Axios | ^1.x | HTTP client |
| | React Router | ^6.x | Routing |
| | Lucide Icons | Latest | Icon library |
| **Backend** | Node.js | ^18.x | Runtime |
| | Express.js | ^5.1.0 | Web framework |
| | Mongoose | ^8.x | ODM for MongoDB |
| | JWT | ^9.x | Authentication |
| | Bcryptjs | ^3.x | Password hashing |
| | Multer | ^2.x | File upload handling |
| **Database** | MongoDB | ^6.x | NoSQL database |
| **Cloud** | Cloudinary | Latest | File storage & CDN |
| **Email** | Nodemailer | ^7.x | Email sending |
| | SendGrid | ^5.x | Email service |

---

## Backend Deep Dive

### Server Setup & Configuration

#### **Back-end/server.js**

```javascript
// Initializes Express app with:
// 1. Environment variable loading (.env)
// 2. CORS setup with whitelist
// 3. MongoDB connection
// 4. Middleware registration (JSON, urlencoded)
// 5. Route registration
// 6. Health check endpoint
```

**Key Configuration:**
- **PORT:** 5020 (default) or from env
- **MONGODB_URI:** Connection string (required)
- **CORS Origins:**
  - `https://studyvault-eight.vercel.app`
  - `https://studyvault.com`
  - `http://localhost:5173` (dev)
  - `https://api-studyvault.onrender.com`

### API Routes & Endpoints

#### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/signin` | User login | ✅ |
| `POST` | `/signup` | User registration | ✅ |
| `GET` | `/verify/:token` | Email verification | ✅ |

#### Profile Routes (`/api/profile`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/` | Fetch user profile | ✅ |
| `PUT` | `/` | Update profile | ✅ |
| `DELETE` | `/` | Delete profile & user | ✅ |

#### Material Routes (`/api/materials`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/` | List all materials | ✅ |
| `GET` | `/popular` | Top 10 by downloads | ✅ |
| `GET` | `/favorites` | User's favorites | ✅ |
| `POST` | `/uploads` | Upload material | ✅ |
| `GET` | `/my-uploads` | User's uploads | ✅ |
| `GET` | `/:id` | Material details (views +1) | ✅ |
| `PUT` | `/favorite/:id` | Toggle favorite | ✅ |
| `PUT` | `/download/:id` | Update download count | ✅ |
| `GET` | `/file/:id` | Download file | ✅ |

### Authentication System

#### Sign-In Flow (`signin`)
1. Validate email & password
2. Query user from DB
3. Compare hashed password using bcrypt
4. Check email verification status
5. Generate JWT token (expires in 7 days)
6. Return token + user info

```javascript
// Token Payload:
{
  id: user._id,
  email: user.email,
  role: user.role,
  iat: <issued_at>,
  exp: <expiration>
}
```

#### Sign-Up Flow (`signup`)
1. Check if user already exists
2. If exists & not verified: resend verification email
3. If exists & verified: reject with "User already exists"
4. Hash password with salt round 10
5. Create User & Profile documents
6. Generate verification token (expires in 1 hour)
7. Send verification email (via Nodemailer)
8. Return success message

#### Email Verification (`verifyEmail`)
1. Find verification token
2. If not found: redirect to `/verify-email/failed`
3. Mark user as verified
4. Delete token
5. Redirect to `/verify-email/success`

### Controllers & Business Logic

#### **authController.js** - Authentication Logic

**signin(req, res)**
- Validates credentials
- Returns JWT token on success
- Ensures email verification

**signup(req, res)**
- Registers new user
- Creates profile & sends verification email
- Handles duplicate emails

**verifyEmail(req, res)**
- Activates user account
- Manages token lifecycle

#### **profileController.js** - User Profile Management

**getProfile(req, res)**
- Fetches authenticated user's profile
- Returns all profile fields

**updateProfile(req, res)**
- Updates: fullName, stream, contactNumber, address, about, github
- Updates `updatedAt` timestamp
- Returns updated profile

**deleteProfile(req, res)**
- Deletes profile & associated user
- Cascading delete operation

#### **materialController.js** - Study Material Management

**uploadMaterials(req, res)**
- Accepts: title, subject, description, file
- File uploaded to Cloudinary via Multer
- Creates StudyMaterial document
- Populates author info
- Returns created material

**getAllMaterials(req, res)**
- Lists all study materials
- Populates author names

**getMaterialById(req, res)**
- Fetches single material
- Increments view count
- Returns material with author info

**getPopularMaterials(req, res)**
- Sorts by downloads
- Returns top 10 materials

**getMyUploads(req, res)**
- Returns materials uploaded by current user

**toggleFavorite(req, res)**
- Adds/removes user from favorites array
- Validates material ID
- Returns updated favorites list

**getFavorites(req, res)**
- Lists all materials favorited by user

**updateDownloadCount(req, res)**
- Increments download counter
- Updates material document

**downloadMaterialFile(req, res)**
- If Cloudinary URL: redirects to file
- If local file: serves from server

### Middleware

#### **auth.js** - JWT Authentication Middleware

```javascript
export const authMiddleware = async (req, res, next) => {
  // 1. Extracts JWT from Authorization header
  // 2. Verifies token signature
  // 3. Decodes payload
  // 4. Fetches full user from DB
  // 5. Attaches user to req object
  // 6. Calls next() or returns 401 error
}
```

**Usage:**
```javascript
router.get('/protected', authMiddleware, controller)
```

#### **upload.js** - File Upload Middleware

```javascript
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "studyvault_materials",
    resource_type: "raw",
    allowed_formats: ["pdf", "jpg", "docx", "pptx"],
    public_id: file.originalname.split(".")[0]
  }
})

const upload = multer({ storage })
```

**Usage:**
```javascript
router.post('/upload', upload.single('file'), uploadHandler)
```

---

## Data Models

### User Schema
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  verified: Boolean (default: true),
  stream: String (optional),
  address: String (optional),
  contactNumber: String (optional),
  github: String (optional),
  about: String (optional),
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

**Methods:**
- `matchPassword(enteredPassword)` - Compares hashed password

### Profile Schema
```javascript
{
  userId: ObjectId (ref: User, unique),
  fullName: String (required),
  email: String (required, unique),
  password: String (required),
  stream: String (default: ''),
  contactNumber: String (default: ''),
  address: String (default: ''),
  about: String (max 500 chars),
  github: String (default: ''),
  createdAt: Date,
  updatedAt: Date (auto-updated on save)
}
```

### StudyMaterial Schema
```javascript
{
  title: String (required),
  subject: String (required),
  description: String (optional),
  author: ObjectId (ref: User),
  date: Date (default: now),
  downloads: Number (default: 0, for ranking),
  views: Number (default: 0, for tracking),
  fileUrl: String (Cloudinary URL),
  favorites: [ObjectId] (array of User refs),
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

### VerificationToken Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  token: String (random 64-char hex),
  createdAt: Date (TTL: 1 hour via MongoDB expiry)
}
```

**MongoDB TTL:** Tokens auto-delete after 3600 seconds

---

## Frontend Overview

### Pages & Components

#### Pages (`Front-end/src/pages/`)

| Page | Purpose | Features |
|------|---------|----------|
| **Home.jsx** | Landing page | THREE.js animated background, feature showcase, CTA buttons |
| **Login.jsx** | Auth page | Login/Register toggle, form validation, toast notifications |
| **Dashboard.jsx** | Main hub | Material feed, filters, search, stats, tabs (browse/my-uploads) |
| **Upload.jsx** | Material submission | Drag-drop upload, form fields, Cloudinary integration |
| **Profile.jsx** | User profile | Edit mode, stats, profile picture, bio |
| **materialPreview.jsx** | Material detail | Download, favorite toggle, author info, stats |
| **AboutUs.jsx** | Company info | Mission, team, platform stats, animated background |
| **Services.jsx** | Service offerings | Web dev, branding, SEO services, portfolio |
| **Contact.jsx** | Contact form | Email form, location, contact info, social links |

#### Components (`Front-end/src/components/`)

| Component | Purpose |
|-----------|---------|
| **Navbar.jsx** | Header with auth state, navigation links |
| **Footer.jsx** | Footer with links, social media, branding |
| **ScrollTop.js** | Auto-scroll to top on route change |
| **EmailVerifySuccess.jsx** | Success page post-verification |
| **EmailVerifyFailed.jsx** | Failure page for expired tokens |

### Frontend Tech Details

- **State Management:** React hooks (useState, useEffect, useContext)
- **Routing:** React Router v6 with nested routes
- **HTTP Client:** Axios with Bearer token authentication
- **Animations:** Framer Motion for page transitions, card hovers
- **Styling:** Tailwind CSS with custom gradients & transitions
- **3D Graphics:** Three.js for animated backgrounds on landing pages

---

## Security & Compliance

### Authentication & Authorization

1. **JWT Strategy:**
   - Token issued on login (7-day expiry)
   - Verified on every protected route
   - Decoded to extract user ID & email

2. **Password Security:**
   - Bcryptjs with salt round 10
   - Passwords never sent in plaintext
   - Never stored in localStorage

3. **Email Verification:**
   - Random 64-char hex tokens
   - 1-hour expiry via MongoDB TTL
   - Prevents spam registrations

### CORS Protection

```javascript
const allowedOrigins = [
  'https://studyvault-eight.vercel.app',
  'https://studyvault.com',
  'http://localhost:5173'
]
```

- Whitelist-based origin validation
- Credentials allowed for cross-origin requests

### Data Protection

- **Files:** Stored securely on Cloudinary (not in DB)
- **Sensitive fields:** Passwords hashed before storage
- **Environment variables:** All secrets in `.env` (never committed)
- **User data:** Profile fields accessible only to authenticated users

### Future Security Enhancements

- [ ] Rate limiting on auth endpoints
- [ ] HTTPS enforcement
- [ ] Content Security Policy (CSP) headers
- [ ] SQL injection prevention (Mongoose mitigates this)
- [ ] XSS protection via React's built-in escaping
- [ ] Admin role-based access control (RBAC)

---

## Installation & Setup

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas URI)
- **Cloudinary** account (free tier available)
- **npm** or **yarn**

### Backend Setup

```bash
cd Back-end

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5020
MONGODB_URI=mongodb://localhost:27017/studyvault
JWT_SECRET=your_super_secret_key_here
BACKEND_URL=http://localhost:5020
FRONTEND_URL=http://localhost:5173

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email service (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EOF

# Start development server
npm run dev
# Server runs on http://localhost:5020
```

### Frontend Setup

```bash
cd Front-end

# Install dependencies
npm install

# Create .env file
cat > .env.local << EOF
VITE_REACT_APP_BACKEND_BASEURL=http://localhost:5020/api
EOF

# Start development server
npm run dev
# App runs on http://localhost:5173
```

### MongoDB Setup (if local)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or use MongoDB Atlas (cloud):
# 1. Create account at mongodb.com/cloud
# 2. Create cluster
# 3. Get connection string
# 4. Use as MONGODB_URI in .env
```

---

## API Reference

### Authentication Endpoints

#### POST `/api/auth/signin`

**Request:**
```json
{
  "email": "student@example.com",
  "password": "secure_password_123"
}
```

**Response (Success):**
```json
{
  "msg": "Sign in successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - Not Verified):**
```json
{
  "msg": "Please verify your email before signing in"
}
```

---

#### POST `/api/auth/signup`

**Request:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "password": "secure_password_456"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully!"
}
```

**Response (Error - Duplicate):**
```json
{
  "msg": "User already exists"
}
```

---

#### GET `/api/auth/verify/:token`

**Response (Success):**
- Redirects to `{FRONTEND_URL}/verify-email/success`

**Response (Error):**
- Redirects to `{FRONTEND_URL}/verify-email/failed`

---

### Material Endpoints

#### GET `/api/materials`

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Physics Notes - Mechanics",
    "subject": "Physics",
    "description": "Comprehensive notes on mechanics...",
    "author": { "fullName": "Alex Kumar" },
    "downloads": 42,
    "views": 156,
    "fileUrl": "https://res.cloudinary.com/...",
    "createdAt": "2026-02-15T10:30:00Z"
  }
]
```

---

#### POST `/api/materials/uploads` (Authenticated)

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (string, required)
- `subject` (string, required)
- `description` (string, optional)
- `file` (file, required)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Chemistry Practical Report",
  "subject": "Chemistry",
  "author": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Jane Doe"
  },
  "downloads": 0,
  "views": 0,
  "fileUrl": "https://res.cloudinary.com/...",
  "createdAt": "2026-02-17T14:22:00Z"
}
```

---

#### GET `/api/materials/:id` (Authenticated)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Physics Notes",
  "views": 157,  // incremented by 1
  ...
}
```

---

#### PUT `/api/materials/favorite/:id` (Authenticated)

**Response (Added to favorites):**
```json
[
  "507f1f77bcf86cd799439011",
  "507f1f77bcf86cd799439015"
]
```

---

### Profile Endpoints

#### GET `/api/profile` (Authenticated)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "stream": "Computer Science",
  "contactNumber": "+1-555-1234",
  "address": "123 Main St",
  "about": "Passionate learner...",
  "github": "https://github.com/johndoe"
}
```

---

#### PUT `/api/profile` (Authenticated)

**Request:**
```json
{
  "fullName": "John Updated",
  "about": "Updated bio...",
  "contactNumber": "+1-555-5678"
}
```

**Response:**
```json
{
  "msg": "Profile updated successfully",
  "profile": { ... }
}
```

---

#### DELETE `/api/profile` (Authenticated)

**Response:**
```json
{
  "msg": "Profile and user deleted successfully"
}
```

---

## Future Enhancements

### Phase 2: Platform Expansion
- [ ] **Admin Dashboard**
  - Moderation queue for materials
  - User management & analytics
  - Content flagging system

- **Search & Filters**
  - Full-text search via MongoDB Atlas
  - Advanced filters (semester, level, difficulty)
  - Sort by downloads/views/recent

- **User Engagement**
  - Comments & ratings system
  - User badges & achievements
  - Follow/subscription system

### Phase 3: Social & AI
- [ ] **Social Features**
  - User messaging
  - Discussion forums
  - Collaborative notes

- **AI Integration**
  - Material recommendations
  - Smart content tagging
  - Plagiarism detection

### Phase 4: Mobile & Scale
- [ ] **Mobile App** (React Native)
- **Offline Download** capability
- **Analytics Dashboard** for platform insights
- **Payment System** (premium features, donations)

---

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Solution: Check MONGODB_URI in .env, ensure MongoDB is running
```

**CORS Error**
```
Solution: Add your frontend URL to allowedOrigins in server.js
```

**JWT Token Expired**
```
Solution: Clear localStorage, log in again to get fresh token
```

**File Upload Fails**
```
Solution: Verify Cloudinary credentials, ensure file size < 50MB
```

**Email Not Sending**
```
Solution: Check EMAIL credentials, enable "Less Secure Apps" if Gmail
```

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## License

This project is licensed under the **ISC License**.

---

## Contact & Support

- **Creator:** Harsh Koundal
- **Email:** harsh@example.com (placeholder)
- **GitHub:** [Harsh-Koundal](https://github.com/Harsh-Koundal)
- **Issues:** [GitHub Issues](https://github.com/Harsh-Koundal/College-Project/issues)

---

## Glossary

| Term | Definition |
|------|-----------|
| **JWT** | JSON Web Token - stateless auth token |
| **MongoDB** | NoSQL document database |
| **Cloudinary** | Cloud storage & CDN for media files |
| **Multer** | Middleware for handling file uploads |
| **Mongoose** | Object Data Modeling (ODM) for MongoDB |
| **CORS** | Cross-Origin Resource Sharing security policy |
| **TTL** | Time-To-Live - auto-delete expired records |
| **Bcryptjs** | Password hashing library |

---

**Last Updated:** February 17, 2026  
**Documentation Version:** 1.0.0
