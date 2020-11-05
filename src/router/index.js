import Vue from 'vue';
import VueRouter from 'vue-router';
import operationManagement from './OperationManagement';


const appMain = (resolve) => {
    require(['../page/home.vue'], resolve);
};
const routes = [{
        path: '/',
        component: appMain,
        meta: {
            title: '首页',
        },
    },
].concat(
    operationManagement,
);

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes,
});
