//logs.js
let amap = require("../../libs/amap");
Page({
  data: {
    steps: [],
  },
  onLoad() {
    let steps = wx.getStorageSync("steps");
    this.setData({ steps })
  },
});
