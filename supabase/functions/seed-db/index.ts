import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async () => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // --- 1. DELETE ALL EXISTING USERS ---
    const { data: { users: existingUsers }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) throw listError

    for (const user of existingUsers) {
      await supabaseAdmin.auth.admin.deleteUser(user.id)
    }

    // --- 2. CREATE 10 NEW USERS ---
    const newUsers = []
    for (let i = 1; i <= 10; i++) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: `user${i}@example.com`,
        password: 'password123',
        user_metadata: { display_name: `User ${i}` },
        email_confirm: true
      })
      if (error) throw error
      newUsers.push(data.user)
    }

    // --- 3. ADD 3 FRIENDSHIPS ---
    // We'll link User 1 with Users 2, 3, 4, 5 and 6
    const user1 = newUsers[0]
    const friendsToMake = [newUsers[1], newUsers[2], newUsers[3], newUsers[4], newUsers[5]];

    for (const friend of friendsToMake) {
      // We manually implement the LEAST/GREATEST logic here to satisfy your DB constraint
      const [user_a, user_b] = [user1.id, friend.id].sort()

      const { error: friendError } = await supabaseAdmin
        .from('friendships')
        .insert({ user_a, user_b })

      if (friendError) throw friendError
    }

    return new Response(
      JSON.stringify({ 
        message: "Database reset: Users deleted, 10 created, 5 friendships established." 
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    )

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    )
  }
})