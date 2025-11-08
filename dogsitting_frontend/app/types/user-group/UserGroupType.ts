import type { UserType } from "../user/UserType";

export interface UserGroupType {
  id?: number;
  title?: string;
  description?: string;
  users?: UserType[];
}

export interface CreateUserGroupDto {
  id?: number;
  title?: string;
  description?: string;
  userIds?: number[];
}

export interface UpdateUserGroupDto {
  id?: number;
  title?: string;
  description?: string;
  userIds?: number[];
}

export const emptyCreateUserGroupValue: CreateUserGroupDto = {
  title: undefined,
  description: undefined,
  userIds: []
};
