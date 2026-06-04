create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('admin', 'guest');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text,
  attending boolean,
  needs_accommodation boolean not null default false,
  accommodation_notes text,
  dietary_notes text,
  travel_notes text,
  song_request text,
  payment_status text not null default 'not_needed' check (payment_status in ('not_needed', 'pending', 'paid')),
  payment_amount numeric(10,2),
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.guests enable row level security;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

drop policy if exists "Anyone can submit an RSVP" on public.guests;
create policy "Anyone can submit an RSVP"
on public.guests
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read guests" on public.guests;
create policy "Admins can read guests"
on public.guests
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can update guests" on public.guests;
create policy "Admins can update guests"
on public.guests
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can delete guests" on public.guests;
create policy "Admins can delete guests"
on public.guests
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Users can read their own roles" on public.user_roles;
create policy "Users can read their own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
