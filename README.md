# Wedding Hub Template

A customizable wedding website and guest-management portal built with React, Vite, Tailwind CSS, shadcn/ui-inspired component patterns, and Supabase.

This template is designed for couples who want one private-but-friendly place for RSVPs, schedule details, travel information, accommodation notes, and basic guest administration.

## Features

- Wedding landing page with editable event details
- RSVP and guest registration form
- Travel, accommodation, activity, and schedule pages
- English/German language toggle scaffold
- Supabase-backed guest and role model
- Protected admin screen for guest review
- PWA metadata for installable mobile use
- MIT-licensed open-source setup with CI

## Quick Start

```sh
npm install
npm run dev
```

The app runs in demo mode until Supabase environment variables are configured.

## Supabase Setup

1. Create a Supabase project.
2. Run the SQL in `supabase/migrations/20260604000000_initial_schema.sql`.
3. Optionally run `supabase/seed.sql` for fake sample guests.
4. Copy `.env.example` to `.env.local`.
5. Fill in your project URL and anon key.

```sh
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

To create an admin, add your Supabase auth user ID to `public.user_roles` with role `admin`.

## Deployment

This project can be deployed on Vercel, Netlify, Supabase hosting, or any static host that supports Vite builds.

```sh
npm run build
```

Publish the generated `dist` directory.

## Customization

- Edit event details in `src/lib/templateData.ts`.
- Update colors and layout in `src/index.css`.
- Replace placeholder copy with your own wedding information.
- Add or remove info pages in `src/App.tsx`.
- Bring your own Supabase project and never reuse another project's keys.

## Security And Privacy

This template intentionally does not include real guest data, private media, WhatsApp integrations, payment tracking, passcodes, or personal admin allowlists.

Before publishing your own fork:

- Do not commit `.env`, `.env.local`, guest exports, or private photos.
- Review Supabase Row Level Security policies.
- Rotate any key that was ever committed in another repository.
- Run a secret scan before making a repository public.

## License

MIT
