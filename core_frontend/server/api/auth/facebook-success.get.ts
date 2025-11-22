import type { UserType } from '#core/model/user';

export default defineEventHandler(async (event): Promise<any> => {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  console.log("--------------facebook SUCCESS--------------");
  const token = getCookie(event, 'ds_auth_token')
  console.log("token ************* =>", !!token);


  if (!token) {
    return sendRedirect(event, '/auth/login')
  }


  const setUserSessionData = async (user: UserType) => {
    console.log("setUserSessionData", user);

    const sessionPayload = {
      user: {
        id: user?.id ?? 1,
        initials:
          `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase(),
        email: user?.email,
        emailVerified: false, // you can change this if your backend provides it
        firstName: user?.firstName,
        lastName: user?.lastName,
        fullName: user?.firstName,
        name: user?.firstName,
        nickname: user?.firstName,
        tenants: []
      },
      tokenExpiresAt: null,
      tokenType: "Bearer",
      lastRefreshTime: Date.now()
    }
    try {
      await setUserSession(event, sessionPayload);
    } catch (err) {
      console.error("SET USER SESSION ERROR", err);
    }
  }

  try {
    const token = getCookie(event, 'ds_auth_token')
    console.log("GET COOKIE FROM LOGIN faceebook token", token);

    if (!token) {
      return sendRedirect(event, '/login')
    }


    const cookieHeader = getRequestHeader(event, 'cookie');
    console.log("Full URL being called:", `${apiUrl}/authuser`);
    // Forward to backend API
    const response: any = await $fetch(`${apiUrl}/authuser`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { cookie: cookieHeader } : {})
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


    console.log("auth user RESPONSE ----------", response);
    await setUserSessionData(response as UserType)
    return sendRedirect(event, '/')

  } catch (error: any) {
    console.error("===== FULL ERROR DETAILS =====");
    console.error("Error message:", error.message);
    console.error("Error data:", error.data); // This will show the response body
    console.error("Error cause:", error.cause);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    console.error("===============================");
    // throw error; // Don't redirect, let's see what's happening
    return sendRedirect(event, '/auth/login')
  }
});
