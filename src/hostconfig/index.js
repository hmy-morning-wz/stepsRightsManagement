
const apiHost = {};


if (process.env.ENV === 'dev') {

    // apiHost.nethost = 'http://10.0.0.124:9234/operation-free-bus/'; //开发环境
    // apiHost.nethost = 'http://sit-operation.allcitygo.com/';// 测试环境
    //apiHost.netImg = 'http://sit-operation.allcitygo.com/';
    apiHost.nethost = 'http://sit-basic-gw.allcitygo.com/op/'; // 打包地址
    // apiHost.nethost = 'https://bmapi.allcitygo.com:13002/op/'; // 正式地址
    apiHost.netImg = 'https://sit-operation.allcitygo.com/';

}
if (process.env.ENV === 'test') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'beta') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'v5') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'release') {
    apiHost.netImg = 'https://operation.allcitygo.com/';
    apiHost.nethost = 'https://bmapi.allcitygo.com:13002/op/';
}


export default apiHost;
