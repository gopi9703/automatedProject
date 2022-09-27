import api from "../services/api";
import { IFileColumn } from "../types/AdministrationTypes";

const getAll = () => {
  return api.get<Array<IFileColumn>>(
    `${process.env.REACT_APP_BASE_URL}/import-file-column`
  );
};

const createFileColumn = (body: IFileColumn) => {
  return api.post(`${process.env.REACT_APP_BASE_URL}/import-file-column`, body);
};

const updateFileColumn = (id: string, body: IFileColumn) => {
  return api.put(
    `${process.env.REACT_APP_BASE_URL}/import-file-column?id=${id}`,
    body
  );
};

const FileColService = {
  getAll,
  createFileColumn,
  updateFileColumn,
};

export default FileColService;
