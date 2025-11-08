/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { CrudRepository } from "~/libs/repositories/CrudRepository";
import type { CreateRoleDto, RoleType, UpdateRoleDto } from "../../types/role/RoleType";

export interface TeamRepository
  extends CrudRepository<RoleType, number, CreateRoleDto, UpdateRoleDto> { }
