import { i18n } from "../../i18n/i18n";

class FontWeight {
  constructor() {
    this.name = "fontWeight";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return element.css("font-weight", value), "font-weight:" + value;
      element[0].style.fontWeight = "";
    }

    return null;
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "字体粗细"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n        <option value="lighter" >${i18n.__(
          "更细"
        )}</option>\n        <option value="bold" >${i18n.__(
          "粗体"
        )}</option>\n        <option value="bolder" >${i18n.__(
          "粗体+"
        )}</option>\n            <option value="100" >100</option>\n            <option value="200" >200</option>\n            <option value="300" >300</option>\n            <option value="400" >400</option>\n            <option value="500" >500</option>\n            <option value="600" >600</option>\n            <option value="700" >700</option>\n            <option value="800" >800</option>\n            <option value="900" >900</option>\n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
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

export default FontWeight;
