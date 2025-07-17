# Portfolio Website for Adam Dani Apta Mahendra

## Overview

This is a modern, responsive personal portfolio website built for Adam Dani Apta Mahendra, a leadership-focused Fisheries Product Technology student and organizational development specialist. The application follows a full-stack architecture with React frontend and Express backend, designed to showcase professional experience, skills, and educational background to attract recruiters and potential clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Theme**: Dark/light mode support with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Development**: Hot reload with Vite middleware integration
- **Static Serving**: Express serves built frontend assets in production

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via DATABASE_URL)
- **Connection**: Neon Database serverless driver
- **Schema**: Shared TypeScript schema definitions with Zod validation

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scroll navigation and theme toggle
- **Hero Section**: Full-height landing with professional branding
- **About**: Personal summary with location and education details
- **Experience Timeline**: Interactive timeline with modal details for each role
- **Skills**: Categorized skill display with icons and descriptions
- **Education**: Academic background with institutions and achievements
- **Contact**: Functional contact form with validation
- **Footer**: Social links and CV download functionality

### Backend Components
- **Routes**: CV data API endpoint serving structured JSON
- **Storage**: In-memory storage implementation with user management interface
- **Middleware**: Request logging, JSON parsing, and error handling
- **Static Assets**: Serves built frontend files in production

### UI/UX Features
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Animations**: Intersection Observer-based scroll animations with staggered entrances
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML and ARIA labels
- **Performance**: Hardware-accelerated animations and optimized bundle size
- **Typography**: Inter font family with clear hierarchy and optimal readability

## Data Flow

### Content Management
1. CV data is stored in `client/src/data/cv.json` for easy updates
2. Backend serves CV data via `/api/cv` endpoint
3. Frontend components consume data through centralized imports
4. Real-time updates possible through API modifications

### User Interactions
1. Navigation triggers smooth scrolling to sections
2. Experience timeline items open modal overlays with detailed information
3. Contact form validates input and displays success/error messages
4. Theme toggle updates system preference and persists to localStorage

### Animation System
1. Intersection Observer detects when sections enter viewport
2. CSS transitions trigger fade-in and slide-up animations
3. Staggered animations create sequential entrance effects
4. Hover interactions provide immediate visual feedback

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **Styling**: Tailwind CSS, Radix UI components, Class Variance Authority
- **Development**: Vite, TypeScript, ESBuild
- **Database**: Drizzle ORM, Neon Database, PostgreSQL
- **Utilities**: Date-fns, Zod validation, Lucide React icons

### UI Enhancement
- **Animations**: CSS transitions with Intersection Observer
- **Forms**: React Hook Form with Zod resolvers
- **Carousel**: Embla Carousel for potential project showcases
- **Modals**: Custom modal implementation with escape key handling
- **Toasts**: Radix UI toast system for user feedback

## Deployment Strategy

### Build Process
1. **Development**: `npm run dev` starts concurrent frontend and backend servers
2. **Production Build**: `npm run build` creates optimized frontend bundle and backend distribution
3. **Deployment**: `npm start` serves production build with Express server

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Development**: Vite dev server with HMR and error overlay
- **Production**: Express serves static assets from dist/public directory

### Performance Optimizations
- **Code Splitting**: Vite automatically splits code for optimal loading
- **Asset Optimization**: Images and fonts are optimized for web delivery
- **Caching**: Static assets served with appropriate cache headers
- **Bundle Analysis**: Build process includes bundle size analysis

### Deployment Targets
- **Replit**: Configured for Replit deployment with cartographer integration
- **Vercel/Netlify**: Compatible with modern hosting platforms
- **Docker**: Containerizable for cloud deployment
- **Traditional Hosting**: Can be deployed to any Node.js hosting provider