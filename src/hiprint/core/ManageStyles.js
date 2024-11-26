import { _typeof, _instanceof } from "../utils/Utils";
/**
 * 管理样式的插入和移除
 * @param {*} module
 * @param {*} exports
 * @param {*} require
 */
export default function (module, exports, require) {
  let isOldIE,
    getTarget,
    stylesInDom = {},
    isOldIEFn = (() => {
      isOldIE = () => window && document && document.all && !window.atob;
      return () => {
        if (getTarget === undefined) {
          getTarget = isOldIE();
        }
        return getTarget;
      };
    })(),
    getElement = (() => {
      const elementsCache = {};
      return (selector, context) => {
        if (typeof selector === "function") return selector();

        if (elementsCache[selector] === undefined) {
          let element = context
            ? context.querySelector(selector)
            : document.querySelector(selector);

          if (
            window.HTMLIFrameElement &&
            _instanceof(element, window.HTMLIFrameElement)
          ) {
            try {
              element = element.contentDocument.head;
            } catch (error) {
              element = null;
            }
          }
          elementsCache[selector] = element;
        }

        return elementsCache[selector];
      };
    })(),
    singletonElement = null,
    singletonCounter = 0,
    stylesInsertedAtTop = [],
    fixUrls = require(31);

  function addStylesToDom(styles, options) {
    styles.forEach((item) => {
      let domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs++;
        domStyle.parts.forEach((part, index) => {
          part(item.parts[index]);
        });

        for (let j = domStyle.parts.length; j < item.parts.length; j++) {
          domStyle.parts.push(addStyle(item.parts[j], options));
        }
      } else {
        const parts = item.parts.map((part) => addStyle(part, options));
        stylesInDom[item.id] = { id: item.id, refs: 1, parts };
      }
    });
  }

  function listToStyles(list, options) {
    const styles = [];
    const newStyles = {};

    list.forEach((item) => {
      const id = options.base ? item[0] + options.base : item[0];
      const part = { css: item[1], media: item[2], sourceMap: item[3] };

      if (newStyles[id]) {
        newStyles[id].parts.push(part);
      } else {
        styles.push((newStyles[id] = { id, parts: [part] }));
      }
    });

    return styles;
  }

  function insertStyleElement(options, styleElement) {
    const target = getElement(options.insertInto);
    if (!target) {
      throw new Error(
        "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
      );
    }

    const lastStyleElementInsertedAtTop =
      stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

    if (options.insertAt === "top") {
      if (lastStyleElementInsertedAtTop) {
        if (lastStyleElementInsertedAtTop.nextSibling) {
          target.insertBefore(
            styleElement,
            lastStyleElementInsertedAtTop.nextSibling
          );
        } else {
          target.appendChild(styleElement);
        }
      } else {
        target.insertBefore(styleElement, target.firstChild);
      }
      stylesInsertedAtTop.push(styleElement);
    } else if (options.insertAt === "bottom") {
      target.appendChild(styleElement);
    } else {
      if (typeof options.insertAt !== "object" || !options.insertAt.before) {
        throw new Error(
          "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
        );
      }
      const before = getElement(options.insertAt.before, target);
      target.insertBefore(styleElement, before);
    }
  }

  function removeStyleElement(styleElement) {
    if (styleElement.parentNode === null) return false;
    styleElement.parentNode.removeChild(styleElement);
    const idx = stylesInsertedAtTop.indexOf(styleElement);
    if (idx >= 0) stylesInsertedAtTop.splice(idx, 1);
  }

  function createStyleElement(options) {
    const styleElement = document.createElement("style");

    if (options.attrs.type === undefined) {
      options.attrs.type = "text/css";
    }

    if (options.attrs.nonce === undefined) {
      const nonce = (() => {
        0;
        return require.nc;
      })();

      if (nonce) options.attrs.nonce = nonce;
    }

    setAttributes(styleElement, options.attrs);
    insertStyleElement(options, styleElement);
    return styleElement;
  }

  function setAttributes(styleElement, attributes) {
    Object.keys(attributes).forEach((key) => {
      styleElement.setAttribute(key, attributes[key]);
    });
  }

  function addStyle(obj, options) {
    let styleElement, update, remove, result;

    if (options.transform && obj.css) {
      result =
        typeof options.transform === "function"
          ? options.transform(obj.css)
          : options.transform.default(obj.css);

      if (!result) return () => {};
      obj.css = result;
    }

    if (options.singleton) {
      const styleIndex = singletonCounter++;
      styleElement =
        singletonElement || (singletonElement = createStyleElement(options));
      update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
      remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
    } else if (
      obj.sourceMap &&
      typeof URL === "function" &&
      typeof URL.createObjectURL === "function" &&
      typeof URL.revokeObjectURL === "function" &&
      typeof Blob === "function" &&
      typeof btoa === "function"
    ) {
      styleElement = createLinkElement(options);
      update = updateLinkElement.bind(null, styleElement, options);
      remove = () => {
        removeStyleElement(styleElement);
        if (styleElement.href) URL.revokeObjectURL(styleElement.href);
      };
    } else {
      styleElement = createStyleElement(options);
      update = updateStyleElement.bind(null, styleElement);
      remove = () => {
        removeStyleElement(styleElement);
      };
    }

    update(obj);
    return (newObj) => {
      if (newObj) {
        if (
          newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap
        )
          return;
        update((obj = newObj));
      } else remove();
    };
  }

  function createLinkElement(options) {
    const linkElement = document.createElement("link");
    if (options.attrs.type === undefined) {
      options.attrs.type = "text/css";
    }
    options.attrs.rel = "stylesheet";
    setAttributes(linkElement, options.attrs);
    insertStyleElement(options, linkElement);
    return linkElement;
  }

  function updateLinkElement(linkElement, options, obj) {
    let css = obj.css;
    const sourceMap = obj.sourceMap;
    const convertToAbsoluteUrls =
      options.convertToAbsoluteUrls === undefined && sourceMap;

    if (options.convertToAbsoluteUrls || convertToAbsoluteUrls) {
      css = fixUrls(css);
    }

    if (sourceMap) {
      css += `\n/*# sourceMappingURL=data:application/json;base64,${btoa(
        unescape(encodeURIComponent(JSON.stringify(sourceMap)))
      )} */`;
    }

    const blob = new Blob([css], { type: "text/css" });
    const oldSrc = linkElement.href;
    linkElement.href = URL.createObjectURL(blob);
    if (oldSrc) URL.revokeObjectURL(oldSrc);
  }

  function updateStyleElement(styleElement, obj) {
    const css = obj.css;
    const media = obj.media;
    if (media) styleElement.setAttribute("media", media);
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = css;
    } else {
      while (styleElement.firstChild) {
        styleElement.removeChild(styleElement.firstChild);
      }
      styleElement.appendChild(document.createTextNode(css));
    }
  }

  module.exports = function (list, options) {
    if (
      typeof DEBUG !== "undefined" &&
      DEBUG &&
      typeof document !== "object"
    ) {
      throw new Error(
        "The style-loader cannot be used in a non-browser environment"
      );
    }

    options.attrs = typeof options.attrs === "object" ? options.attrs : {};
    options.singleton =
      options.singleton !== undefined
        ? options.singleton
        : isOldIEFn();
    options.insertInto = options.insertInto || "head";
    options.insertAt = options.insertAt || "bottom";

    const styles = listToStyles(list, options);
    addStylesToDom(styles, options);

    return (newList) => {
      const mayRemove = [];
      styles.forEach((item) => {
        const styleInDom = stylesInDom[item.id];
        styleInDom.refs--;
        mayRemove.push(styleInDom);
      });

      if (newList) {
        addStylesToDom(listToStyles(newList, options), options);
      }

      mayRemove.forEach((styleInDom) => {
        if (styleInDom.refs === 0) {
          styleInDom.parts.forEach((part) => part());
          delete stylesInDom[styleInDom.id];
        }
      });
    };
  };

  const memo = [];
  const singletonCounterFn = (index, value) => {
    memo[index] = value;
    return memo.filter(Boolean).join("\n");
  };

  function applyToSingletonTag(styleElement, index, remove, obj) {
    const css = remove ? "" : obj.css;
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = singletonCounterFn(index, css);
    } else {
      const textNode = document.createTextNode(css);
      const childNodes = styleElement.childNodes;
      if (childNodes[index]) {
        styleElement.removeChild(childNodes[index]);
      }
      if (childNodes.length) {
        styleElement.insertBefore(textNode, childNodes[index]);
      } else {
        styleElement.appendChild(textNode);
      }
    }
  }
}