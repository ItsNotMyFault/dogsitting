export default defineEventHandler(async (event): Promise<any> => {
  console.log("--------------facebook login--------------", event);

  try {
    console.log("API URL", useRuntimeConfig().apiUrl);

    // Forward to backend API
    const response = await $fetch("/login", {
      baseURL: useRuntimeConfig().public.apiUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    // await setUserSession(event, sessionPayload);

    return response;
  } catch (error: any) {
    console.log(error);

    throw createError({
      statusCode: error.status || 401,
      statusMessage: error.data?.message || "Authentication failed"
    });
  }
});
