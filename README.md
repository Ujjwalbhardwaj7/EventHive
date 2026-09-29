# EventHive

Responsive React + Supabase event management system for student event discovery, registration, and a basic admin console.

## Features

- Browse, search, filter, and register for events without a student account
- Client-side registration validation and duplicate-registration handling
- Supabase-authenticated admin routes, event management, and registration search

## Tech stack

React, Vite, TypeScript, Tailwind CSS, React Router, Lucide, and Supabase.

## Start

Copy `.env.example` to `.env`, add your Supabase URL and anon key, then run `npm install` and `npm run dev`.

## Supabase

Run [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL editor before using live data. It creates `events` and `registrations`, the event foreign key, duplicate-email constraint, and RLS policies.

The browser may read events and create registrations without signing in. Authenticated users may create, edit, and delete events and view registrations.

## Admin setup

1. Create a Supabase project and run the schema above.
2. In the Supabase Dashboard, open **Authentication → Users**.
3. Create an admin user manually with an email address and password.
4. Sign in at `/admin` with those credentials.

There is intentionally no public admin sign-up page.

## Build and deployment

Run `npm run build` to create the production bundle in `dist/`. Deploy that output to a static host configured to serve `index.html` for application routes, and set both `VITE_` environment variables in the host’s build environment.
