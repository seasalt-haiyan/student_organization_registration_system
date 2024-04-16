import Vue from 'vue'
import App from './App.vue'
//引入
import VueRouter from 'vue-router'

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueRouter)//应用插件
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router: router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }//创建事件总线
}).$mount('#app')
