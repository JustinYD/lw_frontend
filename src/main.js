import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import dataV from '@jiaminghi/data-view'
// eslint-disable-next-line no-unused-vars

Vue.use(ElementUI);
Vue.use(dataV)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')