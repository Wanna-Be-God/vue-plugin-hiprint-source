import { i18n } from "../i18n/i18n";

import LineHeight from "./targetClass/lineHeight";

export default function CreateTarget(t, e, n) {
  "use strict";

  var i = (function () {
      function t() {
        this.name = "lineHeight";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return t.css("line-height", e + "pt"), "line-height:" + e + "pt";
            t[0].style.lineHeight = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
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
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    fontFamily = (function () {
      function t() {
        this.name = "fontFamily";
      }
      return (
        (t.prototype.createTarget = function (t) {
          var e = void 0;
          if ((t && (e = t.getFontList()), e)) {
            var n = `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
              "字体"
            )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
              "默认"
            )}</option>`;
            e.forEach(function (t, e) {
              n +=
                ' <option value="' +
                (t.value || "") +
                '" >' +
                (t.title || "") +
                "</option>";
            }),
              (n += " </select>\n            </div>\n        </div>"),
              (this.target = $(n));
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
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("font-family", e), "font-family:" + e;
            t[0].style.fontFamily = "inherit"; // 从父元素继承字体, 否则模板字体无效
          }
          return null;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    r = (function () {
      function t() {
        this.name = "fontSize";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("font-size", e + "pt"), "font-size:" + e + "pt";
            t[0].style.fontSize = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "字体大小"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    a = (function () {
      function t() {
        this.name = "fontWeight";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("font-weight", e), "font-weight:" + e;
            t[0].style.fontWeight = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
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
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    p = (function () {
      function t() {
        this.name = "letterSpacing";
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t.css("letter-spacing", e + "pt"), "letter-spacing:" + e + "pt"
              );
            t[0].style.letterSpacing = "";
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "字间距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    s = (function () {
      function t() {
        this.name = "textAlign";
      }
      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t.css("text-align", e),
                "justify" == e
                  ? (t.css("text-align-last", "justify"),
                    t.css("text-justify", "distribute-all-lines"))
                  : ((t[0].style.textAlignLast = ""),
                    (t[0].style.textJustify = "")),
                "text-align:" + e
              );
            (t[0].style.textAlign = ""),
              (t[0].style.textAlignLast = ""),
              (t[0].style.textJustify = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "左右对齐"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="left" >${i18n.__(
                "居左"
              )}</option>\n        <option value="center" >${i18n.__(
                "居中"
              )}</option>\n        <option value="right" >${i18n.__(
                "居右"
              )}</option>\n        <option value="justify" >${i18n.__(
                "两端对齐"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    l = (function () {
      function t() {
        this.name = "hideTitle";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "标题显示隐藏"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="false" >${i18n.__(
                "显示"
              )}</option>\n            <option value="true" >${i18n.__(
                "隐藏"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    u = (function () {
      function t() {
        this.name = "tableBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("table").length) {
            if ("border" == e || void 0 == e)
              return (
                t.find("table").css("border", "1px solid"), "border:1px solid"
              );
            "noBorder" == e
              ? t.find("table").css("border", "0px solid")
              : (t.find("table")[0].style.border = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表格边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n            <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n            </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    d = (function () {
      function t() {
        this.name = "tableHeaderBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("thead tr").length) {
            if ("border" == e || void 0 == e)
              return t
                .find("thead tr")
                .addClass("hiprint-printElement-tableTarget-border-all");
            "noBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-none")
              : "leftBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-left")
              : "rightBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-right")
              : "leftRightBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-lr")
              : "topBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-top")
              : "bottomBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-bottom")
              : "topBottomBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-tb")
              : t.find("thead tr").removeClass();
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表头边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>    \n        <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n        <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n        <option value="leftBorder" >${i18n.__(
                "左边框"
              )}</option>\n        <option value="rightBorder" >${i18n.__(
                "右边框"
              )}</option>\n        <option value="leftRightBorder" >${i18n.__(
                "左右边框"
              )}</option>\n        <option value="topBorder" >${i18n.__(
                "上边框"
              )}</option>\n        <option value="bottomBorder" >${i18n.__(
                "下边框"
              )}</option>\n        <option value="topBottomBorder" >${i18n.__(
                "上下边框"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    c = (function () {
      function t() {
        this.name = "tableHeaderCellBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("thead tr").length) {
            if ("border" == e || void 0 == e)
              return t
                .find("thead tr")
                .addClass("hiprint-printElement-tableTarget-border-td-all");
            "noBorder" == e
              ? t
                  .find("thead tr")
                  .addClass("hiprint-printElement-tableTarget-border-td-none")
              : t.find("thead tr").removeClass();
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表头单元格边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>    \n        <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n        <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n      \n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    d2 = (function () {
      function t() {
        this.name = "tableFooterBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("tfoot tr").length) {
            if ("border" == e || void 0 == e)
              return t
                .find("tfoot tr")
                .addClass("hiprint-printElement-tableTarget-border-all");
            "noBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-none")
              : "leftBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-left")
              : "rightBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-right")
              : "leftRightBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-lr")
              : "topBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-top")
              : "bottomBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-bottom")
              : "topBottomBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-tb")
              : t.find("tfoot tr").removeClass();
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表尾边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>    \n        <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n        <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n        <option value="leftBorder" >${i18n.__(
                "左边框"
              )}</option>\n        <option value="rightBorder" >${i18n.__(
                "右边框"
              )}</option>\n        <option value="leftRightBorder" >${i18n.__(
                "左右边框"
              )}</option>\n        <option value="topBorder" >${i18n.__(
                "上边框"
              )}</option>\n        <option value="bottomBorder" >${i18n.__(
                "下边框"
              )}</option>\n        <option value="topBottomBorder" >${i18n.__(
                "上下边框"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    c2 = (function () {
      function t() {
        this.name = "tableFooterCellBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("tfoot tr").length) {
            if ("border" == e || void 0 == e)
              return t
                .find("tfoot tr")
                .addClass("hiprint-printElement-tableTarget-border-td-all");
            "noBorder" == e
              ? t
                  .find("tfoot tr")
                  .addClass("hiprint-printElement-tableTarget-border-td-none")
              : t.find("tfoot tr").removeClass();
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表尾单元格边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>    \n        <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n        <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n      \n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    h = (function () {
      function t() {
        this.name = "tableHeaderRowHeight";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("thead tr td").length) {
            if (e)
              return (
                t.find("thead tr td:not([rowspan])").css("height", e + "pt"),
                "height:" + e + "pt"
              );
            t.find("thead tr td").map(function (t, e) {
              e.style.height = "";
            });
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表头行高"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n       \n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    f = (function () {
      function t() {
        this.name = "tableHeaderFontSize";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("thead").length) {
            if (e)
              return (
                t.find("thead").css("font-size", e + "pt"),
                "font-size:" + e + "pt"
              );
            t.find("thead").map(function (t, e) {
              e.style.fontSize = "";
            });
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表头字体大小"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    g = (function () {
      function t() {
        this.name = "tableHeaderFontWeight";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("thead").length) {
            if (e)
              return (
                t.find("thead tr td").css("font-weight", e), "font-weight:" + e
              );
            t.find("thead tr td").map(function (t, e) {
              e.style.fontWeight = "";
            });
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表头字体粗细"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit"> \n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="lighter" >${i18n.__(
                "更细"
              )}</option>\n        <option value="bold" >${i18n.__(
                "粗体"
              )}</option>\n        <option value="bolder" >${i18n.__(
                "粗体+"
              )}</option>\n        <option value="100" >100</option>\n        <option value="200" >200</option>\n        <option value="300" >300</option>\n        <option value="400" >400</option>\n        <option value="500" >500</option>\n        <option value="600" >600</option>\n        <option value="700" >700</option>\n        <option value="800" >800</option>\n        <option value="900" >900</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    m = (function () {
      function t() {
        this.name = "tableBodyCellBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("tbody tr").length) {
            if ("border" == e || void 0 == e)
              return t
                .find("tbody tr")
                .addClass("hiprint-printElement-tableTarget-border-td-all");
            "noBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-td-none")
              : t.find("tbody tr").removeClass();
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n            ${i18n.__(
                "表体单元格边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n            <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n            </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    v = (function () {
      function t() {
        this.name = "tableBodyRowHeight";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("tbody tr td").length) {
            if (e)
              return (
                t.find("tbody tr td").css("height", e + "pt"),
                "height:" + e + "pt"
              );
            t.find("tbody tr td").map(function (t, e) {
              e.style.height = "";
            });
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n            ${i18n.__(
                "表体行高"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="6" >6pt</option>\n            <option value="6.75" >6.75pt</option>\n            <option value="7.5" >7.5pt</option>\n            <option value="8.25" >8.25pt</option>\n            <option value="9" >9pt</option>\n            <option value="9.75" >9.75pt</option>\n            <option value="10.5" >10.5pt</option>\n            <option value="11.25" >11.25pt</option>\n            <option value="12" >12pt</option>\n            <option value="12.75" >12.75pt</option>\n            <option value="13.5" >13.5pt</option>\n            <option value="14.25" >14.25pt</option>\n            <option value="15" >15pt</option>\n            <option value="15.75" >15.75pt</option>\n            <option value="16.5" >16.5pt</option>\n            <option value="17.25" >17.25pt</option>\n            <option value="18" >18pt</option>\n            <option value="18.75" >18.75pt</option>\n            <option value="19.5" >19.5pt</option>\n            <option value="20.25" >20.25pt</option>\n            <option value="21" >21pt</option>\n            <option value="21.75" >21.75pt</option>\n            <option value="22.5" >22.5pt</option>\n            <option value="23.25" >23.25pt</option>\n            <option value="24" >24pt</option>\n            <option value="24.75" >24.75pt</option>\n            <option value="25.5" >25.5pt</option>\n            <option value="26.25" >26.25pt</option>\n            <option value="27" >27pt</option>\n            <option value="27.75" >27.75pt</option>\n            <option value="28.5" >28.5pt</option>\n            <option value="29.25" >29.25pt</option>\n            <option value="30" >30pt</option>\n            <option value="30.75" >30.75pt</option>\n            <option value="31.5" >31.5pt</option>\n            <option value="32.25" >32.25pt</option>\n            <option value="33" >33pt</option>\n            <option value="33.75" >33.75pt</option>\n            <option value="34.5" >34.5pt</option>\n            <option value="35.25" >35.25pt</option>\n            <option value="36" >36pt</option>\n            </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    y = (function () {
      function t() {
        this.name = "tableHeaderBackground";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("thead").length) {
            if (e)
              return t.find("thead").css("background", e), "background:" + e;
            t.find("thead").map(function (t, e) {
              e.style.background = "";
            });
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表头背景"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").minicolors({
            defaultValue: t || "",
            theme: "bootstrap",
          }),
            this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    b = (function () {
      function t() {
        this.name = "borderWidth";
      }

      return (
        (t.prototype.createTarget = function (t) {
          var name = ["hline", "vline", "rect", "oval"].includes(
            t.printElementType.type
          )
            ? `${i18n.__("线宽")}`
            : `${i18n.__("边框大小")}`;
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t.css("border-width", e + "pt"), "border-width:" + e + "pt"
              );
            t[0].style.borderWidth = "";
          }

          return null;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    E = (function () {
      function t() {
        this.name = "barcodeMode";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "条形码格式"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="CODE128A" >CODE128A</option>\n        <option value="CODE128B" >CODE128B</option>\n        <option value="CODE128C" >CODE128C</option>\n        <option value="CODE39" >CODE39</option>\n        <option value="EAN13" >EAN-13</option>\n        <option value="EAN8" >EAN-8</option>\n        <option value="EAN5" >EAN-5</option>\n        <option value="EAN2" >EAN-2</option>\n        <option value="UPC" >UPC（A）</option>\n        <option value="ITF" >ITF</option>\n        <option value="ITF14" >ITF-14</option>\n        <option value="MSI" >MSI</option>\n            <option value="MSI10" >MSI10</option>\n            <option value="MSI11" >MSI11</option>\n            <option value="MSI1010" >MSI1010</option>\n            <option value="MSI1110" >MSI1110</option>\n            <option value="Pharmacode" >Pharmacode</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return t || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    barTextMode = (function () {
      function t() {
        this.name = "barTextMode";
      }
      return (
        (t.prototype.createTarget = function () {
          this.target = $(
            `<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__(
              "条码文本模式"
            )}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__(
              "默认"
            )}</option><option value="text">单独文本</option><option value="svg">svg文本</option></select></div></div>`
          );
          return this.target;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return t || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    barWidth = (function () {
      function t() {
        this.name = "barWidth";
      }
      return (
        (t.prototype.createTarget = function () {
          this.target = $(
            `<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__(
              "条码宽度"
            )}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__(
              "默认"
            )}</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div></div>`
          );
          return this.target;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return t || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    barAutoWidth = (function () {
      function t() {
        this.name = "barAutoWidth";
      }
      return (
        (t.prototype.createTarget = function () {
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
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return t || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    barcodeType = (function () {
      function t() {
        this.name = "barcodeType";
      }

      return (
        (t.prototype.createTarget = function () {
          var options = [
            {
              label: `${i18n.__("默认")}(Code 128)`,
              value: "",
            },
            {
              label: `${i18n.__("商品条码")}`,
              children: [
                {
                  label: "EAN-13",
                  value: "ean13",
                },
                {
                  label: "EAN-8",
                  value: "ean8",
                },
                {
                  label: "UPC-A",
                  value: "upca",
                },
                {
                  label: "UPC-E",
                  value: "upce",
                },
                {
                  label: "ISBN",
                  value: "isbn",
                },
                {
                  label: "ISMN",
                  value: "ismn",
                },
                {
                  label: "ISSN",
                  value: "issn",
                },
              ],
            },
            {
              label: `${i18n.__("条形码")}`,
              children: [
                {
                  label: "Code 39",
                  value: "code39",
                },
                {
                  label: "Code 39 Extended",
                  value: "code39ext",
                },
                {
                  label: "Code 93",
                  value: "code93",
                },
                {
                  label: "Code 93 Extended",
                  value: "code93ext",
                },
                {
                  label: "Code 128",
                  value: "code128",
                },
                {
                  label: "Interleaved 2 of 5 (ITF)",
                  value: "interleaved2of5",
                },
              ],
            },
            {
              label: `${i18n.__("物流")}`,
              children: [
                {
                  label: "EAN-14",
                  value: "ean14",
                },
                {
                  label: "GS1-128",
                  value: "gs1-128",
                },
                {
                  label: "ITF-14",
                  value: "itf14",
                },
                {
                  label: "SSCC-18",
                  value: "sscc18",
                },
              ],
            },
            {
              label: "GS1 DataBar",
              children: [
                {
                  label: "扩展式 GS1 DataBar",
                  value: "databarexpanded",
                },
                {
                  label: "层排扩展式 GS1 DataBar",
                  value: "databarexpandedstacked",
                },
                {
                  label: "限定式 GS1 DataBar",
                  value: "databarlimited",
                },
                {
                  label: "全向式 GS1 DataBar",
                  value: "databaromni",
                },
                {
                  label: "层排式 GS1 DataBar",
                  value: "databarstacked",
                },
                {
                  label: "全向层排式 GS1 DataBar",
                  value: "databarstackedomni",
                },
                {
                  label: "截短式 GS1 DataBar",
                  value: "databartruncated",
                },
                {
                  label: "GS1 北美优惠券码",
                  value: "gs1northamericancoupon",
                },
              ],
            },
            {
              label: `${i18n.__("邮政和快递编码")}`,
              children: [
                {
                  label: "AusPost 4 State Customer Code",
                  value: "auspost",
                },
                {
                  label: "Deutsche Post Identcode",
                  value: "identcode",
                },
                {
                  label: "Deutsche Post Leitcode",
                  value: "leitcode",
                },
                {
                  label: "Japan Post 4 State Customer Code",
                  value: "japanpost",
                },
                {
                  label: "Royal TNT Post",
                  value: "kix",
                },
                {
                  label: "Royal Mail 4 State Customer Code",
                  value: "royalmail",
                },
                {
                  label: "Royal Mail Mailmark",
                  value: "mailmark",
                },
                {
                  label: "MaxiCode",
                  value: "maxicode",
                },
                {
                  label: "USPS FIM symbols",
                  value: "symbol",
                },
                {
                  label: "USPS Intelligent Mail",
                  value: "onecode",
                },
                {
                  label: "USPS PLANET",
                  value: "planet",
                },
                {
                  label: "USPS POSTNET",
                  value: "postnet",
                },
              ],
            },
            {
              label: `${i18n.__("医疗产品编码")}`,
              children: [
                {
                  label: "Italian Pharmacode",
                  value: "code32",
                },
                {
                  label: "Pharmaceutical Binary Code",
                  value: "pharmacode",
                },
                {
                  label: "Pharmazentralnummer (PZN)",
                  value: "pzn",
                },
                {
                  label: "Two-track Pharmacode",
                  value: "pharmacode2",
                },
                {
                  label: "HIBC Aztec Code",
                  value: "hibcazteccode",
                },
                {
                  label: "HIBC Codablock F",
                  value: "hibccodablockf",
                },
                {
                  label: "HIBC Code 128",
                  value: "hibccode128",
                },
                {
                  label: "HIBC Code 39",
                  value: "hibccode39",
                },
              ],
            },
            {
              label: `${i18n.__("不常用编码")}`,
              children: [
                {
                  label: "Code 11",
                  value: "code11",
                },
                {
                  label: "Code 16K",
                  value: "code16k",
                },
                {
                  label: "Code 2 of 5",
                  value: "code2of5",
                },
                {
                  label: "Code 49",
                  value: "code49",
                },
                {
                  label: "Code One",
                  value: "codeone",
                },
                {
                  label: "Codabar",
                  value: "rationalizedCodabar",
                },
                {
                  label: "Codablock F",
                  value: "codablockf",
                },
                {
                  label: "BC412",
                  value: "bc412",
                },
                {
                  label: "COOP 2 of 5",
                  value: "coop2of5",
                },
                {
                  label: "Channel Code",
                  value: "channelcode",
                },
                {
                  label: "Datalogic 2 of 5",
                  value: "datalogic2of5",
                },
                {
                  label: "DotCode",
                  value: "dotcode",
                },
                {
                  label: "IATA 2 of 5",
                  value: "iata2of5",
                },
                {
                  label: "MSI Plessey",
                  value: "msi",
                },
                {
                  label: "Matrix 2 of 5",
                  value: "matrix2of5",
                },
                {
                  label: "Plessey UK",
                  value: "plessey",
                },
                {
                  label: "PosiCode",
                  value: "posicode",
                },
                {
                  label: "Telepen",
                  value: "telepen",
                },
                {
                  label: "Telepen Numeric",
                  value: "telepennumeric",
                },
              ],
            },
            {
              label: "GS1 复合编码",
              children: [
                {
                  label: "复合 EAN-13",
                  value: "ean13composite",
                },
                {
                  label: "复合 EAN-8",
                  value: "ean8composite",
                },
                {
                  label: "复合 UPC-A",
                  value: "upcacomposite",
                },
                {
                  label: "复合 UPC-E",
                  value: "upcecomposite",
                },
                {
                  label: "层排扩展式复合 GS1 DataBar",
                  value: "databarexpandedstackedcomposite",
                },
                {
                  label: "扩展式复合 GS1 DataBar",
                  value: "databarexpandedcomposite",
                },
                {
                  label: "限定式复合 GS1 DataBar",
                  value: "databarlimitedcomposite",
                },
                {
                  label: "全向式复合 GS1 DataBar",
                  value: "databaromnicomposite",
                },
                {
                  label: "层排式复合 GS1 DataBar",
                  value: "databarstackedcomposite",
                },
                {
                  label: "全向层排式复合 GS1 DataBar",
                  value: "databarstackedomnicomposite",
                },
                {
                  label: "截短式复合 GS1 DataBar",
                  value: "databartruncatedcomposite",
                },
                {
                  label: "复合 GS1-128",
                  value: "gs1-128composite",
                },
              ],
            },
            {
              label: `${i18n.__("附加组件")}`,
              children: [
                {
                  label: "EAN-2 (2 位附加码)",
                  value: "ean2",
                },
                {
                  label: "EAN-5 (5 位附加码)",
                  value: "ean5",
                },
                {
                  label: "GS1 复合 2D 组件",
                  value: "gs1-cc",
                },
              ],
            },
            {
              label: `${i18n.__("实验编码")}`,
              children: [
                {
                  label: "Raw",
                  value: "raw",
                },
                {
                  label: "Custom 4 state symbology",
                  value: "daft",
                },
                {
                  label: "Flattermarken",
                  value: "flattermarken",
                },
              ],
            },
          ];
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__(
              "条码类型"
            )}</div><div class="hiprint-option-item-field"><select class="auto-submit"></select></div></div>`
          );
          var select = this.target.find("select.auto-submit");
          options.forEach((item) => {
            if (item.children) {
              var optgroup = $(`<optgroup label="${item.label}"></optgroup`);
              item.children.forEach((chil) => {
                optgroup.append(
                  $(`<option value="${chil.value}">${chil.label}</option>`)
                );
              });
              select.append(optgroup);
            } else {
              select.append(
                `<option value="${item.value}">${item.label}</option>`
              );
            }
          });
          return this.target;
        }),
        (t.prototype.getValue = function () {
          return this.target.find("select").val() || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    qrcodeType = (function () {
      function t() {
        this.name = "qrcodeType";
      }

      return (
        (t.prototype.createTarget = function () {
          var options = [
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
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__(
              "二维码类型"
            )}</div><div class="hiprint-option-item-field"><select class="auto-submit"></select></div></div>`
          );
          var select = this.target.find("select.auto-submit");
          options.forEach((item) => {
            select.append(
              `<option value="${item.value}">${item.label}</option>`
            );
          });
          return this.target;
        }),
        (t.prototype.getValue = function () {
          return this.target.find("select").val() || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    qrCodeLevel = (function () {
      function t() {
        this.name = "qrCodeLevel";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "二维码容错率"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="1" >7% L</option>\n        <option value="0" >15% M</option>\n        <option value="3" >25% Q</option>\n        <option value="2" >30% H</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return parseInt(t || 0);
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    T = (function () {
      function t() {
        this.name = "color";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("color", e), "color:" + e;
            t[0].style.color = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "字体颜色"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").minicolors({
            defaultValue: t || "",
            theme: "bootstrap",
          }),
            this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    P = (function () {
      function t() {
        this.name = "textDecoration";
      }

      return (
        (t.prototype.createTarget = function () {
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
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("text-decoration", e), "text-decoration:" + e;
            t[0].style.textDecoration = "";
          }

          return null;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    _ = (function () {
      function t() {
        this.name = "field";
      }

      return (
        (t.prototype.createTarget = function (t) {
          var e = void 0;

          if ((t && (e = t.getFields()), e)) {
            this.isSelect = !0;
            var n = `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__(
              "字段名"
            )}\n            </div>\n            <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n                <option value="" >${i18n.__(
              "请选择字段"
            )}</option>`;
            e.forEach(function (t, e) {
              n +=
                ' <option value="' +
                (t.field || "") +
                '" >' +
                (t.text || "") +
                "</option>";
            }),
              (n += " </select>\n            </div>\n        </div>"),
              (this.target = $(n));
          } else {
            this.isSelect = !1;
            this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__(
                "字段名"
              )}\n            </div>\n            <div class="hiprint-option-item-field">\n            <input type="text" placeholder="${i18n.__(
                "请输入字段名"
              )}" class="auto-submit">\n            </div>\n        </div>`
            );
          }

          return this.target;
        }),
        (t.prototype.getValue = function () {
          return (
            (this.isSelect
              ? this.target.find("select").val()
              : this.target.find("input").val()) || void 0
          );
        }),
        (t.prototype.setValue = function (t) {
          this.isSelect
            ? t &&
              (this.target.find('option[value="' + t + '"]').length ||
                this.target
                  .find("select")
                  .prepend('<option value="' + t + '" >' + t + "</option>"),
              this.target.find("select").val(t))
            : this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    w = (function () {
      function t() {
        this.name = "title";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "标题"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:50px;" placeholder="${i18n.__(
                "请输入标题"
              )}" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    x = (function () {
      function t() {
        this.name = "testData";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "测试数据"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "仅字段名称存在时有效"
              )}" class="auto-submit" >\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    coordinate = (function () {
      function t() {
        this.name = "coordinate";
      }

      return (
        (t.prototype.createTarget = function (t, o) {
          var n = this;
          n.target =
            $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "位置坐标"
        )}\n        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "X位置(左)"
        )}" class="auto-submit" />\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "Y位置(上)"
        )}" class="auto-submit" />\n
        </div>\n
        </div>`);
          n.syncLock = o.coordinateSync || false;
          n.createSyncLock(n.syncLock);
          return n.target;
        }),
        (t.prototype.createSyncLock = function (t) {
          var n = this;
          n.lockTarget = n.syncLock
            ? $(
                `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
                  "同步"
                )}">🔗</label>`
              )
            : $(
                `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
                  "不同步"
                )}">🔓</label>`
              );
          n.lockTarget.click(function () {
            if (n.syncLock) {
              n.lockTarget.text("🔓").attr("title", `${i18n.__("不同步")}`);
            } else {
              n.lockTarget.text("🔗").attr("title", `${i18n.__("同步")}`);
            }
            n.syncLock = !n.syncLock;
          });
          n.target.find("input:first").after(n.lockTarget);
          // 同步编辑...
          n.target.find("input:first").change(function () {
            if (n.syncLock) {
              n.target.find("input:last").val($(this).val());
            }
          });
          n.target.find("input:last").change(function () {
            if (n.syncLock) {
              n.target.find("input:first").val($(this).val());
            }
          });
          return n.lockTarget;
        }),
        (t.prototype.css = function (t) {
          if (t && t.length && this.target) {
            // 仅当前元素被选中才更新坐标位置, 以避免冲突
            if (
              ("block" == t.find(".resize-panel").css("display") ||
                t[0].className.includes("table")) &&
              this.el == t
            ) {
              var v = this.getValue();
              return t.css("left", v.left + "pt").css("top", v.top + "pt");
            }
          }
          return null;
        }),
        (t.prototype.getValue = function () {
          var v = {
            coordinateSync: this.syncLock,
            left: 0,
            top: 0,
          };
          v.left = parseFloat(this.target.find("input:first").val() || 0);
          v.top = parseFloat(this.target.find("input:last").val() || 0);
          return v;
        }),
        (t.prototype.setValue = function (t, el) {
          this.el = el.designTarget || el;
          this.target.find("input:first").val(t.left);
          this.target.find("input:last").val(t.top);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    widthHeight = (function () {
      function t() {
        this.name = "widthHeight";
      }

      return (
        (t.prototype.createTarget = function (t, o) {
          var n = this;
          n.target =
            $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "宽高大小"
        )}\n        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "宽"
        )}" class="auto-submit" />\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "高"
        )}" class="auto-submit" />\n
        </div>\n
        </div>`);
          n.syncLock = o.widthHeightSync || false;
          n.createSyncLock(n.syncLock);
          return n.target;
        }),
        (t.prototype.createSyncLock = function (t) {
          var n = this;
          n.lockTarget = n.syncLock
            ? $(
                `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
                  "同步"
                )}">🔗</label>`
              )
            : $(
                `<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
                  "不同步"
                )}">🔓</label>`
              );
          n.lockTarget.click(function () {
            if (n.syncLock) {
              n.lockTarget.text("🔓").attr("title", `${i18n.__("不同步")}`);
            } else {
              n.lockTarget.text("🔗").attr("title", `${i18n.__("同步")}`);
            }
            n.syncLock = !n.syncLock;
          });
          n.target.find("input:first").after(n.lockTarget);
          // 同步编辑...
          n.target.find("input:first").change(function () {
            if (n.syncLock) {
              n.target.find("input:last").val($(this).val());
            }
          });
          n.target.find("input:last").change(function () {
            if (n.syncLock) {
              n.target.find("input:first").val($(this).val());
            }
          });
          return n.lockTarget;
        }),
        (t.prototype.css = function (t) {
          if (t && t.length && this.target) {
            // 仅当前元素被选中才更新宽高大小, 以避免冲突
            if (
              ("block" == t.find(".resize-panel").css("display") ||
                t[0].className.includes("table")) &&
              this.el == t
            ) {
              var v = this.getValue();
              return t
                .css("width", v.width + "pt")
                .css("height", v.height + "pt");
            }
          }
          return null;
        }),
        (t.prototype.getValue = function () {
          var v = {
            widthHeightSync: this.syncLock,
            width: 0,
            height: 0,
          };
          v.width = parseFloat(this.target.find("input:first").val() || 0);
          v.height = parseFloat(this.target.find("input:last").val() || 0);
          return v;
        }),
        (t.prototype.setValue = function (t, el) {
          this.el = el.designTarget || el;
          this.target.find("input:first").val(t.width);
          this.target.find("input:last").val(t.height);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    C = (function () {
      function t() {
        this.name = "src";
      }

      return (
        (t.prototype.createTarget = function (t) {
          this.el = t;
          var e = void 0,
            i = this;
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
              "图片地址"
            )}\n        </div>\n        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n        <input type="text" placeholder="${i18n.__(
              "请输入图片地址"
            )}" class="auto-submit" style="width:70%">\n    <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__(
              "选择"
            )}</button>        </div>\n    </div>`
          );
          if ((t && (e = t.getOnImageChooseClick()), e)) {
            this.target.find("button").click(function () {
              e && e(i);
            });
          }
          return this.target;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.refresh = function (t, opt, cb) {
          var that = this;
          this.setValue(t), this.target.find("input").change();
          if (this.el && opt) {
            var img = new Image();
            img.src = t;
            if (img.complete) {
              that.updateEl(img.width, img.height, opt, cb);
            } else {
              img.onload = function () {
                that.updateEl(img.width, img.height, opt, cb);
              };
            }
          }
        }),
        (t.prototype.updateEl = function (width, height, opt, cb) {
          if (opt) {
            var ratio, w, h;
            if (opt && opt.auto) {
              if (width >= height) {
                opt.width = true;
              } else {
                opt.height = true;
              }
            }
            if (opt.width) {
              ratio = height / width;
              w = this.el.options.width;
              h = Math.floor(w * ratio * 10) / 10;
              this.el.options.height = h;
              this.el.designTarget.css("height", h + "pt");
            } else if (opt.height) {
              ratio = width / height;
              h = this.el.options.height;
              w = Math.floor(h * ratio * 10) / 10;
              this.el.options.width = w;
              this.el.designTarget.css("width", w + "pt");
            } else if (opt.real) {
              w = hinnn.px.toPt(width);
              h = hinnn.px.toPt(height);
              this.el.options.width = w;
              this.el.options.height = h;
              this.el.designTarget.css("width", w + "pt");
              this.el.designTarget.css("height", h + "pt");
            }
            this.el.designTarget
              .children(".resize-panel")
              .trigger($.Event("click"));
          }
          cb && cb(this.el, width, height);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    imageFit = (function () {
      function t() {
        this.name = "fit";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.find("img").css("object-fit", e), "object-fit:" + e;
            t.find("img")[0].style["object-fit"] = "";
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          (this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
              "图片缩放"
            )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
              "默认"
            )}</option>\n        <option value="contain" >${i18n.__(
              "等比"
            )}</option>\n        <option value="cover" >${i18n.__(
              "剪裁"
            )}</option>\n        <option value="fill" >${i18n.__(
              "填充"
            )}</option>\n        <option value="none" >${i18n.__(
              "原始尺寸"
            )}</option>\n                </select>\n        </div>\n    </div>`
          )),
            this.target;
          return this.target;
        }),
        (t.prototype.getValue = function () {
          return this.target.find("select").val();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    O = (function () {
      function t() {
        this.name = "borderColor";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("border-color", e), "border-color:" + e;
            t[0].style.borderColor = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function (t) {
          var name = ["hline", "vline", "rect", "oval"].includes(
            t.printElementType.type
          )
            ? `${i18n.__("颜色")}`
            : `${i18n.__("边框颜色")}`;
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").minicolors({
            defaultValue: t || "",
            theme: "bootstrap",
          }),
            this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    watermarkOptions = (function () {
      function t() {
        this.name = "watermarkOptions";
      }
      return (
        (t.prototype.createTarget = function () {
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__(
              "水印功能"
            )}</div></div>`
          );
          this.content = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__(
              "水印内容"
            )}:</div><input style="width:75%" type="text" placeholder="${i18n.__(
              "水印内容"
            )}" class="auto-submit"></div>`
          );
          this.fillStyle = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: center;margin-top: 4px"><div style="width:25%">${i18n.__(
              "字体颜色"
            )}:</div><input style="width:110%" data-format="rgb" data-opacity="0.3" type="text" placeholder="${i18n.__(
              "字体颜色"
            )}" class="auto-submit"></div>`
          );
          this.fontSize = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__(
              "字体大小"
            )}:</div><input style="width:75%" type="range" min="10" max="80" placeholder="${i18n.__(
              "字体大小"
            )}" class="auto-submit"></div>`
          );
          this.rotate = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__(
              "旋转角度"
            )}:</div><input style="width:75%" type="range" min="0" max="180" placeholder="${i18n.__(
              "旋转角度"
            )}" class="auto-submit"></div>`
          );
          this.width = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__(
              "水平密度"
            )}:</div><input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__(
              "水平密度"
            )}" class="auto-submit"></div>`
          );
          this.height = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__(
              "垂直密度"
            )}:</div><input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__(
              "垂直密度"
            )}" class="auto-submit"></div>`
          );
          this.timestamp = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__(
              "水印时间"
            )}:</div><input style="width:18px;height:18px;margin:0 0 4px 0;" type="checkbox" placeholder="${i18n.__(
              "水印时间"
            )}" class="auto-submit"></div>`
          );
          let formatlist = [
            "YYYY-MM-DD HH:mm:ss",
            "YYYY-MM-DD HH:mm",
            "YYYY-MM-DD HH",
            "YYYY-MM-DD",
            "YYYY-MMMM",
            "YYYY-MM",
            "YYYY",
          ];
          let timeFormatList = `\n            <option value="" >${i18n.__(
            "默认"
          )}(YYYY-MM-DD HH:mm)</option>`;
          formatlist.forEach(function (e) {
            timeFormatList +=
              '\n            <option value="' + e + '">' + e + "</option>";
          });
          this.format = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__(
              "时间格式"
            )}:</div><select style="width:75%" class="auto-submit"></select></div>`
          );
          this.format.find(".auto-submit").append($(timeFormatList));
          this.target.append(this.content);
          this.target.append(this.fillStyle);
          this.target.append(this.fontSize);
          this.target.append(this.rotate);
          this.target.append(this.width);
          this.target.append(this.height);
          this.target.append(this.timestamp);
          this.target.append(this.format);
          return this.target;
        }),
        (t.prototype.getValue = function () {
          let opt = {
            content: this.content.find("input").val(),
            fillStyle:
              this.fillStyle.find("input").val() || "rgba(184, 184, 184, 0.3)",
            fontSize:
              parseInt(this.fontSize.find("input").val() || "14") + "px",
            rotate: parseInt(this.rotate.find("input").val() || "25"),
            width: parseInt(this.width.find("input").val() || "200"),
            height: parseInt(this.height.find("input").val() || "200"),
            timestamp: this.timestamp.find("input").is(":checked"),
            format:
              this.format.find("select").val() == ""
                ? "YYYY-MM-DD HH:mm"
                : this.format.find("select").val(),
          };
          let options = Object.assign({}, this.options, opt);
          return options;
        }),
        (t.prototype.setValue = function (t) {
          this.options = t;
          this.content.find("input").val(t.content || "");
          this.fillStyle
            .find("input")
            .val(t.fillStyle || "rgba(184, 184, 184, 0.3)");
          this.fillStyle.find("input").minicolors({
            format: "rgb",
            opacity: true,
            theme: "bootstrap",
          });
          const fontSize = parseInt(t.fontSize || "14");
          this.fontSize.find("input").val(fontSize);
          this.rotate.find("input").val(t.rotate || 25);
          this.width.find("input").val(t.width || 200);
          this.height.find("input").val(t.height || 200);
          this.timestamp
            .find("input")
            .attr("checked", t.timestamp == void 0 ? false : t.timestamp);
          this.format.find("select").val(t.format || "YYYY-MM-DD HH:mm");
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    H = (function () {
      function t() {
        this.name = "paperNumberFormat";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "页码格式"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="\${paperNo}-\${paperCount}" class="auto-submit">\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    D = (function () {
      function t() {
        this.name = "paperNumberDisabled";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "显示页码"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "显示"
              )}</option>\n        <option value="true" >${i18n.__(
                "隐藏"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    paperNumberContinue = (function () {
      function t() {
        this.name = "paperNumberContinue";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "页码续排"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="true" >${i18n.__(
                "续排"
              )}</option>\n        <option value="reset" >${i18n.__(
                "重排"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          return "true" == this.target.find("select").val();
        }),
        (t.prototype.setValue = function (t) {
          this.target
            .find("select")
            .val((t == void 0 || t ? "true" : "reset").toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    I = (function () {
      function t() {
        this.name = "longTextIndent";
      }

      return (
        (t.prototype.css = function (t, e) {
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "每行缩进"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    R = (function () {
      function t() {
        this.name = "showInPage";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e && "none" == e) return t.addClass("alwaysHide");
            t.removeClass("alwaysHide");
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "显示规则"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="none" >${i18n.__(
                "始终隐藏"
              )}</option>\n            <option value="first" >${i18n.__(
                "首页"
              )}</option>\n            <option value="odd" >${i18n.__(
                "奇数页"
              )}</option>\n            <option value="even" >${i18n.__(
                "偶数页"
              )}</option>\n            <option value="last" >${i18n.__(
                "尾页"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    pageBreak = (function () {
      function t() {
        this.name = "pageBreak";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e && "none" == e) return t.addClass("alwaysHide");
            t.removeClass("alwaysHide");
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "强制分页"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="true" >${i18n.__(
                "是"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    M = (function () {
      function t() {
        this.name = "panelPaperRule";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "打印规则"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="odd" >${i18n.__(
                "保持奇数"
              )}</option>\n            <option value="even" >${i18n.__(
                "保持偶数"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    M2 = (function () {
      function t() {
        this.name = "panelPageRule";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "分页规则"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="none" >${i18n.__(
                "不分页"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    S = (function () {
      function t() {
        this.name = "leftSpaceRemoved";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "移除段落左侧空白"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="true" >${i18n.__(
                "移除"
              )}</option>\n            <option value="false" >${i18n.__(
                "不移除"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("false" == this.target.find("select").val()) return !1;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    B = (function () {
      function t() {
        this.name = "firstPaperFooter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "首页页尾"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "首页页尾"
              )}" class="auto-submit">\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    F = (function () {
      function t() {
        this.name = "lastPaperFooter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "尾页页尾"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "尾页页尾"
              )}" class="auto-submit">\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    L = (function () {
      function t() {
        this.name = "evenPaperFooter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "偶数页页尾"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "偶数页页尾"
              )}" class="auto-submit">\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    A = (function () {
      function t() {
        this.name = "oddPaperFooter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "奇数页页尾"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "奇数页页尾"
              )}" class="auto-submit" >\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    z = (function () {
      function t() {
        this.name = "fixed";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "位置固定"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="false" >${i18n.__(
                "否"
              )}</option>\n            <option value="true" >${i18n.__(
                "是"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    k = (function () {
      function t() {
        this.name = "axis";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "拖动方向"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="h" >${i18n.__(
                "横向"
              )}</option>\n        <option value="v" >${i18n.__(
                "竖向"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return t || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    N = (function () {
      function t() {
        this.name = "leftOffset";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "左偏移"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "偏移量"
              )}pt" class="auto-submit" >\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    V = (function () {
      function t() {
        this.name = "lHeight";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "最低高度"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "文本过短或为空时的高度"
              )}" class="auto-submit">\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    W = (function () {
      function t() {
        this.name = "unShowInPage";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "隐藏规则"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="first" >${i18n.__(
                "首页"
              )}</option>\n            <option value="last" >${i18n.__(
                "尾页"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    j = (function () {
      function t() {
        this.name = "tableBodyRowBorder";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t.find("tbody tr").length) {
            if ("border" == e || void 0 == e)
              return t
                .find("tbody tr")
                .addClass("hiprint-printElement-tableTarget-border-all");
            "noBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-none")
              : "leftBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-left")
              : "rightBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-right")
              : "leftRightBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-lr")
              : "topBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-top")
              : "bottomBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-bottom")
              : "topBottomBorder" == e
              ? t
                  .find("tbody tr")
                  .addClass("hiprint-printElement-tableTarget-border-tb")
              : t.find("tbody tr").removeClass();
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表体行边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>    \n        <option value="border" >${i18n.__(
                "有边框"
              )}</option>\n        <option value="noBorder" >${i18n.__(
                "无边框"
              )}</option>\n        <option value="leftBorder" >${i18n.__(
                "左边框"
              )}</option>\n        <option value="rightBorder" >${i18n.__(
                "右边框"
              )}</option>\n        <option value="leftRightBorder" >${i18n.__(
                "左右边框"
              )}</option>\n        <option value="topBorder" >${i18n.__(
                "上边框"
              )}</option>\n        <option value="bottomBorder" >${i18n.__(
                "下边框"
              )}</option>\n        <option value="topBottomBorder" >${i18n.__(
                "上下边框"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    U = (function () {
      function t() {
        this.name = "transform";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            var n = t
              .find(".hiprint-printElement-content")
              .parent(".hiprint-printElement");
            if (!n.length) {
              n = t;
            }
            if (e)
              return (
                n.css("transform", "rotate(" + e + "deg)"),
                n.css("-ms-transform", "rotate(" + e + "deg)"),
                n.css("-moz-transform", "rotate(" + e + "deg)"),
                n.css("-webkit-transform", "rotate(" + e + "deg)"),
                n.css("-o-transform", "rotate(" + e + "deg)"),
                "transform:rotate(" + e + "deg)"
              );
            n.length && (n[0].style.transform = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "旋转角度"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    zIndex = (function () {
      function t() {
        this.name = "zIndex";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("z-index", e);
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "元素层级"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseInt(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    borderRadius = (function () {
      function t() {
        this.name = "borderRadius";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("border-raduis", e);
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "边框圆角"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    K = (function () {
      function t() {
        this.name = "optionsGroup";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "边框设置"
              )}\n        </div>\n       \n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {}),
        (t.prototype.setValue = function (t) {}),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    G = (function () {
      function t() {
        this.name = "borderTop";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("border-top-style", e), "border-top:1px";
            (t[0].style.borderTopStyle = ""), (t[0].style.borderTopWidth = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "上边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >${i18n.__(
                "否"
              )}</option>\n            <option value="solid" >${i18n.__(
                "实线"
              )}</option>\n            <option value="dotted" >${i18n.__(
                "虚线"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    q = (function () {
      function t() {
        this.name = "borderLeft";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("border-left-style", e), "border-left:1px";
            (t[0].style.borderLeftStyle = ""),
              (t[0].style.borderLeftWidth = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "左边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "否"
              )}</option>\n        <option value="solid" >${i18n.__(
                "实线"
              )}</option>\n        <option value="dotted" >${i18n.__(
                "虚线"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    X = (function () {
      function t() {
        this.name = "borderRight";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("border-right-style", e), "border-right:1px";
            (t[0].style.borderRightStyle = ""),
              (t[0].style.borderRightWidth = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "右边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "否"
              )}</option>\n        <option value="solid" >${i18n.__(
                "实线"
              )}</option>\n        <option value="dotted" >${i18n.__(
                "虚线"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    Y = (function () {
      function t() {
        this.name = "borderBottom";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t.css("border-bottom-style", e), "border-bottom-style:1px solid"
              );
            (t[0].style.borderBottomStyle = ""),
              (t[0].style.borderBottomWidth = "");
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "下边框"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "否"
              )}</option>\n        <option value="solid" >${i18n.__(
                "实线"
              )}</option>\n        <option value="dotted" >${i18n.__(
                "虚线"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    J = (function () {
      function t() {
        this.name = "contentPaddingLeft";
      }

      return (
        (t.prototype.css = function (t, e) {
          var n = t.find(".hiprint-printElement-content");

          if (n && n.length) {
            if (e) return n.css("padding-left", e + "pt"), "padding-left";
            n[0].style.paddingLeft = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "左内边距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    Q = (function () {
      function t() {
        this.name = "contentPaddingTop";
      }

      return (
        (t.prototype.css = function (t, e) {
          var n = t.find(".hiprint-printElement-content");

          if (n && n.length) {
            if (e) return n.css("padding-top", e + "pt"), "padding-top";
            n[0].style.paddingTop = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "上内边距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    Z = (function () {
      function t() {
        this.name = "contentPaddingRight";
      }

      return (
        (t.prototype.css = function (t, e) {
          var n = t.find(".hiprint-printElement-content");

          if (n && n.length) {
            if (e) return n.css("padding-right", e + "pt"), "padding-right";
            n[0].style.paddingRight = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "右内边距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tt = (function () {
      function t() {
        this.name = "contentPaddingBottom";
      }

      return (
        (t.prototype.css = function (t, e) {
          var n = t.find(".hiprint-printElement-content");

          if (n && n.length) {
            if (e) return n.css("padding-bottom", e + "pt"), "padding-bottom";
            n[0].style.paddingBottom = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "下内边距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    et = (function () {
      function t() {
        this.name = "borderStyle";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("border-style", e), "border-style:1px";
            t[0].style.borderStyle = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function (t) {
          var name = ["hline", "vline", "rect", "oval"].includes(
            t.printElementType.type
          )
            ? `${i18n.__("样式")}`
            : `${i18n.__("边框样式")}`;
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n       ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="solid" >${i18n.__(
                "实线"
              )}</option>\n            <option value="dashed" >${i18n.__(
                "长虚线"
              )}</option>\n            <option value="dotted" >${i18n.__(
                "短虚线"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    nt = (function () {
      function t() {
        this.name = "backgroundColor";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e) return t.css("background-color", e), "background-color:" + e;
            t[0].style.backgroundColor = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "背景颜色"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").minicolors({
            defaultValue: t || "",
            theme: "bootstrap",
          }),
            this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    barColor = (function () {
      function t() {
        this.name = "barColor";
      }

      return (
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            // if (e) return t.css("background-color", e), "background-color:" + e;
            // t[0].style.backgroundColor = "";
          }
          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "条码颜色"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").minicolors({
            defaultValue: t || "",
            theme: "bootstrap",
          }),
            this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    it = (function () {
      function t() {
        this.name = "orient";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "纸张方向(仅自定义纸质有效)"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="1" >${i18n.__(
                "纵向"
              )}</option>\n        <option value="2" >${i18n.__(
                "横向"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    ot = (function () {
      function t() {
        this.name = "textContentVerticalAlign";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "上下对齐"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="middle" >${i18n.__(
                "垂直居中"
              )}</option>\n        <option value="bottom" >${i18n.__(
                "底部"
              )}</option>\n       \n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            t.removeClass("hiprint-text-content-middle"),
              t.removeClass("hiprint-text-content-bottom");
            if (e)
              return (
                "middle" === e && t.addClass("hiprint-text-content-middle"),
                "bottom" === e && t.addClass("hiprint-text-content-bottom"),
                ""
              );
          }

          return null;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    textWrap = (function () {
      function t() {
        this.name = "textContentWrap";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "文本换行"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="nowrap" >${i18n.__(
                "不换行"
              )}</option>\n        <option value="clip" >${i18n.__(
                "不换行&隐藏"
              )}</option>\n        <option value="ellipsis" >${i18n.__(
                "不换行&省略"
              )}</option>\n       </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            t.removeClass("hiprint-text-content-wrap");
            t.find(".hiprint-printElement-text-content").removeClass(
              "hiprint-text-content-wrap-nowrap"
            );
            t.find(".hiprint-printElement-text-content").removeClass(
              "hiprint-text-content-wrap-clip"
            );
            t.find(".hiprint-printElement-text-content").removeClass(
              "hiprint-text-content-wrap-ellipsis"
            );
            if (e)
              return (
                t.addClass("hiprint-text-content-wrap"),
                t
                  .find(".hiprint-printElement-text-content")
                  .addClass("hiprint-text-content-wrap-" + e),
                ""
              );
          }

          return null;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    rt = n(5),
    at = (function () {
      function t() {
        this.name = "columns";
      }

      return (
        (t.prototype.createTarget = function () {
          $('<div class="indicator"></div>').appendTo("body");
          return (
            " </ul>\n       </div>\n    </div>",
            (this.target = $(
              ' <div class="hiprint-option-item hiprint-option-item-row">\n       <div>\n            <ul class="hiprint-option-table-selected-columns"> </ul>\n       </div>\n    </div>'
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          return this.buildData();
        }),
        (t.prototype.setValue = function (t, e, n) {
          var i = this,
            o = this;
          (this.value = t), (this.options = e), (this.printElementType = n);
          var r = n.columns[0]
            .filter(function (e) {
              return (
                0 ==
                t[0].columns.filter(function (t) {
                  return e.columnId == t.columnId;
                }).length
              );
            })
            .map(function (t) {
              var e = new rt.a(t);
              return (e.checked = !1), e;
            });
          (this.allColumns = t[0].columns.concat(r)),
            t &&
              1 == t.length &&
              (this.target.find("ul").html(
                this.allColumns
                  .map(function (t, e) {
                    return (
                      '<li  class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">\n                ' +
                      (t.checked
                        ? '<input type="checkbox"   checked column-id="' +
                          (t.id || t.columnId) +
                          '" />'
                        : '<input type="checkbox"  column-id="' +
                          (t.id || t.columnId) +
                          '" />') +
                      '\n                <div class="state">\n                    <label></label>\n                </div>\n            </div><span class="column-title">' +
                      (t.title || t.descTitle || "") +
                      "</span></li>"
                    );
                  })
                  .join("")
              ),
              this.target.find("input").change(function (e) {
                var checked = e.target.checked,
                  id = e.target.attributes["column-id"].nodeValue || "";
                var idx = i.allColumns.findIndex(function (e) {
                  return e.field == id || e.id == id;
                });
                if (idx >= 0) {
                  i.allColumns[idx]["checked"] = checked;
                }
                i.submit();
              }),
              this.printElementType.columnDisplayIndexEditable &&
                this.target
                  .find("li")
                  .hidraggable({
                    revert: !0,
                    handle: ".column-title",
                    moveUnit: "pt",
                    deltaX: 0,
                    deltaY: 0,
                  })
                  .hidroppable({
                    onDragOver: function onDragOver(t, e) {
                      $(this).css("border-top-color", "red");
                    },
                    onDragLeave: function onDragLeave(t, e) {
                      $(this).css("border-top-color", "");
                    },
                    onDrop: function onDrop(t, e) {
                      $(e).insertBefore(this),
                        $(this).css("border-top-color", ""),
                        o.submit();
                    },
                  }));
        }),
        (t.prototype.buildData = function () {
          var t = this,
            e = [];
          if (t.options.columns.length > 1) {
            return this.value;
          }
          t.printElementType.makeColumnObj(t.allColumns);
          this.target.find("input").map(function (n, i) {
            var o = $(i).attr("column-id");
            var a = t.printElementType.getColumnByColumnId(o);
            if (a) {
              var p = new rt.a(a);
              (p.checked = a.checked), e.push(p);
            }
          });
          return (this.value[0].columns = e), this.value;
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    pt = (function () {
      function t() {
        this.name = "textType";
      }

      return (
        (t.prototype.createTarget = function () {
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
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tablept = (function () {
      function t() {
        this.name = "tableTextType";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "字段类型"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认(文本)"
              )}</option>\n        <option value="text" >${i18n.__(
                "文本"
              )}</option>\n <option value="sequence" >${i18n.__(
                "序号"
              )}</option>\n       <option value="barcode" >${i18n.__(
                "条形码"
              )}</option>\n        <option value="qrcode" >${i18n.__(
                "二维码"
              )}</option>\n    <option value="image" >${i18n.__(
                "图片"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableE = (function () {
      function t() {
        this.name = "tableBarcodeMode";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "条形码格式"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n         <option value="" >${i18n.__(
                "默认"
              )}(CODE128A)</option>\n         <option value="CODE128A" >CODE128A</option>\n        <option value="CODE128B" >CODE128B</option>\n        <option value="CODE128C" >CODE128C</option>\n        <option value="CODE39" >CODE39</option>\n        <option value="EAN-13" >EAN-13</option>\n        <option value="EAN-8" >EAN-8</option>\n        <option value="EAN-5" >EAN-5</option>\n        <option value="EAN-2" >EAN-2</option>\n        <option value="UPC（A）" >UPC（A）</option>\n        <option value="ITF" >ITF</option>\n        <option value="ITF-14" >ITF-14</option>\n        <option value="MSI" >MSI</option>\n            <option value="MSI10" >MSI10</option>\n            <option value="MSI11" >MSI11</option>\n            <option value="MSI1010" >MSI1010</option>\n            <option value="MSI1110" >MSI1110</option>\n            <option value="Pharmacode" >Pharmacode</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return t || void 0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableQRCodeLevel = (function () {
      function t() {
        this.name = "tableQRCodeLevel";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "二维码容错率"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="1" >7% L</option>\n        <option value="0" >15% M</option>\n        <option value="3" >25% Q</option>\n        <option value="2" >30% H</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          return parseInt(t || 0);
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableColumnH = (function () {
      function t() {
        this.name = "tableColumnHeight";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "单元格高度"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "条形码、二维码以及图片有效"
              )}" class="auto-submit" >\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableSummaryTitle = (function () {
      function t() {
        this.name = "tableSummaryTitle";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__(
                "底部聚合标题"
              )}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__(
                "默认"
              )}</option><option value="true">${i18n.__(
                "显示"
              )}</option><option value="false">${i18n.__(
                "隐藏"
              )}</option></select></div></div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          return !("false" == this.target.find("select").val());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableSummaryText = (function () {
      function t() {
        this.name = "tableSummaryText";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "底部聚合文本"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "聚合类型"
              )}:" class="auto-submit" >\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableSummaryColspan = (function () {
      function t() {
        this.name = "tableSummaryColspan";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "底部聚合合并列数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" min="0" step="1" placeholder="${i18n.__(
                "合并列数"
              )}" class="auto-submit" >\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableSummaryAlign = (function () {
      function t() {
        this.name = "tableSummaryAlign";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "底部聚合类型左右对齐"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="left" >${i18n.__(
                "居左"
              )}</option>\n        <option value="center" >${i18n.__(
                "居中"
              )}</option>\n        <option value="right" >${i18n.__(
                "居右"
              )}</option>\n        <option value="justify" >${i18n.__(
                "两端对齐"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableSummaryNumFormat = (function () {
      function t() {
        this.name = "tableSummaryNumFormat";
      }

      return (
        (t.prototype.createTarget = function () {
          var list = [{ t: `${i18n.__("整数")}`, v: "0" }],
            num = [1, 2, 3, 4, 5, 6];
          num.forEach(function (n) {
            list.push({ t: i18n.__n(`保留%s位`, n), v: "" + n });
          });
          var n = `\n            <option value="" >${i18n.__("默认")}</option>`;
          list.forEach(function (e) {
            n +=
              '\n            <option value="' +
              (e.v || "") +
              '">' +
              (e.t || "") +
              "</option>";
          });
          this.target = $(
            `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
              "底部聚合小数"
            )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit"></select>\n        </div>\n    </div>`
          );
          this.target.find(".auto-submit").append($(n));
          return this.target;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    showCodeTitle = (function () {
      function t() {
        this.name = "showCodeTitle";
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              ` <div class="hiprint-option-item" title="条形码底部是否显示内容">\n        <div class="hiprint-option-item-label">\n          ${i18n.__(
                "显示码值"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n            <option value="true" >${i18n.__(
                "显示"
              )}</option>\n            <option value="false" >${i18n.__(
                "隐藏"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    tableSummaryFormatter = (function () {
      function t() {
        this.name = "tableSummaryFormatter";
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "底部聚合格式化函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(column,fieldPageData,tableData,options){ return \'<td></td>\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    upperCase = (function () {
      function t() {
        this.name = "upperCase";
      }
      return (
        (t.prototype.createTarget = function () {
          var list = [
            { t: "「小写」十点八", v: "0" },
            { t: "「小写」一十点八", v: "1" },
            { t: "「大写」拾点捌", v: "2" },
            { t: "「大写」壹拾点捌", v: "3" },
            { t: "「金额」人民币拾元捌角", v: "4" },
            { t: "「金额」人民币壹拾元捌角", v: "5" },
            { t: "「金额」人民币壹拾元捌角零分", v: "6" },
            { t: "「金额」壹拾元捌角零分", v: "7" },
          ];
          var n = `\n<option value="">${i18n.__("默认")}</option>`;
          list.forEach((e) => {
            n += `\n<option value='${e.v}'>${e.t}</option>`;
          });
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row">\n<div class="hiprint-option-item-label">\n${i18n.__(
              "转大小写"
            )}\n</div>\n<div class="hiprint-option-item-field">\n<select class="auto-submit"></select>\n</div>\n</div>`
          );
          this.target.find(".auto-submit").append($(n));
          return this.target;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    // 表格底部合计栏
    tableSummary = (function () {
      function t() {
        this.name = "tableSummary";
      }
      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__(
                "底部聚合类型"
              )}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__(
                "不聚合"
              )}</option><option value="count">${i18n.__(
                "计数"
              )}</option><option value="sum">${i18n.__(
                "合计"
              )}</option><option value="avg">${i18n.__(
                "平均值"
              )}</option><option value="min">${i18n.__(
                "最小值"
              )}</option><option value="max">${i18n.__(
                "最大值"
              )}</option><option value="text">${i18n.__(
                "仅文本"
              )}</option></select></div></div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          return this.target.find("select").val();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    st = (function () {
      function t() {
        this.name = "topOffset";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "顶部偏移"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
                "偏移量"
              )}pt" class="auto-submit">\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    panelLayoutOptions = (function () {
      function t() {
        this.name = "panelLayoutOptions";
      }
      return (
        (t.prototype.createTarget = function () {
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__(
              "面板排列"
            )}</div></div>`
          );
          this.layoutType = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__(
              "排列方式"
            )}:</div><select style="width:75%" class="auto-submit"><option value="column" >${i18n.__(
              "纵向"
            )}</option><option value="row" >${i18n.__(
              "横向"
            )}</option></select></div></div>`
          );
          this.layoutRowGap = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__(
              "垂直间距"
            )}:</div><input style="width:75%" type="text" placeholder="${i18n.__(
              "垂直间距mm"
            )}" class="auto-submit"></div>`
          );
          this.layoutColumnGap = $(
            `<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__(
              "水平间距"
            )}:</div><input style="width:75%" type="text" placeholder="${i18n.__(
              "水平间距mm"
            )}" class="auto-submit"></div>`
          );
          this.target.append(this.layoutType);
          this.target.append(this.layoutRowGap);
          this.target.append(this.layoutColumnGap);
          return this.target;
        }),
        (t.prototype.getValue = function () {
          let opt = {
            layoutType: this.layoutType.find("select").val() || "column",
            layoutRowGap: parseInt(this.layoutRowGap.find("input").val() || 0),
            layoutColumnGap: parseInt(
              this.layoutColumnGap.find("input").val() || 0
            ),
          };
          let options = Object.assign({}, this.options, opt);
          return options;
        }),
        (t.prototype.setValue = function (t) {
          this.options = t;
          this.layoutType.find("select").val(t.layoutType || "column");
          this.layoutRowGap.find("input").val(t.layoutRowGap);
          this.layoutColumnGap.find("input").val(t.layoutColumnGap);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    lt = (function () {
      function t() {
        this.name = "gridColumns";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "一行多组"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="2" >${i18n.__(
                "一行二列"
              )}</option>\n        <option value="3" >${i18n.__(
                "一行三列"
              )}</option>\n        <option value="4" >${i18n.__(
                "一行四列"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    ut = (function () {
      function t() {
        this.name = "gridColumnsGutter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "一行多组间隔"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.25" >7.25pt</option>\n        <option value="8.5" >8.5pt</option>\n        <option value="9" >9pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.css = function (t, e) {
          if (t && t.length) {
            if (e)
              return (
                t
                  .find(".table-grid-row")
                  .css("margin-left", "-" + e + "pt")
                  .css("margin-right", "-" + e + "pt"),
                t
                  .find(".tableGridColumnsGutterRow")
                  .css("padding-left", e + "pt")
                  .css("padding-right", e + "pt"),
                null
              );
            t.find(".table-grid-row").map(function (t, e) {
              (e.style.marginLeft = ""), (e.style.marginRight = "");
            }),
              t.find(".tableGridColumnsGutterRow").map(function (t, e) {
                (e.style.paddingLeft = ""), (e.style.paddingRight = "");
              });
          }

          return null;
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    ith = (function () {
      function t() {
        this.name = "tableHeaderRepeat";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表格头显示"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="page" >${i18n.__(
                "每页显示"
              )}</option>\n        <option value="first" >${i18n.__(
                "首页显示"
              )}</option>\n        <option value="none" >${i18n.__(
                "不显示"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    dt = (function () {
      function t() {
        this.name = "paddingLeft";
      }

      return (
        (t.prototype.css = function (t, e) {
          var n = t;

          if (n && n.length) {
            if (e) return n.css("padding-left", e + "pt"), "padding-left";
            n[0].style.paddingLeft = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "左内边距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    ct = (function () {
      function t() {
        this.name = "paddingRight";
      }

      return (
        (t.prototype.css = function (t, e) {
          var n = t;

          if (n && n.length) {
            if (e) return n.css("padding-right", e + "pt"), "padding-right";
            n[0].style.paddingRight = "";
          }

          return null;
        }),
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "右内边距"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return parseFloat(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          t &&
            (this.target.find('option[value="' + t + '"]').length ||
              this.target
                .find("select")
                .prepend('<option value="' + t + '" >' + t + "</option>"));
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    ht = (function () {
      function t() {
        this.name = "dataType";
      }

      return (
        (t.prototype.createTarget = function () {
          var t = this;
          return (
            (this.target = $(
              `\n        <div class="hiprint-option-item-row">\n        <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "数据类型"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="hiprint-option-item-datatype">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="datetime" >${i18n.__(
                "日期时间"
              )}</option>\n        <option value="boolean" >${i18n.__(
                "布尔"
              )}</option>\n        </select>\n        </div>\n    </div>\n    <div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label ">\n        ${i18n.__(
                "格式"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select  class="auto-submit hiprint-option-item-datatype-select-format">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        \n        </select>\n        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">\n        </div>\n    </div>\n        </div>\n`
            )),
            $(this.target.find(".hiprint-option-item-datatype")).change(
              function () {
                var e = $(t.target.find(".hiprint-option-item-datatype")).val();
                t.loadFormatSelectByDataType(e), t.submit(t.getValue());
              }
            ),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find(".hiprint-option-item-datatype").val();

          if (t) {
            var e = this.target
              .find(".hiprint-option-item-datatype-format")
              .val();
            return {
              dataType: t,
              format: e || void 0,
            };
          }

          return {
            dataType: void 0,
            format: void 0,
          };
        }),
        (t.prototype.setValue = function (t, e) {
          this.target
            .find(".hiprint-option-item-datatype")
            .val(e.dataType || ""),
            this.loadFormatSelectByDataType(e.dataType),
            this.target
              .find(".hiprint-option-item-datatype-format")
              .val(e.format || "");
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        (t.prototype.loadFormatSelectByDataType = function (t) {
          "boolean" === t
            ? (this.target
                .find(".hiprint-option-item-datatype-select-format")
                .removeClass("hiprint-option-item-datatype-format")
                .hide()
                .val(""),
              this.target
                .find(".hiprint-option-item-datatype-input-format")
                .addClass("hiprint-option-item-datatype-format")
                .show())
            : "datetime" === t
            ? (this.target
                .find(".hiprint-option-item-datatype-select-format")
                .addClass("hiprint-option-item-datatype-format")
                .show(),
              this.target
                .find(".hiprint-option-item-datatype-input-format")
                .removeClass("hiprint-option-item-datatype-format")
                .hide()
                .val(""),
              this.target
                .find(".hiprint-option-item-datatype-select-format")
                .html(
                  `\n            <option value="" >${i18n.__(
                    "默认"
                  )}</option>\n            <option value="M/d" >M/d</option>\n            <option value="MM/dd" >MM/dd</option>\n            <option value="yy/M/d" >yy/M/d</option>\n            <option value="yy/MM/dd" >yy/MM/dd</option>\n            <option value="yyyy/M/d" >yyyy/M/d</option>\n            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>\n            <option value="yy/M/d H:m" >yy/M/d H:m</option>\n            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>\n            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>\n            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>\n            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>\n            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>\n            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>\n            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>\n            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>\n            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>\n            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>\n            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>\n            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>\n            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>\n            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>\n            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>\n\n            <option value="M-d" >M-d</option>\n            <option value="MM-dd" >MM-dd</option>\n            <option value="yy-M-d" >yy-M-d</option>\n            <option value="yy-MM-dd" >yy-MM-dd</option>\n            <option value="yyyy-M-d" >yyyy-M-d</option>\n            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>\n            <option value="yy-M-d H:m" >yy-M-d H:m</option>\n            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>\n            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>\n            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>\n            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>\n            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>\n            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>\n            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>\n            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>\n            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>\n            <option value="yyyy-M-d HH:mm" >yyyy-M-d HH:mm</option>\n            <option value="yyyy-M-d HH:mm:ss" >yyyy-M-d HH:mm:ss</option>\n            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>\n            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>\n            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>\n            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>\n`
                ))
            : (this.target
                .find(".hiprint-option-item-datatype-select-format")
                .show(),
              this.target
                .find(".hiprint-option-item-datatype-input-format")
                .hide()
                .val(""),
              this.target
                .find(".hiprint-option-item-datatype-format")
                .html(
                  `\n            <option value="" >${i18n.__(
                    "默认"
                  )}</option>\n`
                ));
        }),
        t
      );
    })(),
    ft = (function () {
      function t() {
        this.name = "formatter";
      }

      return (
        (t.prototype.createTarget = function () {
          var t = `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
            "格式化函数"
          )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(title,value,options,templateData,target){}" class="auto-submit"></textarea>\n        </div>\n    </div>`;
          return (this.target = $(t)), this.target;
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    gt = (function () {
      function t() {
        this.name = "styler";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "样式函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value, options, target,templateData){}" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    rowcolumns = (function () {
      function t() {
        this.name = "rowsColumnsMerge";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "行/列合并函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(data, col, colIndex, rowIndex, tableData, printData){ return [1,1] }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    rowsColumnsMergeClean = (function () {
      function t() {
        this.name = "rowsColumnsMergeClean";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "跨页合并是否清除"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="true" >${i18n.__(
                "是"
              )}</option>\n        <option value="false" >${i18n.__(
                "否"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    mt = (function () {
      function t() {
        this.name = "footerFormatter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表格脚函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData,pageIndex){ return \'<tr></tr>\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    groupSequenceContinue = (function () {
      function t() {
        this.name = "groupSequenceContinue";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "分组序号续编"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="true" >${i18n.__(
                "是"
              )}</option>\n        <option value="false" >${i18n.__(
                "否"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    groupFieldsFormatter = (function () {
      function t() {
        this.name = "groupFieldsFormatter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "分组字段函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(type,options,data){ return [] }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    groupFormatter = (function () {
      function t() {
        this.name = "groupFormatter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "分组头格式化函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return \'${i18n.__(
                "分组头信息"
              )}(html)\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    groupFooterFormatter = (function () {
      function t() {
        this.name = "groupFooterFormatter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "分组脚格式化函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return \'${i18n.__(
                "分组脚信息"
              )}(html)\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    vt = (function () {
      function t() {
        this.name = "gridColumnsFooterFormatter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "多组表格脚函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return \'\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    yt = (function () {
      function t() {
        this.name = "rowStyler";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "行样式函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,options){ return \'\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    bt = (function () {
      function t() {
        this.name = "align";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "单元格左右对齐"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="left" >${i18n.__(
                "居左"
              )}</option>\n        <option value="center" >${i18n.__(
                "居中"
              )}</option>\n        <option value="right" >${i18n.__(
                "居右"
              )}</option>\n        <option value="justify" >${i18n.__(
                "两端对齐"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    Et = (function () {
      function t() {
        this.name = "vAlign";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "单元格上下对齐"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="top" >${i18n.__(
                "上"
              )}</option>\n        <option value="middle" >${i18n.__(
                "中"
              )}</option>\n        <option value="bottom" >${i18n.__(
                "下"
              )}</option>\n        \n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    Tt = (function () {
      function t() {
        this.name = "halign";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表格头单元格左右对齐"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="left" >${i18n.__(
                "居左"
              )}</option>\n        <option value="center" >${i18n.__(
                "居中"
              )}</option>\n        <option value="right" >${i18n.__(
                "居右"
              )}</option>\n        <option value="justify" >${i18n.__(
                "两端对齐"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    Pt = (function () {
      function t() {
        this.name = "styler2";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "单元格样式函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    stylerHeader = (function () {
      function t() {
        this.name = "stylerHeader";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表格头样式函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    _t = (function () {
      function t() {
        this.name = "formatter2";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "单元格格式化函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return \'\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    renderFormatter = (function () {
      function t() {
        this.name = "renderFormatter";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "单元格渲染函数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,colIndex,options,rowIndex){ return \'<td></td>\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("textarea").val();
          if (t) return t;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("textarea").val(t ? t.toString() : null);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    wt = (function () {
      function t() {
        this.name = "autoCompletion";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "自动补全"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="true" >${i18n.__(
                "是"
              )}</option>\n        <option value="false" >${i18n.__(
                "否"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val((null == t ? "" : t).toString());
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    maxRows = (function () {
      function t() {
        this.name = "maxRows";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "每页最大行数"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" value="1" step="1" min="1" class="auto-submit"/>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("input").val();
          if (t) return parseInt(t.toString());
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("input").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })(),
    xt = (function () {
      function t() {
        this.name = "tableFooterRepeat";
      }

      return (
        (t.prototype.createTarget = function () {
          return (
            (this.target = $(
              `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
                "表格脚显示"
              )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
                "默认"
              )}</option>\n        <option value="no" >${i18n.__(
                "不显示"
              )}</option>\n        <option value="page" >${i18n.__(
                "每页显示"
              )}</option>\n        <option value="last" >${i18n.__(
                "最后显示"
              )}</option>\n        </select>\n        </div>\n    </div>`
            )),
            this.target
          );
        }),
        (t.prototype.getValue = function () {
          var t = this.target.find("select").val();
          if (t) return t.toString();
        }),
        (t.prototype.setValue = function (t) {
          this.target.find("select").val(t);
        }),
        (t.prototype.destroy = function () {
          this.target.remove();
        }),
        t
      );
    })();

  n.d(e, "a", function () {
    return Ct;
  });

  var Ct = (function () {
    function t() {}

    return (
      (t.init = function () {
        t.printElementOptionItems ||
          ((t.printElementOptionItems = {}),
          t._printElementOptionItems.forEach(function (e) {
            t.printElementOptionItems[e.name] = e;
          }));
      }),
      (t.registerItem = function (e) {
        if (!e.name) throw new Error("styleItem must have name");
        t.init(), (t.printElementOptionItems[e.name] = e);
      }),
      (t.getItem = function (e) {
        return t.init(), t.printElementOptionItems[e];
      }),
      (t._printElementOptionItems = [
        new fontFamily(),
        new r(),
        new a(),
        new p(),
        new i(),
        new s(),
        new l(),
        new pt(),
        new u(),
        new d(),
        new c(),
        new h(),
        new f(),
        new g(),
        new m(),
        new d2(),
        new c2(),
        new v(),
        new y(),
        new b(),
        new E(),
        new qrCodeLevel(),
        new T(),
        new P(),
        new _(),
        new w(),
        new x(),
        new coordinate(),
        new widthHeight(),
        new C(),
        new imageFit(),
        new O(),
        new H(),
        new D(),
        new paperNumberContinue(),
        new watermarkOptions(),
        new I(),
        new R(),
        new pageBreak(),
        new M(),
        new M2(),
        new S(),
        new B(),
        new F(),
        new L(),
        new A(),
        new z(),
        new k(),
        new st(),
        new N(),
        new V(),
        new W(),
        new j(),
        new U(),
        new borderRadius(),
        new zIndex(),
        new K(),
        new G(),
        new q(),
        new X(),
        new Y(),
        new Q(),
        new J(),
        new Z(),
        new tt(),
        new et(),
        new nt(),
        new it(),
        new ot(),
        new textWrap(),
        new at(),
        new lt(),
        new panelLayoutOptions(),
        new ut(),
        new ith(),
        new dt(),
        new ct(),
        new ht(),
        new ft(),
        new gt(),
        new mt(),
        new rowcolumns(),
        new rowsColumnsMergeClean(),
        new groupSequenceContinue(),
        new groupFieldsFormatter(),
        new groupFormatter(),
        new groupFooterFormatter(),
        new vt(),
        new yt(),
        new bt(),
        new Tt(),
        new Et(),
        new Pt(),
        new stylerHeader(),
        new renderFormatter(),
        new _t(),
        new wt(),
        new maxRows(),
        new xt(),
        new tableColumnH(),
        new tableE(),
        new tableQRCodeLevel(),
        new tablept(),
        new tableSummaryTitle(),
        new tableSummaryText(),
        new tableSummaryColspan(),
        new tableSummary(),
        new tableSummaryAlign(),
        new tableSummaryNumFormat(),
        new tableSummaryFormatter(),
        new showCodeTitle(),
        new upperCase(),
        new barcodeType(),
        new qrcodeType(),
        new barColor(),
        new barTextMode(),
        new barWidth(),
        new barAutoWidth(),
      ]),
      t
    );
  })();
}
