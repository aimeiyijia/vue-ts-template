import Vue, { DirectiveOptions } from 'vue'

import config from '../public/config.json'

import router from '@/router'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import '@/icons/components'
// import '@/permission'
import '@/pwa/register-service-worker'
import * as directives from '@/directives'

// import * as filters from '@/filters'
Vue.use(ElementUI)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// 注册指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// // Register global filter functions
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, (filters as { [key: string ]: Function })[key])
// })

// 在Vue原型上挂载第三方插件
// 全局配置项
Object.defineProperty(Vue, '$gConfig', { value: config })


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
