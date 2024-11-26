/**
 * 处理样式内容的加载和热更新（HMR）
 * @param {*} module
 * @param {*} exports
 * @param {*} require
 */
export default function (module, exports, require) {
  var styleContent = require(28);
  "string" == typeof styleContent &&
    (styleContent = [[module.i, styleContent, ""]]);
  var options = {
    hmr: !0,
    transform: void 0,
    insertInto: void 0,
  };
  require(30)(styleContent, options);
  styleContent.locals && (module.exports = styleContent.locals);
}
