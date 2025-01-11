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
    console.log("ashvsajlj", error);

    // If it's a backend error with field-specific errors
    if (error.fieldErrors) {
      return {
        success: false,
        error: error.message,
        fieldErrors: {
          password: error.fieldErrors.password
            ? [error.fieldErrors.password]
            : undefined,
          email: error.fieldErrors.email
            ? [error.fieldErrors.email]
            : undefined,
          name: error.fieldErrors.name ? [error.fieldErrors.name] : undefined,
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
        error: (Object.values(zodErrors) as string[][])[0][0],
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
