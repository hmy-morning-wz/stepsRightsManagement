const hasClass = (elem, cls) => {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false; // 当cls没有参数时，返回false
    return new RegExp(` ${cls} `).test(` ${elem.className} `);
};
const addClass = (elem, cls) => {
    if (!hasClass(elem, cls)) {
        elem.className = elem.className === '' ? cls : `${elem.className} ${cls}`;
    }
};

const removeClass = (elem, cls) => {
    if (hasClass(elem, cls)) {
        let newClass = ` ${elem.className.replace(/[\t\r\n]/g, '')} `;
        while (newClass.indexOf(` ${cls} `) >= 0) {
            newClass = newClass.replace(` ${cls} `, ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};
const removeClassArr = (elems, cls) => {
    for (let j = 0, len = elems.length; j < len; j++) {
        removeClass(elems[j], cls);
    }
};

const judgerepetition = (dataUrl, params, istop) => {
    let flag = true;
    const menuTabarr = window.top.document.querySelectorAll('.J_menuTab');
    const Jiframe = window.top.document.querySelectorAll('.J_mainContent .J_iframe');
    const len = menuTabarr.length;
    const len2 = Jiframe.length;
    for (let i = 0; i < len; i++) {
        if (menuTabarr[i].getAttribute('data-id') === dataUrl) {
            if (!hasClass(menuTabarr[i], 'active')) {
                removeClassArr(menuTabarr, 'active');
                addClass(menuTabarr[i], 'active');
                for (let j = 0; j < len2; j++) {
                    removeClassArr(Jiframe, 'active');
                    Jiframe[j].style.display = 'none';
                    if (Jiframe[j].getAttribute('data-id') === dataUrl) {
                        Jiframe[j].style.display = 'block';
                        let url = `bopsnew/${params}${dataUrl}${params}`;
                        if (istop == 'istop') {
                            url = `${params}${dataUrl}${params}`;
                        }
                        if (Jiframe[j].src !== url) {
                            Jiframe[j].src = url;
                        }
                    }
                }
            }
            flag = false;
        }
    }
    return flag;
};
const parseDom = (nodelist) => {
    let objE = document.createElement('div');
    objE.innerHTML = nodelist;
    return objE.childNodes;
};
export default function addIframeTab(dataUrl, menuName = '', params, dataIndex, istop) {
    if (!dataUrl) return;
    let urlleft = 'bopsnew/';
    if (istop == 'istop') {
        urlleft = '';
    }
    if (self !== top) {
        let con
        if (judgerepetition(dataUrl, params, istop)) {
            const Jiframe = window.top.document.querySelectorAll('.J_mainContent .J_iframe');
            const str = `<a href="javascript:;" class="active J_menuTab" data-id="${dataUrl}">${menuName} <i class="fa fa-times-circle"></i></a>`;
            dataIndex = dataIndex || window.top.document.querySelectorAll('.J_menuTab').length;

            const str1 = `<iframe class="J_iframe" name="iframe${dataIndex}" width="100%" height="100%" src="${urlleft}${params}${dataUrl}${params}" frameborder="0" data-id="${dataUrl}" seamless></iframe>`;
            removeClassArr(window.top.document.querySelectorAll('.J_menuTab'), 'active');
            for (let j = 0; j < Jiframe.length; j++) {
                removeClass(Jiframe[j], 'active');
                Jiframe[j].style.display = 'none';
            }
            window.top.document.querySelectorAll('.J_mainContent')[0].append(parseDom(str1)[0]);
            window.top.document.querySelectorAll('.J_menuTabs .page-tabs-content')[0].append(parseDom(str)[0]);
        }
    } else {
        location.href = `${urlleft}${params}${dataUrl}${params}`;
    }
};
