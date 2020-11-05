const state = {
    // 页面跳转参数
    path: '', // 路由
    queryParams: {}, //参数
};
const mutations = {
    storerouterqueryParams(state, payLoad) {
        state.path = payLoad.path;
        state.queryParams = payLoad.queryParams;
    },
};
export default {
    state,
    mutations,
};
