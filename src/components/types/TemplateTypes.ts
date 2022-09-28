interface ITemplate {
  id?: number | null;
  questions?: string[];
  name: string;
  description: string;
  externalId: string;
}

export type { ITemplate };
