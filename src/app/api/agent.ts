import axios, { AxiosError, AxiosResponse } from "axios";
import { resolve } from "path/posix";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5232/api/"; // funkcja dodana do zasymulowania ładowania danych z bazy

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
 async (response) => {
   await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelSateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelSateErrors.push(data.errors[key]);
            }
          }
          throw modelSateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        history.push(
          {
            pathname: "/server-error",
            state: {error: data}
          });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
