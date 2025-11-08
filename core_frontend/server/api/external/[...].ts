import { createError, defineEventHandler, getCookie } from "h3";
import { ensureFreshAccessToken, getAccessToken, requireSession } from "../../util-auth";

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig(event) as any;
  const apiUrl = useRuntimeConfig().public.apiUrl;

  console.log("---------------- EXTERNAL API CALL");


  // const apiUrl: string | undefined = cfg.apiUrl;
  if (!apiUrl) throw createError({ statusCode: 500, statusMessage: "Missing upstream base URL" });
  const upstreamPath = event.path.replace(/^\/api\/external/, "");
  const target = `${apiUrl}${upstreamPath}`;

  // 1) Require session (401 if none)
  await requireSession(event);

  // const tenantCookieName = cfg.public?.tenant?.cookieName || "tenantId";
  // const tenantHeaderName = cfg.public?.tenant?.headerName || "X-Tenant-Unique-Identifier";
  // const tenantId = getCookie(event, tenantCookieName);

  const doRequest = async () => {
    // Get fresh token for each request (handles refresh internally)
    // const token = await getAccessToken(event);
    const token = getCookie(event, 'ds_auth_token')
    console.log("token-------", token);
    console.log("target-------", target);

    return await proxyRequest(event, target, {
      headers: {
        ...getRequestHeaders(event),
        // ...(token && { Authorization: `Bearer ${token}` }),
        // ...(tenantId ? { [tenantHeaderName]: tenantId } : {})
      }
    });
  };

  // 3) Proxy with automatic token refresh
  try {
    return await doRequest();
  } catch (err: any) {
    const status = err?.response?.status ?? err?.statusCode ?? err?.status;
    if (status === 401) {
      // Try one more time - ensureFreshAccessToken will handle refresh if needed
      try {
        return await doRequest();
      } catch (err2: any) {
        console.log("Upstream API 2nd 401 failure", err2);
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
      }
    }

    const msg =
      err?.response?._data?.message ||
      err?.response?.statusText ||
      err?.statusMessage ||
      "Upstream API error";
    throw createError({ statusCode: status || 500, statusMessage: msg });
  }
});
