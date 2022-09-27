import api from "../services/api";
import { IProject } from "../types/AdministrationTypes";

const getAll = () => {
  return api.get<Array<IProject>>(
    `${process.env.REACT_APP_BASE_URL}/project-types`
  );
};

const projectTypes = (id: string) => {
  return api.get<Array<IProject>>(
    `${process.env.REACT_APP_BASE_URL}/project-types/${id}`
  );
};

const ProjectService = {
  getAll,
  projectTypes,
};

export default ProjectService;
