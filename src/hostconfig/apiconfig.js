/**
 * Created by xuzhiqiang on 2017/6/21.
 */
import apiHost from './index';

export default {
    /**
     * 公共api
     */
    COMMON: {
        // 所有城市列表
        CITY_LIST_API: `${apiHost.bops_javahost}bops/api/v4/common/dict/manage/cities`,

    },
    /**
     * 快结api
     */
    FAST_APPLY_API: {
        // 快结待申请列表
        FAST_APPLY_LIST_API: `${apiHost.bops_javahost}bops/api/v4/finance/factoring/fast-factoring-apply-details`,

    },
};
