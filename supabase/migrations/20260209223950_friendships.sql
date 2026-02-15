create table public.friendships (
  user_a uuid references public.users(id) on delete cascade not null,
  user_b uuid references public.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- The core "Orderless" logic: user_a must always be the smaller UUID
  constraint friendships_ordered check (user_a < user_b),
  primary key (user_a, user_b)
);

-- Index for the second column
-- This allows Postgres to quickly find rows where the user is 'user_b'
create index if not exists idx_friendships_user_b on public.friendships(user_b);

alter table friendships enable row level security;

create or replace function public.add_friend(friend_id uuid)
returns void as $$
begin
  insert into public.friendships (user_a, user_b)
  values (
    least(auth.uid(), friend_id),
    greatest(auth.uid(), friend_id)
  );
end;
$$ language plpgsql security definer;