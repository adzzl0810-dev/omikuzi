create table if not exists public.zazen_sessions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    course_id text not null,
    duration_seconds integer not null,
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.zazen_sessions enable row level security;

create policy "Users can insert their own zazen sessions"
    on public.zazen_sessions for insert
    with check (auth.uid() = user_id);

create policy "Users can view their own zazen sessions"
    on public.zazen_sessions for select
    using (auth.uid() = user_id);
