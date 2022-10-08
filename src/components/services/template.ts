import api from "../services/api";
import { IAddQuestion, ITemplate } from "../types/TemplateTypes";

const getAll = () => {
  return api.get<Array<ITemplate>>(
    `${process.env.REACT_APP_BASE_URL}/templates`
  );
};

const createTemplate = (body: ITemplate) => {
  return api.post<Array<ITemplate>>(
    `${process.env.REACT_APP_BASE_URL}/templates`,
    body
  );
};

const templeDetails = (id: any) => {
  return api.get<Array<ITemplate>>(
    `${process.env.REACT_APP_BASE_URL}/templates/${id}`
  );
};

const createQuestion = (id: any, body: IAddQuestion) => {
  return api.post<Array<IAddQuestion>>(
    `${process.env.REACT_APP_BASE_URL}/templates/${id}/questions`,
    body
  );
};

const deleteTemplateQuestion = (id: any, templateId: any) => {
  return api.delete<Array<IAddQuestion>>(
    `${process.env.REACT_APP_BASE_URL}/templates/${templateId}/questions?id=${id}`
  );
};

const TemplateService = {
  getAll,
  createTemplate,
  templeDetails,
  createQuestion,
  deleteTemplateQuestion,
};

export default TemplateService;
