import type { TeamType } from './TeamType'

class Team implements TeamType {
  name = ''

  constructor(data) {
    this.name = data?.Name;
  }
}

export default Team
