import { User } from "@renderer/types";
import { API } from "./api";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await API.post("api/auth/login", {
    email,
    password,
  });

  return data as User;
};

export { login };
