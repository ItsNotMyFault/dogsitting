export default defineNuxtPlugin(() => {
  const api = $fetch.create({ baseURL: "/api/external", credentials: "include" });
  return { provide: { api } };
});
