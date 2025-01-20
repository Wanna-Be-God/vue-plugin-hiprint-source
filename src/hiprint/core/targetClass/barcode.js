import { i18n } from "../../i18n/i18n";

class BarcodeMode {
  constructor() {
    this.name = "barcodeMode";
  }

  // 创建设置面板
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("条形码格式")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="CODE128A">CODE128A</option>
            <option value="CODE128B">CODE128B</option>
            <option value="CODE128C">CODE128C</option>
            <option value="CODE39">CODE39</option>
            <option value="EAN13">EAN-13</option>
            <option value="EAN8">EAN-8</option>
            <option value="EAN5">EAN-5</option>
            <option value="EAN2">EAN-2</option>
            <option value="UPC">UPC（A）</option>
            <option value="ITF">ITF</option>
            <option value="ITF14">ITF-14</option>
            <option value="MSI">MSI</option>
            <option value="MSI10">MSI10</option>
            <option value="MSI11">MSI11</option>
            <option value="MSI1010">MSI1010</option>
            <option value="MSI1110">MSI1110</option>
            <option value="Pharmacode">Pharmacode</option>
          </select>
        </div>
      </div>
    `);

    return this.target;
  }

  // 获取当前选择的条形码格式
  getValue() {
    return this.target.find("select").val() || undefined;
  }

  // 设置条形码格式
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁当前设置面板
  destroy() {
    this.target.remove();
  }
}

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

class BarcodeWidth {
  constructor() {
    this.name = "barWidth";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__("条码宽度")}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value || undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BarAutoWidth {
  constructor() {
    this.name = "barAutoWidth";
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__(
        "条码自动增宽"
      )}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__(
        "默认"
      )}</option><option value="true">${i18n.__(
        "自动"
      )}</option><option value="false">${i18n.__(
        "不自动"
      )}</option></select></div></div>`
    );
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value || void 0;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BarcodeType {
  constructor() {
    this.name = "barcodeType";
  }

  createTarget() {
    const options = [
      {
        label: `${i18n.__("默认")}(Code 128)`,
        value: "",
      },
      {
        label: `${i18n.__("商品条码")}`,
        children: [
          { label: "EAN-13", value: "ean13" },
          { label: "EAN-8", value: "ean8" },
          { label: "UPC-A", value: "upca" },
          { label: "UPC-E", value: "upce" },
          { label: "ISBN", value: "isbn" },
          { label: "ISMN", value: "ismn" },
          { label: "ISSN", value: "issn" },
        ],
      },
      {
        label: `${i18n.__("条形码")}`,
        children: [
          { label: "Code 39", value: "code39" },
          { label: "Code 39 Extended", value: "code39ext" },
          { label: "Code 93", value: "code93" },
          { label: "Code 93 Extended", value: "code93ext" },
          { label: "Code 128", value: "code128" },
          { label: "Interleaved 2 of 5 (ITF)", value: "interleaved2of5" },
        ],
      },
      {
        label: `${i18n.__("物流")}`,
        children: [
          { label: "EAN-14", value: "ean14" },
          { label: "GS1-128", value: "gs1-128" },
          { label: "ITF-14", value: "itf14" },
          { label: "SSCC-18", value: "sscc18" },
        ],
      },
      {
        label: "GS1 DataBar",
        children: [
          { label: "扩展式 GS1 DataBar", value: "databarexpanded" },
          { label: "层排扩展式 GS1 DataBar", value: "databarexpandedstacked" },
          { label: "限定式 GS1 DataBar", value: "databarlimited" },
          { label: "全向式 GS1 DataBar", value: "databaromni" },
          { label: "层排式 GS1 DataBar", value: "databarstacked" },
          { label: "全向层排式 GS1 DataBar", value: "databarstackedomni" },
          { label: "截短式 GS1 DataBar", value: "databartruncated" },
          { label: "GS1 北美优惠券码", value: "gs1northamericancoupon" },
        ],
      },
      {
        label: `${i18n.__("邮政和快递编码")}`,
        children: [
          { label: "AusPost 4 State Customer Code", value: "auspost" },
          { label: "Deutsche Post Identcode", value: "identcode" },
          { label: "Deutsche Post Leitcode", value: "leitcode" },
          { label: "Japan Post 4 State Customer Code", value: "japanpost" },
          { label: "Royal TNT Post", value: "kix" },
          { label: "Royal Mail 4 State Customer Code", value: "royalmail" },
          { label: "Royal Mail Mailmark", value: "mailmark" },
          { label: "MaxiCode", value: "maxicode" },
          { label: "USPS FIM symbols", value: "symbol" },
          { label: "USPS Intelligent Mail", value: "onecode" },
          { label: "USPS PLANET", value: "planet" },
          { label: "USPS POSTNET", value: "postnet" },
        ],
      },
      {
        label: `${i18n.__("医疗产品编码")}`,
        children: [
          { label: "Italian Pharmacode", value: "code32" },
          { label: "Pharmaceutical Binary Code", value: "pharmacode" },
          { label: "Pharmazentralnummer (PZN)", value: "pzn" },
          { label: "Two-track Pharmacode", value: "pharmacode2" },
          { label: "HIBC Aztec Code", value: "hibcazteccode" },
          { label: "HIBC Codablock F", value: "hibccodablockf" },
          { label: "HIBC Code 128", value: "hibccode128" },
          { label: "HIBC Code 39", value: "hibccode39" },
        ],
      },
      {
        label: `${i18n.__("不常用编码")}`,
        children: [
          { label: "Code 11", value: "code11" },
          { label: "Code 16K", value: "code16k" },
          { label: "Code 2 of 5", value: "code2of5" },
          { label: "Code 49", value: "code49" },
          { label: "Code One", value: "codeone" },
          { label: "Codabar", value: "rationalizedCodabar" },
          { label: "Codablock F", value: "codablockf" },
          { label: "BC412", value: "bc412" },
          { label: "COOP 2 of 5", value: "coop2of5" },
          { label: "Channel Code", value: "channelcode" },
          { label: "Datalogic 2 of 5", value: "datalogic2of5" },
          { label: "DotCode", value: "dotcode" },
          { label: "IATA 2 of 5", value: "iata2of5" },
          { label: "MSI Plessey", value: "msi" },
          { label: "Matrix 2 of 5", value: "matrix2of5" },
          { label: "Plessey UK", value: "plessey" },
          { label: "PosiCode", value: "posicode" },
          { label: "Telepen", value: "telepen" },
          { label: "Telepen Numeric", value: "telepennumeric" },
        ],
      },
      {
        label: "GS1 复合编码",
        children: [
          { label: "复合 EAN-13", value: "ean13composite" },
          { label: "复合 EAN-8", value: "ean8composite" },
          { label: "复合 UPC-A", value: "upcacomposite" },
          { label: "复合 UPC-E", value: "upcecomposite" },
          { label: "层排扩展式复合 GS1 DataBar", value: "databarexpandedstackedcomposite" },
          { label: "扩展式复合 GS1 DataBar", value: "databarexpandedcomposite" },
          { label: "限定式复合 GS1 DataBar", value: "databarlimitedcomposite" },
          { label: "全向式复合 GS1 DataBar", value: "databaromnicomposite" },
          { label: "层排式复合 GS1 DataBar", value: "databarstackedcomposite" },
          { label: "全向层排式复合 GS1 DataBar", value: "databarstackedomnicomposite" },
          { label: "截短式复合 GS1 DataBar", value: "databartruncatedcomposite" },
          { label: "复合 GS1-128", value: "gs1-128composite" },
        ],
      },
      {
        label: `${i18n.__("附加组件")}`,
        children: [
          { label: "EAN-2 (2 位附加码)", value: "ean2" },
          { label: "EAN-5 (5 位附加码)", value: "ean5" },
          { label: "GS1 复合 2D 组件", value: "gs1-cc" },
        ],
      },
      {
        label: `${i18n.__("实验编码")}`,
        children: [
          { label: "Raw", value: "raw" },
          { label: "Custom 4 state symbology", value: "daft" },
          { label: "Flattermarken", value: "flattermarken" },
        ],
      },
    ];
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__("条码类型")}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit"></select>
        </div>
      </div>
    `);
    const select = this.target.find("select.auto-submit");
    options.forEach((item) => {
      if (item.children) {
        const optgroup = $(`<optgroup label="${item.label}"></optgroup>`);
        item.children.forEach((child) => {
          optgroup.append($(`<option value="${child.value}">${child.label}</option>`));
        });
        select.append(optgroup);
      } else {
        select.append(`<option value="${item.value}">${item.label}</option>`);
      }
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

class QRCodeType {
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

class BarColor {
  constructor() {
    this.name = "barColor";
  }

  css(element, color) {
    if (element && element.length) {
      // if (color) return element.css("background-color", color), "background-color:" + color;
      // element[0].style.backgroundColor = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("条码颜色")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit"/>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export {
  BarcodeMode,
  BarTextMode,
  BarcodeWidth,
  BarAutoWidth,
  BarcodeType,
  QRCodeType,
  QRCodeLevel,
  BarColor,
};
