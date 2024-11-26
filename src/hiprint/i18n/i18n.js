var languages = {};
const ctx = require.context("./json", true, /\.json$/);
ctx.keys().forEach((key) => {
  languages[key.match(/\.\/([^.]+)/)[1]] = ctx(key);
});

var i18n = {
  lang: "cn",
  languages,
  __: function (key, params) {
    var str = this.languages[this.lang][key] || key;
    if (params && params instanceof Object) {
      Object.keys(params).forEach((key) => {
        str = str.replace(new RegExp(`{{${key}}}`, "g"), params[key]);
      });
      return str;
    } else if (params) {
      str = str.replace(/%s/g, params);
      return str;
    } else {
      return str;
    }
  },
  __n: function (key, val) {
    var str = this.languages[this.lang][key];
    str = str.replace(/%s/g, val);
    return str;
  },
};

export { languages, i18n };
