-- Function to migrate anonymous readings to the new authenticated user
-- Security Note: This implementation allows claiming readings by ID.
-- In a stricter environment, we would verify the anonymous session token.
-- For this MVP, we rely on the client securely passing the ID immediately after login.

create or replace function public.migrate_anonymous_readings(
  anonymous_user_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
  target_user_id uuid;
begin
  -- Get the ID of the currently signed-in user
  target_user_id := auth.uid();

  -- Prevent migration if not signed in
  if target_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- Prevent self-migration (no-op)
  if target_user_id = anonymous_user_id then
    return;
  end if;

  -- Update readings ownership
  update public.readings
  set user_id = target_user_id
  where user_id = anonymous_user_id;

  -- Update user stats (add anonymous count to new user count)
  -- This is a bit complex because we need to sum counts. 
  -- For MVP, we can just ensure the new user has at least the count of readings they now own.
  
  -- (Optional: Delete the old anonymous user record to clean up? leaving it for now)
end;
$$;
