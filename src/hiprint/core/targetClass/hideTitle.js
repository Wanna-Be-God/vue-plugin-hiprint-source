import { i18n } from "../../i18n/i18n";

class HideTitle {
  constructor() {
    this.name = "hideTitle";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("标题显示隐藏")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="false">${i18n.__("显示")}</option>
            <option value="true">${i18n.__("隐藏")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    return selectedValue === "true"; // 返回布尔值
  }

  setValue(value) {
    const valueToSet = value == null ? "" : value.toString();
    this.target.find("select").val(valueToSet);
  }

  destroy() {
    this.target.remove();
  }
}

export default HideTitle;
