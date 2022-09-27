import api from "../services/api";
import { IQuestion } from "../types/AdministrationTypes";

const getAll = () => {
  return api.get<Array<IQuestion>>(
    `${process.env.REACT_APP_BASE_URL}/questions`
  );
};

const createQuestion = (body: IQuestion) => {
  return api.post(`${process.env.REACT_APP_BASE_URL}/questions`, body);
};

const updateQuestion = (id: string, body: IQuestion) => {
  return api.put(`${process.env.REACT_APP_BASE_URL}/questions?id=${id}`, body);
};

const QuestionServices = {
  getAll,
  createQuestion,
  updateQuestion,
};

export default QuestionServices;
