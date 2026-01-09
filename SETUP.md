# GT7 Racing League - Setup Guide

## Prerequisites
- Node.js 18+ installed
- Clerk account (https://clerk.com)
- Supabase account (https://supabase.com)

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# App URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Clerk Setup

1. Go to https://clerk.com and create an account
2. Create a new application
3. Copy your Publishable Key and Secret Key
4. Add them to `.env.local`

## Supabase Setup

1. Go to https://supabase.com and create an account
2. Create a new project
3. Go to Project Settings > API
4. Copy your Project URL and anon/public key
5. Add them to `.env.local`

## Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- See SUPABASE_SCHEMA.sql for the complete database schema
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js with React Three Fiber
- **Language:** TypeScript
