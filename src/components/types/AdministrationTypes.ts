interface IExternalRoles {
  id?: number;
  externalSystem: object;
  name: string;
  code: string;
  description: string;
}

interface IExternalSystemRoles {
  id?: number;
  name: string;
  code: string;
  description: string;
  externalSystemId: number;
}

interface IFileColumn {
  id?: number | null;
  name: string;
  description: string;
}

interface IFileType {
  id?: number | null;
  name: string;
  code: string;
  description: string;
}

interface IQuestionType {
  id?: number | null;
  name: string;
  description: string;
}

interface IQuestion {
  id?: number | null;
  text?: string;
  description?: string;
  externalId?: string;
  isActive?: boolean;
  questionTypeId?: any;
  questionType?: {
    description: string;
    id: number;
    name: string;
  };
  externalSystems?: string[];
}

interface ICommonType {
  id?: number | null;
  text?: string;
  description?: string;
  name?: string;
}

interface IPossibleResponse {
  id?: number | null;
  text: string;
  description: string;
  externalId: any;
  isActive: boolean;
}

interface IProject {
  id: number | null;
  importFileColumns: string[];
  name: string;
  description: string;
  code: any;
}

export type {
  IExternalRoles,
  IExternalSystemRoles,
  IFileColumn,
  IFileType,
  IQuestionType,
  IQuestion,
  ICommonType,
  IPossibleResponse,
  IProject,
};
