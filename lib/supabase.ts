import { createClient } from "@supabase/supabase-js";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return deleteItemAsync(key);
  },
};

export const supabase = createClient(
  "https://zmkicobpcmaibevsrxza.supabase.co",
  "sb_publishable_nBglPEuEnAI7x1e-OQXStQ_UMTVbS0K",
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      detectSessionInUrl: false,
    },
  },
);
