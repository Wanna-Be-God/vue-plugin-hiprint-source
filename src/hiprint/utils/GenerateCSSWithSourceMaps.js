/**
 * 生成带有源映射的CSS
 * @param {*} module 
 * @param {*} exports 
 * @param {*} require 
 */
export default function (module, exports, require) {
  "use strict";

  /**
   * 创建一个CSS列表对象，并提供生成带有源映射的CSS字符串的方法
   * @param {Object} options - 配置选项
   * @returns {Array} cssList - 包含CSS模块的数组
   */
  module.exports = function (options) {
    var cssList = [];

    /**
     * 将CSS列表转换为字符串，包含源映射信息
     * @returns {string} - 生成的CSS字符串
     */
    cssList.toString = function () {
      return this.map(function (item) {
        var content = generateContentWithSourceMap(item, options);
        return item[2] ? `@media ${item[2]} {${content}}` : content;
      }).join("");
    };

    /**
     * 将新的CSS模块添加到列表中
     * @param {Array|string} modules - 新的CSS模块或模块字符串
     * @param {string} [mediaQuery] - 可选的媒体查询字符串
     */
    cssList.i = function (modules, mediaQuery) {
      if (typeof modules === "string") {
        modules = [[null, modules, ""]];
      }

      var alreadyImportedModules = {};
      // 检查已导入的模块，避免重复导入
      for (var i = 0; i < this.length; i++) {
        var id = this[i][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }

      // 添加新的模块到cssList中
      for (i = 0; i < modules.length; i++) {
        var module = modules[i];
        if (module[0] == null || !alreadyImportedModules[module[0]]) {
          if (mediaQuery) {
            module[2] = module[2] ? `(${module[2]}) and (${mediaQuery})` : mediaQuery;
          }
          cssList.push(module);
        }
      }
    };

    /**
     * 生成带有源映射的CSS内容
     * @param {Array} item - CSS模块项
     * @param {Object} options - 配置选项
     * @returns {string} - 生成的CSS内容
     */
    function generateContentWithSourceMap(item, options) {
      var css = item[1] || "";
      var sourceMap = item[3];
      if (!sourceMap) return css;

      if (options && typeof btoa === "function") {
        var sourceMapping = `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))} */`;
        var sourceURLs = sourceMap.sources.map(function (source) {
          return `/*# sourceURL=${sourceMap.sourceRoot}${source} */`;
        });
        return [css].concat(sourceURLs).concat([sourceMapping]).join("\n");
      }

      return css;
    }

    return cssList;
  };
}