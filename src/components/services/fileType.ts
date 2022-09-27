import api from "../services/api";
import { IFileType } from "../types/AdministrationTypes";

const getAll = () => {
  return api.get<Array<IFileType>>(
    `${process.env.REACT_APP_BASE_URL}/import-file-types`
  );
};

const FileTypeService = {
  getAll,
};

export default FileTypeService;
