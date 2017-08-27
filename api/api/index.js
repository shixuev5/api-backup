/*eslint-disable */
const http = require('../http');
const urls = require('../config/urls');
const methods = require('../config/methods');
const { verifyFail } = require('../config/notify');
const { validParams, merge } = require('../utils');

let fnList = merge(methods, urls);

function fnFactory(obj) {
  return function fn(data, params) {
    if (obj.method === 'get') {
      if (obj.data == null && obj.params == null && (data || params)) {
        console.info('该方法无需参数传递！');
      } else {
        if (obj.data && validParams(obj.data, data)) {
          for (let key of Object.keys(data)) {
            obj.url += '/' + data[key];
          }
        }
        if (obj.params && validParams(obj.params, params)) {
          return http[obj.method](obj.url, params);
        }
      }
    } else {
      if (data != null && typeof data === 'object' && validParams(obj.data, data)) {
        return http[obj.method](obj.url, data);
      }
    }
    verifyFail();
  };
}

function exportFnObj(fnList) {
  const obj = {};
  for (let i of fnList) {
    if (typeof obj[i.moduleName] !== 'object') {
      obj[i.moduleName] = {};
    }
    obj[i.moduleName][i.name] = fnFactory(i);
  }
  return obj;
}

module.exports = exportFnObj(fnList);
