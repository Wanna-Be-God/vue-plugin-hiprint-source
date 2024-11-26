/**
 *  元素添加拖放功能
 * @param {*} module
 * @param {*} exports
 */
export default function (module, exports) {
  /**
   * Hidroppable 类用于为 DOM 元素添加拖放功能。
   * 通过 jQuery 插件的方式，用户可以初始化或操作 Hidroppable 实例。
   */
  class Hidroppable {
    constructor(element, options = {}) {
      // 将传入的元素转换为 jQuery 对象
      this.element = $(element);
      // 合并默认选项、解析的选项和用户传入的选项
      this.options = $.extend(
        {},
        Hidroppable.defaults,
        Hidroppable.parseOptions(element),
        options
      );
      // 初始化拖放功能
      this._initialize();
    }

    _initialize() {
      // 为元素添加 'hidroppable' 类
      this.element.addClass("hidroppable");

      // 绑定拖放事件，并调用用户定义的回调函数
      this.element.on("_dragenter", (event, ui) => {
        this.options.onDragEnter.apply(this.element[0], [event, ui]);
      });

      this.element.on("_dragleave", (event, ui) => {
        this.options.onDragLeave.apply(this.element[0], [event, ui]);
      });

      this.element.on("_dragover", (event, ui) => {
        this.options.onDragOver.apply(this.element[0], [event, ui]);
      });

      this.element.on("_drop", (event, ui) => {
        this.options.onDrop.apply(this.element[0], [event, ui]);
      });

      // 将实例数据存储在元素上
      $.data(this.element[0], "hidroppable", this);
    }

    // 解析元素上的选项
    static parseOptions(element) {
      const $element = $(element);
      return $.extend({}, $.hiprintparser.parseOptions(element, ["accept"]), {
        disabled: !!$element.attr("disabled") || undefined,
      });
    }

    // 默认选项
    static get defaults() {
      return {
        accept: null,
        disabled: false,
        onDragEnter: function () {},
        onDragOver: function () {},
        onDragLeave: function () {},
        onDrop: function () {},
      };
    }

    // 提供的静态方法
    static methods = {
      // 获取元素的选项
      options(element) {
        return $.data(element[0], "hidroppable").options;
      },

      // 启用拖放功能
      enable(element) {
        return element.each(function () {
          $(this).hidroppable({
            disabled: false,
          });
        });
      },

      // 禁用拖放功能
      disable(element) {
        return element.each(function () {
          $(this).hidroppable({
            disabled: true,
          });
        });
      },
    };
  }

  // jQuery 插件定义
  $.fn.hidroppable = function (methodOrOptions, options) {
    if (typeof methodOrOptions === "string") {
      return Hidroppable.methods[methodOrOptions](this, options);
    }

    return this.each(function () {
      let instance = $.data(this, "hidroppable");

      if (instance) {
        // 更新实例选项
        $.extend(instance.options, methodOrOptions);
      } else {
        // 创建新的 Hidroppable 实例
        new Hidroppable(this, methodOrOptions);
      }
    });
  };
}
