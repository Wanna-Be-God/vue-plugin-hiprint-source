import { i18n } from "../../i18n/i18n";
class LineHeight {
  constructor() {
    this.name = "lineHeight";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("line-height", value + "pt"),
          "line-height:" + value + "pt"
        );
      element[0].style.lineHeight = "";
    }

    return null;
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "字体行高"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  getValue() {
    var value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
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

export default LineHeight;
