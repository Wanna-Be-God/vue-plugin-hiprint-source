import { i18n } from "../../i18n/i18n";

class TableHeaderBorder {
  constructor() {
    this.name = "tableHeaderBorder";
    this.target = null;
  }

  // Function to apply the border style to the table header
  applyCss(element, borderType) {
    if (element.find("thead tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-all");
      }
      if (borderType === "noBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-none");
      } else if (borderType === "leftBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-left");
      } else if (borderType === "rightBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-right");
      } else if (borderType === "leftRightBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-lr");
      } else if (borderType === "topBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-top");
      } else if (borderType === "bottomBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-bottom");
      } else if (borderType === "topBottomBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-tb");
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
          ${i18n.__("表头边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__("默认")}</option>
            <option value="border" >${i18n.__("有边框")}</option>
            <option value="noBorder" >${i18n.__("无边框")}</option>
            <option value="leftBorder" >${i18n.__("左边框")}</option>
            <option value="rightBorder" >${i18n.__("右边框")}</option>
            <option value="leftRightBorder" >${i18n.__("左右边框")}</option>
            <option value="topBorder" >${i18n.__("上边框")}</option>
            <option value="bottomBorder" >${i18n.__("下边框")}</option>
            <option value="topBottomBorder" >${i18n.__("上下边框")}</option>
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

export default TableHeaderBorder
  
