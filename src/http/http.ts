import Vue from "vue";
import { UserModule } from '@/store/modules/user'
import { MessageBox, Message } from "element-ui";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosAdapter,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
} from "axios";
const config = Vue.prototype.$gConfig;
const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 60000
});

instance.interceptors.request.use(
  config => {
    console.log(UserModule.token)
    const baseToken = UserModule.token;
    if (baseToken) {
      config.headers["Authorization"] = "" + baseToken;
    }

    if (config.method === "get") {
      if (config.url && config.url.includes("?"))
        config.url += "&timing=" + Date.now();
      else config.url += "?timing=" + Date.now();
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(response => {
  return response.data;
});
export default instance;
