import { IBilling } from "../types/AdministrationTypes";
import api from "./api";

const getAll = (data: any) => {
  return api.get<Array<IBilling>>(
    `${process.env.REACT_APP_BASE_URL}/billingcode?${data}`
  );
};

const createBillingCode = (body: IBilling) => {
  return api.post(`${process.env.REACT_APP_BASE_URL}/billingcode`, body);
};

const updateBillingCode = (id: string, body: IBilling) => {
  return api.put(`${process.env.REACT_APP_BASE_URL}/billingcode/${id}`, body);
};

const BillingCodeService = {
  getAll,
  createBillingCode,
  updateBillingCode,
};

export default BillingCodeService;
