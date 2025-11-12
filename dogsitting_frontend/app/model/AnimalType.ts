
export interface AnimalType {
  id?: number;
  name?: string;
  birthdate?: Date;
  species?: string;
  breed?: string;
  approvedAt?: Date;
}

export interface CreateAnimalDto {
  id?: number;
  name?: string;
}

export interface UpdateAnimalDto {
  id?: number;
  name?: string;
}

export const emptyValue: AnimalType = {
  id: undefined,
  name: undefined,
};
