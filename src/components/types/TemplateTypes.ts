interface ITemplate {
  id?: number | null;
  questions?: string[];
  name: string;
  description: string;
  externalId: string;
}

interface IAddQuestion {
  id?: number | null;
  questionId?: any;
  displayOrder: number;
  isResponseRequired: boolean;
  isItemQuestion: boolean;
  possibleResponses?: string[];
  question?: {
    questionType: {
      name: string;
    };
  };
}

interface IPossibleResponseModal {
  possibleResponseId: number | null;
  displayOrder: number | null;
}

export type { ITemplate, IAddQuestion, IPossibleResponseModal };
