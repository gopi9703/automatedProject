import api from "../services/api";

const getAll = () => {
  return api.get(`${process.env.REACT_APP_BASE_URL}/notification-types`);
};

const NotificationServices = {
  getAll,
};

export default NotificationServices;
