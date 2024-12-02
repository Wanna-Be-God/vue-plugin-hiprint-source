/**
 * PrintElementFactory.js
 * 打印元素工厂类,负责创建和管理打印元素的属性和行为
 */
export default function PrintElementFactory (module, exports, require) {
  "use strict";

  /**
   * 打印元素选项实体类
   * 用于存储打印元素的配置选项
   */
  class PrintElementOptionEntity {
    constructor() {}
  }

  /**
   * 打印元素基类
   * 定义了打印元素的基本属性和方法
   */
  class PrintElement {
    /**
     * 构造函数
     * @param {Object} options - 打印元素的配置选项
     * @param {number} options.left - 元素左边距
     * @param {number} options.top - 元素上边距  
     * @param {number} options.height - 元素高度
     * @param {number} options.width - 元素宽度
     * @param {number} options.transform - 元素旋转角度
     */
    constructor(options = {}) {
      this.left = options.left;
      this.top = options.top;
      this.topInDesign = this.top;
      this.height = options.height;
      this.width = options.width;
      this.transform = options.transform;
      this.init(options);
    }

    /**
     * 设置默认选项
     * @param {Object} defaultOptions - 默认配置选项
     */
    setDefault(defaultOptions) {
      this.defaultOptions = defaultOptions;
      this.initSize();
      Object.keys(this.defaultOptions).forEach((key) => {
        this[key] = this[key] || this.defaultOptions[key];
      });
    }

    /**
     * 初始化元素尺寸
     */
    initSize() {
      this.width || this.setWidth(this.defaultOptions.width);
      this.height || this.setHeight(this.defaultOptions.height);
    }

    /**
     * 根据HTML元素初始化尺寸
     * @param {number} width - 宽度
     * @param {number} height - 高度 
     */
    initSizeByHtml(width, height) {
      this.width || this.setWidth(width);
      this.height || this.setHeight(height);
    }

    /**
     * 获取元素旋转后的矩形信息
     * @returns {Object} 包含宽高和偏移量的对象
     */
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

    /**
     * 设置元素旋转角度
     * @param {number} angle - 旋转角度(度)
     */
    setRotate(angle) {
      if (angle != null) this.transform = angle;
    }

    /**
     * 获取显示位置的左边距
     * @param {boolean} isTransformed - 是否考虑旋转变换
     * @returns {string} 带单位的左边距值
     */
    displayLeft(isTransformed) {
      if (this.transform && isTransformed) {
        return this.left + this.getRectInfo().diffW + "pt";
      }
      return this.left + "pt";
    }

    /**
     * 获取元素左边距
     * @returns {number} 左边距值(不含单位)
     */
    getLeft() {
      return this.left;
    }

    /**
     * 获取元素实际定位的左边距
     * 考虑旋转变换后的偏移
     * @returns {number} 经过四舍五入的左边距值
     */
    posLeft() {
      let left = this.left;
      if (this.transform) left += this.getRectInfo().diffW;
      return Math.floor(left * 10) / 10;
    }

    /**
     * 设置元素左边距
     * @param {number} left - 左边距值
     */
    setLeft(left) {
      if (left != null) this.left = left;
    }

    /**
     * 获取元素上边距
     * @returns {number} 上边距值(不含单位)
     */
    getTop() {
      return this.top;
    }

    /**
     * 获取元素实际定位的上边距
     * 考虑旋转变换后的偏移
     * @returns {number} 经过四舍五入的上边距值
     */
    posTop() {
      let top = this.top;
      if (this.transform) top += this.getRectInfo().diffH;
      return Math.floor(top * 10) / 10;
    }

    /**
     * 获取设计时的上边距
     * @returns {number} 设计时的上边距值
     */
    getTopInDesign() {
      return this.topInDesign;
    }

    /**
     * 获取显示的上边距
     * @param {boolean} isTransformed - 是否考虑旋转变换
     * @returns {string} 带单位的上边距值
     */
    displayTop(isTransformed) {
      if (this.transform && isTransformed) {
        return this.top + this.getRectInfo().diffH + "pt";
      }
      return this.top + "pt";
    }

    /**
     * 设置元素上边距
     * @param {number} top - 上边距值
     */
    setTop(top) {
      if (top != null) this.top = top;
    }

    /**
     * 将当前上边距复制到设计时上边距
     */
    copyDesignTopFromTop() {
      this.topInDesign = this.top;
    }

    /**
     * 获取元素高度
     * 如果有旋转变换,返回变换后的实际高度
     * @returns {number} 元素高度值
     */
    getHeight() {
      if (this.transform) {
        const rectInfo = this.getRectInfo();
        return rectInfo.h + rectInfo.diffH;
      }
      return this.height;
    }

    /**
     * 获取显示的高度值
     * @returns {string} 带单位的高度值
     */
    displayHeight() {
      return this.height + "pt";
    }

    /**
     * 设置元素高度
     * @param {number} height - 高度值
     */
    setHeight(height) {
      if (height != null) this.height = height;
    }

    /**
     * 获取元素宽度
     * 如果有旋转变换,返回变换后的实际宽度
     * @returns {number} 元素宽度值
     */
    getWidth() {
      if (this.transform) {
        const rectInfo = this.getRectInfo();
        return rectInfo.w + rectInfo.diffW;
      }
      return this.width;
    }

    /**
     * 获取显示的宽度值
     * @returns {string} 带单位的宽度值
     */
    displayWidth() {
      return this.width + "pt";
    }

    /**
     * 设置元素宽度
     * @param {number} width - 宽度值
     */
    setWidth(width) {
      if (width != null) this.width = width;
    }

    /**
     * 从选项或默认值中获取指定键的值
     * @param {string} key - 键名
     * @returns {*} 对应的值
     */
    getValueFromOptionsOrDefault(key) {
      return this[key] == null ? this.defaultOptions[key] : this[key];
    }

    /**
     * 获取打印元素选项实体
     * @returns {PrintElementOptionEntity} 打印元素选项实体对象
     */
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

    /**
     * 初始化打印元素
     * @param {Object} options - 初始化选项
     */
    init(options) {
      if (options)
        Object.keys(options).forEach((key) => {
          this[key] = options[key];
        });
    }
  }

  /**
   * 导出 PrintElement 类
   */
  require.d(exports, "a", function () {
    return PrintElement;
  });
}
