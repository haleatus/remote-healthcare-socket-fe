/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createUserSchema } from "@/app/schema/user";
import { createUserService } from "@/app/services/auth/user-auth.service";

type SignupState = {
  success?: boolean;
  error?: string | null;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  data?: any;
};

export const userSignUp = async (
  prevState: SignupState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    //Validate form data
    const ValidatedData = createUserSchema.parse(data);

    // Call service to create user
    const newUser = await createUserService(ValidatedData);

    return {
      success: true,
      error: null,
      data: newUser,
      fieldErrors: {},
    };
  } catch (error: any) {
    // If it's a backend error (from createUserService)
    if (error.message) {
      const errorMessage = error.message;
      return {
        success: false,
        error: errorMessage, // Pass through the exact backend error message
        fieldErrors: {
          // Map specific backend errors to form fields
          email: errorMessage.includes("email") ? [errorMessage] : undefined,
          password: errorMessage.includes("password")
            ? [errorMessage]
            : undefined,
          name: errorMessage.includes("name") ? [errorMessage] : undefined,
        },
      };
    }

    // Handle Zod validation errors
    if (error.errors) {
      const zodErrors = error.errors.reduce((acc: any, curr: any) => {
        const path = curr.path[0];
        if (!acc[path]) acc[path] = [];
        acc[path].push(curr.message);
        return acc;
      }, {});

      return {
        success: false,
        error: (Object.values(zodErrors) as string[][])[0][0], // Show the first validation error message
        fieldErrors: zodErrors,
      };
    }

    // Fallback error
    return {
      success: false,
      error: "An unexpected error occurred",
      fieldErrors: {},
    };
  }
};
