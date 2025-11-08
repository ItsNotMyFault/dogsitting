export interface AppVersionConfig {
  version?: string;
  environment?: string;
  showEnvironmentChip?: boolean;
}

export const useAppVersion = () => {
  const config = useAppConfig();
  const runtimeConfig = useRuntimeConfig();

  // Get version from runtime config (highest priority), app config, or default
  const version = computed((): string => {
    const runtimeVersion = runtimeConfig.public.appVersion as string;
    if (runtimeVersion && runtimeVersion.trim() !== "") {
      return runtimeVersion;
    }
    return config.appVersion?.version || "1.0.0";
  });

  // Get environment from runtime config (highest priority), app config, process env, or default
  const environment = computed((): string => {
    const runtimeEnvironment = runtimeConfig.public.environment as string;
    if (runtimeEnvironment && runtimeEnvironment.trim() !== "") {
      return runtimeEnvironment;
    }
    return config.appVersion?.environment || process.env.NODE_ENV || "development";
  });

  // Determine if environment chip should be shown
  const showEnvironmentChip = computed((): boolean => {
    const env = environment.value.toUpperCase();
    const shouldShow = config.appVersion?.showEnvironmentChip !== false; // Default to true unless explicitly disabled
    return shouldShow && env !== "PROD" && env !== "PRODUCTION";
  });

  // Get environment display name and color
  const environmentDisplay = computed(() => {
    const env = environment.value.toUpperCase();

    switch (env) {
      case "DEV":
      case "DEVELOPMENT":
        return { name: "DEV", color: "bg-primary-500" };
      case "STAGING":
      case "STAGE":
        return { name: "STAGING", color: "bg-primary-500" };
      case "QA":
      case "TEST":
        return { name: "QA", color: "bg-primary-500" };
      case "UAT":
        return { name: "UAT", color: "bg-primary-500" };
      default:
        return { name: env, color: "bg-primary-500" };
    }
  });

  return {
    version,
    environment,
    showEnvironmentChip,
    environmentDisplay
  };
};
