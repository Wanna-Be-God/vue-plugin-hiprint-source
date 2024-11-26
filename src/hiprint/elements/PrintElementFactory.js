/**
 * 负责创建和管理打印元素的属性和行为
 */
export default function PrintElementFactory (module, exports, require) {
  "use strict";

  class PrintElementOptionEntity {
    constructor() {}
  }

  class PrintElement {
    constructor(options = {}) {
      this.left = options.left;
      this.top = options.top;
      this.topInDesign = this.top;
      this.height = options.height;
      this.width = options.width;
      this.transform = options.transform;
      this.init(options);
    }

    setDefault(defaultOptions) {
      this.defaultOptions = defaultOptions;
      this.initSize();
      Object.keys(this.defaultOptions).forEach((key) => {
        this[key] = this[key] || this.defaultOptions[key];
      });
    }

    initSize() {
      this.width || this.setWidth(this.defaultOptions.width);
      this.height || this.setHeight(this.defaultOptions.height);
    }

    initSizeByHtml(width, height) {
      this.width || this.setWidth(width);
      this.height || this.setHeight(height);
    }

    getRectInfo() {
      const rectInfo = { w: 0, h: 0, diffW: 0, diffH: 0 };
      if (this.transform) {
        const rad = (this.transform * Math.PI) / 180;
        const width = this.width;
        const height = this.height;
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);
        const w = Math.abs(width * cos) + Math.abs(height * sin);
        const h = Math.abs(width * sin) + Math.abs(height * cos);
        const diffW = (width - w) / 2;
        const diffH = (height - h) / 2;
        rectInfo.w = w;
        rectInfo.h = h;
        rectInfo.diffW = diffW;
        rectInfo.diffH = diffH;
      }
      return rectInfo;
    }

    getLeft() {
      return this.left;
    }

    posLeft() {
      let left = this.left;
      if (this.transform) left += this.getRectInfo().diffW;
      return Math.floor(left * 10) / 10;
    }

    setRotate(angle) {
      if (angle != null) this.transform = angle;
    }

    displayLeft(isTransformed) {
      if (this.transform && isTransformed) {
        return this.left + this.getRectInfo().diffW + "pt";
      }
      return this.left + "pt";
    }

    setLeft(left) {
      if (left != null) this.left = left;
    }

    getTop() {
      return this.top;
    }

    posTop() {
      let top = this.top;
      if (this.transform) top += this.getRectInfo().diffH;
      return Math.floor(top * 10) / 10;
    }

    getTopInDesign() {
      return this.topInDesign;
    }

    displayTop(isTransformed) {
      if (this.transform && isTransformed) {
        return this.top + this.getRectInfo().diffH + "pt";
      }
      return this.top + "pt";
    }

    setTop(top) {
      if (top != null) this.top = top;
    }

    copyDesignTopFromTop() {
      this.topInDesign = this.top;
    }

    getHeight() {
      if (this.transform) {
        const rectInfo = this.getRectInfo();
        return rectInfo.h + rectInfo.diffH;
      }
      return this.height;
    }

    displayHeight() {
      return this.height + "pt";
    }

    setHeight(height) {
      if (height != null) this.height = height;
    }

    getWidth() {
      if (this.transform) {
        const rectInfo = this.getRectInfo();
        return rectInfo.w + rectInfo.diffW;
      }
      return this.width;
    }

    displayWidth() {
      return this.width + "pt";
    }

    setWidth(width) {
      if (width != null) this.width = width;
    }

    getValueFromOptionsOrDefault(key) {
      return this[key] == null ? this.defaultOptions[key] : this[key];
    }

    getPrintElementOptionEntity() {
      const entity = new PrintElementOptionEntity();
      Object.keys(this)
        .filter((key) => key !== "topInDesign")
        .forEach((key) => {
          if (
            (typeof this[key] !== "number" &&
              typeof this[key] !== "string" &&
              !["fields"].includes(key) &&
              typeof this[key] !== typeof true) ||
            (entity[key] = this[key])
          ) {
            if (key === "style") {
              entity.style = {};
              const style = this[key];
              if (style)
                Object.keys(style).forEach((styleKey) => {
                  if (
                    typeof style[styleKey] === "number" ||
                    typeof style[styleKey] === "string"
                  ) {
                    entity.style[styleKey] = style[styleKey];
                  }
                });
            }
          }
        });
      return entity;
    }

    init(options) {
      if (options)
        Object.keys(options).forEach((key) => {
          this[key] = options[key];
        });
    }
  }

  require.d(exports, "a", function () {
    return PrintElement;
  });
}
