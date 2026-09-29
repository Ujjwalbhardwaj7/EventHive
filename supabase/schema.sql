create table public.events (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null,
  category text not null, date date not null, time time not null, venue text not null,
  featured boolean default false, registration_open boolean default true, capacity integer,
  created_at timestamptz default now()
);
create table public.registrations (
  id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id) on delete cascade,
  name text not null, email text not null, college_email text not null, college text not null, year text not null, phone text not null,
  created_at timestamptz default now(), unique(event_id, email)
);
alter table public.events enable row level security;
alter table public.registrations enable row level security;
drop policy if exists "Public can view events" on public.events;
drop policy if exists "Public can register" on public.registrations;
create policy "Public can view events" on public.events for select using (true);
create policy "Authenticated users can create events" on public.events for insert to authenticated with check (true);
create policy "Authenticated users can update events" on public.events for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete events" on public.events for delete to authenticated using (true);
create policy "Public can register" on public.registrations for insert with check (true);
create policy "Authenticated users can read registrations" on public.registrations for select to authenticated using (true);
