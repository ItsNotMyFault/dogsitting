import type {
  CreateUpdateMediaDto,
  MediaType,
  MediaUploadRequest
} from "~/types/media/MediaType";

import type { CrudRepository } from "#core/libs/repositories/CrudRepository";

export interface MediaRepository extends CrudRepository<MediaType, number, CreateUpdateMediaDto> {
  createMedia(uploadData: MediaUploadRequest): Promise<MediaUploadRequest>;
  downloadMedia(asseid: number, filename: string): Promise<void>;
}
