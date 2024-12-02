/**
 * 提供解析和拖拽长度计算的功能
 * @param {*} module 
 * @param {*} exports 
 */
export default function (module, exports) {
  class HiprintParser {
    // 解析选项的构造方法
    constructor(element) {
      this.element = $(element);
    }

    // 解析元素上的数据选项和额外传入的选项
    parseOptions(options) {
      let parsedOptions = {};
      let dataOptions = $.trim(this.element.attr("data-options"));

      if (dataOptions) {
        if (dataOptions[0] !== "{") {
          dataOptions = "{" + dataOptions + "}";
        }
        // 使用 Function 构造函数动态执行字符串，将其转为对象
        parsedOptions = new Function("return " + dataOptions)();
      }

      if (options) {
        // 解析额外的选项
        let additionalOptions = {};
        options.forEach((option) => {
          if (typeof option === "string") {
            additionalOptions[option] =
              option === "width" || option === "height" || option === "left" || option === "top"
                ? parseInt(this.element[0].style[option]) || undefined
                : this.element.attr(option);
          } else {
            for (let key in option) {
              const type = option[key];
              if (type === "boolean") {
                additionalOptions[key] = this.element.attr(key) ? this.element.attr(key) === "true" : undefined;
              } else if (type === "number") {
                additionalOptions[key] =
                  this.element.attr(key) === "0" ? 0 : parseFloat(this.element.attr(key)) || undefined;
              }
            }
          }
        });
        $.extend(parsedOptions, additionalOptions);
      }

      return parsedOptions;
    }
  }

  class DragLengthC {
    static dragLengthC(value, options) {
      return options.moveUnit === "pt"
        ? DragLengthC.dragLengthCNum(value, options) + "pt"
        : DragLengthC.dragLengthCNum(value, options);
    }

    static dragLengthCNum(value, options) {
      const minMove = options.minMove || 3;

      if (options.moveUnit === "pt") {
        const convertedValue = 0.75 * value;
        return Math.round(convertedValue / minMove) * minMove;
      }

      return Math.round(value / minMove) * minMove;
    }
  }

  // 将 hiprintparser 解析器挂到 jQuery 上
  $.hiprintparser = {
    parseOptions(element, options) {
      const parser = new HiprintParser(element);
      return parser.parseOptions(options);
    },
  };

  // 将 dragLengthC 和 dragLengthCNum 插件挂到 jQuery 的原型上
  $.fn.dragLengthC = function (value, options) {
    return DragLengthC.dragLengthC(value, options);
  };

  $.fn.dragLengthCNum = function (value, options) {
    return DragLengthC.dragLengthCNum(value, options);
  };
}
