import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../rpc";
import { getFriends } from "../users";

export function useFriends() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(user!.id),
  });
}

export function useAddFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFriend,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}
