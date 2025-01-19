import { i18n } from "../../i18n/i18n";

export default class QRCodeType {
  constructor() {
    this.name = "qrcodeType";
  }

  createTarget() {
    const options = [
      {
        label: `${i18n.__("默认")}(qrcode)`,
        value: "",
      },
      {
        label: "QR Code",
        value: "qrcode",
      },
      {
        label: "Micro QR Code",
        value: "microqrcode",
      },
      {
        label: "Swiss QR Code",
        value: "swissqrcode",
      },
      {
        label: "Rectangular Micro QR Code",
        value: "rectangularmicroqrcode",
      },
      {
        label: "Aztec Code",
        value: "azteccode",
      },
      {
        label: "Aztec Runes",
        value: "aztecrune",
      },
      {
        label: "Compact Aztec Code",
        value: "azteccodecompact",
      },
      {
        label: "Data Matrix",
        value: "datamatrix",
      },
      {
        label: "Data Matrix Rectangular",
        value: "datamatrixrectangular",
      },
      {
        label: "汉信码",
        value: "hanxin",
      },
      {
        label: "GS1 Data Matrix",
        value: "gs1datamatrix",
      },
      {
        label: "GS1 Data Matrix Rectangular",
        value: "gs1datamatrixrectangular",
      },
      {
        label: "GS1 QR Code",
        value: "gs1qrcode",
      },
      {
        label: "HIBC Data Matrix",
        value: "hibcdatamatrix",
      },
      {
        label: "HIBC Data Matrix Rectangular",
        value: "hibcdatamatrixrectangular",
      },
      {
        label: "HIBC MicroPDF417",
        value: "hibcmicropdf417",
      },
      {
        label: "HIBC PDF417",
        value: "hibcpdf417",
      },
      {
        label: "HIBC QR Code",
        value: "hibcqrcode",
      },
    ];

    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__("二维码类型")}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit"></select>
        </div>
      </div>
    `);

    const select = this.target.find("select.auto-submit");
    options.forEach((item) => {
      select.append(`<option value="${item.value}">${item.label}</option>`);
    });
    return this.target;
  }

  getValue() {
    return this.target.find("select").val() || void 0;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}