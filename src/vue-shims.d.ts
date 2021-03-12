import Vue from "vue";
declare module "*.vue" {
  export default Vue;
}
declare module "vue/types/vue" {
  // 在Vue原型上挂载时在这里定义
  interface VueConstructor {
    $gConfig: any;
    $qs: any;
  }
  interface Vue {
    $gConfig: any;
    $qs: any;
  }
}
