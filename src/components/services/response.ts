import api from "../services/api";
import { IPossibleResponse } from "../types/AdministrationTypes";

const getAll = () => {
  return api.get<Array<IPossibleResponse>>(
    `${process.env.REACT_APP_BASE_URL}/possible-responses`
  );
};

const createResponse = (body: IPossibleResponse) => {
  return api.post(`${process.env.REACT_APP_BASE_URL}/possible-responses`, body);
};

const updateResponse = (id: string, body: IPossibleResponse) => {
  return api.put(
    `${process.env.REACT_APP_BASE_URL}/possible-responses?id=${id}`,
    body
  );
};

const ResponseService = {
  getAll,
  createResponse,
  updateResponse,
};

export default ResponseService;
