import { i18n } from "../../i18n/i18n";

class LetterSpacing {
  constructor() {
    this.name = "letterSpacing";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("letter-spacing", value + "pt"),
          "letter-spacing:" + value + "pt"
        );
      element[0].style.letterSpacing = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "字间距"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        </select>\n        </div>\n    </div>`
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

export default LetterSpacing;
