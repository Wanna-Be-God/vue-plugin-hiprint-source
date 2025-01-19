import { i18n } from "../../i18n/i18n";

export default class TextDecoration {
  constructor() {
    this.name = "textDecoration";
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "文本修饰"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n            <option value="underline" >${i18n.__(
          "下划线"
        )}</option>\n            <option value="overline" >${i18n.__(
          "上划线"
        )}</option>\n            <option value="line-through" >${i18n.__(
          "穿梭线"
        )}</option>\n           \n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  css(element, value) {
    if (element && element.length) {
      if (value) return element.css("text-decoration", value), "text-decoration:" + value;
      element[0].style.textDecoration = "";
    }

    return null;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value.toString();
  }

  setValue(value) {
    if (value) {
      this.target.find('option[value="' + value + '"]').length ||
        this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}