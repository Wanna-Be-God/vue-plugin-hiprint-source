/**
 * 生成器主要用于在打印模板系统中为各种元素（如表格、文本框等）生成唯一标识符
 * @param {*} module
 * @param {*} exports
 * @param {*} require
 */
export default function (module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return IdGenerator;
  });

  /**
   * ID生成器类
   * 用于生成递增的唯一标识符
   */
  class IdGenerator {
    /**
     * 静态计数器，初始值为1
     * @type {number}
     */
    static id = 1;

    /**
     * 创建并返回一个新的唯一ID
     * 每次调用都会使计数器加1
     * @returns {number} 返回新生成的ID
     */
    static createId() {
      return (this.id += 1);
    }
  }
}
