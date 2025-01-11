import { createUserSchema } from "@/app/schema/user";
import { endpoints } from "@/core/contants/endpoints";
import { z } from "zod";

export const createUserService = async (
  data: z.infer<typeof createUserSchema>
) => {
  console.log("data", data);

  const res = await fetch(endpoints.auth.user.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const newUser = await res.json();

  if (!res.ok) {
    throw new Error(newUser.message || "Signup failed");
  }
  return newUser;
};
