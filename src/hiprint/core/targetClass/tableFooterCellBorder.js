import { i18n } from "../../i18n/i18n";

export default class TableFooterCellBorder {
  constructor() {
    this.name = "tableFooterCellBorder";
  }

  css(element, style) {
    if (element.find("tfoot tr").length) {
      if (style === "border" || style === undefined) {
        return element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-td-all");
      }
      if (style === "noBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-td-none");
      } else {
        element.find("tfoot tr").removeClass();
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表尾单元格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}