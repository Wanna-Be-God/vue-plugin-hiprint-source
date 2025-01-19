import { i18n } from "../../i18n/i18n";

class TableHeaderFontSize {
  constructor() {
    this.name = "tableHeaderFontSize";
  }

  css(element, size) {
    if (element.find("thead").length) {
      if (size) {
        return (
          element.find("thead").css("font-size", size + "pt"),
          "font-size:" + size + "pt"
        );
      }
      element.find("thead").map(function (index, header) {
        header.style.fontSize = "";
      });
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头字体大小")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__("默认")}</option>
            <option value="6" >6pt</option>
            <option value="6.75" >6.75pt</option>
            <option value="7.5" >7.5pt</option>
            <option value="8.25" >8.25pt</option>
            <option value="9" >9pt</option>
            <option value="9.75" >9.75pt</option>
            <option value="10.5" >10.5pt</option>
            <option value="11.25" >11.25pt</option>
            <option value="12" >12pt</option>
            <option value="12.75" >12.75pt</option>
            <option value="13.5" >13.5pt</option>
            <option value="14.25" >14.25pt</option>
            <option value="15" >15pt</option>
            <option value="15.75" >15.75pt</option>
            <option value="16.5" >16.5pt</option>
            <option value="17.25" >17.25pt</option>
            <option value="18" >18pt</option>
            <option value="18.75" >18.75pt</option>
            <option value="19.5" >19.5pt</option>
            <option value="20.25" >20.25pt</option>
            <option value="21" >21pt</option>
            <option value="21.75" >21.75pt</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
  }

  setValue(value) {
    if (value) {
      if (this.target.find('option[value="' + value + '"]').length === 0) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
      this.target.find("select").val(value);
    }
  }

  destroy() {
    this.target.remove();
  }
}

export default TableHeaderFontSize;
