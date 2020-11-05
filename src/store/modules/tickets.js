const state = {
    // =======
    seletTableItem: {}, // 选中单行
    seletTableRows: [], // 选中多行
    toTicket: false, // 收票通知是否需要开票
    ticketRemark: '', // 收票备注
    tradeInfo: [], // 收票交易信息
    ticketInvoiceData: [], // 发票信息
    ticketInfoData: {}, //收票信息
    bookedDate: '', // 入账日期
};
const mutations = {
    // =======
    storeToticket(state, payLoad) {
        state.toTicket = payLoad.value;
    },
    storeSeletTableItem(state, payLoad) {
        state.seletTableItem = payLoad.value;
    },
    storeSeletTableRows(state, payLoad) {
        state.seletTableRows = payLoad.value;
    },
    storeTicketRemark(state, payLoad) {
        state.ticketRemark = payLoad.value;
    },
    storeTradeInfo(state, payLoad) {
        state.tradeInfo = payLoad.value;
    },
    storeTicketInvoiceData(state, payLoad){
        state.ticketInvoiceData = payLoad.value;
    },
    storeTicketInfoData(state, payLoad){
        state.ticketInfoData = payLoad.value;
    },
    storeBookedDate(state, payLoad){
        state.bookedDate = payLoad.value;
    },
    clearTicketData(state) {
        state.ticketRemark = '';
        state.seletTableRows = [];
        state.toTicket = false;
        state.seletTableItem = {};
        state.tradeInfo = [];
        state.invoiceData = [];
        state.ticketInvoiceData = [];
        state.bookedDate = '';
    },
};
export default {
    state,
    mutations,
};
