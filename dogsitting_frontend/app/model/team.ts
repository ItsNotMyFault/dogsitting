import type { TeamType } from './TeamType'

class Team implements TeamType {

  id?: number | string;
  name?: string;
  normalizedName?: string;
  approvedAt?: Date;
  createdAt?: Date;
  admins?: string;
  teamMedias?: string;
  calendar?: string;
  useAvailabilities?: boolean;
  useUnavailabilities?: boolean;
  maxWeekDaysLodgerCount?: number;
  maxWeekendDaysLodgerCount?: number;

  constructor(data: TeamType) {
    this.id = data?.id;
    this.name = data?.name;
    this.normalizedName = data?.normalizedName;
    this.approvedAt = data?.approvedAt;
    this.createdAt = data?.createdAt;
    this.admins = data?.admins;
    this.teamMedias = data?.teamMedias;
    this.calendar = data?.calendar;
  }
}

export default Team
