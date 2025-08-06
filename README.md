<div align="center">

# 🌳 DevTree Clone - Professional Social Media Aggregator

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

### _A modern, full-stack social media aggregation platform built with cutting-edge technologies_

[Live Demo](#) | [Documentation](#features) | [API Reference](#api-endpoints)

</div>

---

## 🚀 **Project Overview**

DevTree Clone is a sophisticated full-stack web application that allows users to consolidate all their social media profiles into a single, shareable link. Built with modern technologies and following industry best practices, this platform demonstrates advanced software architecture, secure authentication, and responsive design.

### 🎯 **Key Highlights**

- **Full-Stack Architecture**: Separate frontend and backend with clear separation of concerns
- **Type-Safe Development**: End-to-end TypeScript implementation
- **Modern UI/UX**: Responsive design with drag-and-drop functionality
- **Secure Authentication**: JWT-based auth with Google OAuth integration
- **Real-time Updates**: Optimistic UI updates with Zustand state management
- **Cloud Integration**: Image upload with Cloudinary
- **Database ORM**: Prisma with PostgreSQL for type-safe database operations

---

## 🏗️ **Architecture & Technology Stack**

<div align="center">

### **Frontend Architecture**

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

### **Backend Architecture**

![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red?style=flat-square&logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=flat-square&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)

</div>

### **📁 Project Structure**

```
devtree-clon/
├── frontend-devtree-clon/          # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/                    # App Router (Next.js 13+)
│   │   ├── components/             # Reusable UI Components
│   │   ├── store/                  # Zustand State Management
│   │   ├── action/                 # Server Actions
│   │   ├── interfaces/             # TypeScript Interfaces
│   │   └── utils/                  # Utility Functions
│   └── package.json
└── backend-devtree-clon/           # NestJS Backend
    ├── src/
    │   ├── modules/                # Feature Modules
    │   │   ├── auth/               # Authentication Module
    │   │   ├── users/              # User Management
    │   │   └── social-links/       # Social Links Module
    │   ├── prisma/                 # Database Layer
    │   └── cloudinary/             # Cloud Storage
    └── package.json
```

---

## ✨ **Features**

### 🔐 **Authentication & Security**

- **JWT Authentication**: Secure token-based authentication
- **Google OAuth Integration**: One-click social login
- **Protected Routes**: Role-based access control
- **Password Encryption**: bcrypt hashing for user passwords

### 👤 **User Management**

- **User Registration**: Complete onboarding flow
- **Profile Management**: Edit name, description, and profile image
- **Slug-based URLs**: Custom shareable profile links
- **Image Upload**: Cloudinary integration for profile pictures

### 🔗 **Social Links Management**

- **Multiple Platforms**: Support for major social networks
- **Drag & Drop Reordering**: Intuitive link organization
- **Real-time Validation**: URL validation and availability checking
- **Toggle Visibility**: Show/hide specific social links
- **Custom Positioning**: Manual arrangement of social links

### 🎨 **User Interface**

- **Responsive Design**: Mobile-first approach
- **Modern UI Components**: Clean, professional interface
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: WCAG 2.1 compliant design
- **Dark/Light Theme**: System preference detection

### 🛠️ **Developer Experience**

- **Type Safety**: Full TypeScript implementation
- **Code Quality**: ESLint and Prettier configuration
- **Hot Reload**: Development server with instant updates
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: User feedback during async operations

---

## 🔌 **API Endpoints**

### **Authentication**

```typescript
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
GET    /api/auth/profile           # Get user profile
GET    /api/auth/google            # Google OAuth
GET    /api/auth/google/callback   # OAuth callback
```

### **User Management**

```typescript
GET    /api/users/:slug            # Get user by slug
PATCH  /api/users                  # Update user profile
POST   /api/users/upload-image     # Upload profile image
POST   /api/users/verify-slug      # Check slug availability
```

### **Social Links**

```typescript
GET    /api/social-links           # Get user's social links
POST   /api/social-links           # Create/update social links
```

---

## 🛠️ **Complete Installation & Configuration Guide**

### **Prerequisites**

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Docker & Docker Compose** - [Download here](https://www.docker.com/)
- **Git** - [Download here](https://git-scm.com/)
- **npm** - Comes with Node.js

### **📋 Step-by-Step Setup**

#### **1. Clone the Repository**

```bash
git clone https://github.com/dieguidev/next-nest-devtree-clon.git
cd next-nest-devtree-clon
```

#### **2. Database Setup (Docker + PostgreSQL)**

```bash
# Navigate to backend directory
cd backend-devtree-clon

# Start PostgreSQL database with Docker Compose
docker-compose up -d

# Verify database is running
docker ps
```

#### **3. Backend Configuration**

```bash
# Install dependencies
npm install

# Environment file already exists with correct configuration
# DATABASE_URL="postgresql://postgres:123456@localhost:5432/devtree-clone?schema=public"
```

**Your `.env` file configuration template:**

```env
# Database Configuration (Docker PostgreSQL)
DATABASE_URL="postgresql://postgres:123456@localhost:5432/devtree-clone?schema=public"
DB_USER=postgres
DB_NAME=devtree-clone
DB_PASSWORD=123456

# JWT Configuration - CHANGE THIS!
JWT_SECRET="your-secure-jwt-secret-here"
PORT=3000
FRONTEND_URL="http://localhost:3001"

# Google OAuth - GET YOUR OWN CREDENTIALS!
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"

# Cloudinary - GET YOUR OWN CREDENTIALS!
CLOUDINARY_URL="cloudinary://your-api-key:your-api-secret@your-cloud-name"
```

### **🔧 Required Setup Steps**

#### **Google OAuth Setup (Required for social login)**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
6. Copy your Client ID and Client Secret to `.env`

#### **Cloudinary Setup (Required for image uploads)**

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from dashboard
3. Add to `.env` file in the format shown above

**Setup Database and Start Backend:**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev
```

#### **4. Frontend Configuration**

```bash
# Navigate to frontend directory (open new terminal)
cd frontend-devtree-clon

# Install dependencies
npm install

# No additional configuration needed - uses default NEXT_PUBLIC_BACKEND_URL
```

**Start Frontend:**

```bash
# Start development server (runs on port 3001)
npm run dev
```

### **🔧 Docker Commands**

#### **Database Management**

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs postgres-db

# Access database directly
docker exec -it backend-devtree-clon-postgres-db-1 psql -U postgres -d devtree-clone
```

#### **Database Management Commands**

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (caution: deletes all data)
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy

# Generate new migration
npx prisma migrate dev --name your-migration-name
```

### **🌐 Access URLs**

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api
- **Prisma Studio**: http://localhost:5555 (when running `npx prisma studio`)
- **PostgreSQL (Docker)**: localhost:5432

### **🔍 Verification Steps**

1. **Docker Database**: Check `docker ps` shows postgres container running
2. **Backend Health**: Visit http://localhost:3000/api
3. **Frontend Loading**: Visit http://localhost:3001
4. **Database Access**: Run `npx prisma studio` to view data

### **⚠️ Common Issues & Solutions**

#### **Database Connection Issues**

```bash
# Check if Docker is running
docker --version

# Check if PostgreSQL container is running
docker ps

# Restart database container
docker-compose down && docker-compose up -d

# Check container logs
docker-compose logs postgres-db
```

#### **Port Already in Use**

```bash
# Kill process on port 3000 (backend)
npx kill-port 3000

# Kill process on port 3001 (frontend)
npx kill-port 3001

# Kill process on port 5432 (postgres)
npx kill-port 5432
```

#### **Prisma Client Issues**

```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (caution: deletes all data)
npx prisma migrate reset

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **🚀 Quick Start Commands**

```bash
# Start everything (run in separate terminals)

# Terminal 1: Database
cd backend-devtree-clon
docker-compose up -d

# Terminal 2: Backend
cd backend-devtree-clon
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev

# Terminal 3: Frontend
cd frontend-devtree-clon
npm install
npm run dev
```

---

## 📊 **Database Schema**

```sql
model User {
  id          String        @id @default(uuid())
  slug        String        @unique
  name        String
  email       String        @unique
  password    String?
  isActive    Boolean       @default(true)
  description String?       @default("")
  image       String?
  socialLinks SocialLink[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model SocialLink {
  id        String   @id @default(uuid())
  name      String
  url       String
  enabled   Boolean  @default(true)
  position  Int
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🏃‍♂️ **Performance & Optimization**

### **Frontend Optimizations**

- **Next.js App Router**: Latest routing system with layouts
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Aggressive caching strategies
- **Bundle Analysis**: Optimized bundle sizes

### **Backend Optimizations**

- **Database Queries**: Optimized Prisma queries with proper relations
- **Caching**: Response caching for frequently accessed data
- **Validation**: Input validation with class-validator
- **Error Handling**: Centralized error handling with proper HTTP status codes

---

## 🔒 **Security Features**

- **Input Validation**: Comprehensive validation on all endpoints
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: Content Security Policy headers
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: API rate limiting for abuse prevention
- **Secure Headers**: Security headers implementation

---

## 🚀 **Deployment**

### **Production Build**

```bash
# Frontend
npm run build
npm run start

# Backend
npm run build
npm run start:prod
```

### **Environment Variables**

```env
# Backend
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"

# Frontend
NEXT_PUBLIC_BACKEND_URL="https://api.yourapp.com"
```

---

## 👨‍💻 **Developer**

<div align="center">

**Built with ❤️ by [Your Name]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dieguidev)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dieguidev)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=web&logoColor=white)](https://yourportfolio.com)

</div>

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
