const Filters = {
    filtermoney(s, n) {
        let isNum = Number(s);
        if (isNaN(isNum)) {
            return s;
        }

        if (isNum === 0) {
            s = '0';
        }

        if (null == s || s == '' ) return '';
        let oldS = s;
        if (s < 0) {
            s = 0 - s;
        }

        n = n >= 0 && n <= 20 ? n : 2;
        s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
        let l = s.split('.')[0].split('').reverse(),
            r = s.split('.')[1];
        let t = '';
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
        }
        if (oldS < 0) {
            return '-' + t.split('').reverse().join('') + '.' + r;
        }
            return t.split('').reverse().join('') + '.' + r;
    },
    filtermoneyNew(val) {
        let rex = /\d{1,3}(?=(\d{3})+$)/g;
        val.replace(/^(-?)(\d+)((\.\d+)?)$/, function (s, s1, s2, s3) {
            return s1 + s2.replace(rex, '$&,') + s3;
        });
        return val;
    },
    // 时间转换
    formatDate(srcDate, fmt) {
        const localDate = new Date(srcDate);

        const o = {
            'M+': localDate.getMonth() + 1, // 月份
            'd+': localDate.getDate(), // 日
            'h+': localDate.getHours(), // 小时
            'm+': localDate.getMinutes(), // 分
            's+': localDate.getSeconds(), // 秒
            'q+': Math.floor((localDate.getMonth() + 3) / 3), // 季度
            S: localDate.getMilliseconds(), // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (`${localDate.getFullYear()  }`).substr(4 - RegExp.$1.length));
        }

        for (const k in o) {
            if (new RegExp(`(${  k  })`).test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${  o[k]}`).substr((`${  o[k]}`).length)));
            }
        }

        return fmt;
    },
};

export default Filters;
