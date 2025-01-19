import { i18n } from "../../i18n/i18n";

class TableHeaderCellBorder {
  constructor() {
    this.name = "tableHeaderCellBorder";
    this.target = null;
  }

  // Function to apply the CSS style for table header cell borders
  css(element, borderType) {
    if (element.find("thead tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-td-all");
      }
      if (borderType === "noBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-td-none");
      } else {
        element.find("thead tr").removeClass();
      }
    }
    return null;
  }

  // Function to create the target DOM element with select options
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头单元格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  // Function to get the selected value from the dropdown
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // Function to set the selected value in the dropdown
  setValue(value) {
    this.target.find("select").val(value);
  }

  // Function to remove the target element from DOM
  destroy() {
    this.target.remove();
  }
}

export default TableHeaderCellBorder;