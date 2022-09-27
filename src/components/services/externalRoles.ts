import api from "../services/api";
import {
  IExternalRoles,
  IExternalSystemRoles,
} from "../types/AdministrationTypes";

const getAll = () => {
  return api.get<Array<IExternalRoles>>(
    `${process.env.REACT_APP_BASE_URL}/external-role`
  );
};

const createRoles = (body: IExternalSystemRoles) => {
  return api.post<Array<IExternalSystemRoles>>(
    `${process.env.REACT_APP_BASE_URL}/external-role`,
    body
  );
};

const updateRoles = (id: string, body: IExternalSystemRoles) => {
  return api.put<Array<IExternalSystemRoles>>(
    `${process.env.REACT_APP_BASE_URL}/external-role?id=${id}`,
    body
  );
};

const RoleService = {
  getAll,
  createRoles,
  updateRoles,
};

export default RoleService;
