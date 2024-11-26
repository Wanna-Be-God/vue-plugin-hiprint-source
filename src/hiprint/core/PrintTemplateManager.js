function createPrintTemplateManager(module, exports, require) {
  // 定义一个表示打印元素的类
  class PrintElement {
    constructor(printElement) {
      this.printElement = printElement;
    }

    // 更新打印元素的位置
    updatePosition(left, top) {
      this.left = left;
      this.top = top;
    }
  }

  // 定义一个管理打印模板的类
  class PrintTemplateManager {
    constructor() {
      // 初始化打印模板容器
      this.printTemplateContainer = {};
      // 定义不同纸张尺寸
      this.A1 = { width: 841, height: 594 };
      this.A2 = { width: 420, height: 594 };
      this.A3 = { width: 420, height: 297 };
      this.A4 = { width: 210, height: 297 };
      this.A5 = { width: 210, height: 148 };
      this.A6 = { width: 105, height: 148 };
      this.A7 = { width: 105, height: 74 };
      this.A8 = { width: 52, height: 74 };
      this.B1 = { width: 1000, height: 707 };
      this.B2 = { width: 500, height: 707 };
      this.B3 = { width: 500, height: 353 };
      this.B4 = { width: 250, height: 353 };
      this.B5 = { width: 250, height: 176 };
      this.B6 = { width: 125, height: 176 };
      this.B7 = { width: 125, height: 88 };
      this.B8 = { width: 62, height: 88 };
    }

    // 实现单例模式，获取唯一实例
    static get instance() {
      if (!this._instance) {
        this._instance = new PrintTemplateManager();
      }
      return this._instance;
    }

    // 计算拖动长度，转换为指定单位
    dragLengthCNum(length, unit) {
      const calculatedLength = 0.75 * length;
      return unit
        ? Math.round(calculatedLength / unit) * unit
        : calculatedLength;
    }

    // 获取当前正在拖动的打印元素
    getDragingPrintElement() {
      return PrintTemplateManager.instance.dragingPrintElement;
    }

    // 设置当前正在拖动的打印元素
    setDragingPrintElement(element) {
      PrintTemplateManager.instance.dragingPrintElement = new PrintElement(
        element
      );
    }

    // 生成唯一标识符
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (char) {
          const randomValue = (16 * Math.random()) | 0;
          return (char === "x" ? randomValue : (3 & randomValue) | 8).toString(
            16
          );
        }
      );
    }

    // 将图像转换为Base64格式
    imageToBase64(imageElement) {
      if ($(imageElement).attr("src").indexOf("base64") === -1) {
        try {
          const canvas = document.createElement("canvas");
          const image = new Image();
          image.src = imageElement.attr("src");
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext("2d").drawImage(image, 0, 0);
          imageElement.attr("src", canvas.toDataURL("image/png"));
        } catch (error) {
          try {
            this.xhrLoadImage(imageElement);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    // 通过XHR加载图像（如果需要实现）
    xhrLoadImage(imageElement) {
      // Implement the function if needed
    }

    // 转换多个图像为Base64格式
    transformImg(imageElements) {
      imageElements.map((index, element) => {
        this.imageToBase64($(element));
      });
    }

    // 根据ID获取打印模板
    getPrintTemplateById(id) {
      return PrintTemplateManager.instance.printTemplateContainer[id];
    }

    // 根据ID设置打印模板
    setPrintTemplateById(id, template) {
      PrintTemplateManager.instance.printTemplateContainer[id] = template;
    }
  }

  // 导出PrintTemplateManager类
  require.d(exports, "a", function () {
    return PrintTemplateManager;
  });
}

export default createPrintTemplateManager;
