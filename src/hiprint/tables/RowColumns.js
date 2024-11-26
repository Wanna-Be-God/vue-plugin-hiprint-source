/*
 * @Author: WANAN && 903157935@qq.com
 * @Date: 2024-11-20 21:18:01
 * @LastEditors: WANAN
 * @LastEditTime: 2024-11-23 14:49:08
 * @Description: 该模块定义了一个 RowColumns 类，用于管理行列数据。
 */
export default function (module, exports, require) {
  "use strict";

  // 定义模块导出
  require.d(exports, "a", function () {
    return RowColumns;
  });

  // RowColumns 类用于存储和管理行列数据
  class RowColumns {
    constructor() {
      // 初始化一个空的行列数组
      this.rowColumns = [];
    }
  }
}