import { RestCrudRepositoryBase } from "../../libs/repositories/RestCrudRepository";
import type {
  CreateRoleDto,
  PossibleRoleType,
  RoleType,
  UpdateRoleDto
} from "../../types/role/RoleType";
import type { RoleRepository } from "../repositories/RoleRepository";

export class RoleRepositoryHttp
  extends RestCrudRepositoryBase<RoleType, number, CreateRoleDto, UpdateRoleDto>
  implements RoleRepository {
  protected readonly resource = "/role";

  getPossibleRoles(): Promise<Array<PossibleRoleType>> {
    return this.client(`${this.resource}/possible-roles`, { method: "GET" });
  }
}
