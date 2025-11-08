import type { MediaRepository } from "../../libs/repositories/MediaRepository";
import { RestCrudRepositoryBase } from "../../libs/repositories/RestCrudRepository";
import type {
  CreateUpdateMediaDto,
  MediaType,
  MediaUploadRequest
} from "~/types/media/MediaType";

export class MediaRepositoryHttp
  extends RestCrudRepositoryBase<MediaType, number, CreateUpdateMediaDto>
  implements MediaRepository {
  protected readonly resource = "/media";

  createMedia(uploadData: MediaUploadRequest): Promise<MediaUploadRequest> {
    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("displayFileName", uploadData.displayFileName);

    return this.client<MediaUploadRequest>(`${this.resource}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        accept: "text/plain"
      }
    });
  }
  downloadMedia(id: number, filename: string): Promise<void> {
    const result = this.client<any>(`${this.resource}/${id}`, {
      method: "GET",
      headers: {
        responseType: "blob"
      }
    });

    return result;
  }
}
