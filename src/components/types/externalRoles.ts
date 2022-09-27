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

export type { IExternalRoles, IExternalSystemRoles };
