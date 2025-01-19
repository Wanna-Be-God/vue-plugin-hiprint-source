import { i18n } from "../../i18n/i18n";

class FontSize {
  constructor() {
    this.name = "fontSize";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("font-size", value + "pt"), "font-size:" + value + "pt"
        );
      element[0].style.fontSize = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "字体大小"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
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

export default FontSize;
