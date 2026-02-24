# T-MAK Project Development Log

## Date: 2026-02-24

## Issues Encountered and Solutions

### 1. Server Function Serialization Error
**Error:** `Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server"`
**Location:** `src/app/(payload)/layout.tsx`
**Solution:** Created a proper server function with "use server" directive that uses `handleServerFunctions` from `@payloadcms/next/layouts`

### 2. Nested HTML/BODY Tags Issue
**Error:** `In HTML, <html> cannot be a child of <body>`
**Cause:** Root layout and Payload's RootLayout both rendered html/body tags
**Solution:** 
- Created empty root layout at `src/app/layout.tsx` that only returns children
- Created route groups with separate layouts:
  - `(main)` - Main website with full html/body
  - `cms` - Payload CMS with RootLayout
  - `(admin)` - Custom admin dashboard with html/body

### 3. Missing Pages - 404 Errors
**Error:** Routes like `/about`, `/resources`, `/contact`, `/admin/login` returned 404
**Solution:** Created all missing pages:
- `/about` - About page
- `/resources` - Resources page
- `/contact` - Contact page
- `/admin/login` - Admin login page (NextAuth)

### 4. Admin vs Member Login Confusion
**Issue:** Unclear distinction between admin and member login
**Solution:** 
- `/login` → Member login → redirects to `/cms` (Payload CMS)
- `/admin` → Custom admin dashboard (requires NextAuth login)
- `/admin/login` → Admin login form (NextAuth credentials)
- `/cms` → Payload CMS (for members)

### 5. Globals.css Import Path Error
**Error:** `Module not found: Can't resolve './globals.css'`
**Location:** `src/app/(admin)/layout.tsx`
**Solution:** Changed `import "./globals.css"` to `import "../globals.css"`

### 6. Payload CMS Routing
**Setup:** Created proper Payload CMS routing structure:
- `src/app/cms/layout.tsx` - CMS layout with RootLayout
- `src/app/cms/[[...segments]]/page.tsx` - CMS page handler
- `src/app/cms/admin/[[...adminSegments]]/page.tsx` - Admin panel handler

## Current Route Structure
- `/` - Main website (T-MAK public site)
- `/about` - About page
- `/resources` - Resources page
- `/contact` - Contact page
- `/members` - Members listing
- `/statistics` - Statistics page
- `/login` - Member login (redirects to /cms)
- `/cms` - Payload CMS
- `/cms/admin` - Payload Admin panel
- `/admin` - Custom admin dashboard (requires auth)
- `/admin/login` - Admin login form

## Database
- `payload.db` - SQLite database for Payload CMS
- Uses Prisma for custom admin (separate from Payload)

## Notes
- Next.js 16.1.6 with Turbopack
- Payload CMS 3.0 (Next.js native)
- NextAuth for custom admin authentication
- Route groups used to separate layouts: (main), (admin)

### 7. PostgreSQL (Neon DB) Support for Vercel
**Issue:** SQLite connection failed on Vercel due to local file system limitations.
**Solution:** 
- Switched from SQLite to PostgreSQL for both Payload CMS and Prisma.
- Replaced `@payloadcms/db-sqlite` with `@payloadcms/db-postgres`.
- Updated `payload.config.ts` to use `postgresAdapter` and `PAYLOAD_DATABASE_URL`.
- Updated `prisma/schema.prisma` to use `postgresql` provider and `DATABASE_URL`.
- Neon DB is now the primary storage engine for production deployments.

### 8. Login Route Correction
**Issue:** NextAuth redirected to `/login` (Member login) instead of `/admin/login` (Admin login).
**Solution:** Updated `authOptions.pages.signIn` to `/admin/login` in `src/app/api/auth/[...nextauth]/route.ts`.

## Current Credentials (Development/Local)
- **Custom Admin Login**: `/admin/login` (Username: `admin`, Password: `admin123`)
- **Member/CMS Login**: `/login` (redirects to `/cms`)
- **Payload Admin**: `/cms/admin` (Requires initial setup via UI)

## Database Setup (Vercel & Local)
The following databases have been provisioned on Neon for this project:

- **DATABASE_URL**: `postgresql://neondb_owner:npg_Wd0ODpk4QtVE@ep-empty-king-akobk7ez-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require`
- **PAYLOAD_DATABASE_URL**: `postgresql://neondb_owner:npg_Wd0ODpk4QtVE@ep-empty-king-akobk7ez-pooler.c-3.us-west-2.aws.neon.tech/payload_db?sslmode=require`

Other required environment variables:
- `PAYLOAD_SECRET`: A secure random string
- `NEXTAUTH_SECRET`: A secure random string
- `NEXTAUTH_URL`: Your deployment URL (e.g. `https://tmak.vercel.app`)

> [!NOTE]
> Ensure these are added to both your local `.env` file and your Vercel Project Settings.
