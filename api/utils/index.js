/*eslint-disable */
const validParams = function (schema, args) {
  let isValid = true;
  if (schema == null || args == null || typeof args !== 'object') {
    isValid = false;
  } else {
    const argsFileds = Object.keys(args);
    const schemaFileds = schema.map(val => val.name);
    const requiredFileds = schema.filter(val => val.required);
    for (let i of argsFileds) {
      if (schemaFileds.indexOf(i) === -1) {
        isValid = false;
        if (new RegExp(i, 'i').test(schemaFileds.join(''))) {
          console.error(`${i} 大小写不匹配！`);
        } else {
          console.error(`${i} 未被使用！`);
        }
      } else {
        const obj = schema.filter(val => val.name === i)[0];
        const type = typeof (args[i]);
        if (type !== obj.type) {
          isValid = false;
          console.error(`${i} 的类型应为${obj.type}, 当前类型为${type}`);
        }
      }
    }
    requiredFileds.forEach(val => {
      if (argsFileds.indexOf(val.name) === -1) {
        isValid = false;
        console.error(`${val.name} 是必传参数！类型为${val.type}`);
      }
    })
  }
  return isValid;
};

const merge = function (target, source) {
  for(let i of target) {
    for(let m of source) {
      if(i.serverUrlId === m.id) {
        i.url = m.url;
      }
    }
  }
  return target;
};

module.exports = {
  validParams,
  merge,
};