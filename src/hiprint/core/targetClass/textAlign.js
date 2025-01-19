import { i18n } from "../../i18n/i18n";

class TextAlign {
  constructor() {
    this.name = "textAlign";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("text-align", value);

        if (value === "justify") {
          element.css("text-align-last", "justify");
          element.css("text-justify", "distribute-all-lines");
        } else {
          element[0].style.textAlignLast = "";
          element[0].style.textJustify = "";
        }

        return "text-align:" + value;
      }

      element[0].style.textAlign = "";
      element[0].style.textAlignLast = "";
      element[0].style.textJustify = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("左右对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="left">${i18n.__("居左")}</option>
            <option value="center">${i18n.__("居中")}</option>
            <option value="right">${i18n.__("居右")}</option>
            <option value="justify">${i18n.__("两端对齐")}</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return selectedValue.toString();
    }
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TextAlign;
