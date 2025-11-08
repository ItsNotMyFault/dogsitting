import { RestCrudRepositoryBase } from "../../libs/repositories/RestCrudRepository";
import type { CommentType, CreateUpdateCommentDto } from "~/types/comment/CommentType";
import type { FetchParams } from "~/types/core/FetchType";

export class CommentRepositoryHttp extends RestCrudRepositoryBase<
  CommentType,
  number,
  CreateUpdateCommentDto
> {
  protected resource = "/comment";

  fetchComments = async (fkId: number, activeProperty = "") => {
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
  };

  setResource(resourceOverride: string) {
    this.resource = resourceOverride;
  }
}
