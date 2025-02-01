/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signInAdminSchema } from "@/app/schema/admin";
import { signInAdminService } from "@/app/services/auth/admin-auth.service";
import {
  AuthErrorResponse,
  AuthSuccessResponse,
} from "@/core/interface/auth.interface";
import { cookies } from "next/headers";
import { z } from "zod";

export async function adminSignIn(
  formData: z.infer<typeof signInAdminSchema>
): Promise<{
  success: boolean;
  data?: AuthSuccessResponse;
  error?: AuthErrorResponse;
}> {
  try {
    const cookiesStore = await cookies();
    cookiesStore.delete("accessToken");
    cookiesStore.delete("userData");
    // Validate the input data
    const validatedData = signInAdminSchema.parse(formData);

    // Call the service
    const response = (await signInAdminService(
      validatedData
    )) as AuthSuccessResponse;

    // Set the access token in an HTTP-only cookie
    if ("data" in response && response.data.accessToken) {
      const cookiesStore = await cookies();

      // Set access token cookie
      cookiesStore.set("adminAccessToken", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      // Set user data cookie
      if (response.data.user) {
        cookiesStore.set(
          "adminData",
          JSON.stringify({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            isVerified: response.data.user.isVerified,
            isAdmin: response.data.user.isAdmin,
            avatar: response.data.user.avatar,
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60, // 7 days
          }
        );
      }
    }

    return {
      success: true,
      data: response as AuthSuccessResponse,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          statusCode: 400,
          timestamp: new Date().toISOString(),
          message: error.errors.map((e) => `${e.message}`).join(", "),
          error: error.errors.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.path[0]]: curr.message,
            }),
            {}
          ),
          data: {},
        },
      };
    }

    // Handle service errors
    if (error instanceof Error && "fieldErrors" in error) {
      return {
        success: false,
        error: {
          statusCode: 400,
          timestamp: new Date().toISOString(),
          message: error.message,
          error: (error as any).fieldErrors,
          data: {},
        },
      };
    }

    // Handle unexpected errors
    return {
      success: false,
      error: {
        statusCode: 500,
        timestamp: new Date().toISOString(),
        message: "An unexpected error occurred",
        error: {},
        data: {},
      },
    };
  }
}

export async function adminSignOut(): Promise<{
  success: boolean;
  error?: {
    message: string;
  };
}> {
  try {
    const cookiesStore = await cookies();

    // Remove both cookies by setting their maxAge to 0
    cookiesStore.delete("adminAccessToken");
    cookiesStore.delete("adminData");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to sign out", error);
    return {
      success: false,
      error: {
        message: "Failed to sign out",
      },
    };
  }
}
