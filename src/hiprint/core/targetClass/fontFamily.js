import { i18n } from "../../i18n/i18n";

class FontFamily {
  constructor() {
    this.name = "fontFamily";
  }

  createTarget(module) {
    let fontList = void 0;
    if ((module && (fontList = module.getFontList()), fontList)) {
      let html = `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "字体"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>`;
      fontList.forEach((font) => {
        html +=
          ' <option value="' +
          (font.value || "") +
          '" >' +
          (font.title || "") +
          "</option>";
      });
      html += " </select>\n            </div>\n        </div>";
      this.target = $(html);
    } else {
      this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "字体"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n            <option value="SimSun" >${i18n.__(
          "宋体"
        )}</option>\n            <option value="Microsoft YaHei" >${i18n.__(
          "微软雅黑"
        )}</option>\n        </select>\n        </div>\n    </div>`
      );
    }
    return this.target;
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return element.css("font-family", value), "font-family:" + value;
      element[0].style.fontFamily = "inherit"; // 从父元素继承字体, 否则模板字体无效
    }
    return null;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  setValue(value) {
    value &&
      (this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>"));
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default FontFamily;
