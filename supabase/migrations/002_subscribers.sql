-- Subscribers table for email capture
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',
  created_at timestamptz default now()
);

create index if not exists idx_subscribers_email on subscribers(email);
create index if not exists idx_subscribers_created_at on subscribers(created_at desc);
