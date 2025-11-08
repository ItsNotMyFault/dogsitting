export default defineEventHandler(async (event): Promise<any> => {
  console.log("--------------facebook login--------------", event);

  try {
    console.log("API URL", useRuntimeConfig().apiUrl);
    const apiUrl = useRuntimeConfig().public.apiUrl;
    const response = await $fetch(`${apiUrl}/login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("response", response);


    return response;
  } catch (error: any) {
    console.log(error);

    throw createError({
      statusCode: error.status || 401,
      statusMessage: error.data?.message || "Authentication failed"
    });
  }
});
