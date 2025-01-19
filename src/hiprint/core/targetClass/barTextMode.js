import { i18n } from "../../i18n/i18n";

class BarTextMode {
  constructor() {
    this.name = "barTextMode";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__("条码文本模式")}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="text">单独文本</option>
            <option value="svg">svg文本</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    return selectedValue || undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default BarTextMode