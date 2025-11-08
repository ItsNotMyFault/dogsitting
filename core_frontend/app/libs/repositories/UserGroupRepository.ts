/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { CrudRepository } from "~/libs/repositories/CrudRepository";
import type {
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroupType
} from "../../types/user-group/UserGroupType";

export interface UserGroupRepository
  extends CrudRepository<UserGroupType, number, CreateUserGroupDto, UpdateUserGroupDto> { }
