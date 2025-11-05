interface MediaType {
  id: number;
  displayFileName: string;
  displayFileExtension: string;
  fileSize: number;
  fileType: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

interface MediaUploadRequest {
  file: File;
  displayFileName: string;
  id?: number;
}

interface CreateUpdateMediaDto {
  id?: null;
  filePath: null;
}

const emptyValue: CreateUpdateMediaDto = {
  id: null,
  filePath: null
};

export { emptyValue, type CreateUpdateMediaDto, type MediaType, type MediaUploadRequest };
