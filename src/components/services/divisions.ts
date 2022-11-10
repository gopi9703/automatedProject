import api from "../services/api";
import IDivisionData from "../types/division";

const getAll = () => {
  return api.get<Array<IDivisionData>>(
    `${process.env.REACT_APP_BASE_URL}/divisions`
  );
};

const createDivison = (body: IDivisionData) => {
  return api.post(`${process.env.REACT_APP_BASE_URL}/divisions`, body);
};

const updateDivison = (id: string, body: IDivisionData) => {
  return api.put(`${process.env.REACT_APP_BASE_URL}/divisions/${id}`, body);
};

const DivisionService = {
  getAll,
  createDivison,
  updateDivison,
};

export default DivisionService;
