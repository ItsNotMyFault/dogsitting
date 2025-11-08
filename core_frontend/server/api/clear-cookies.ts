import { defineEventHandler, parseCookies, setCookie } from "h3";

export default defineEventHandler((event) => {
  const cookies = parseCookies(event);

  for (const name in cookies) {
    setCookie(event, name, "", {
      maxAge: 0,
      path: "/",
      httpOnly: true
    });
  }

  return { message: "All cookies cleared" };
});
