import type { FormType } from "#core/types/form/FormType";

interface ConfigType {
  id: number;
  key: string;
  value: string;
  description: string;
  module: string;
  group: string;
}

interface CreateUpdateConfigDto {
  id?: number;
  key?: string;
  value?: string;
  description?: string;
}

type ConfigFormType = FormType<CreateUpdateConfigDto>;

const emptyValue: CreateUpdateConfigDto = {
  id: undefined,
  key: undefined,
  value: undefined,
  description: undefined
};

export { emptyValue, type ConfigFormType, type ConfigType, type CreateUpdateConfigDto };
