# Wedding Hub Template

A customizable wedding-weekend website and guest-management portal built with React, Vite, Tailwind CSS, shadcn/ui-inspired component patterns, and Supabase.

This template is designed for couples who want one private-but-friendly place to coordinate the whole wedding weekend: RSVPs, schedule details, travel information, accommodation planning, guest payments, and basic administration.

## Features

- Wedding-weekend landing page with editable event details
- RSVP and guest registration form
- Travel, accommodation, activity, and schedule pages
- Accommodation request and notes capture
- Generic payment status and amount tracking for admins
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
- Replace placeholder copy with your own wedding-weekend information.
- Adapt the accommodation and payment fields to match your venue, room model, and contribution/payment process.
- Add or remove info pages in `src/App.tsx`.
- Bring your own Supabase project and never reuse another project's keys.

## Security And Privacy

This template intentionally does not include real guest data, private media, WhatsApp integrations, passcodes, personal admin allowlists, real payment records, payment-provider credentials, or bank details.

Payment tracking is intentionally generic. It is meant for admin-side coordination of contribution status and amounts, not for processing payments.

Before publishing your own fork:

- Do not commit `.env`, `.env.local`, guest exports, or private photos.
- Review Supabase Row Level Security policies.
- Rotate any key that was ever committed in another repository.
- Run a secret scan before making a repository public.

## License

MIT
