import { i18n } from "../../i18n/i18n";

class TableBodyCellBorder {
  constructor() {
    this.name = "tableBodyCellBorder";
  }

  // 用于设置表体单元格的边框
  css(tableElement, borderType) {
    if (tableElement.find("tbody tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return tableElement
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-td-all");
      }

      if (borderType === "noBorder") {
        tableElement
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-td-none");
      } else {
        tableElement.find("tbody tr").removeClass();
      }
    }

    return null;
  }

  // 创建设置边框样式的目标界面
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表体单元格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  // 获取用户选择的边框类型
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // 设置边框类型的值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁界面元素
  destroy() {
    this.target.remove();
  }
}

export default TableBodyCellBorder;
