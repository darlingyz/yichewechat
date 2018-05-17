// pages/selectstandard/selectstandard.js
const date = new Date()
const treadwidths = []
const aspectratios = []
const diameters = []

for (let i = 1; i <= 300; i++) {
  treadwidths.push(i)
}

for (let i = 1; i <= 100; i++) {
  aspectratios.push(i)
}

for (let i = 1; i <= 100; i++) {
  diameters.push(i)
}

Page({
  data: {
    treadwidths: treadwidths,
    aspectratios: aspectratios,
    diameters: diameters,
    //数组中的数字依次表示选择的第几项（下标从 0 开始），数字大于可选项长度时，选择最后一项
    value: [150, 50, 50],
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      treadwidth: this.data.treadwidths[val[0]],
      aspectratio: this.data.aspectratios[val[1]],
      diameter: this.data.diameters[val[2]]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tyreselected: 'http://116.62.151.139/res/img/tyreselect.png',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bindViewModelmatch:function(){
    wx:wx.navigateTo({
      url: '../modelmatch/modelmatch',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }

})