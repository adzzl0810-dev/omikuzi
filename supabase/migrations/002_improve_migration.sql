-- Improved Migration Function
create or replace function public.migrate_anonymous_readings(
  anonymous_user_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
  target_user_id uuid;
  anon_readings_count int;
begin
  -- Get the ID of the currently signed-in user
  target_user_id := auth.uid();

  -- Prevent migration if not signed in
  if target_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- Prevent self-migration
  if target_user_id = anonymous_user_id then
    return;
  end if;

  -- 1. Count readings to be migrated
  select count(*) into anon_readings_count
  from public.readings
  where user_id = anonymous_user_id;

  -- 2. Update readings ownership
  update public.readings
  set user_id = target_user_id
  where user_id = anonymous_user_id;

  -- 3. Update Zazen Sessions ownership
  update public.zazen_sessions
  set user_id = target_user_id
  where user_id = anonymous_user_id;
  
  -- 4. Update Goshuin Entries ownership
  update public.goshuin_entries
  set user_id = target_user_id
  where user_id = anonymous_user_id;

  -- 5. Update Ema Offerings ownership
  update public.ema_offerings
  set user_id = target_user_id
  where user_id = anonymous_user_id;

  -- 6. Update user stats
  if anon_readings_count > 0 then
    update public.users
    set readings_count = readings_count + anon_readings_count
    where id = target_user_id;
  end if;

  -- (Optional) We could delete the anon user, but Supabase auth users are hard to delete from here.
  -- We just leave the data orphaned or cleaned up by a separate cron job.
end;
$$;
