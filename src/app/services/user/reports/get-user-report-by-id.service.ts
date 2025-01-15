import { endpoints } from "@/core/contants/endpoints";

export const getUserReportByIdService = async (
  accessToken: string,
  id: number
) => {
  try {
    const res = await fetch(
      endpoints.user.reports.getReportById.replace(":id", id.toString()),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      // Instead of throwing, return null or an error object
      if (res.status === 404) {
        return {
          statusCode: 404,
          message: "Record not found",
          data: null,
        };
      }
      return null;
    }

    // Safely parse JSON
    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return null;
    }

    return data;
  } catch (error) {
    // Log network errors but don't throw
    console.error("Network error in getUserReportByIdService:", error);
    return null;
  }
};
