/**
 * HiprintInstance 函数用于导出 Hiprint 模块。
 * @param {Object} module - 模块对象
 * @param {Object} exports - 导出对象
 * @param {Function} require - 用于引入其他模块的函数
 */
export default function HiprintInstance(module, exports, require) {
  "use strict";

  // 定义导出属性 'a'，返回 Hiprint 类
  require.d(exports, "a", () => Hiprint);

  // 引入 ItemRegistry 模块
  const ItemRegistry = require(9);

  // 定义 Hiprint 类
  class Hiprint {
    constructor() {
      // 构造函数，初始化 Hiprint 实例
      // 参见 hiprint.config.js
    }

    // 初始化方法，接受配置对象
    init(config) {
      if (config) {
        // 使用 jQuery 的 extend 方法合并配置到当前实例
        $.extend(this, config);
      }
    }

    // 绑定事件
    on(event, callback) {
      // 使用 hinnn.event 模块绑定事件
      hinnn.event.on(event, callback);
    }

    // 清除事件
    clear(event) {
      // 使用 hinnn.event 模块清除事件
      hinnn.event.clear(event);
    }

    // 注册项目
    registerItems(items) {
      // 遍历项目数组并注册每个项目
      items.forEach((item) => {
        ItemRegistry.a.registerItem(new item());
      });
    }

    // 获取单例实例
    static get instance() {
      // 如果实例不存在，则创建一个新的实例
      if (!Hiprint._instance) {
        Hiprint._instance = new Hiprint();
        // 如果全局配置存在，合并到实例中
        if (window.HIPRINT_CONFIG) {
          $.extend(Hiprint._instance, HIPRINT_CONFIG);
        }
        // 如果实例有选项项目，注册这些项目
        if (Hiprint._instance.optionItems) {
          Hiprint._instance.optionItems.forEach((item) => {
            ItemRegistry.a.registerItem(new item());
          });
        }
      }
      // 返回单例实例
      return Hiprint._instance;
    }
  }
}
