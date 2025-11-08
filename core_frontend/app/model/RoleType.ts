export enum PermissionAction {
  Manage = "Manage",
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  List = "List"
}

export interface Module {
  value: string;
  label: string;
}

export interface RoleType {
  id?: number;
  title?: string;
  description?: string;
  abilitiesAsJson?: string;
  abilities?: Record<string, PermissionAction[]>;
}

export interface AbilityPermission {
  [key: number]: boolean;
}

export interface Abilities {
  [subject: string]: PermissionAction[];
}

export interface CreateRoleDto {
  id?: number;
  title?: string;
  description?: string;
  abilities?: Abilities;
}

export interface UpdateRoleDto {
  id?: number;
  title?: string;
  description?: string;
  abilities?: Abilities;
}

export interface PossibleRoleType {
  action: PermissionAction;
  actionName: string;
  subject: string;
  plugin: string;
}

export const emptyValue: RoleType = {
  id: undefined,
  title: undefined,
  description: undefined,
  abilities: {}
};
