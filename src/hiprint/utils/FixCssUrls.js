/**
 * 处理和修复 CSS 文件中的 URL
 */
export default function (module, exports) {
  module.exports = function (css) {
    // 检查 window.location 是否可用
    const location = typeof window !== "undefined" && window.location;
    if (!location) throw new Error("fixUrls requires window.location");

    // 如果 css 不是字符串，直接返回
    if (!css || typeof css !== "string") return css;

    // 构建基本 URL 和路径
    const baseUrl = `${location.protocol}//${location.host}`;
    const basePath = `${baseUrl}${location.pathname.replace(/\/[^\/]*$/, "/")}`;

    // 替换 CSS 中的 URL
    return css.replace(
      /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
      function (match, url) {
        // 清理 URL
        const cleanedUrl = url.trim()
          .replace(/^"(.*)"$/, '$1')
          .replace(/^'(.*)'$/, '$1');

        // 检查 URL 是否为绝对路径或数据 URI
        const isAbsoluteOrDataUrl = /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(cleanedUrl);

        if (isAbsoluteOrDataUrl) {
          return match;
        }

        // 构建完整的 URL
        const fullUrl = cleanedUrl.startsWith("//")
          ? cleanedUrl
          : cleanedUrl.startsWith("/")
          ? baseUrl + cleanedUrl
          : basePath + cleanedUrl.replace(/^\.\//, "");

        return `url(${JSON.stringify(fullUrl)})`;
      }
    );
  };
}