export const useSidebar = () => {
  const sidebarOpen = useState("sidebar-open", () => false);
  const sidebarCollapsed = useState("sidebar-collapsed", () => false);
  const sidebarLocked = useState("sidebar-locked", () => false);
  const expandedSections = useState("sidebar-expanded-sections", () => ["Financial Management"]);

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  const closeSidebar = () => {
    sidebarOpen.value = false;
  };

  const openSidebar = () => {
    sidebarOpen.value = true;
  };

  const toggleCollapse = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const toggleLock = () => {
    sidebarLocked.value = !sidebarLocked.value;
  };

  const toggleSection = (sectionLabel: string) => {
    const index = expandedSections.value.indexOf(sectionLabel);
    if (index > -1) {
      expandedSections.value.splice(index, 1);
    } else {
      expandedSections.value.push(sectionLabel);
    }
  };

  const isSectionExpanded = (sectionLabel: string) => {
    return expandedSections.value.includes(sectionLabel);
  };

  return {
    sidebarOpen: readonly(sidebarOpen),
    sidebarCollapsed: readonly(sidebarCollapsed),
    sidebarLocked: readonly(sidebarLocked),
    expandedSections: readonly(expandedSections),
    toggleSidebar,
    closeSidebar,
    openSidebar,
    toggleCollapse,
    toggleLock,
    toggleSection,
    isSectionExpanded
  };
};
