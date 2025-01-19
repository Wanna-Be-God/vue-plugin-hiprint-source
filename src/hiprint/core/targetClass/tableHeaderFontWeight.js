import { i18n } from "../../i18n/i18n";

class TableHeaderFontWeight {
  constructor() {
    this.name = "tableHeaderFontWeight";
  }

  css(element, weight) {
    if (element.find("thead").length) {
      if (weight) {
        return (
          element.find("thead tr td").css("font-weight", weight),
          "font-weight:" + weight
        );
      }
      element.find("thead tr td").map(function (index, header) {
        header.style.fontWeight = "";
      });
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头字体粗细")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="lighter">${i18n.__("更细")}</option>
            <option value="bold">${i18n.__("粗体")}</option>
            <option value="bolder">${i18n.__("粗体+")}</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
  }

  setValue(value) {
    if (value) {
      if (
        this.target.find('option[value="' + value + '"]').length === 0
      ) {
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

export default TableHeaderFontWeight;