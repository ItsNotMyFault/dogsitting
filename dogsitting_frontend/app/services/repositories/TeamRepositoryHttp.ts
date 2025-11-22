import { RestCrudRepositoryBase } from "~/libs/repositories/RestCrudRepository";
import Team from "@/model/team";
import type { CreateTeamDto, TeamType, UpdateTeamDto } from "@/model/TeamType";

export class TeamRepositoryHttp
  extends RestCrudRepositoryBase<TeamType, number | string, CreateTeamDto, UpdateTeamDto> {
  protected readonly resource = "/api/team";

  getTeams = async () => {
    return await this.client(`${this.resource}`, { method: "GET" });
  }

  getUserTeams = async (userId: string | number) => {
    return await this.client(`${this.resource}/user/${userId}`, { method: "GET" })
      .then((res: any) => {
        return res.data.map((team: any) => new Team(team))
      })
      .catch((error) => {
        return error.response
      })
  }

  getTeamFiles = (id: string | number) => {
    return this.client(`${this.resource}/${id}/media`)
      .then((res: any) => {
        return res
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  saveTeamFiles = (id: string | number, files: any) => {
    const formData = new FormData()
    const fileList = Array.from(files)
    console.log('fileList', fileList)
    fileList.forEach((file: any) => {
      formData.append('files', file.file)
      formData.append('positions', file.position) // Positions are 1-based
    })

    return this.client(`${this.resource}/${id}/media`, { method: "POST", body: formData })
      .then((res: any) => {
        return res.data
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  getTeamByNormalizedName = (teamNormalizedName: string) => {
    return this.client(`${this.resource}/${teamNormalizedName}`)
      .then((res: any) => {
        return new Team(res)
      })
      .catch((error) => {
        console.error(error);
        const errorr = `${error.response?.data?.message}, ${error.response?.data?.code}`
        throw new Error(errorr)
      });
  }

}