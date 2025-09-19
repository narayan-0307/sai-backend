import { useMutation } from "@tanstack/react-query";
import { login } from "@renderer/api/auth";
import { useAuthStore } from "@renderer/zustand/authStore";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const useLoginMutation = () => {
  const loginUser = useAuthStore((state) => state.login);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Successfully logged in");
      loginUser(data);
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};

export { useLoginMutation };
