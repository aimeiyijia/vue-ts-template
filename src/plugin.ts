import config from "../public/config.json";

// 插件
import qs from "qs";
const plugin = {
  install: (Vue: any, options: any) => {
    // 在Vue原型上挂载第三方插件
    // 全局配置项
    Object.defineProperty(Vue.prototype, "$gConfig", { value: config });
    Object.defineProperty(Vue.prototype, "$qs", { value: qs });
  }
};

export default plugin;
