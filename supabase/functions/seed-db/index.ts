/// <reference lib="deno.ns" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const getRandomColor = () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;

    // 1. DELETE ALL USERS
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
    const existingUsers = listData?.users ?? [];

    for (const u of existingUsers) {
      await supabaseAdmin.auth.admin.deleteUser(u.id);
    }

    // 2. CREATE 10 USERS
    const createdUsers = [];
    for (let i = 1; i <= 10; i++) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: `user${i}@example.com`,
        password: "password123",
        user_metadata: { display_name: `Seed User ${i}` },
        email_confirm: true,
      });

      if (error) throw error;
      const newUser = data.user; // Define it clearly here

      if (newUser) {
        // Update the public.users table with the random color
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({ current_color: getRandomColor() })
          .eq("id", newUser.id);

        if (updateError) throw updateError;
        createdUsers.push(newUser);
      }
    }

    // 3. CREATE FRIENDSHIPS
    const friendships = [];
    for (let i = 0; i < createdUsers.length; i++) {
      for (let j = 1; j <= 3; j++) {
        const friendIndex = (i + j) % createdUsers.length;
        const [user_a, user_b] = [createdUsers[i].id, createdUsers[friendIndex].id].sort();
        friendships.push({ user_a, user_b });
      }
    }

    if (friendships.length > 0) {
      const { error: friendError } = await supabaseAdmin
        .from("friendships")
        .upsert(friendships, { onConflict: "user_a, user_b" });

      if (friendError) throw friendError;
    }

    return new Response(JSON.stringify({ message: "Seeded 10 users with 6 friends each" }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
});
