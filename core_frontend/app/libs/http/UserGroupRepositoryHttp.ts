import { RestCrudRepositoryBase } from "../../libs/repositories/RestCrudRepository";
import type {
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroupType
} from "../../types/user-group/UserGroupType";
import type { UserGroupRepository } from "../repositories/UserGroupRepository";

export class UserGroupRepositoryHttp
  extends RestCrudRepositoryBase<UserGroupType, number, CreateUserGroupDto, UpdateUserGroupDto>
  implements UserGroupRepository {
  protected readonly resource = "/usergroup";
}
