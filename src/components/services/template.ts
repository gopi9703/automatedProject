import api from "../services/api";
import { ITemplate } from "../types/TemplateTypes";

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

const TemplateService = {
  getAll,
  createTemplate,
  templeDetails,
};

export default TemplateService;
