import type { FormType } from "#core/types/form/FormType";

interface CommentType {
  id: number;
  content: string;
  userName: string;
  isSystemComment: boolean;
  isEdited: boolean;
  createdAt: Date;
  createdBy: number;
}

interface CreateUpdateCommentDto {
  id?: number;
  content?: string;
  isEdited?: boolean;
  targetType?: string;
  targetId?: number;
}

const emptyValue: CreateUpdateCommentDto = {
  id: undefined,
  content: undefined,
  isEdited: undefined,
  targetType: undefined,
  targetId: undefined
};

type CommentFormType = FormType<CreateUpdateCommentDto>;

export { emptyValue, type CommentFormType, type CommentType, type CreateUpdateCommentDto };
