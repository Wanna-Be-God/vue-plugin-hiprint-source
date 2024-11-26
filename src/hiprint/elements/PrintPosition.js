/**
 * PrintPosition类用于管理打印元素的位置和尺寸。它提供了基本的属性（如顶部、左侧、高度、宽度等）以及方法来判断元素是否在指定的水平位置范围内。
 */
export default function PrintPosition(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return PrintPosition;
  });

  class PrintPosition {
    constructor(position) {
      this.top = position.top;
      this.left = position.left;
      this.height = position.height;
      this.width = position.width;
      this.bottomInLastPaper = position.bottomInLastPaper;
      this.beginPrintPaperIndex = position.beginPrintPaperIndex;
      this.printTopInPaper = position.printTopInPaper;
      this.endPrintPaperIndex = position.endPrintPaperIndex;
    }
    /** 用于判断给定的值是否在元素的顶部和高度范围内。 */
    isPositionLeftOrRight(value) {
      return this.top <= value && this.top + this.height > value;
    }
  }
}
