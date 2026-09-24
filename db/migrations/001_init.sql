-- Solana Ghana community site: form submission storage.
-- Safe to run repeatedly.

create table if not exists signups (
  id          bigint generated always as identity primary key,
  email       text        not null unique,
  source      text        not null default 'site',
  ip_hash     text,
  created_at  timestamptz not null default now()
);

create table if not exists team_applications (
  id           bigint generated always as identity primary key,
  name         text        not null,
  email        text        not null,
  team         text        not null,
  contribution text        not null,
  ip_hash      text,
  created_at   timestamptz not null default now()
);

create index if not exists team_applications_created_at_idx
  on team_applications (created_at desc);

create table if not exists ambassador_applications (
  id          bigint generated always as identity primary key,
  name        text        not null,
  email       text        not null,
  university  text        not null,
  github      text,
  plan        text        not null,
  ip_hash     text,
  created_at  timestamptz not null default now()
);

create index if not exists ambassador_applications_created_at_idx
  on ambassador_applications (created_at desc);
