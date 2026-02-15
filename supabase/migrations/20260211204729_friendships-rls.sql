alter table public.friendships enable row level security;

create policy "Users can view their own friendships"
on public.friendships
for select
to authenticated
using (
  (select auth.uid()) = user_a 
  or 
  (select auth.uid()) = user_b
);



-- create policy "Users can view their friends' profiles"
-- on public.users
-- for select
-- to authenticated
-- using (
--   -- 1. You can always see your own profile
--   (select auth.uid()) = id
--   or 
--   -- 2. Or you can see them if a friendship exists
--   exists (
--     select 1 from public.friendships
--     where (
--       (user_a = (select auth.uid()) and user_b = id)
--       or 
--       (user_b = (select auth.uid()) and user_a = id)
--     )
--   )
-- );


create policy "Users can view their friends' profiles"
on public.users for select to authenticated
using (

  -- Allow me to see anyone in my "Combined Friends List"
  id in (
    select user_b from public.friendships where user_a = (select auth.uid())
    union
    select user_a from public.friendships where user_b = (select auth.uid())
  )
);