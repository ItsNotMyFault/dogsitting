export interface TabItem {
  key?: string;
  label: string;
  icon?: any;
  component?: any;
  badge?: string;
  to?: string;
  errorCount?: number;
  metadata?: any;
}

export const emptyTabItem: TabItem = {
  key: undefined,
  label: "Term"
};
