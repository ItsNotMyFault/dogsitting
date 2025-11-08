import { RestCrudRepositoryBase } from "../../libs/repositories/RestCrudRepository";
import type { CreateUserDto, UpdateUserDto, UserType } from "~/types/user/UserType";
// import type { CreateUserDto, UpdateUserDto, UserType } from "../../types/user/UserType";
import type { UserRepository } from "../repositories/UserRepository";

export class UserRepositoryHttp
  extends RestCrudRepositoryBase<UserType, number, CreateUserDto, UpdateUserDto>
  implements UserRepository {
  protected readonly resource = "/user";
}
