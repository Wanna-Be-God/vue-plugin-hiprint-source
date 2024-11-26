/*
 * @Author: WANAN && 903157935@qq.com
 * @Date: 2024-11-21 23:58:59
 * @LastEditors: WANAN
 * @LastEditTime: 2024-11-22 11:40:39
 * @Description: Hiprint 核心工具类，提供事件处理、单位转换、格式化等通用功能
*/
// 数字转中文,大写,金额
import Nzh from "nzh/dist/nzh.min.js";

/**
 * HiprintUtil 工具类，提供事件处理、单位转换、格式化等通用功能
 */
export default function HiprintUtil(module, exports, require) {
  "use strict";

  var eventHandlers;
  require.d(exports, "a", function () {
    return hinnn;
  });

  // 全局对象，用于存储各种功能模块
  window.hinnn = {};

  // 事件处理模块
  hinnn.event = (function () {
    eventHandlers = {};
    return {
      // 注册事件处理器
      on: function on(event, handler) {
        eventHandlers[event] || (eventHandlers[event] = []);
        eventHandlers[event].push(handler);
      },
      id: 0,
      // 移除事件处理器
      off: function off(event, handler) {
        var handlers = eventHandlers[event];
        if (handlers) {
          for (var index = -1, i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
              index = i;
              break;
            }
          }
          index < 0 || eventHandlers[event].splice(index, 1);
        }
      },
      // 触发事件
      trigger: function trigger(event) {
        var handlers = eventHandlers[event];
        if (handlers && handlers.length) {
          var args = Array.prototype.slice.call(arguments, 1);
          for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, args);
          }
        }
      },
      // 清除所有事件处理器
      clear: function clear(event) {
        eventHandlers[event] = [];
      },
      // 获取唯一ID
      getId: function getId() {
        return (this.id += 1), this.id;
      },
      // 获取带ID的名称
      getNameWithId: function getNameWithId(name) {
        return name + "-" + this.getId();
      },
    };
  })();

  // 表单序列化模块
  hinnn.form = {
    serialize: function serialize(formElement) {
      var formArray = $(formElement).serializeArray(),
        formData = {};
      $.each(formArray, function () {
        formData[this.name]
          ? "[object Array]" ==
            Object.prototype.toString.call(formData[this.name])
            ? formData[this.name].push(this.value)
            : (formData[this.name] = [formData[this.name], this.value])
          : (formData[this.name] = this.value);
      });
      return formData;
    },
  };

  // 点到像素和毫米的转换模块
  hinnn.pt = {
    toPx: function toPx(points) {
      return points * (this.getDpi() / 72);
    },
    toMm: function toMm(points) {
      return hinnn.px.toMm(hinnn.pt.toPx(points));
    },
    dpi: 0,
    getDpi: function getDpi() {
      if (!this.dpi) {
        var div = document.createElement("DIV");
        div.style.cssText =
          "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(div);
        this.dpi = div.offsetHeight;
      }
      return this.dpi;
    },
  };

  // 像素到点和毫米的转换模块
  hinnn.px = {
    toPt: function toPt(pixels) {
      return pixels * (72 / this.getDpi());
    },
    toMm: function toMm(pixels) {
      return Math.round((pixels / this.getDpi()) * 25.4 * 100) / 100;
    },
    dpi: 0,
    getDpi: function getDpi() {
      if (!this.dpi) {
        var div = document.createElement("DIV");
        div.style.cssText =
          "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(div);
        this.dpi = div.offsetHeight;
      }
      return this.dpi;
    },
  };

  // 毫米到点和像素的转换模块
  hinnn.mm = {
    toPt: function toPt(mm) {
      return (72 / 25.4) * mm;
    },
    toPx: function toPx(mm) {
      return hinnn.pt.toPx(hinnn.mm.toPt(mm));
    },
  };

  // 函数节流模块
  hinnn.throttle = function (func, wait, options) {
    var context,
      args,
      result,
      timeout = null,
      previous = 0;
    options || (options = {});

    var later = function () {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    return function () {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // 函数防抖模块
  hinnn.debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
      var last = _.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };

  // 字符串转UTF-8编码
  hinnn.toUtf8 = function (str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 1 && c <= 127) {
        out += str.charAt(i);
      } else if (c > 2047) {
        out += String.fromCharCode(224 | ((c >> 12) & 15));
        out += String.fromCharCode(128 | ((c >> 6) & 63));
        out += String.fromCharCode(128 | ((c >> 0) & 63));
      } else {
        out += String.fromCharCode(192 | ((c >> 6) & 31));
        out += String.fromCharCode(128 | ((c >> 0) & 63));
      }
    }
    return out;
  };

  // 根据键值对数组进行分组
  hinnn.groupBy = function (array, keys, keyGetter) {
    var grouped = {};
    array.forEach(function (item) {
      var key = JSON.stringify(keyGetter(item));
      if (!grouped[key]) {
        grouped[key] = { rows: [] };
        keys.forEach(function (k) {
          grouped[key][k] = item[k];
        });
      }
      grouped[key].rows.push(item);
    });
    return Object.keys(grouped).map(function (key) {
      return grouped[key];
    });
  };

  // 根据键选择器对数组进行排序
  hinnn.orderBy = function (array, keySelector) {
    if (array.length <= 1) return array;
    var pivotIndex = Math.floor(array.length / 2);
    var pivot = array.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    array.forEach(function (item) {
      if (keySelector(item) < keySelector(pivot)) {
        left.push(item);
      } else {
        right.push(item);
      }
    });
    return this.orderBy(left, keySelector).concat(
      [pivot],
      this.orderBy(right, keySelector)
    );
  };

  // 日期格式化
  hinnn.dateFormat = function (date, format) {
    if (date) {
      try {
        var d = typeof date === "string" ? new Date(date) : date;
        var map = {
          "y+": d.getFullYear(),
          "M+": d.getMonth() + 1,
          "d+": d.getDate(),
          "H+": d.getHours(),
          "m+": d.getMinutes(),
          "s+": d.getSeconds(),
          "q+": Math.floor((d.getMonth() + 3) / 3),
          S: d.getMilliseconds(),
        };
        for (var k in map) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? map[k]
                : ("00" + map[k]).substr(("" + map[k]).length)
            );
          }
        }
        return format;
      } catch (error) {
        console.log(error);
        return "";
      }
    }
    return "";
  };

  // 数字格式化
  hinnn.numFormat = function (num, decimals) {
    if (num != void 0) {
      try {
        var number = typeof num === "string" ? parseFloat(num) : num;
        var decimalPlaces = parseInt(decimals);
        if (decimalPlaces > 0) {
          return number.toFixed(decimalPlaces);
        }
        return parseInt(number.toString());
      } catch (error) {
        console.log(error);
        return "";
      }
    }
    return "";
  };

  // 数字转大写中文
  hinnn.toUpperCase = function (type, value) {
    if (!Nzh) return value;
    var result = value;
    switch (type) {
      case "0":
        result = Nzh.cn.encodeS(value);
        break;
      case "1":
        result = Nzh.cn.encodeS(value, { tenMin: false });
        break;
      case "2":
        result = Nzh.cn.encodeB(value, { tenMin: true });
        break;
      case "3":
        result = Nzh.cn.encodeB(value);
        break;
      case "4":
        result = Nzh.cn.toMoney(value, { tenMin: true });
        break;
      case "5":
        result = Nzh.cn.toMoney(value);
        break;
      case "6":
        result = Nzh.cn.toMoney(value, { complete: true });
        break;
      case "7":
        result = Nzh.cn.toMoney(value, { complete: true, outSymbol: false });
        break;
    }
    return result;
  };
}
