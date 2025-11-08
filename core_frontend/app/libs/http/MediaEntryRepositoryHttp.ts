import { RestCrudRepositoryBase } from "../../libs/repositories/RestCrudRepository";
import type { PaginatedResult, FetchParams } from "~/types/core/FetchType";
import type {
  CreateUpdateMediaEntryDto,
  MediaEntryType
} from "~/types/media/MediaEntryType";

export class MediaEntryRepositoryHttp extends RestCrudRepositoryBase<
  MediaEntryType,
  number,
  CreateUpdateMediaEntryDto
> {
  protected resource = "/media-entry";

  setResource(resourceOverride: string) {
    this.resource = resourceOverride;
  }

  fetchMedias(fkId: number, activeProperty = ""): Promise<PaginatedResult<MediaEntryType>> {
    const defaultSearchParam = [
      {
        value: fkId.toString(),
        model: "TargetId",
        searchOperator: "equals",
        dataType: "int",
        id: "FkID"
      }
    ];
    const params = {
      page: 0,
      limit: 100,
      searchParam: defaultSearchParam,
      sortBy: {},
      targetType: activeProperty
    } as FetchParams;

    return this.search(params);
  }
}
