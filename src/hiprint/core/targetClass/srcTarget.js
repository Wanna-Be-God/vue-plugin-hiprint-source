/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-19 00:03:04
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-19 00:03:42
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class SrcTarget {
  constructor(element) {
    this.element = element;
    this.name = "src";
  }

  createTarget(targetElement) {
    this.el = targetElement;
    let onImageChooseClick;
    const self = this;
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("图片地址")}
        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
          <input type="text" placeholder="${i18n.__("请输入图片地址")}" class="auto-submit" style="width:70%">
          <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__("选择")}</button>
        </div>
      </div>
    `);
    
    if (targetElement && (onImageChooseClick = targetElement.getOnImageChooseClick()), onImageChooseClick) {
      this.target.find("button").click(function () {
        onImageChooseClick && onImageChooseClick(self);
      });
    }
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  refresh(imageSrc, options, callback) {
    const that = this;
    this.setValue(imageSrc);
    this.target.find("input").change();
    if (this.el && options) {
      const img = new Image();
      img.src = imageSrc;
      if (img.complete) {
        that.updateElement(img.width, img.height, options, callback);
      } else {
        img.onload = function () {
          that.updateElement(img.width, img.height, options, callback);
        };
      }
    }
  }

  updateElement(width, height, options, callback) {
    if (options) {
      let ratio, w, h;
      if (options && options.auto) {
        if (width >= height) {
          options.width = true;
        } else {
          options.height = true;
        }
      }
      if (options.width) {
        ratio = height / width;
        w = this.el.options.width;
        h = Math.floor(w * ratio * 10) / 10;
        this.el.options.height = h;
        this.el.designTarget.css("height", h + "pt");
      } else if (options.height) {
        ratio = width / height;
        h = this.el.options.height;
        w = Math.floor(h * ratio * 10) / 10;
        this.el.options.width = w;
        this.el.designTarget.css("width", w + "pt");
      } else if (options.real) {
        w = hinnn.px.toPt(width);
        h = hinnn.px.toPt(height);
        this.el.options.width = w;
        this.el.options.height = h;
        this.el.designTarget.css("width", w + "pt");
        this.el.designTarget.css("height", h + "pt");
      }
      this.el.designTarget.children(".resize-panel").trigger($.Event("click"));
    }
    callback && callback(this.el, width, height);
  }

  destroy() {
    this.target.remove();
  }
}