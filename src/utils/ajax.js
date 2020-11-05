import axios from 'axios';

// import { serviceLogin } from 'service/commonService/common';
import apiHost from '../hostconfig';
import { Message } from 'element-ui';
const ak = window.sessionStorage.getItem('ak') || window.localStorage.getItem('ak');
// babel runtime plugin 通过局部变量的方式引入Promise
// axios是babel-loader加载之外的库，axios 内部依赖了Promise
// 所以需要全局定义Promise, 解决IE兼容性问题
if (!window.Promise) {
    window.Promise = Promise;
}

const url_queryString = (name) => {
    const rex = new RegExp("[?&]\s*" + name + "\s*=([^&$#]*)", "i");
    const r = rex.exec(location.search);

    if (r && r.length == 2) {
        return decodeURIComponent(r[1]);
    }
};
const getCookie = () => {
    var strCookie = document.cookie || "x-access-token=1_3462cc2bd2b94b2d9de72a7f0208ef58_1";
    var arrCookie = strCookie.split("; ");
    var cookieName = 'x-access-token';
    // console.log(arrCookie)
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
        }
    }
};
const preCheckCode = (response) => { // 通用请求判断
    const data = response.data;
    if (data.code === 4002) {
    }
    if (data.code === 0) {
        return data;
    }
    if (data.code == 20000) {
        return data;
    }
    if (data.code === 302) {
        // window.location = data.message + window.location.hash;
        return false;
    }
    if (data.code === 5) {
        // window.location = data.message + window.location.hash;
        Message.error('系统维护中，请稍后再试。');
    }
    return Promise.reject(response.data, response);// 会被下一个catch接收到
};

const preReject = (err) => { // 请求丢失时触发 loading不会关闭

    // 会被下一个catch接收到 如果return 的值不是Promisereject 则会被成功函数里接收到
    return Promise.reject(err.response.data || {}, err.response);
};

const getTimeSpan = () => {
    return new Date().getTime();
};
const common = ({ data = {}, params = {}, method = '', url = '', headers = {}, } = {}) => {

    const res = {
        method,
        url,
        data,
        params,
        responseType: 'json',
        withCredentials: true,
    };
    res.headers = { 'Content-Type': 'application/json; charset=UTF-8', access_token: getCookie()};

    Object.assign(res.headers, headers);
    Object.assign(res.params, { _: getTimeSpan() });
    return axios(res).then(preCheckCode, preReject);
};

export const getJSON = (url, params = {}, headers = {}) => {
    return common({
        url,
        method: 'GET',
        params,
        headers,
    });
};

export const postJSON = (url, data = {}, headers = {}) => {
    return common({
        url,
        method: 'POST',
        data,
        headers,
    });
};
// ** 注：登录时需使用formdata格式传输数据
export const postFormData = (url, formData = {}) => {
    // const data = urlHandle.stringify(formData);
    return common({
        url,
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
};

export const putJSON = (url, data = {}, headers = {}) => {
    return common({
        url,
        method: 'PUT',
        data,
        headers,
    });
};

export const delData = (url, data = {}, headers = {}) => {
    return common({
        url,
        method: 'DELETE',
        data,
        headers,
    });
};


