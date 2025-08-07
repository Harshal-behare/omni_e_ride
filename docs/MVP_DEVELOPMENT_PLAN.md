# Omni E-Ride MVP Development Plan

## Table of Contents

1. [Overview](#overview)
2. [Current State](#current-state)
3. [Implemented Features](#implemented-features)
4. [Missing / Incomplete Features](#missing--incomplete-features)
5. [MVP Roadmap](#mvp-roadmap)
6. [Technical Implementation Notes](#technical-implementation-notes)
7. [Time & Effort Estimates](#time--effort-estimates)
8. [Risks & Mitigations](#risks--mitigations)

---

## Overview

### Project Summary

The Omni E-Ride platform is an e-commerce solution for electric vehicle rentals and sales, featuring a multi-dashboard system for customers, dealers, and administrators. This document outlines the complete development plan for achieving a Minimum Viable Product (MVP) within 8 weeks.

### MVP Goals

- **Primary Objective**: Launch a functional e-bike rental and sales platform with core e-commerce capabilities
- **Target Users**: Customers (renters/buyers), Dealers (inventory management), and Administrators (platform management)
- **Key Deliverables**: Secure authentication, product catalog, booking system, payment processing, and role-based dashboards

### Document Purpose

This comprehensive plan serves as the single source of truth for:
- Development team members understanding project scope and technical requirements
- Project managers tracking progress and resource allocation
- Stakeholders evaluating timeline and feature prioritization
- Quality assurance teams preparing test strategies

---

## Current State

### Project Status Overview

The Omni E-Ride platform has completed its initial development phase with significant frontend infrastructure in place. The application features a modern tech stack built on Next.js 15, TypeScript, and Tailwind CSS, with a comprehensive component library and responsive design system.

### Completed Milestones

1. **Frontend Architecture**: Fully structured Next.js application with App Router
2. **UI/UX Foundation**: Complete design system with 50+ reusable components
3. **Basic Authentication**: Demo login system with role-based routing
4. **Dashboard Shells**: All three dashboard interfaces (Admin, Dealer, Customer) created
5. **Public Website**: Complete marketing pages and product showcase

### Current Limitations

- **No Backend Integration**: All data is currently mocked
- **No Database**: No persistent data storage implemented
- **No Real Authentication**: Security features are placeholders
- **No Payment Processing**: Checkout flow is UI-only
- **No Email Communications**: Notification system not functional

### Development Environment

- **Repository**: Active Git repository with version control
- **Deployment**: Live on Vercel (frontend only)
- **Documentation**: Basic README and component documentation
- **Testing**: Minimal test coverage (1 test file)

---

## Implemented Features

This section details all currently working capabilities of the Omni E-Ride platform, organized by major system components.

### Core Infrastructure

- **Next.js 15 with App Router**: Modern React framework with App Router fully configured for optimal performance
- **TypeScript Configuration**: Strict mode enabled with 95% TypeScript coverage across the codebase
- **Tailwind CSS + shadcn/ui**: Complete design system with 50+ pre-built UI components
- **Organized Project Structure**: Well-structured file organization with clear separation of concerns
- **Git Version Control**: Active repository with proper version control setup
- **Vercel Deployment**: Live deployment on Vercel hosting platform
- **Responsive Design System**: Mobile-first responsive design implemented throughout the application
- **Comprehensive Component Library**: 50+ reusable UI components created and ready for use

### Public Website

- **Homepage with Hero Section**: Eye-catching hero section with clear call-to-action buttons
- **Featured Models Showcase**: Product showcase section displaying featured e-bike models
- **Customer Testimonials**: Social proof section with customer testimonials
- **Product Catalog**: Complete models listing page with all available e-bikes
- **Dynamic Model Details**: Individual model detail pages with dynamic routing
- **About Company Page**: Comprehensive company information and mission statement
- **Contact Page**: Functional contact forms and company contact information
- **Dealer Locator**: Dealer finder page with map integration (map API pending)
- **Main Navigation**: Responsive navbar with intuitive navigation structure
- **Footer Component**: Complete footer with links, social media, and company information
- **Mobile-Responsive Layout**: Fully responsive design optimized for all device sizes

### Auth & RBAC

- **Multi-role Login System**: Basic multi-role authentication supporting Admin, Dealer, and Customer roles
- **Role-based Access Control**: Routing and access control based on user roles
- **Demo Test Accounts**: Pre-configured demo accounts for all three user roles
- **Protected Route Implementation**: Route guards preventing unauthorized access
- **Basic Session Management**: In-memory session management for authenticated users

### Dashboards

#### Admin Dashboard
- **Dashboard Overview**: Statistics display with key metrics and performance indicators
- **Dealer Management Interface**: Complete CRUD operations for dealer management
- **Product/Model Management**: Interface for managing e-bike models and specifications
- **Order Tracking System**: Comprehensive order tracking and management interface
- **Analytics and Reports**: Basic analytics dashboard with chart integration
- **User Management Interface**: User listing and management capabilities

#### Dealer Dashboard
- **Sales Overview**: Performance metrics and sales statistics display
- **Inventory Management**: Stock control interface for managing e-bike inventory
- **Customer Relationship Management**: Lead tracking and customer management features
- **Order Processing Interface**: Complete order workflow management system
- **Performance Reports**: Sales analytics and performance reporting tools

#### Customer Dashboard
- **Profile Management**: Personal information management and profile editing
- **Order History Tracking**: Complete order history with status tracking
- **Test Ride Booking System**: Interface for scheduling test rides
- **Support Center**: Help section with support resources
- **Wishlist Functionality**: Save favorite models for future reference

### Summary Statistics

The Omni E-Ride platform currently has **41 fully implemented features** representing a strong foundation with:
- Complete frontend infrastructure and UI/UX
- All user-facing dashboards and interfaces
- Basic authentication and role management
- Responsive design across all components

The system is ready for backend integration to replace mock data with real database connections and implement production-ready authentication.

---

## Missing / Incomplete Features

### Overview

This section lists all features currently marked as **In-Progress** or **Pending** in the Omni E-Ride feature matrix. Features are categorized based on their criticality for the Minimum Viable Product (MVP) launch.

### A) Critical for MVP

These features are essential for a functional, secure, and legally compliant e-commerce platform.

#### 1. Database Integration (All Pending)
- **PostgreSQL/MongoDB Setup** - Database integration not implemented
  - *Blocker*: Need to decide between PostgreSQL or MongoDB
  - *Unknown*: Data migration strategy from mock data
  
- **Prisma ORM Setup** - No Prisma schema found
  - *Blocker*: Database choice must be finalized first
  
- **Data Migration Scripts** - Not implemented
  - *Blocker*: Requires database and ORM setup

#### 2. Authentication & Security
- **JWT Implementation** (In-Progress) - Real JWT authentication
  - *Current State*: Supabase setup started in `hooks/useAuth.ts`, `lib/supabase.ts`
  - *Blocker*: Supabase configuration not connected
  - *Unknown*: Token refresh strategy
  
- **Password Hashing** (Pending) - Bcrypt implementation needed
  - *Blocker*: Security critical feature
  
- **Password Reset Flow** (Pending) - Not implemented
  - *Blocker*: Requires email system
  
- **API Security/Rate Limiting** (Pending) - No security measures
  - *Unknown*: Rate limiting strategy and thresholds
  
- **Data Encryption** (Pending) - Not implemented
  - *Unknown*: Which data needs encryption, key management
  
- **Security Headers** (Pending) - Not configured
  - *Blocker*: CORS, CSP policies needed

#### 3. Payment Integration (All Pending)
- **Payment Gateway Integration** - Stripe/Razorpay not implemented
  - *Blocker*: Payment provider selection and merchant account
  - *Unknown*: PCI compliance requirements
  - *Unknown*: International payment support needs
  
- **Checkout Flow** - Payment process not built
  - *Blocker*: Requires payment gateway

#### 4. Email System (All Pending)
- **Email Service Integration** - No SendGrid/Mailgun configured
  - *Blocker*: Email provider API keys needed
  - *Unknown*: Email sending limits and costs
  
- **Email Templates** - Template engine not implemented
  - *Blocker*: Design approval needed
  
- **Email Notifications** - Alert system not built
  - *Blocker*: Requires email service

#### 5. Essential UI/UX (In-Progress)
- **Loading States/Skeletons** - Partial implementation
  - *Current State*: Components exist but not consistently used
  
- **Error Boundaries** - Basic error pages only
  - *Blocker*: Need comprehensive error handling strategy
  
- **Toast Notifications** - Component exists but not integrated
  - *Blocker*: Need to implement toast provider

#### 6. Search & Filtering (All Pending)
- **Product Search** - Not implemented
  - *Blocker*: Search algorithm/service selection
  - *Unknown*: Full-text search requirements
  
- **Advanced Filters** - Not implemented
  - *Blocker*: Filter criteria definition
  
- **Sorting Options** - Not implemented
  
- **Pagination** - Component exists but not used
  - *Blocker*: Performance issues with large datasets

#### 7. Maps Integration (Pending)
- **Google Maps Integration** - Component exists but needs API
  - *Blocker*: Google Maps API key required
  - *Unknown*: Usage limits and costs
  
- **Location Services** - Geolocation not implemented
  - *Unknown*: Privacy policy implications

#### 8. DevOps & Deployment
- **CI/CD Pipeline** (In-Progress) - Basic Vercel integration
  - *Blocker*: Need proper staging/production environments
  
- **Environment Variables** (In-Progress) - Partial setup
  - *Blocker*: Secure secrets management needed
  
- **Monitoring/Error Tracking** (Pending) - Not implemented
  - *Unknown*: Sentry vs other solutions

#### 9. Testing (All Pending)
- **Unit Tests** - Only 1 test file exists
  - *Blocker*: Testing framework setup
  
- **Integration Tests** - Not implemented
  
- **E2E Tests** - Not implemented
  - *Unknown*: Playwright vs Cypress decision

### B) Nice-to-have Post-MVP

These features enhance the platform but aren't critical for initial launch.

#### 1. Advanced UI/UX
- **Modal Dialogs/Confirmations** (In-Progress) - Partial implementation
  
- **Advanced Animations** (Pending) - Not implemented
  - *Unknown*: Performance impact on mobile

#### 2. Social Features (All Pending)
- **Social Login (OAuth)** - Not implemented
  - *Unknown*: Which providers (Google, Facebook, etc.)
  
- **Social Sharing** - Basic component exists
  - *Blocker*: Open Graph meta tags needed

#### 3. Communication Features (All Pending)
- **SMS Notifications** - Twilio not integrated
  - *Unknown*: SMS costs and international support
  
- **Real-time Chat** - Not implemented
  - *Unknown*: WebSocket infrastructure needs
  
- **Push Notifications** - Web Push not implemented
  - *Unknown*: Browser compatibility, user permissions

#### 4. Analytics (All Pending)
- **Google Analytics** - Not integrated
  - *Blocker*: Privacy policy updates needed
  
- **Performance Monitoring** - Not implemented

#### 5. Advanced Features (All Pending)
- **Multi-language Support (i18n)** - Not implemented
  - *Unknown*: Target languages and regions
  
- **SEO Optimization** - Basic meta tags only
  - *Blocker*: Sitemap, robots.txt needed
  
- **PWA Features** - Not implemented
  - *Unknown*: Offline strategy
  
- **Offline Support** - Not implemented

#### 6. Mobile App (All Pending)
- **React Native Development** - Not started
  - *Unknown*: Native vs hybrid approach
  
- **App Store Deployment** - Not applicable yet

#### 7. Performance Optimization (All Pending)
- **Image Optimization/CDN** - Not implemented
  - *Unknown*: CDN provider selection
  
- **Advanced Code Splitting** - Basic Next.js only
  
- **Caching Strategy** - Not implemented

#### 8. Documentation (Mostly Pending)
- **API Documentation** - Not created
  
- **User Guide** - Basic README only
  
- **Developer Guide** (In-Progress) - Good internal docs exist

### Summary Statistics

#### In-Progress Features (11 total)
- Authentication: 1
- UI/UX: 4
- DevOps: 2
- Documentation: 1
- **Critical for MVP**: 7
- **Nice-to-have**: 4

#### Pending Features (41 total)
- **Critical for MVP**: 24
- **Nice-to-have**: 17

#### Major Blockers
1. **Database Selection & Setup** - Blocks all data persistence
2. **Payment Provider Account** - Blocks revenue generation
3. **Email Service API Keys** - Blocks user communications
4. **Real Authentication** - Security risk without it
5. **Environment Secrets Management** - Blocks secure deployment

#### Key Unknowns
1. **Payment Processing**: International support, PCI compliance
2. **Push Notifications**: Implementation complexity, user adoption
3. **Real-time Features**: Infrastructure requirements
4. **Mobile Strategy**: Native vs PWA approach
5. **Search Implementation**: Build vs buy decision
6. **Monitoring Costs**: APM tool selection and pricing

---

## MVP Roadmap

### Overview
- **Duration**: 8 weeks (4 sprints × 2 weeks each)
- **Team Size**: Assumed 3-4 developers (adjust capacity as needed)
- **Start Date**: [TBD]
- **MVP Launch**: End of Sprint 4

### Sprint Overview

#### Sprint 1: Foundation - Database & Authentication (Weeks 1-2)
**Goal**: Establish core infrastructure with PostgreSQL, Prisma ORM, and Supabase authentication

#### Sprint 2: Core Functionality - CRUD APIs & Email (Weeks 3-4)
**Goal**: Build essential CRUD operations for vehicles, bookings, and users with email notifications

#### Sprint 3: Enhanced Features - Search, CDN & UI Polish (Weeks 5-6)
**Goal**: Implement advanced search/filtering, image management via CDN, and refine UI/UX

#### Sprint 4: Monetization & Launch Prep - Payments, Analytics & QA (Weeks 7-8)
**Goal**: Integrate payment processing, analytics tracking, and comprehensive testing

### Gantt Chart - Sprint Timeline & Dependencies

```
Task                            | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Dependencies
                               | W1 | W2  | W3 | W4  | W5 | W6  | W7 | W8  |
-------------------------------|----------|----------|----------|----------|---------------
SPRINT 1: FOUNDATION           |          |          |          |          |
├─ PostgreSQL Setup            | ██ |     |    |     |    |     |    |     | None
├─ Prisma Schema Design        | ██ | ██  |    |     |    |     |    |     | PostgreSQL
├─ Supabase Integration        |    | ██  |    |     |    |     |    |     | PostgreSQL
├─ Auth Middleware             |    | ██  |    |     |    |     |    |     | Supabase
├─ User Registration/Login     |    | ██  |    |     |    |     |    |     | Auth Middleware
└─ Role-Based Access Control   |    | ██  |    |     |    |     |    |     | Auth Middleware
                               |          |          |          |          |
SPRINT 2: CORE CRUD            |          |          |          |          |
├─ Vehicle CRUD APIs           |    |     | ██ |     |    |     |    |     | Prisma Schema
├─ Booking CRUD APIs           |    |     | ██ | ██  |    |     |    |     | Vehicle APIs
├─ User Profile APIs           |    |     | ██ |     |    |     |    |     | Auth
├─ SendGrid Integration        |    |     |    | ██  |    |     |    |     | None
├─ Email Templates             |    |     |    | ██  |    |     |    |     | SendGrid
└─ Notification System         |    |     |    | ██  |    |     |    |     | Email Templates
                               |          |          |          |          |
SPRINT 3: ENHANCED FEATURES    |          |          |          |          |
├─ Search/Filter APIs          |    |     |    |     | ██ |     |    |     | CRUD APIs
├─ Geolocation Search          |    |     |    |     | ██ | ██  |    |     | Search APIs
├─ Image CDN Setup             |    |     |    |     | ██ |     |    |     | None
├─ Image Upload APIs           |    |     |    |     |    | ██  |    |     | CDN Setup
├─ UI Component Library        |    |     |    |     | ██ | ██  |    |     | None
└─ Responsive Design           |    |     |    |     |    | ██  |    |     | UI Components
                               |          |          |          |          |
SPRINT 4: LAUNCH PREP          |          |          |          |          |
├─ Payment Gateway Integration |    |     |    |     |    |     | ██ |     | Booking APIs
├─ Payment Processing APIs     |    |     |    |     |    |     | ██ | ██  | Payment Gateway
├─ Analytics Integration       |    |     |    |     |    |     | ██ |     | None
├─ Event Tracking              |    |     |    |     |    |     |    | ██  | Analytics
├─ Integration Testing         |    |     |    |     |    |     | ██ | ██  | All APIs
├─ Performance Testing         |    |     |    |     |    |     |    | ██  | Integration Tests
└─ Bug Fixes & Polish          |    |     |    |     |    |     |    | ██  | All Tests

Legend: ██ = Active Development | W = Week
```

### Detailed Sprint Breakdown

#### Sprint 1: Database & Authentication Foundation

##### Goals
- Set up PostgreSQL database with proper schemas
- Implement Prisma ORM with type-safe models
- Configure Supabase for authentication
- Establish secure user registration and login flows

##### Key Deliverables
1. **Database Infrastructure**
   - PostgreSQL instance configured (local dev + staging)
   - Database backup and migration strategies defined
   - Connection pooling configured

2. **Prisma Setup**
   - Schema definitions for all core entities:
     - Users (hosts, renters, admins)
     - Vehicles (e-bikes, e-scooters)
     - Bookings
     - Payments
     - Reviews
   - Migrations and seed data scripts

3. **Authentication System**
   - Supabase Auth integration
   - JWT token management
   - Password reset flows
   - Email verification
   - OAuth providers (Google, Facebook) - optional

4. **Authorization**
   - Role-based access control (RBAC)
   - API route protection middleware
   - Permission checking utilities

##### Technical Tasks
- [ ] Install and configure PostgreSQL
- [ ] Set up Prisma with TypeScript
- [ ] Design database schema with relationships
- [ ] Create Supabase project and configure auth
- [ ] Implement auth middleware for Next.js API routes
- [ ] Build registration/login API endpoints
- [ ] Create auth context and hooks for frontend
- [ ] Write unit tests for auth flows

##### Success Metrics
- All database tables created with proper relationships
- Users can register, login, and logout successfully
- Protected routes return 401 for unauthorized access
- 80%+ test coverage for auth modules

---

#### Sprint 2: Core CRUD APIs & Email System

##### Goals
- Build comprehensive CRUD operations for all major entities
- Implement email notification system with SendGrid
- Establish API documentation standards

##### Key Deliverables
1. **Vehicle Management APIs**
   - Create/Read/Update/Delete vehicles
   - Vehicle availability management
   - Image upload placeholders
   - Vehicle status tracking

2. **Booking System APIs**
   - Create new bookings
   - View booking history
   - Update booking status
   - Cancel bookings with policies
   - Calculate pricing

3. **User Management APIs**
   - Profile management
   - Preference settings
   - Host dashboard data
   - Renter history

4. **Email Notification System**
   - SendGrid integration
   - Transactional email templates:
     - Welcome emails
     - Booking confirmations
     - Payment receipts
     - Reminder notifications
   - Email queue system

##### Technical Tasks
- [ ] Implement vehicle CRUD with Prisma
- [ ] Build booking lifecycle management
- [ ] Create user profile endpoints
- [ ] Integrate SendGrid API
- [ ] Design responsive email templates
- [ ] Set up email queue with retry logic
- [ ] Document all APIs with OpenAPI/Swagger
- [ ] Add request validation with Zod
- [ ] Implement error handling middleware

##### Success Metrics
- All CRUD operations functional with proper validation
- Email delivery rate > 95%
- API response times < 200ms for basic operations
- Comprehensive API documentation available

---

#### Sprint 3: Search, Filtering, CDN & UI Polish

##### Goals
- Implement advanced search and filtering capabilities
- Set up image CDN for vehicle photos
- Polish UI/UX with component library
- Optimize for mobile responsiveness

##### Key Deliverables
1. **Advanced Search System**
   - Full-text search for vehicles
   - Multi-criteria filtering:
     - Vehicle type
     - Price range
     - Availability dates
     - Location/distance
     - Features/amenities
   - Search result ranking
   - Saved searches

2. **Geolocation Features**
   - Location-based vehicle search
   - Distance calculations
   - Map integration preparation
   - Geocoding addresses

3. **Image Management**
   - CDN setup (Cloudinary/AWS S3)
   - Image upload APIs
   - Image optimization pipeline
   - Thumbnail generation
   - Lazy loading implementation

4. **UI/UX Enhancements**
   - Component library setup (shadcn/ui or similar)
   - Consistent design system
   - Loading states and skeletons
   - Error boundaries
   - Toast notifications
   - Mobile-first responsive design

##### Technical Tasks
- [ ] Implement PostgreSQL full-text search
- [ ] Build filter query builders
- [ ] Add PostGIS for geospatial queries
- [ ] Configure CDN service
- [ ] Create image upload endpoints
- [ ] Build reusable UI components
- [ ] Implement responsive grid layouts
- [ ] Add loading and error states
- [ ] Optimize bundle size

##### Success Metrics
- Search results return in < 500ms
- Image load times < 2s on 3G
- Mobile usability score > 90
- Component reusability > 70%

---

#### Sprint 4: Payments, Analytics & Quality Assurance

##### Goals
- Integrate secure payment processing
- Set up analytics and monitoring
- Comprehensive testing and bug fixes
- Prepare for production deployment

##### Key Deliverables
1. **Payment System**
   - Payment gateway integration (Stripe/PayPal)
   - Secure payment processing
   - Payment method management
   - Refund handling
   - Invoice generation
   - Payment history

2. **Analytics & Monitoring**
   - Google Analytics 4 / Mixpanel setup
   - Custom event tracking:
     - User registration
     - Vehicle views
     - Booking funnel
     - Payment completion
   - Error tracking (Sentry)
   - Performance monitoring

3. **Quality Assurance**
   - End-to-end testing suite
   - Load testing
   - Security audit
   - Accessibility testing
   - Cross-browser testing
   - Mobile device testing

4. **Production Readiness**
   - Environment configurations
   - CI/CD pipeline updates
   - Database optimization
   - API rate limiting
   - Security headers
   - Documentation updates

##### Technical Tasks
- [ ] Integrate Stripe/PayPal SDK
- [ ] Implement payment webhooks
- [ ] Add payment status tracking
- [ ] Set up analytics tracking
- [ ] Configure error monitoring
- [ ] Write E2E tests with Playwright
- [ ] Perform load testing with K6
- [ ] Conduct security review
- [ ] Fix critical bugs
- [ ] Optimize database queries
- [ ] Update deployment scripts

##### Success Metrics
- Payment success rate > 95%
- Zero critical security vulnerabilities
- Page load time < 3s
- 90%+ test coverage
- All P1 bugs resolved

### Risk Mitigation

#### Technical Risks
1. **Database Performance**
   - Mitigation: Early query optimization, indexing strategy
   
2. **Payment Integration Complexity**
   - Mitigation: Start payment provider research in Sprint 2
   
3. **Search Performance at Scale**
   - Mitigation: Consider Elasticsearch if needed in Sprint 3

#### Schedule Risks
1. **Dependencies on External Services**
   - Mitigation: Have backup providers identified
   
2. **Scope Creep**
   - Mitigation: Strict MVP feature freeze after Sprint 1

### Post-MVP Considerations

After successful MVP launch, consider:
1. Native mobile apps
2. Advanced analytics dashboard
3. AI-powered recommendations
4. Multi-language support
5. Subscription models
6. Fleet management tools

### Team Allocation Suggestions

- **Sprint 1**: Full team on infrastructure
- **Sprint 2**: 2 devs on APIs, 1 on email system
- **Sprint 3**: 1 dev on search, 1 on CDN, 1-2 on UI
- **Sprint 4**: 1 dev on payments, others on QA/fixes

### Definition of Done

Each sprint is considered complete when:
- [ ] All planned features are implemented
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Integration tests passing
- [ ] Deployed to staging environment
- [ ] Product owner approval received

---

## Technical Implementation Notes

This section provides detailed technical specifications for each roadmap item, including required technologies, libraries, database schema references, key endpoints/components, acceptance criteria, and testing notes.

### Sprint 1: Foundation - Database & Authentication

#### 1.1 PostgreSQL Setup

**Tech/Libs:**
- PostgreSQL 15+
- `pg` (node-postgres) - PostgreSQL client
- `pg-pool` - Connection pooling
- Docker/docker-compose for local development

**Key Components:**
- Database connection module: `/lib/db/connection.ts`
- Migration scripts: `/scripts/db/`
- Health check endpoint: `GET /api/health`

**Acceptance Criteria:**
- PostgreSQL running in Docker container
- Connection pooling configured (min: 2, max: 10)
- Database migrations can run successfully
- Health check endpoint returns DB connection status

#### 1.2 Prisma Schema Design

**Tech/Libs:**
- `prisma` - ORM
- `@prisma/client` - Type-safe database client
- `prisma-dbml-generator` - For ERD generation (optional)

**Key Components:**
- Prisma schema: `/prisma/schema.prisma`
- Generated client: `/node_modules/.prisma/client`
- Seed script: `/prisma/seed.ts`

**Acceptance Criteria:**
- Complete Prisma schema matching database requirements
- All relationships properly defined
- Type-safe client generated
- Seed data creates test records

#### 1.3 Supabase Integration

**Tech/Libs:**
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Next.js auth helpers
- `@supabase/ssr` - SSR support

**Key Components:**
- Supabase client: `/lib/supabase/client.ts`
- Server client: `/lib/supabase/server.ts`
- Auth config: `/lib/supabase/auth-config.ts`

**Acceptance Criteria:**
- Supabase project created and configured
- Environment variables set
- Client-side and server-side clients initialized
- Row Level Security (RLS) policies defined

### Sprint 2: Core CRUD APIs & Email System

#### 2.1 Vehicle CRUD APIs

**Tech/Libs:**
- Prisma for ORM
- `multer` or `formidable` - File upload handling (placeholder)
- `sharp` - Image processing (placeholder)

**Key Endpoints:**
- `GET /api/vehicles` - List all vehicles
- `GET /api/vehicles/[id]` - Get single vehicle
- `POST /api/dealer/vehicles` - Create vehicle (dealer only)
- `PUT /api/dealer/vehicles/[id]` - Update vehicle
- `DELETE /api/dealer/vehicles/[id]` - Delete vehicle

**Acceptance Criteria:**
- CRUD operations return proper status codes
- Input validation with detailed errors
- Pagination on list endpoint
- Only dealers can modify their own inventory

#### 2.2 Email System Integration

**Tech/Libs:**
- `@sendgrid/mail` - SendGrid Node.js SDK
- `handlebars` - Email templating
- `bull` or `bee-queue` - Job queue
- `redis` - Queue backend

**Key Components:**
- Email service: `/lib/email/sendgrid.ts`
- Template renderer: `/lib/email/templates.ts`
- Queue worker: `/lib/email/queue.ts`

**Acceptance Criteria:**
- SendGrid API key configured
- Dynamic templates created
- Queue processes emails asynchronously
- Retry logic for failures

### Sprint 3: Search, Filtering, CDN & UI Polish

#### 3.1 Advanced Search Implementation

**Tech/Libs:**
- PostgreSQL full-text search
- `pg-tsquery` - Query builder
- PostGIS extension for geolocation
- `@turf/turf` - Geospatial calculations

**Key Endpoints:**
- `GET /api/vehicles/search` - Full-text search
- `POST /api/vehicles/filter` - Advanced filtering
- `GET /api/vehicles/nearby` - Location-based search

**Acceptance Criteria:**
- Search returns relevant results
- Multiple filter criteria work together
- Response time < 200ms
- Location-based results sorted by distance

#### 3.2 CDN & Image Management

**Tech/Libs:**
- Cloudinary or AWS S3 + CloudFront
- `cloudinary` - Node SDK
- `multer` - Multipart form handling
- `sharp` - Image processing

**Key Components:**
- CDN config: `/lib/cdn/config.ts`
- Upload handler: `/lib/cdn/upload.ts`
- Image optimization: `/lib/cdn/optimize.ts`

**Acceptance Criteria:**
- CDN account configured
- Automatic image optimization
- Responsive image variants
- Max 10MB per image
- EXIF data stripped

### Sprint 4: Payments, Analytics & Launch Prep

#### 4.1 Payment Integration

**Tech/Libs:**
- `stripe` - Stripe Node.js SDK
- `@stripe/stripe-js` - Client-side SDK
- `@stripe/react-stripe-js` - React components

**Key Endpoints:**
- `POST /api/payments/create-intent` - Payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/refund` - Process refund
- Webhook: `/api/webhooks/stripe`

**Acceptance Criteria:**
- PCI compliant implementation
- Supports cards, wallets
- Handles 3D Secure
- Webhook signature verified
- Idempotency implemented

#### 4.2 Analytics & Monitoring

**Tech/Libs:**
- `@analytics/google-analytics-v4` - GA4
- `mixpanel` - Product analytics
- `@sentry/nextjs` - Error tracking
- `@vercel/analytics` - Web vitals

**Key Components:**
- Analytics service: `/lib/analytics/index.ts`
- Event definitions: `/lib/analytics/events.ts`
- Error boundary: `/components/ErrorBoundary.tsx`

**Acceptance Criteria:**
- GA4 property configured
- Critical user flows tracked
- Error context captured
- Performance metrics tracked
- Privacy compliant

### Cross-Sprint Technical Considerations

#### Environment Configuration
```bash
# Required environment variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
DATABASE_URL=
SENDGRID_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_URL=
REDIS_URL=
SENTRY_DSN=
GA4_MEASUREMENT_ID=
```

#### CI/CD Pipeline Requirements
- GitHub Actions for automated testing
- Vercel for preview deployments
- Database migrations in CI
- E2E tests on preview deploys
- Security scanning
- Bundle size monitoring

#### Testing Strategy
- Unit tests: Jest + React Testing Library
- Integration tests: Supertest
- E2E tests: Playwright
- Load testing: K6 or Artillery
- Security testing: OWASP ZAP

#### Performance Targets
- Page load time: < 3s
- API response time: < 200ms (basic operations)
- Search response time: < 500ms
- Database queries: < 100ms
- Sustained load: 100 RPS minimum

---

## Time & Effort Estimates

### Overview
- **Total Duration**: 8 weeks (4 sprints × 2 weeks each)
- **Buffer**: 20% included in all estimates
- **Granularity**: Tasks broken down into 2-8 hour chunks
- **Team Roles**: 
  - BE = Backend Developer
  - FE = Frontend Developer
  - FS = Full Stack Developer
  - DO = DevOps Engineer

### Summary by Sprint

| Sprint | Raw Hours | With 20% Buffer | Team Days* |
|--------|-----------|-----------------|------------|
| Sprint 1 | 120 | 144 | 18 |
| Sprint 2 | 130 | 156 | 19.5 |
| Sprint 3 | 110 | 132 | 16.5 |
| Sprint 4 | 140 | 168 | 21 |
| **Total** | **500** | **600** | **75** |

*Team Days calculated at 8 hours per day

### Role Distribution

| Role | Total Hours | Percentage |
|------|-------------|------------|
| Backend Developer (BE) | 336 | 56% |
| Frontend Developer (FE) | 120 | 20% |
| Full Stack Developer (FS) | 84 | 14% |
| DevOps Engineer (DO) | 60 | 10% |

### Detailed Task Breakdown

#### Sprint 1: Database & Authentication (144 hours)

| Task | Hours | Role |
|------|-------|------|
| PostgreSQL Docker setup & configuration | 4 | DO |
| Database schema design & ERD creation | 8 | BE |
| Connection pooling & performance config | 4 | BE |
| Database migration scripts | 6 | BE |
| Prisma schema mapping from SQL | 8 | BE |
| Prisma relationship configuration | 6 | BE |
| Supabase project setup & configuration | 4 | FS |
| Client-side auth integration | 6 | FE |
| Server-side auth integration | 6 | BE |
| Row Level Security policies | 8 | BE |
| Auth middleware development | 8 | BE |
| Registration/login forms & validation | 10 | FE |
| Registration/login API endpoints | 10 | BE |
| RBAC implementation & testing | 8 | BE |
| **Sprint 1 Total** | **96** | |
| **With 20% Buffer** | **144** | |

#### Sprint 2: Core CRUD & Email (156 hours)

| Task | Hours | Role |
|------|-------|------|
| Vehicle CRUD endpoints | 8 | BE |
| Vehicle availability management | 4 | BE |
| Inventory management APIs | 6 | BE |
| Booking creation API & validation | 8 | BE |
| Booking status management | 6 | BE |
| Price calculation engine | 8 | BE |
| User profile APIs | 6 | BE |
| SendGrid integration | 4 | BE |
| Email template development | 12 | FE |
| Email queue implementation | 8 | BE |
| Notification triggers | 6 | BE |
| API documentation | 8 | BE |
| CRUD integration testing | 8 | FS |
| **Sprint 2 Total** | **92** | |
| **With 20% Buffer** | **156** | |

#### Sprint 3: Search, CDN & UI (132 hours)

| Task | Hours | Role |
|------|-------|------|
| PostgreSQL full-text search setup | 6 | BE |
| Search query builder | 6 | BE |
| Multi-criteria filter engine | 8 | BE |
| PostGIS extension setup | 4 | DO |
| Location-based search APIs | 8 | BE |
| CDN provider setup | 4 | DO |
| Image upload APIs | 6 | BE |
| Image optimization pipeline | 6 | BE |
| Component library setup | 4 | FE |
| UI components development | 16 | FE |
| Loading states & error handling | 8 | FE |
| Responsive design implementation | 12 | FE |
| **Sprint 3 Total** | **88** | |
| **With 20% Buffer** | **132** | |

#### Sprint 4: Payments & Launch (168 hours)

| Task | Hours | Role |
|------|-------|------|
| Stripe account setup | 2 | DO |
| Stripe SDK integration | 6 | BE |
| Payment intent creation | 6 | BE |
| Webhook endpoint setup | 8 | BE |
| Payment UI components | 12 | FE |
| Analytics integration | 8 | FS |
| Event tracking implementation | 8 | FS |
| E2E test suite | 16 | FS |
| Load testing | 8 | DO |
| Security audit | 8 | BE |
| Performance optimization | 8 | BE |
| Bug fixes & polish | 16 | FS |
| Production deployment | 6 | DO |
| **Sprint 4 Total** | **112** | |
| **With 20% Buffer** | **168** | |

### Critical Path Items

These tasks are on the critical path and any delays will impact the overall timeline:

1. **Week 1**: PostgreSQL setup & Prisma schema (blocks all data persistence)
2. **Week 2**: Supabase authentication (blocks user management)
3. **Week 3**: Core CRUD APIs (blocks all feature development)
4. **Week 4**: Email system (blocks user communications)
5. **Week 5**: Search implementation (core feature for MVP)
6. **Week 7**: Payment integration (blocks revenue generation)
7. **Week 8**: Security audit & performance optimization (blocks launch)

### Assumptions

1. **Team Size**: 3-4 developers with mixed expertise
2. **Work Week**: 40 hours per developer
3. **Code Reviews**: Included in task estimates
4. **Testing**: Unit tests included in development time
5. **Documentation**: Basic documentation included
6. **Meetings**: Not included (add 10-15% for meetings)

### Recommendations

1. **Parallel Work**: FE and BE tasks can often run in parallel
2. **Early Integration**: Start integration testing early in each sprint
3. **Buffer Usage**: Use buffer time for technical debt and refactoring
4. **Daily Standups**: Essential for coordination with parallel work streams
5. **Sprint Reviews**: Allocate 4 hours per sprint for demos and planning

---

## Risks & Mitigations

### Technical Risks

#### High Priority Risks

1. **Database Performance Issues**
   - **Risk**: Poor query performance with large datasets
   - **Impact**: High - User experience degradation
   - **Mitigation**: 
     - Early implementation of database indexing
     - Query optimization from Sprint 1
     - Consider read replicas if needed
     - Implement caching strategy early

2. **Payment Integration Complexity**
   - **Risk**: PCI compliance and international payment challenges
   - **Impact**: High - Blocks revenue generation
   - **Mitigation**:
     - Start payment provider research in Sprint 2
     - Use Stripe's hosted checkout to minimize PCI scope
     - Plan for multiple payment methods early
     - Budget for compliance consultation

3. **Authentication Security Vulnerabilities**
   - **Risk**: Security breaches due to auth implementation flaws
   - **Impact**: Critical - Data breach potential
   - **Mitigation**:
     - Use established auth provider (Supabase)
     - Implement security best practices from start
     - Conduct security audit in Sprint 4
     - Enable 2FA for admin accounts

#### Medium Priority Risks

4. **Search Performance at Scale**
   - **Risk**: Slow search with growing inventory
   - **Impact**: Medium - Poor user experience
   - **Mitigation**:
     - Start with PostgreSQL full-text search
     - Monitor performance metrics
     - Have Elasticsearch migration plan ready
     - Implement search result caching

5. **Third-party Service Dependencies**
   - **Risk**: Service outages or API changes
   - **Impact**: Medium - Feature unavailability
   - **Mitigation**:
     - Abstract third-party integrations
     - Implement circuit breakers
     - Have backup providers identified
     - Cache critical data locally

6. **Mobile Performance Issues**
   - **Risk**: Poor performance on mobile devices
   - **Impact**: Medium - Lost mobile users
   - **Mitigation**:
     - Mobile-first development approach
     - Regular performance testing on real devices
     - Implement progressive loading
     - Optimize bundle sizes

### Schedule Risks

1. **Scope Creep**
   - **Risk**: Additional features delaying MVP
   - **Impact**: High - Delayed launch
   - **Mitigation**:
     - Strict MVP feature freeze after Sprint 1
     - Document all change requests for post-MVP
     - Weekly stakeholder alignment meetings
     - Clear definition of done for each sprint

2. **Resource Availability**
   - **Risk**: Key team members unavailable
   - **Impact**: Medium - Schedule delays
   - **Mitigation**:
     - Knowledge sharing sessions
     - Comprehensive documentation
     - Pair programming for critical features
     - Cross-training team members

3. **Integration Delays**
   - **Risk**: External service integration taking longer
   - **Impact**: Medium - Feature delays
   - **Mitigation**:
     - Early API sandbox access
     - Mock implementations for development
     - Parallel integration tracks
     - Regular integration testing

### Business Risks

1. **Market Competition**
   - **Risk**: Competitors launching similar features
   - **Impact**: Medium - Reduced market impact
   - **Mitigation**:
     - Focus on unique value propositions
     - Accelerated MVP timeline
     - Early beta user feedback
     - Continuous market monitoring

2. **Regulatory Compliance**
   - **Risk**: Non-compliance with data protection laws
   - **Impact**: High - Legal penalties
   - **Mitigation**:
     - GDPR compliance from day one
     - Privacy by design approach
     - Legal consultation for terms of service
     - Clear data retention policies

3. **User Adoption**
   - **Risk**: Low initial user adoption
   - **Impact**: Medium - Revenue impact
   - **Mitigation**:
     - Beta testing program
     - User feedback incorporation
     - Marketing campaign preparation
     - Referral program planning

### Contingency Plans

1. **Database Performance**: If PostgreSQL search proves inadequate, implement Elasticsearch in Sprint 4
2. **Payment Provider Issues**: Have Razorpay as backup to Stripe
3. **Email Delivery Problems**: Implement Mailgun as backup to SendGrid
4. **CDN Failures**: Use multiple CDN providers with failover
5. **Authentication Issues**: Have Auth0 as backup to Supabase Auth

### Risk Monitoring

- **Weekly Risk Reviews**: Team reviews risk register weekly
- **Risk Metrics Dashboard**: Monitor key risk indicators
- **Escalation Process**: Clear escalation path for critical risks
- **Risk Owner Assignment**: Each risk has a designated owner
- **Mitigation Tracking**: Track effectiveness of mitigation strategies

### Success Factors

1. **Early Testing**: Start testing in Sprint 1, not Sprint 4
2. **Incremental Delivery**: Deploy to staging after each sprint
3. **User Feedback**: Incorporate beta user feedback continuously
4. **Performance Monitoring**: Set up monitoring from Sprint 1
5. **Security First**: Security considerations in every feature
6. **Documentation**: Keep documentation updated throughout

---

## Conclusion

This MVP Development Plan provides a comprehensive roadmap for building the Omni E-Ride platform within 8 weeks. The plan balances technical requirements with business objectives while maintaining realistic timelines and accounting for potential risks.

### Key Takeaways

1. **Strong Foundation**: 41 features already implemented provide solid base
2. **Clear Priorities**: Critical MVP features identified and scheduled
3. **Risk Awareness**: Major risks identified with mitigation strategies
4. **Realistic Timeline**: 8-week timeline with built-in buffers
5. **Scalable Architecture**: Technical choices support future growth

### Next Steps

1. **Team Assembly**: Confirm team members and roles
2. **Environment Setup**: Prepare development environments
3. **Stakeholder Alignment**: Final review with all stakeholders
4. **Sprint 1 Kickoff**: Begin with database and authentication
5. **Communication Plan**: Establish regular update cadence

### Document Maintenance

This document should be treated as a living document and updated:
- After each sprint retrospective
- When major decisions are made
- When risks materialize or new risks identified
- When scope changes are approved

Last Updated: [Current Date]
Version: 1.0
