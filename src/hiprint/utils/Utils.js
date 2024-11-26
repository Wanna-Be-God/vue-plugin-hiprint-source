// 检查对象是否是某个构造函数的实例
export function _instanceof(left, right) {
  // 如果 right 对象有 Symbol.hasInstance 属性，使用它进行检查
  if (right != null && typeof right[Symbol.hasInstance] === "function") {
    return right[Symbol.hasInstance](left);
  }
  // 否则，使用 instanceof 运算符进行检查
  return left instanceof right;
}

// 获取对象的类型
export function _typeof(obj) {
  // 检查环境是否支持 Symbol.iterator
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    // 现代环境下直接返回 typeof
    return typeof obj;
  }
  
  // 如果不支持 Symbol，则进行兼容处理
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
    ? "symbol"
    : typeof obj;
}
