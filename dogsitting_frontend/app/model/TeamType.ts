
export interface TeamType {
  id?: number;
  name?: string;
  normalizedName?: string;
  createdAt?: Date;
  approvedAt?: Date;
}

export interface CreateTeamDto {
  id?: number;
  name?: string;
}

export interface UpdateTeamDto {
  id?: number;
  name?: string;
}

export const emptyValue: TeamType = {
  id: undefined,
  name: undefined,
  normalizedName: undefined,
};
