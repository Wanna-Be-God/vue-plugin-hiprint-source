import { i18n } from "../../i18n/i18n";

class LineHeight {
  constructor() {
    this.name = "lineHeight";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("line-height", value + "pt"),
          "line-height:" + value + "pt"
        );
      element[0].style.lineHeight = "";
    }

    return null;
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "字体行高"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  getValue() {
    var value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    value &&
      (this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>"));
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class FontFamily {
  constructor() {
    this.name = "fontFamily";
  }

  createTarget(module) {
    let fontList = void 0;
    if ((module && (fontList = module.getFontList()), fontList)) {
      let html = `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "字体"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>`;
      fontList.forEach((font) => {
        html +=
          ' <option value="' +
          (font.value || "") +
          '" >' +
          (font.title || "") +
          "</option>";
      });
      html += " </select>\n            </div>\n        </div>";
      this.target = $(html);
    } else {
      this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "字体"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n            <option value="SimSun" >${i18n.__(
          "宋体"
        )}</option>\n            <option value="Microsoft YaHei" >${i18n.__(
          "微软雅黑"
        )}</option>\n        </select>\n        </div>\n    </div>`
      );
    }
    return this.target;
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return element.css("font-family", value), "font-family:" + value;
      element[0].style.fontFamily = "inherit"; // 从父元素继承字体, 否则模板字体无效
    }
    return null;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  setValue(value) {
    value &&
      (this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>"));
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class FontSize {
  constructor() {
    this.name = "fontSize";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("font-size", value + "pt"), "font-size:" + value + "pt"
        );
      element[0].style.fontSize = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "字体大小"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
  }

  setValue(value) {
    value &&
      (this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>"));
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class FontWeight {
  constructor() {
    this.name = "fontWeight";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return element.css("font-weight", value), "font-weight:" + value;
      element[0].style.fontWeight = "";
    }

    return null;
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "字体粗细"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n        <option value="lighter" >${i18n.__(
          "更细"
        )}</option>\n        <option value="bold" >${i18n.__(
          "粗体"
        )}</option>\n        <option value="bolder" >${i18n.__(
          "粗体+"
        )}</option>\n            <option value="100" >100</option>\n            <option value="200" >200</option>\n            <option value="300" >300</option>\n            <option value="400" >400</option>\n            <option value="500" >500</option>\n            <option value="600" >600</option>\n            <option value="700" >700</option>\n            <option value="800" >800</option>\n            <option value="900" >900</option>\n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  setValue(value) {
    value &&
      (this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>"));
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class LetterSpacing {
  constructor() {
    this.name = "letterSpacing";
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("letter-spacing", value + "pt"),
          "letter-spacing:" + value + "pt"
        );
      element[0].style.letterSpacing = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "字间距"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        </select>\n        </div>\n    </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
  }

  setValue(value) {
    value &&
      (this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>"));
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextAlign {
  constructor() {
    this.name = "textAlign";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("text-align", value);

        if (value === "justify") {
          element.css("text-align-last", "justify");
          element.css("text-justify", "distribute-all-lines");
        } else {
          element[0].style.textAlignLast = "";
          element[0].style.textJustify = "";
        }

        return "text-align:" + value;
      }

      element[0].style.textAlign = "";
      element[0].style.textAlignLast = "";
      element[0].style.textJustify = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("左右对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="left">${i18n.__("居左")}</option>
            <option value="center">${i18n.__("居中")}</option>
            <option value="right">${i18n.__("居右")}</option>
            <option value="justify">${i18n.__("两端对齐")}</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return selectedValue.toString();
    }
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextDecoration {
  constructor() {
    this.name = "textDecoration";
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "文本修饰"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n            <option value="underline" >${i18n.__(
          "下划线"
        )}</option>\n            <option value="overline" >${i18n.__(
          "上划线"
        )}</option>\n            <option value="line-through" >${i18n.__(
          "穿梭线"
        )}</option>\n           \n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  css(element, value) {
    if (element && element.length) {
      if (value)
        return (
          element.css("text-decoration", value), "text-decoration:" + value
        );
      element[0].style.textDecoration = "";
    }

    return null;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value.toString();
  }

  setValue(value) {
    if (value) {
      this.target.find('option[value="' + value + '"]').length ||
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextContentVerticalAlign {
  constructor() {
    this.name = "textContentVerticalAlign";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("上下对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="middle">${i18n.__("垂直居中")}</option>
            <option value="bottom">${i18n.__("底部")}</option>
          </select>
        </div>
      </div>
    `));
  }

  css(element, alignment) {
    if (element && element.length) {
      element.removeClass("hiprint-text-content-middle");
      element.removeClass("hiprint-text-content-bottom");
      if (alignment) {
        if (alignment === "middle")
          element.addClass("hiprint-text-content-middle");
        if (alignment === "bottom")
          element.addClass("hiprint-text-content-bottom");
      }
    }
    return null;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextContentWrap {
  constructor() {
    this.name = "textContentWrap";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("文本换行")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="nowrap">${i18n.__("不换行")}</option>
            <option value="clip">${i18n.__("不换行&隐藏")}</option>
            <option value="ellipsis">${i18n.__("不换行&省略")}</option>
          </select>
        </div>
      </div>
    `));
  }

  css(element, wrapType) {
    if (element && element.length) {
      element.removeClass("hiprint-text-content-wrap");
      element
        .find(".hiprint-printElement-text-content")
        .removeClass("hiprint-text-content-wrap-nowrap");
      element
        .find(".hiprint-printElement-text-content")
        .removeClass("hiprint-text-content-wrap-clip");
      element
        .find(".hiprint-printElement-text-content")
        .removeClass("hiprint-text-content-wrap-ellipsis");
      if (wrapType) {
        element.addClass("hiprint-text-content-wrap");
        element
          .find(".hiprint-printElement-text-content")
          .addClass("hiprint-text-content-wrap-" + wrapType);
      }
    }
    return null;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class Columns {
  constructor(requireModule) {
    this.name = "columns";
    this.requireModule = requireModule;
  }

  createTarget() {
    $('<div class="indicator"></div>').appendTo("body");
    return (
      " </ul>\n       </div>\n    </div>",
      (this.target = $(
        ' <div class="hiprint-option-item hiprint-option-item-row">\n       <div>\n            <ul class="hiprint-option-table-selected-columns"> </ul>\n       </div>\n    </div>'
      )),
      this.target
    );
  }

  getValue() {
    return this.buildData();
  }

  setValue(columnData, options, printElementType) {
    this.value = columnData;
    this.options = options;
    this.printElementType = printElementType;

    const availableColumns = printElementType.columns[0]
      .filter((column) => {
        return (
          0 ===
          columnData[0].columns.filter((dataColumn) => {
            return column.columnId === dataColumn.columnId;
          }).length
        );
      })
      .map((column) => {
        const columnInstance = new this.requireModule.a(column);
        columnInstance.checked = false;
        return columnInstance;
      });

    this.allColumns = columnData[0].columns.concat(availableColumns);

    if (columnData && columnData.length === 1) {
      this.target.find("ul").html(
        this.allColumns
          .map((column) => {
            return (
              '<li class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">\n                ' +
              (column.checked
                ? '<input type="checkbox" checked column-id="' +
                  (column.id || column.columnId) +
                  '" />'
                : '<input type="checkbox" column-id="' +
                  (column.id || column.columnId) +
                  '" />') +
              '\n                <div class="state">\n                    <label></label>\n                </div>\n            </div><span class="column-title">' +
              (column.title || column.descTitle || "") +
              "</span></li>"
            );
          })
          .join("")
      );

      this.target.find("input").change((event) => {
        const isChecked = event.target.checked;
        const columnId = event.target.attributes["column-id"].nodeValue || "";
        const index = this.allColumns.findIndex((col) => {
          return col.field === columnId || col.id === columnId;
        });
        if (index >= 0) {
          this.allColumns[index]["checked"] = isChecked;
        }
        this.submit();
      });

      if (printElementType.columnDisplayIndexEditable) {
        this.target
          .find("li")
          .hidraggable({
            revert: true,
            handle: ".column-title",
            moveUnit: "pt",
            deltaX: 0,
            deltaY: 0,
          })
          .hidroppable({
            onDragOver: function (event, ui) {
              $(this).css("border-top-color", "red");
            },
            onDragLeave: function (event, ui) {
              $(this).css("border-top-color", "");
            },
            onDrop: function (event, ui) {
              $(ui).insertBefore(this);
              $(this).css("border-top-color", "");
              this.submit();
            },
          });
      }
    }
  }

  buildData() {
    const columnData = this;
    const result = [];
    if (columnData.options.columns.length > 1) {
      return this.value;
    }
    columnData.printElementType.makeColumnObj(columnData.allColumns);
    this.target.find("input").map((index, inputElement) => {
      const columnId = $(inputElement).attr("column-id");
      const column = columnData.printElementType.getColumnByColumnId(columnId);
      if (column) {
        const columnInstance = new this.requireModule.a(column);
        columnInstance.checked = column.checked;
        result.push(columnInstance);
      }
    });
    return (this.value[0].columns = result), this.value;
  }

  destroy() {
    this.target.remove();
  }
}

class UpperCase {
  constructor() {
    this.name = "upperCase";
  }
  createTarget() {
    const optionsList = [
      { text: "「小写」十点八", value: "0" },
      { text: "「小写」一十点八", value: "1" },
      { text: "「大写」拾点捌", value: "2" },
      { text: "「大写」壹拾点捌", value: "3" },
      { text: "「金额」人民币拾元捌角", value: "4" },
      { text: "「金额」人民币壹拾元捌角", value: "5" },
      { text: "「金额」人民币壹拾元捌角零分", value: "6" },
      { text: "「金额」壹拾元捌角零分", value: "7" },
    ];
    let optionsHTML = `\n<option value="">${i18n.__("默认")}</option>`;
    optionsList.forEach((item) => {
      optionsHTML += `\n<option value='${item.value}'>${item.text}</option>`;
    });
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("转大小写")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit"></select>
        </div>
      </div>`);
    this.target.find(".auto-submit").append($(optionsHTML));
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

class Align {
  constructor() {
    this.name = "align";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格左右对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="left">${i18n.__("居左")}</option>
            <option value="center">${i18n.__("居中")}</option>
            <option value="right">${i18n.__("居右")}</option>
            <option value="justify">${i18n.__("两端对齐")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class VerticalAlign {
  constructor() {
    this.name = "vAlign";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格上下对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="top">${i18n.__("上")}</option>
            <option value="middle">${i18n.__("中")}</option>
            <option value="bottom">${i18n.__("下")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class HorizontalAlignment {
  constructor() {
    this.name = "halign";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格头单元格左右对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="left">${i18n.__("居左")}</option>
            <option value="center">${i18n.__("居中")}</option>
            <option value="right">${i18n.__("居右")}</option>
            <option value="justify">${i18n.__("两端对齐")}</option>
          </select>
        </div>
      </div>
    `);
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

class LongTextIndent {
  constructor() {
    this.name = "longTextIndent";
  }

  css(element, value) {
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("每行缩进")}
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
            <option value="13.5">13pt</option>
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
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? parseFloat(value.toString()) : undefined;
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class ShowInPage {
  constructor() {
    this.name = "showInPage";
  }

  css(element, value) {
    if (element && element.length) {
      if (value && value === "none") {
        return element.addClass("alwaysHide");
      }
      element.removeClass("alwaysHide");
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("显示规则")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="none">${i18n.__("始终隐藏")}</option>
            <option value="first">${i18n.__("首页")}</option>
            <option value="odd">${i18n.__("奇数页")}</option>
            <option value="even">${i18n.__("偶数页")}</option>
            <option value="last">${i18n.__("尾页")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextType {
  constructor() {
    this.name = "textType";
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "打印类型"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n        <option value="" >${i18n.__(
          "文本"
        )}</option>\n        <option value="barcode" >${i18n.__(
          "条形码"
        )}</option>\n        <option value="qrcode" >${i18n.__(
          "二维码"
        )}</option>\n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export {
  LineHeight,
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  TextAlign,
  TextDecoration,
  TextContentVerticalAlign,
  TextContentWrap,
  Columns,
  UpperCase,
  Align,
  VerticalAlign,
  HorizontalAlignment,
  LongTextIndent,
  ShowInPage,
  TextType,
};
