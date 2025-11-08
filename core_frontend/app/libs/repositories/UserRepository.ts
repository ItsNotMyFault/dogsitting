/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { CreateUserDto, UpdateUserDto, UserType } from "@/types/user/UserType";
import type { CrudRepository } from "~/libs/repositories/CrudRepository";

export interface UserRepository
  extends CrudRepository<UserType, number, CreateUserDto, UpdateUserDto> { }
