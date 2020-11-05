import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import './assets/scss/app.scss';
import './assets/scss/fixelement.scss';
import './assets/css/viewer.min.css';
import './assets/css/iconfont.css';
import store from './store';
import filters from './filter';

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

// 路由钩子
router.beforeEach((to, from, next) => {
    if (to.query.accessToken && !window.sessionStorage.getItem('ak')) {
        window.sessionStorage.setItem('ak', to.query.accessToken);
    }
    next();
});
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});
Vue.use(ElementUI);
new Vue({
    router,
    store,
    el: '#app',
    components: { App },
    template: '<App />',
});
