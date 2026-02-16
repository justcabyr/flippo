import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  try {
    // 1. Initialize Supabase Client with Service Role Key
    // Note: Use the Service Role Key to bypass rate limits and email confirmation
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const usersToCreate = 10;
    const results = [];

    // 2. Loop to create 10 users
    for (let i = 1; i <= usersToCreate; i++) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: `user${i}@example.com`,
        password: "password123",
        user_metadata: {
          display_name: `User ${i}`,
          is_seeded: true,
        },
        email_confirm: true, // Automatically confirms the email
      });

      if (error) throw error;
      results.push(data.user);
    }

    return new Response(
      JSON.stringify({ message: `${results.length} users created successfully` }),
      { headers: { "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
