export interface SidebarItem {
  label: string;
  icon?: string;
  defaultOpen?: boolean;
  to?: string;
  exact?: boolean;
  children?: SidebarItem[];
}
