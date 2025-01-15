import { endpoints } from "@/core/contants/endpoints";

export const getUserReportsService = async (accessToken: string) => {
  try {
    const res = await fetch(endpoints.user.reports.getAllReports, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return {
          statusCode: 404,
          message: "No reports found",
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
    console.error("Network error in getUserReportsService:", error);
    return null;
  }
};
