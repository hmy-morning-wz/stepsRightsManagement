import Vue from 'vue';
import Vuex from 'vuex';
import billing from './modules/billing';
import tickets from './modules/tickets';
import pageParams from './modules/pageParams';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        billing,
        tickets,
        pageParams,
    },
});
