import Vue, { DirectiveOptions } from 'vue'

import router from '@/router'
import store from '@/store'
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

import plugin from '@/plugin'


// import * as filters from '@/filters'
Vue.use(ElementUI)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.use(plugin)

// 注册指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// // Register global filter functions
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, (filters as { [key: string ]: Function })[key])
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
