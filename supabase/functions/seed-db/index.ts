/// <reference lib="deno.ns" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // 1. DELETE ALL USERS
    const {
      data: { users: existingUsers },
    } = await supabaseAdmin.auth.admin.listUsers();
    for (const user of existingUsers || []) {
      await supabaseAdmin.auth.admin.deleteUser(user.id);
    }

    // 2. CREATE 10 USERS
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: `user${i}@example.com`,
        password: "password123",
        user_metadata: { display_name: `Seed User ${i}` },
        email_confirm: true,
      });
      if (error) throw error;
      users.push(data.user);
    }

    // 3. CREATE 4 FRIENDSHIPS PER USER
    // Logic: Loop through each user and connect them to the next 4 people in the array
    const friendships = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 1; j <= 2; j++) {
        const friendIndex = (i + j) % users.length;
        const [user_a, user_b] = [users[i].id, users[friendIndex].id].sort();

        friendships.push({ user_a, user_b });
      }
    }

    // Use .upsert with ignoreDuplicates to handle the overlapping pairs
    // (since User 1 friending User 2 is the same as User 2 friending User 1)
    const { error: friendError } = await supabaseAdmin
      .from("friendships")
      .upsert(friendships, { onConflict: "user_a, user_b" });

    if (friendError) throw friendError;

    return new Response(JSON.stringify({ message: "Seeded 10 users with 4 friends each" }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
});
