# GT7 Racing League - Next.js Application

## 🏁 Project Overview

A professional Gran Turismo 7 racing league management platform built with modern web technologies.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4
- **3D Graphics:** Three.js with React Three Fiber
- **Language:** TypeScript

## ✅ What's Been Set Up

### 1. Project Structure
- ✅ Next.js app with TypeScript
- ✅ Tailwind CSS v4 configured
- ✅ All dependencies installed:
  - `@clerk/nextjs` - Authentication
  - `@supabase/supabase-js` - Database client
  - `@react-three/fiber` & `@react-three/drei` - 3D graphics
  - `three` - 3D library

### 2. Configuration Files
- ✅ `middleware.ts` - Clerk authentication middleware
- ✅ `lib/supabase.ts` - Supabase client with TypeScript types
- ✅ `SUPABASE_SCHEMA.sql` - Complete database schema
- ✅ `app/globals.css` - Racing-themed Tailwind configuration
- ✅ `app/layout.tsx` - Root layout with Clerk provider

### 3. Database Schema
The Supabase schema includes:
- ✅ Drivers table
- ✅ Seasons table
- ✅ Championships table
- ✅ Events table
- ✅ Event Registrations table
- ✅ Results table
- ✅ Driver Statistics view
- ✅ Championship Standings view
- ✅ Row Level Security policies
- ✅ Seed data for testing

## 🚀 Next Steps

### Step 1: Set Up Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys
4. Create `.env.local` in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Step 2: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run `SUPABASE_SCHEMA.sql`
4. Go to Project Settings > API
5. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Build the Application Pages

You need to create the following pages and components:

#### Pages to Create:
1. **Home Page** (`app/page.tsx`)
   - Hero section with 3D racing car (Three.js)
   - League statistics
   - Upcoming events preview
   - Championship leaders

2. **Calendar Page** (`app/calendar/page.tsx`)
   - Event cards with status badges
   - Registration functionality
   - Event details modal

3. **Drivers Page** (`app/drivers/page.tsx`)
   - Driver cards with statistics
   - Search and filter
   - Driver profiles

4. **Standings Page** (`app/standings/page.tsx`)
   - Championship standings table
   - Points breakdown
   - Position indicators

5. **Admin Dashboard** (`app/admin/page.tsx`)
   - Event management
   - Driver management
   - Results entry interface

6. **Sign In/Up Pages**
   - `app/sign-in/[[...sign-in]]/page.tsx`
   - `app/sign-up/[[...sign-up]]/page.tsx`

#### Components to Create:
1. **Navigation** (`components/Navigation.tsx`)
   - Header with logo
   - Nav links
   - User menu with Clerk

2. **3D Car Model** (`components/RacingCar3D.tsx`)
   - Three.js racing car for hero section

3. **Event Card** (`components/EventCard.tsx`)
   - Reusable event display

4. **Driver Card** (`components/DriverCard.tsx`)
   - Reusable driver profile card

5. **Standings Table** (`components/StandingsTable.tsx`)
   - Championship standings display

### Step 4: Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📋 Implementation Checklist

- [ ] Set up Clerk authentication
- [ ] Set up Supabase database
- [ ] Create navigation component
- [ ] Create home page with 3D car
- [ ] Create calendar page
- [ ] Create drivers page
- [ ] Create standings page
- [ ] Create admin dashboard
- [ ] Implement event registration
- [ ] Implement results entry
- [ ] Add responsive design
- [ ] Test all features

## 🎨 Design Theme

The application uses a dark racing theme:
- **Primary Color:** Red (#EF4444)
- **Secondary Color:** Purple (#A855F7)
- **Accent Color:** Orange (#FF9800)
- **Background:** Black (#0A0A0A)
- **Cards:** Dark Gray (#1A1A1A)

## 📚 Key Features to Implement

1. **Authentication**
   - Sign in/up with Clerk
   - User profiles linked to drivers
   - Admin role management

2. **Event Management**
   - Create/edit events (admin)
   - Register for events (users)
   - View event details
   - Track registration status

3. **Results System**
   - Enter race results (admin)
   - Automatic points calculation
   - Fastest lap bonus
   - Update standings in real-time

4. **3D Graphics**
   - Animated racing car on home page
   - Interactive 3D elements
   - Smooth animations

5. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly interface
   - Optimized for all devices

## 🔧 Development Tips

1. **Use Server Components** where possible for better performance
2. **Implement Server Actions** for form submissions
3. **Use Supabase Realtime** for live updates
4. **Optimize images** with Next.js Image component
5. **Add loading states** with Suspense
6. **Implement error boundaries**
7. **Add SEO metadata** to all pages

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)

## 🐛 Troubleshooting

### Common Issues:

1. **Clerk not working:**
   - Check `.env.local` has correct keys
   - Restart dev server after adding env vars

2. **Supabase connection failed:**
   - Verify URL and anon key
   - Check RLS policies are set up

3. **Tailwind styles not applying:**
   - Clear `.next` folder
   - Restart dev server

4. **Three.js errors:**
   - Ensure components are client components (`'use client'`)
   - Check browser console for WebGL support

## 📝 Notes

- The previous vanilla HTML/CSS/JS version has been removed
- All data is now stored in Supabase (persistent across devices)
- Authentication is handled by Clerk (secure and production-ready)
- The app is ready for deployment to Vercel

## 🚀 Deployment

When ready to deploy:

```bash
npm run build
```

Deploy to Vercel:
```bash
npx vercel
```

---

**Need help?** Check the documentation links above or review the database schema in `SUPABASE_SCHEMA.sql`.
