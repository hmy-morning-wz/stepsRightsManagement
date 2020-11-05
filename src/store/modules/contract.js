const state = {
    curstep: 'bussiness', // 当前步骤
    contstepdata: {
        subCategory: 11,
        paybackIsManual: false,
        payIsManual: false,
    },
    // 已开发票
    billingInfoData: {}, // 开票信息
    invoiceInfoData: [], // 发票信息
    billingMessage: [], //收款信息
    seletInvoiceItem: {}, //选中的发票信息
};
const mutations = {
    storeRemark(state, payLoad) {
        state.remark = payLoad.value;
    },
    storeInvoiceData(state, payLoad) {
        state.invoiceData = payLoad.value;
    },
    storeBillingInfoData(state, payLoad) {
        state.billingInfoData = payLoad.value;
    },
    storeInvoiceInfoData(state, payLoad) {
        state.invoiceInfoData = payLoad.value;
    },
    storeBillingMessage(state, payLoad) {
        state.billingMessage = payLoad.value;
    },
    storeSelectInvoiceItem(state, payLoad) {
        state.seletInvoiceItem = payLoad.value;
    },
    clearBillingStore(state) {
        state.remark = '';
        state.invoiceData = [];
        state.billingInfoData = {};
        state.invoiceInfoData = [];
        state.billingMessage = [];
        state.seletInvoiceItem = [];
    },
};
export default {
    state,
    mutations,
};
