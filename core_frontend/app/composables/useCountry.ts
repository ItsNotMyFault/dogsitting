const TZ_TO_COUNTRY: Record<string, string> = {
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/New_York": "US",
  "America/Los_Angeles": "US",
  "Europe/London": "GB",
  "Europe/Paris": "FR",
  "Asia/Tokyo": "JP",
  "Australia/Sydney": "AU"
  // extend as needed
};

export function useCountry() {
  const countryCookie = useCookie<string>("country", {
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });

  const country = useState<string>("country", () => {
    if (countryCookie.value) return countryCookie.value;
    if (import.meta.client) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(TZ_TO_COUNTRY[tz]);
      console.log("TIMEZONE", tz);
      return TZ_TO_COUNTRY[tz] ?? "US";
    }
    return "US"; // SSR fallback
  });

  function setCountry(c: string) {
    country.value = c.toUpperCase();
    countryCookie.value = country.value;
  }

  return { country, setCountry };
}
