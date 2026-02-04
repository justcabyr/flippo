import { supabase } from "@/lib/supabase";
import { User } from "@/db/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>; // Updated signature
  signup: (email: string, password: string, name: string) => Promise<void>; // Updated signature
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Sync session on load and on any auth change
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        if (session?.user) {
          const { data: user } = await supabase
            .from("users")
            .select()
            .eq("id", session.user.id)
            .single();
            
          setUser(user);
        } else {
          setUser(null);
        }
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Login using sign in with password
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  // 3. Logout using Supabase signOut
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
