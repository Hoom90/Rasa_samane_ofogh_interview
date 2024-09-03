import axios from "axios";
let timerLoading;

export const axiosApi = () => {
  const config = useRuntimeConfig();

  const HttpClient = axios.create({
    baseURL: config.public.baseURL,
    timeout: 2000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  });

  HttpClient.interceptors.request.use(
    (config) => {
      clearTimeout(timerLoading);
      timerLoading = setTimeout(() => {
        // common.globalLoading();
      }, 500);
      //   const token = localStorage.getToken();
      //   if (token) {
      //     config.headers["authorization"] = `Bearer ${token}`;
      //   }
      return config;
    },
    (error) => {
      //   console.log(error); // for debug
      return Promise.reject(error);
    }
  );

  HttpClient.interceptors.response.use(
    (response) => {
      clearTimeout(timerLoading);

      // common.endLoading();

      if (
        response.headers["content-type"] ===
        "application/octet-stream;charset=UTF-8"
      ) {
        return response || null;
      }
      return response || null;
    },
    (error) => {
      clearTimeout(timerLoading);
      // common.endLoading();
      console.error(error);
      return Promise.reject(error.response);
    }
  );

  return HttpClient;
};
