export function useReports() {
  const appConfig = useAppConfig();
  const reportsSections = appConfig.reportsSections;

  const reports = reportsSections.flatMap((section) => section.reports);

  return {
    reports,
    reportsSections
  };
}
