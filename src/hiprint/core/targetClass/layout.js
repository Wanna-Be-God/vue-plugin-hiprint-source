import { i18n } from "../../i18n/i18n";

class Coordinate {
  constructor() {
    this.name = "coordinate";
  }

  createTarget(options, syncOptions) {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "位置坐标"
        )}\n        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "X位置(左)"
        )}" class="auto-submit" />\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "Y位置(上)"
        )}" class="auto-submit" />\n
        </div>\n
        </div>`);
    this.syncLock = syncOptions.coordinateSync || false;
    this.createSyncLock(this.syncLock);
    return this.target;
  }

  createSyncLock(sync) {
    this.lockTarget = this.syncLock
      ? $(
          `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
            "同步"
          )}">🔗</label>`
        )
      : $(
          `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
            "不同步"
          )}">🔓</label>`
        );

    this.lockTarget.click(() => {
      if (this.syncLock) {
        this.lockTarget.text("🔓").attr("title", `${i18n.__("不同步")}`);
      } else {
        this.lockTarget.text("🔗").attr("title", `${i18n.__("同步")}`);
      }
      this.syncLock = !this.syncLock;
    });

    this.target.find("input:first").after(this.lockTarget);
    // 同步编辑...
    this.target.find("input:first").change(() => {
      if (this.syncLock) {
        this.target.find("input:last").val($(this).val());
      }
    });
    this.target.find("input:last").change(() => {
      if (this.syncLock) {
        this.target.find("input:first").val($(this).val());
      }
    });
    return this.lockTarget;
  }

  css(element) {
    if (element && element.length && this.target) {
      // 仅当前元素被选中才更新坐标位置, 以避免冲突
      if (
        ("block" == element.find(".resize-panel").css("display") ||
          element[0].className.includes("table")) &&
        this.el == element
      ) {
        const value = this.getValue();
        return element
          .css("left", value.left + "pt")
          .css("top", value.top + "pt");
      }
    }
    return null;
  }

  getValue() {
    const value = {
      coordinateSync: this.syncLock,
      left: 0,
      top: 0,
    };
    value.left = parseFloat(this.target.find("input:first").val() || 0);
    value.top = parseFloat(this.target.find("input:last").val() || 0);
    return value;
  }

  setValue(position, element) {
    this.el = element.designTarget || element;
    this.target.find("input:first").val(position.left);
    this.target.find("input:last").val(position.top);
  }

  destroy() {
    this.target.remove();
  }
}

class WidthHeight {
  constructor() {
    this.name = "widthHeight";
  }

  createTarget(t, o) {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "宽高大小"
        )}\n        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "宽"
        )}" class="auto-submit" />\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "高"
        )}" class="auto-submit" />\n
        </div>\n
        </div>`);
    this.syncLock = o.widthHeightSync || false;
    this.createSyncLock(this.syncLock);
    return this.target;
  }

  createSyncLock(syncLock) {
    this.lockTarget = syncLock
      ? $(
          `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
            "同步"
          )}">🔗</label>`
        )
      : $(
          `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
            "不同步"
          )}">🔓</label>`
        );

    this.lockTarget.click(() => {
      if (this.syncLock) {
        this.lockTarget.text("🔓").attr("title", `${i18n.__("不同步")}`);
      } else {
        this.lockTarget.text("🔗").attr("title", `${i18n.__("同步")}`);
      }
      this.syncLock = !this.syncLock;
    });

    this.target.find("input:first").after(this.lockTarget);

    // 同步编辑...
    this.target.find("input:first").change(() => {
      if (this.syncLock) {
        this.target.find("input:last").val($(this).val());
      }
    });

    this.target.find("input:last").change(() => {
      if (this.syncLock) {
        this.target.find("input:first").val($(this).val());
      }
    });

    return this.lockTarget;
  }

  css(element) {
    if (element && element.length && this.target) {
      // 仅当前元素被选中才更新宽高大小, 以避免冲突
      if (
        ("block" == element.find(".resize-panel").css("display") ||
          element[0].className.includes("table")) &&
        this.el == element
      ) {
        const value = this.getValue();
        return element
          .css("width", value.width + "pt")
          .css("height", value.height + "pt");
      }
    }
    return null;
  }

  getValue() {
    const value = {
      widthHeightSync: this.syncLock,
      width: 0,
      height: 0,
    };
    value.width = parseFloat(this.target.find("input:first").val() || 0);
    value.height = parseFloat(this.target.find("input:last").val() || 0);
    return value;
  }

  setValue(dimensions, el) {
    this.el = el.designTarget || el;
    this.target.find("input:first").val(dimensions.width);
    this.target.find("input:last").val(dimensions.height);
  }

  destroy() {
    this.target.remove();
  }
}

class SrcTarget {
  constructor(element) {
    this.element = element;
    this.name = "src";
  }

