/**
 * 几何工具类，用于处理几何形状的合并和创建
 * mergeRect 方法：合并两个矩形，返回一个新的矩形对象，该对象的坐标和尺寸是两个输入矩形的最小包围矩形。
 * Rect 方法：根据给定的四个坐标值创建一个矩形对象，返回包含最小和最大 x, y 坐标的对象。 
 */
export default function (module, exports, require) {
  "use strict";

  // 将 GeometryUtils 类导出为模块的一部分
  require.d(exports, "a", function () {
    return GeometryUtils;
  });

  // 引入 Rect 模块
  var Rect = require(10);

  // 定义 GeometryUtils 类
  class GeometryUtils {
    // 静态方法：合并两个矩形
    static mergeRect(rect1, rect2) {
      // 计算合并后矩形的最小 x 和 y 坐标
      const minX = Math.min(rect1.x, rect2.x);
      const minY = Math.min(rect1.y, rect2.y);

      // 返回一个新的 Rect 对象，表示合并后的矩形
      return new Rect.b({
        x: minX,
        y: minY,
        height: Math.max(rect1.y + rect1.height, rect2.y + rect2.height) - minY,
        width: Math.max(rect1.x + rect1.width, rect2.x + rect2.width) - minX,
      });
    }

    // 静态方法：创建一个矩形对象
    static Rect(x1, y1, x2, y2) {
      // 返回一个对象，包含矩形的最小和最大 x, y 坐标
      return {
        minX: x1 < x2 ? x1 : x2,
        minY: y1 < y2 ? y1 : y2,
        maxX: x1 < x2 ? x2 : x1,
        maxY: y1 < y2 ? y2 : y1,
      };
    }
  }
}
