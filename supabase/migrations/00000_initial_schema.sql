
-- Create users table (extends Supabase Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  readings_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for users
alter table public.users enable row level security;

create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- Create readings table (Omikuji results)
create table public.readings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  input_text text,
  fortune_level text,
  advice_json jsonb,
  lucky_item text,
  god_name text,
  god_image_url text,
  is_paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for readings
alter table public.readings enable row level security;

create policy "Users can view their own readings" on public.readings
  for select using (auth.uid() = user_id);

create policy "Users can insert their own readings" on public.readings
  for insert with check (auth.uid() = user_id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
