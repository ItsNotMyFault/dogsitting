export const useTenant = () => {
  const { user: nuxtUser } = useUserSession();
  const config = useRuntimeConfig();
  // Note: useTheme() is not available in this context, using fallback color
  const getColor = (color: string, shade: string) => "#0B1133";

  const currentTenantId = useCookie<string>(config.public.tenant.cookieName, {
    default: () => "",
    maxAge: 60 * 60 * 24 * 30, // Match backend: 30 days
    secure: config.cookies?.secure ?? process.env.NODE_ENV === "production",
    sameSite: (config.cookies?.sameSite as "lax" | "strict" | "none") ?? "lax",
    httpOnly: false,
    ...(config.cookies?.domain && { domain: config.cookies.domain })
  });

  // Get user's available tenants from session
  const availableTenants = computed(() => {
    if (!nuxtUser.value) return [];

    try {
      if (nuxtUser.value && nuxtUser.value.tenants) {
        return nuxtUser.value.tenants.map((tenant: any) => ({
          id: tenant.id,
          name: tenant.name,
          domain: tenant.domain,
          type: tenant.type || "Organization", // Add missing type property
          isActive: true,
          initials: tenant.name.slice(0, 2).toUpperCase(),
          color: getColor("primary", "900") || "#0B1133",
          status: "active" as "active" | "maintenance" | "inactive"
        }));
      }
    } catch (error) {
      console.error("Failed to get available tenants:", error);
    }

    return [];
  });

  // Current tenant object
  const currentTenant = computed(() => {
    if (!currentTenantId.value || !availableTenants.value.length) return null;

    return (
      availableTenants.value.find((tenant: any) => tenant.id === currentTenantId.value) || null
    );
  });

  const hasTenant = computed(() => !!currentTenant.value);

  // Current tenant info
  const tenantInfo = computed(() => {
    if (!currentTenant.value) return null;

    return {
      id: currentTenant.value.id,
      name: currentTenant.value.name,
      domain: currentTenant.value.domain,
      prettyName: currentTenant.value.name // Simplified for now
    };
  });

  // Initialize tenant (set to first available if none selected)
  const initializeTenant = async () => {
    // Only initialize on client side to avoid SSR issues
    if (import.meta.server) return;

    if (!currentTenantId.value && availableTenants.value.length > 0) {
      const firstTenant = availableTenants.value[0];
      if (firstTenant) {
        currentTenantId.value = firstTenant.id;
        // The tenant ID is automatically handled by the cookie and API plugins
      }
    }
  };

  // Switch tenant
  const switchTenant = async (tenantId: string) => {
    // Verify the tenant is available to the user
    const tenant = availableTenants.value.find((t) => t.id === tenantId);
    if (!tenant) {
      throw new Error("Tenant not available or user does not have access");
    }

    // Update cookie - the API plugins will automatically pick this up
    currentTenantId.value = tenantId;

    // Note: Page reload should be handled by the calling component
  };

  // Find tenant by ID using simple functional approach
  const findTenantById = async (tenantId: string) => {
    const tenants = availableTenants.value;
    return tenants.find((tenant) => tenant.id === tenantId);
  };

  // Find tenant by domain using simple functional approach
  const findTenantByDomain = async (domain: string) => {
    const tenants = availableTenants.value;
    return tenants.find((tenant) => tenant.domain.toLowerCase() === domain.toLowerCase());
  };

  return {
    // State
    currentTenant: readonly(currentTenant),
    currentTenantId: readonly(currentTenantId),
    tenantInfo: readonly(tenantInfo),
    hasTenant: readonly(hasTenant),
    availableTenants: readonly(availableTenants),

    // Actions
    switchTenant,
    initializeTenant,

    // Service methods
    findTenantById,
    findTenantByDomain
  };
};
