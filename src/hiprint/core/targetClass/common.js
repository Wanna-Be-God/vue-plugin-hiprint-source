import { i18n } from "../../i18n/i18n";

class DataType {
  constructor() {
    this.name = "dataType";
  }

  createTarget() {
    const self = this;
    return (
      (this.target = $(`
        <div class="hiprint-option-item-row">
        <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__("数据类型")}
        </div>
        <div class="hiprint-option-item-field">
        <select class="hiprint-option-item-datatype">
        <option value="" >${i18n.__("默认")}</option>
        <option value="datetime" >${i18n.__("日期时间")}</option>
        <option value="boolean" >${i18n.__("布尔")}</option>
        </select>
        </div>
    </div>
    <div class="hiprint-option-item ">
        <div class="hiprint-option-item-label ">
        ${i18n.__("格式")}
        </div>
        <div class="hiprint-option-item-field">
        <select  class="auto-submit hiprint-option-item-datatype-select-format">
        <option value="" >${i18n.__("默认")}</option>
        
        </select>
        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">
        </div>
    </div>
        </div>
`)),
      $(this.target.find(".hiprint-option-item-datatype")).change(function () {
        const selectedDataType = $(
          self.target.find(".hiprint-option-item-datatype")
        ).val();
        self.loadFormatSelectByDataType(selectedDataType);
        self.submit(self.getValue());
      }),
      this.target
    );
  }

  getValue() {
    const selectedDataType = this.target
      .find(".hiprint-option-item-datatype")
      .val();

    if (selectedDataType) {
      const selectedFormat = this.target
        .find(".hiprint-option-item-datatype-format")
        .val();
      return {
        dataType: selectedDataType,
        format: selectedFormat || undefined,
      };
    }

    return {
      dataType: undefined,
      format: undefined,
    };
  }

  setValue(dataType, format) {
    this.target
      .find(".hiprint-option-item-datatype")
      .val(format.dataType || "");
    this.loadFormatSelectByDataType(format.dataType);
    this.target
      .find(".hiprint-option-item-datatype-format")
      .val(format.format || "");
  }

  destroy() {
    this.target.remove();
  }

  loadFormatSelectByDataType(dataType) {
    if (dataType === "boolean") {
      this.target
        .find(".hiprint-option-item-datatype-select-format")
        .removeClass("hiprint-option-item-datatype-format")
        .hide()
        .val("");
      this.target
        .find(".hiprint-option-item-datatype-input-format")
        .addClass("hiprint-option-item-datatype-format")
        .show();
    } else if (dataType === "datetime") {
      this.target
        .find(".hiprint-option-item-datatype-select-format")
        .addClass("hiprint-option-item-datatype-format")
        .show();
      this.target
        .find(".hiprint-option-item-datatype-input-format")
        .removeClass("hiprint-option-item-datatype-format")
        .hide()
        .val("");
      this.target.find(".hiprint-option-item-datatype-select-format").html(`
            <option value="" >${i18n.__("默认")}</option>
            <option value="M/d" >M/d</option>
            <option value="MM/dd" >MM/dd</option>
            <option value="yy/M/d" >yy/M/d</option>
            <option value="yy/MM/dd" >yy/MM/dd</option>
            <option value="yyyy/M/d" >yyyy/M/d</option>
            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>
            <option value="yy/M/d H:m" >yy/M/d H:m</option>
            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>
            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>
            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>
            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>
            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>
            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>
            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>
            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>
            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>
            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>
            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>
            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>
            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>
            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>
            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>

            <option value="M-d" >M-d</option>
            <option value="MM-dd" >MM-dd</option>
            <option value="yy-M-d" >yy-M-d</option>
            <option value="yy-MM-dd" >yy-MM-dd</option>
            <option value="yyyy-M-d" >yyyy-M-d</option>
            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>
            <option value="yy-M-d H:m" >yy-M-d H:m</option>
            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>
            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>
            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>
            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>
            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>
            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>
            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>
            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>
            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>
            <option value="yyyy-M-d HH:mm" >yyyy/M/d HH:mm</option>
            <option value="yyyy-M-d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>
            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>
            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>
            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>
            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>
        `);
    } else {
      this.target.find(".hiprint-option-item-datatype-select-format").show();
      this.target
        .find(".hiprint-option-item-datatype-input-format")
        .hide()
        .val("");
      this.target.find(".hiprint-option-item-datatype-format").html(`
            <option value="" >${i18n.__("默认")}</option>
        `);
    }
  }
}

class Orientation {
  constructor() {
    this.name = "orient";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("纸张方向(仅自定义纸质有效)")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="1">${i18n.__("纵向")}</option>
            <option value="2">${i18n.__("横向")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}
export { DataType, Orientation };
