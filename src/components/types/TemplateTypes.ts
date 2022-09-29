interface ITemplate {
  id?: number | null;
  questions?: string[];
  name: string;
  description: string;
  externalId: string;
}

interface IAddQuestion {
  questionId?: any;
  displayOrder: number;
  isResponseRequired: boolean;
  isItemQuestion: boolean;
  possibleResponses?: string[];
}

export type { ITemplate, IAddQuestion };
