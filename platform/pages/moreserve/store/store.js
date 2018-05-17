// pages/store/store.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    allservice: false,
    nearfirst: false,
    carbeauty: false,
    changetyre: false,
    selectbrand: false,
    startSrc: 'http://192.168.1.111:90/star.png',
    guideSrc: 'http://192.168.1.111:90/guide.png',
  },
  /**
      * 弹窗
      */
  showAllservice: function (event) {
    var isShow = this.data.allservice;
    this.setData({
      showModal: !isShow,
      allservice: !isShow,
      nearfirst: false,
      carbeauty: false,
      changetyre: false,
      selectbrand: false,
    })
  },
  showNearfirst: function () {
    var isShow = this.data.nearfirst;
    this.setData({
      showModal: !isShow,
      nearfirst: !isShow,
      allservice: false,
      carbeauty: false,
      changetyre: false,
      selectbrand: false,
    })
  },
  // 汽车美容
  showCarbeauty: function () {
    this.setData({
      showModal: true,
      carbeauty: true,
      changetyre: false,
    })
  },
  // 轮胎更换
  showChangetyre: function () {
    this.setData({
      showModal: true,
      changetyre: true,
      carbeauty: false,
    })
  },
  showSelectbrand: function () {
    var isShow = this.data.selectbrand;
    this.setData({
      showModal: true,
      selectbrand: !isShow,
 
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {

  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
      allservice: false,
      nearfirst: false,
      carbeauty: false,
      changetyre: false,
      selectbrand: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        downarrow: 'http://192.168.1.111:90/downarrow.png',
        uparrow: 'http://192.168.1.111:90/uparrow.png',
        area:'浦东新区',
        carbrand:'奔驰',
        carmodel:'GLC200 2017款',
        currentformat:'235/55 R19',
        currentbrand:'米其林',
      });
  },

//事件处理函数
//跳转到 自选规格页面
bindViewSelectstandard: function () {
  wx.navigateTo({
    url: '../selectstandard/selectstandard',
  })
},
//跳转到 车型适配页面
  bindViewModelmatch: function () {
  wx.navigateTo({
    url: '../modelmatch/modelmatch',
  })
},
  storedetail:function(){
    wx:wx.navigateTo({
      url: '../storedetail/storedetail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onReady: function () {
    //调用 数组循环门店列表方法
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        });
        //调用 数组循环门店列表的方法
        that.initShopList(res.latitude,res.longitude);
      }
    });
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
  
  },
//数组循环门店列表方法
  initShopList: function(lat, lng) {
    // this.setData({
    //   shopList: [{
    //     img: 'http://192.168.1.111:91/store.png',
    //     startSrc: 'http://192.168.1.111:90/star.png',
    //     guideSrc: 'http://192.168.1.111:90/guide.png',
    //     distanceNum: '3',
    //     storeName: '淦隆汽车（华夏东路店）',
    //     address: '浦东新区华夏东路2518号',
    //     grade: '5',
    //     pnum: '521',
    //   }]
    // });
    var that = this;
    console.log(lat);
    wx.request({
      url: app.globalData.testUrl + '/search/wxSearchStore',
      method: "post",
      data: {
        searchType: 1,
        lat: lat,
        lng: lng
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(result){
        var msg = result.data.data;
        console.log(msg);
        //遍历这个对象
        if(msg){
          for(var i = 0; i < msg.length; i++){
            console.log(that.data.lat);
            console.log(that.data.lng);
            msg[i].distance = that.getDistance(msg[i].lat,msg[i].lng,that.data.lat,that.data.lng);
          }
        }
        that.setData({
          shopList: msg,
        })
      }
    })
  },
  getDistance: function(lat1,lng1,lat2,lng2){
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137
    return ((r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))) / 1000).toFixed(2) 
     },
})