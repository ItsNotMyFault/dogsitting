import type { FormType } from "#core/types/form/FormType";
import type { MediaType } from "#core/types/media/MediaType";

interface MediaEntryType {
  id: number;
  media: MediaType;
  activeProperty: string;
}

interface CreateUpdateMediaEntryDto {
  id?: number;
  targetType?: string;
  targetId?: number;
  displayFileName?: string;
  mediaId?: number;
}

type MediaEntryFormType = FormType<CreateUpdateMediaEntryDto>;

const emptyValue: CreateUpdateMediaEntryDto = {
  id: undefined,
  targetType: undefined,
  targetId: undefined,
  displayFileName: undefined,
  mediaId: undefined
};

export { emptyValue, type CreateUpdateMediaEntryDto, type MediaEntryFormType, type MediaEntryType };
