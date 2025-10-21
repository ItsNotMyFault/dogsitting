export default defineEventHandler(async (event): Promise<any> => {

  console.log("--------------facebook SUCCESS--------------", event);
  const token = getCookie(event, 'ds_auth_token')

  if (!token) {
    return sendRedirect(event, '/auth/login')
  }



  try {
    const token = getCookie(event, 'ds_auth_token')
    console.log("GET COOKIE FROM LOGIN faceebook token", token);

    if (!token) {
      return sendRedirect(event, '/login')
    }

    const apiUrl = useRuntimeConfig().public.apiUrl;
    console.log("Full URL being called:", `${apiUrl}/authuser`);
    // Forward to backend API
    const response = await $fetch("/authuser", {
      baseURL: apiUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      // ignoreResponseError: true,
      onRequest({ request, options }) {
        console.log('Request:', request);
        console.log('Options:', options);
      },
      onRequestError({ request, error }) {
        console.log('Request Error:', error);
        console.log('Request:', request);
      },
      onResponse({ response }) {
        console.log('Response:', response.status, response.statusText);
      },
      onResponseError({ response }) {
        console.log('Response Error:', response.status, response.statusText);
      }
    });
    console.log("auth user", response);
    // await setUserSession(event, sessionPayload);
    return response;


  } catch (error: any) {
    console.log("===== FULL ERROR DETAILS =====");
    console.log("Error message:", error.message);
    console.log("Error data:", error.data); // This will show the response body
    console.log("Error cause:", error.cause);
    console.log("Error stack:", error.stack);
    console.log("Full error object:", JSON.stringify(error, null, 2));
    console.log("===============================");
    // throw error; // Don't redirect, let's see what's happening
    return sendRedirect(event, '/auth/login')
  }
});