  createTarget(targetElement) {
    this.el = targetElement;
    let onImageChooseClick;
    const self = this;
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("图片地址")}
        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
          <input type="text" placeholder="${i18n.__(
            "请输入图片地址"
          )}" class="auto-submit" style="width:70%">
          <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__(
            "选择"
          )}</button>
        </div>
      </div>
    `);

    if (
      (targetElement &&
        (onImageChooseClick = targetElement.getOnImageChooseClick()),
      onImageChooseClick)
    ) {
      this.target.find("button").click(function () {
        onImageChooseClick && onImageChooseClick(self);
      });
    }
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  refresh(imageSrc, options, callback) {
    const that = this;
    this.setValue(imageSrc);
    this.target.find("input").change();
    if (this.el && options) {
      const img = new Image();
      img.src = imageSrc;
      if (img.complete) {
        that.updateElement(img.width, img.height, options, callback);
      } else {
        img.onload = function () {
          that.updateElement(img.width, img.height, options, callback);
        };
      }
    }
  }

  updateElement(width, height, options, callback) {
    if (options) {
      let ratio, w, h;
      if (options && options.auto) {
        if (width >= height) {
          options.width = true;
        } else {
          options.height = true;
        }
      }
      if (options.width) {
        ratio = height / width;
        w = this.el.options.width;
        h = Math.floor(w * ratio * 10) / 10;
        this.el.options.height = h;
        this.el.designTarget.css("height", h + "pt");
      } else if (options.height) {
        ratio = width / height;
        h = this.el.options.height;
        w = Math.floor(h * ratio * 10) / 10;
        this.el.options.width = w;
        this.el.designTarget.css("width", w + "pt");
      } else if (options.real) {
        w = hinnn.px.toPt(width);
        h = hinnn.px.toPt(height);
        this.el.options.width = w;
        this.el.options.height = h;
        this.el.designTarget.css("width", w + "pt");
        this.el.designTarget.css("height", h + "pt");
      }
      this.el.designTarget.children(".resize-panel").trigger($.Event("click"));
    }
    callback && callback(this.el, width, height);
  }

  destroy() {
    this.target.remove();
  }
}

class ImageFit {
  constructor() {
    this.name = "fit";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return (
          element.find("img").css("object-fit", value), "object-fit:" + value
        );
      }
      element.find("img")[0].style["object-fit"] = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("图片缩放")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="contain">${i18n.__("等比")}</option>
            <option value="cover">${i18n.__("剪裁")}</option>
            <option value="fill">${i18n.__("填充")}</option>
            <option value="none">${i18n.__("原始尺寸")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    return this.target.find("select").val();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class FixedPosition {
  constructor() {
    this.name = "fixed";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("位置固定")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="false">${i18n.__("否")}</option>
            <option value="true">${i18n.__("是")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    if ("true" === this.target.find("select").val()) return true;
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

class DragDirection {
  constructor() {
    this.name = "axis";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("拖动方向")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="h">${i18n.__("横向")}</option>
            <option value="v">${i18n.__("竖向")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value || undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class LeftOffset {
  constructor() {
    this.name = "leftOffset";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("左偏移")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__(
            "偏移量"
          )}pt" class="auto-submit">
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TopOffset {
  constructor() {
    this.name = "topOffset";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">${i18n.__("顶部偏移")}</div>
          <div class="hiprint-option-item-field">
            <input type="text" placeholder="${i18n.__(
              "偏移量"
            )}pt" class="auto-submit">
          </div>
        </div>
      `)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class MinimumHeight {
  constructor() {
    this.name = "lHeight";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("最低高度")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__(
            "文本过短或为空时的高度"
          )}" class="auto-submit">
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class LeftSpaceRemoved {
  constructor() {
    this.name = "leftSpaceRemoved";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "移除段落左侧空白"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n            <option value="true" >${i18n.__(
        "移除"
      )}</option>\n            <option value="false" >${i18n.__(
        "不移除"
      )}</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    if ("false" == this.target.find("select").val()) return false;
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

class ZIndex {
  constructor() {
    this.name = "zIndex";
  }

  css(element, zIndexValue) {
    if (element && element.length) {
      if (zIndexValue) return element.css("z-index", zIndexValue);
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("元素层级")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="number" class="auto-submit"/>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseInt(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderRadius {
  constructor() {
    this.name = "borderRadius";
  }

  css(element, radiusValue) {
    if (element && element.length) {
      if (radiusValue) return element.css("border-radius", radiusValue);
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("边框圆角")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit"/>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class PaddingLeft {
  constructor() {
    this.name = "paddingLeft";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.css("padding-left", value + "pt"), "padding-left";
      }
      element[0].style.paddingLeft = "";
    }
    return null;
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "左内边距"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class PaddingRight {
  constructor() {
    this.name = "paddingRight";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.css("padding-right", value + "pt"), "padding-right";
      }
      element[0].style.paddingRight = "";
    }
    return null;
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "右内边距"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class ContentPaddingLeft {
  constructor() {
    this.name = "contentPaddingLeft";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");
    if (contentElement && contentElement.length) {
      if (value) {
        return contentElement.css("padding-left", value + "pt"), "padding-left";
      }
      contentElement[0].style.paddingLeft = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("左内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class ContentPaddingTop {
  constructor() {
    this.name = "contentPaddingTop";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");

    if (contentElement && contentElement.length) {
      if (value) {
        return contentElement.css("padding-top", value + "pt"), "padding-top";
      }
      contentElement[0].style.paddingTop = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("上内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

// 右内边距类
class ContentPaddingRight {
  constructor() {
    this.name = "contentPaddingRight";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");

    if (contentElement && contentElement.length) {
      if (value) {
        return (
          contentElement.css("padding-right", value + "pt"), "padding-right"
        );
      }
      contentElement[0].style.paddingRight = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("右内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

// 下内边距类
class ContentPaddingBottom {
  constructor() {
    this.name = "contentPaddingBottom";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");

    if (contentElement && contentElement.length) {
      if (value) {
        return (
          contentElement.css("padding-bottom", value + "pt"), "padding-bottom"
        );
      }
      contentElement[0].style.paddingBottom = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("下内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export {
  Coordinate,
  WidthHeight,
  SrcTarget,
  ImageFit,
  FixedPosition,
  DragDirection,
  LeftOffset,
  TopOffset,
  MinimumHeight,
  LeftSpaceRemoved,
  ZIndex,
  BorderRadius,
  PaddingLeft,
  PaddingRight,
  ContentPaddingLeft,
  ContentPaddingTop,
  ContentPaddingRight,
  ContentPaddingBottom,
};
