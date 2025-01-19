import { i18n } from "../../i18n/i18n";

class QRCodeLevel {
  constructor() {
    this.name = "qrCodeLevel";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("二维码容错率")}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("默认")}</option>
              <option value="1">7% L</option>
              <option value="0">15% M</option>
              <option value="3">25% Q</option>
              <option value="2">30% H</option>
            </select>
          </div>
        </div>`)
    ),
    this.target
    );
  }

  getValue() {
    const value = this.target.find("select").val();
    return parseInt(value || 0);
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default QRCodeLevel;