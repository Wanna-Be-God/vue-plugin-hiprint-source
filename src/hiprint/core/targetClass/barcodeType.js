import { i18n } from "../../i18n/i18n";

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

export default BarcodeType;