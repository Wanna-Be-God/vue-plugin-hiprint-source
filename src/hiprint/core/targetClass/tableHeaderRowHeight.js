/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 22:49:47
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:16:56
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

class TableHeaderRowHeight {
  constructor() {
    this.name = "tableHeaderRowHeight";
    this.target = null;
  }

  css(element, height) {
    if (element.find("thead tr td").length) {
      if (height) {
        element.find("thead tr td:not([rowspan])").css("height", height + "pt");
        return "height:" + height + "pt";
      }
      element.find("thead tr td").map((index, td) => {
        td.style.height = "";
      });
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头行高")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
            <option value="22.5">22.5pt</option>
            <option value="23.25">23.25pt</option>
            <option value="24">24pt</option>
            <option value="24.75">24.75pt</option>
            <option value="25.5">25.5pt</option>
            <option value="26.25">26.25pt</option>
            <option value="27">27pt</option>
            <option value="27.75">27.75pt</option>
            <option value="28.5">28.5pt</option>
            <option value="29.25">29.25pt</option>
            <option value="30">30pt</option>
            <option value="30.75">30.75pt</option>
            <option value="31.5">31.5pt</option>
            <option value="32.25">32.25pt</option>
            <option value="33">33pt</option>
            <option value="33.75">33.75pt</option>
            <option value="34.5">34.5pt</option>
            <option value="35.25">35.25pt</option>
            <option value="36">36pt</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return parseFloat(selectedValue.toString());
    }
  }

  setValue(value) {
    if (value) {
      const optionExists = this.target.find(`option[value="${value}"]`).length;
      if (!optionExists) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
      this.target.find("select").val(value);
    }
  }

  destroy() {
    if (this.target) {
      this.target.remove();
    }
  }
}

export default TableHeaderRowHeight;
