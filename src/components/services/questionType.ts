import api from "../services/api";

const getAll = () => {
  return api.get(`${process.env.REACT_APP_BASE_URL}/question-types`);
};

const QuestionTypeServices = {
  getAll,
};

export default QuestionTypeServices;
