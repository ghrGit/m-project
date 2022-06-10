const errMap = {};
export default (cb: any, wait: number, code = "0") => {
    errMap[code] && clearTimeout(errMap[code]);
    errMap[code] = setTimeout(cb, wait);
};
