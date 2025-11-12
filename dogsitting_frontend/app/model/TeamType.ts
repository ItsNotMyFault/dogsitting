
export interface TeamType {
  id?: number | string;
  name?: string;
  normalizedName?: string;
  createdAt?: Date;
  approvedAt?: Date;
  admins?: string;
  teamMedias?: string;
  calendar?: string;
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
