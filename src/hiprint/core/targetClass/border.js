import { i18n } from "../../i18n/i18n";

class BorderWidth {
  constructor() {
    this.name = "borderWidth";
  }

  // 创建设置面板
  createTarget(printElement) {
    const name = ["hline", "vline", "rect", "oval"].includes(
      printElement.printElementType.type
    )
      ? `${i18n.__("线宽")}`
      : `${i18n.__("边框大小")}`;

    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${name}
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
          </select>
        </div>
      </div>`
    );

    return this.target;
  }

  // 设置或清除边框宽度
  css(element, borderWidth) {
    if (element && element.length) {
      if (borderWidth) {
        element.css("border-width", borderWidth + "pt");
        return `border-width:${borderWidth}pt`;
      }
      element[0].style.borderWidth = "";
    }

    return null;
  }

  // 获取当前选择的边框宽度
  getValue() {
    const borderWidth = this.target.find("select").val();
    if (borderWidth) return borderWidth.toString();
  }

  // 设置边框宽度
  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
      this.target.find("select").val(value);
    }
  }

  // 销毁当前设置面板
  destroy() {
    this.target.remove();
  }
}

class BorderStyle {
  constructor() {
    this.name = "borderStyle";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.css("border-style", value), "border-style:1px";
      }
      element[0].style.borderStyle = "";
    }

    return null;
  }

  createTarget(printElementType) {
    const name = ["hline", "vline", "rect", "oval"].includes(
      printElementType.type
    )
      ? `${i18n.__("样式")}`
      : `${i18n.__("边框样式")}`;
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${name}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dashed">${i18n.__("长虚线")}</option>
            <option value="dotted">${i18n.__("短虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderTop {
  constructor() {
    this.name = "borderTop";
  }

  css(element, style) {
    if (element && element.length) {
      if (style) {
        return element.css("border-top-style", style), "border-top:1px";
      }
      element[0].style.borderTopStyle = "";
      element[0].style.borderTopWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("上边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderLeft {
  constructor() {
    this.name = "borderLeft";
  }

  css(element, style) {
    if (element && element.length) {
      if (style) {
        return element.css("border-left-style", style), "border-left:1px";
      }
      element[0].style.borderLeftStyle = "";
      element[0].style.borderLeftWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("左边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderRight {
  constructor() {
    this.name = "borderRight";
  }

  css(element, style) {
    if (element && element.length) {
      if (style) {
        return element.css("border-right-style", style), "border-right:1px";
      }
      element[0].style.borderRightStyle = "";
      element[0].style.borderRightWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("右边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderBottom {
  constructor() {
    this.name = "borderBottom";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("border-bottom-style", value);
        return "border-bottom-style:1px solid";
      }
      element[0].style.borderBottomStyle = "";
      element[0].style.borderBottomWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("下边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export {
  BorderWidth,
  BorderStyle,
  BorderTop,
  BorderLeft,
  BorderRight,
  BorderBottom,
};
