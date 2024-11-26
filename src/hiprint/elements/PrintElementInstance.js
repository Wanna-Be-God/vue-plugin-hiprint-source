export default function (module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return PrintElementInstance;
  });

  /**
   * 打印元素实例类
   * 用于创建和管理打印模板中的具体打印元素
   */
  class PrintElementInstance {
    /**
     * 创建打印元素实例
     * @param {string} templateId - 打印模板的唯一标识符
     * @param {Object} options - 打印元素的配置选项
     * @param {Object} printElementType - 打印元素的类型定义
     */
    constructor(templateId, options, printElementType) {
      /** 模板ID */
      this.templateId = templateId;
      /** 元素配置选项 */
      this.options = options;
      /** 打印元素类型 */
      this.printElementType = printElementType;
    }
  }
}
