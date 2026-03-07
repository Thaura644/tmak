# T-MAK Project Development Log

## Date: 2026-03-07

## Issues Encountered and Solutions

### 9. Member Login and Dashboard Refactoring
**Issue:** Member login was tied to Payload CMS, which is being phased out. The request was to decouple member auth and provide a custom dashboard.
**Solution:**
- Created a custom member registration page at `/register`.
- Implemented `POST /api/auth/register` in the standalone `backend-api`.
- Replaced the `/login` redirect with a functional login form using NextAuth.
- Implemented a custom member dashboard at `/dashboard`.
- Updated the Navbar "Member Login" link to point to `/login` instead of `/cms`.
- Updated NextAuth configuration to generate and provide a JWT for `backend-api` communication.

## Current Route Structure
- `/` - Main website (T-MAK public site)
- `/about` - About page
- `/resources` - Resources page
- `/contact` - Contact page
- `/members` - Members listing
- `/statistics` - Statistics page
- `/login` - Member login (New custom form)
- `/register` - Member registration (New)
- `/dashboard` - Member dashboard (New)
- `/admin` - Custom admin dashboard (requires auth)
- `/admin/login` - Admin login form

## Database
- Standalone `backend-api` using Prisma with PostgreSQL.
- Frontend uses NextAuth for authentication, with sessions including backend tokens.

## Current Credentials (Development/Local)
- **Admin Login**: `/admin/login` (Username: `admin`, Password: `admin123`)
- **Member Login**: `/login` (User-created accounts via `/register`)
