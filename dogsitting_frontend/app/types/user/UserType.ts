import type { DateTime } from "luxon";
import type { RoleType } from "../role/RoleType";

export interface UserType {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  language?: string;
  roleId?: number;
  role?: RoleType;
  disabled: boolean;
  timezone?: string;
  userPreferences?: object;
  createdAt?: DateTime;
}

export interface CreateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string | null;
  roleId?: number;
  disabled?: boolean;
}

export interface UpdateUserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  roleId?: number;
  disabled?: boolean;
}

export const emptyCreateUserValue: CreateUserDto = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  phoneNumber: undefined,
  password: undefined,
  roleId: undefined,
  disabled: false
};
