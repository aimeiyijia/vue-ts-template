import Vue from 'vue'
import store from "@/store";
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
} from 'axios'
const config = Vue.$gConfig
const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 60000
})
instance.interceptors.response.use(response => {
  const res = response.data;
  // 401: Token 过期了;
  if (res.code === 401) {
    MessageBox.confirm("您已经登录超时，请回首页重新登录", "温馨提示", {
      confirmButtonText: "登录",
      showCancelButton: false,
      closeOnClickModal: false,
      // cancelButtonText: '取消',
      type: "warning"
    })
      .then(() => {
        sessionStorage.clear();
        store.commit("setUserInfo");
        location.href = location.origin + location.pathname + "#/";
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          location.reload();
        }
      })
      .catch(() => {
        sessionStorage.clear();
        store.commit("setUserInfo");
        location.href = location.origin + location.pathname + "#/";
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          location.reload();
        }
      });
  } else if (res.code == 400 || res.code == 501) {
    //参数不全、服务异常
    Message({
      message: response.data.msg,
      type: "warning"
    });
  } else {
    if (response.config.responseType === "blob") {
      let headers = response.headers["content-disposition"];
      let filename = "";
      if (headers) {
        let filenameStr = headers.split("filename=")[1];
        filename = decodeURI(filenameStr.substring(1, filenameStr.length - 1));
      }
      return { data: response.data, filename: filename };
    }
    return response.data;
  }
});
export default instance;
