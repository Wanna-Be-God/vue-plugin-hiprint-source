export default function PrintLine(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return PrintLine;
  });

  class PrintLine {
    constructor(options) {
      this.printLine = options.printLine;
      this.target = options.target;
      this.referenceElement = options.referenceElement;
    }
  }
}
