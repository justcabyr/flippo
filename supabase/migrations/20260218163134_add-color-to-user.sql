alter table public.users 
add column current_color text 
check (current_color ~* '^#[a-f0-9]{6}$');

-- Optional: Set a default color
alter table public.users 
alter column current_color set default '#3B82F6';