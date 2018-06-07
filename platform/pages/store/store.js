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
    startSrc: app.globalData.imgUrl + '/star.png',
    guideSrc: app.globalData.imgUrl + '/guide.png',
    first: '附近优先',
    sssss: '销量最高',
    ddddd: '评分最高',
    showMsg: '附近优先',
    allsss: '全部服务',
    carwash: '洗车服务',
    tyreserivces: '轮胎服务',
    beautyservice: '汽车美容',
    maintain: '保养服务',
    conserve: '养护清洗',
    traffic: '代办业务',
    rests: '其他',
    showService: '全部服务',
    searchType: 1,
    keyWord: "",
    downarrow: app.globalData.imgUrl + '/downarrow.png',
    uparrow: app.globalData.imgUrl + '/uparrow.png',
    area: '浦东新区',
    carbrand: '奔驰',
    carmodel: 'GLC200 2017款',
    currentformat: '235/55 R19',
    currentbrand: '米其林',
  },
  onLoad: function (options) {
    wx.showLoading({ title: '努力加载中...' })
    let that = this;
    var searchType = 1;
    var keyWord = that.data.keyWord;
    wx.getLocation({
      success: function (res) {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        });
        that.initShopList(res.latitude, res.longitude, searchType, keyWord);
      },
    })

    //调用 数组循环门店列表方法
  },
  //数组循环门店列表方法
  initShopList: function (lat, lng, searchType, keyWorld) {
    var that = this;
    app.request({
      url: app.globalData.testUrl + '/search/wxSearchStore',
      method: "post",
      data: {
        searchType: searchType,
        lat: lat,
        lng: lng,
        keyword: keyWorld
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (result) {
        console.log(searchType, lat, lng, keyWorld)
        console.log(result)
        wx.hideLoading()
        var msg = result.data.data;
        // console.log(msg);
        //遍历这个对象
        that.setData({
          shopList: msg,
        })
      }
    })
  },
  /**
      * 弹窗
      */
  showAllservice: function (event) {
    console.log(event)
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
    var that = this;
    this.setData({
      showModal: true,
      carbeauty: true,
      changetyre: false,
    })
  },
  // 轮胎更换
  showChangetyre: function () {
    var that = this;
    this.setData({
      showModal: true,
      changetyre: true,
      carbeauty: false,
    })
    var carId = app.globalData.carId;
    if (carId == null) {
      wx.showModal({
        title: '温馨提示',
        content: '您还没有绑定好手机号,请前往绑定！',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../carport/carport',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../store/store',
            })
          }
        }
      })
    } else {
      app.request({
        url: app.globalData.testUrl + '/search/checkByTireSpec',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          carId: carId
        },
        success: function (res) {
          console.log(res)
          console.log("返回信息~");
          var msg = res.data.msg;
          if (msg == "请选择轮胎规格") {
            wx.showModal({
              title: '温馨提示',
              content: '请选择轮胎规格！',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../selectstandard/selectstandard',
                  })
                } else if (res.cancel) {
                  wx.switchTab({
                    url: '../store/store',
                  })
                }
              }
            })
          } else {
            var msg = res.data.data;
            that.setData({
              currentformat: msg
            })
          }
        },
        fail: function (res) { },
      })
    }
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
  storedetail: function (e) {
    //console.log(e.currentTarget.dataset.shopid)
    wx.setStorage({
      key: 'businessId',
      data: e.currentTarget.dataset.shopid
    })
    wx: wx.navigateTo({
      url: '../storedetail/storedetail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //用户输入搜索内容
  InputkeyWord: function (e) {
    this.setData({
      keyWord: e.detail.value
    })
  },
  //搜索的接口
  searchStore: function (e) {
    //调用 数组循环门店列表方法
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var lat = res.latitude,
          lng = res.longitude;
        that.setData({
          lat: lat,
          lng: lng
        })
        //调用 数组循环门店列表的方法
        app.request({
          url: app.globalData.testUrl + '/search/wxSearchStore',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            lng: lng,
            lat: lat,
            searchType: 1,
            keyword: that.data.keyWord,
          },
          success: function (res) {
            that.setData({
              shopList: res.data.data
            })
          }
        })
      }
    });
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'typestyle',
      success: function (res) {
        console.log(res);
        var odata = res.data;
        that.setData({
          currentformat: odata
        })
      },
    })
    //点击再次进入============
    wx.getStorage({
      key: 'keyWorld',
      success: function (res) {
        var keyWorld = res.data;
        var searchType = 1;
        wx.getLocation({
          success: function (res) {
            that.setData({
              lat: res.latitude,
              lng: res.longitude
            });
            that.initShopList(res.latitude, res.longitude, searchType, keyWorld);
          },
        })
      },
    })
  },
  //轮胎规格
  godata: function () {
    var that = this;
    app.request({
      url: app.globalData.testUrl + '/search/wxSearchStore',
      data: {
        spec: that.data.currentformat,
        searchType: 4,
        lat: that.data.lat,
        lng: that.data.lng,
        carId: app.globalData.carId,
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        //console.log(res)
        var omsg = res.data.data;
        if (omsg.length == 0) {
          wx.showModal({
            title: '提示',
            content: '没有找到需要的轮胎,请重新搜索！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.setData({
            allservice: false,
            selectbrand: false,
            shopList: omsg
          })
          that.hideModal();
        }
      },
    })
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
  //根据一级服务下拉框查询
  GetServiceStores: function (e) {
    console.log(e);
    var that = this;
    var lat = that.data.lat;
    var lng = that.data.lng;
    var serviceId = e.currentTarget.dataset.serviceid;
    var businessName = e.currentTarget.dataset.showservice;
    var searchType = that.data.searchType
    that.setData({
      allservice: false,
      showService: e.currentTarget.dataset.showservice
    })
    //调用 根据一级服务查询门店列表的方法
    that.searchShopList(lat, lng, searchType, serviceId, businessName);
    that.hideModal();
  },
  //根据一级服务查询门店列表方法
  searchShopList: function (lat, lng, searchType, serviceId, businessName) {
    var that = this;
    if (businessName == "洗车服务") {
      app.request({
        url: app.globalData.testUrl + '/search/serviceFindStore',
        method: "post",
        data: {
          searchType: searchType,
          lat: lat,
          lng: lng,
          businessName: "洗车服务"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (result) {
          console.log(lat, lng);
          var msg = result.data.data;
          console.log(result);
          //遍历这个对象
          if (msg) {
            for (var i = 0; i < msg.length; i++) {
              msg[i].distance = that.getDistance(msg[i].lat, msg[i].lng, that.data.lat, that.data.lng);
            }
          }
          that.setData({
            shopList: msg,
          })
        }
      })
    } else {
      app.request({
        url: app.globalData.testUrl + '/search/serviceFindStore',
        method: "post",
        data: {
          searchType: searchType,
          lat: lat,
          lng: lng,
          businessId: serviceId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          var msg = result.data.data;
          //遍历这个对象
          if (msg) {
            for (var i = 0; i < msg.length; i++) {
              msg[i].distance = that.getDistance(msg[i].lat, msg[i].lng, that.data.lat, that.data.lng);
            }
          }
          that.setData({
            shopList: msg,
          })
        }
      })
    }
  },
  //根据全部服务查询门店
  GetAllServiceStores: function (e) {
    var that = this;
    var searchType = that.data.searchType;
    var lat = that.data.lat;
    var lng = that.data.lng;
    var keyworld = e.currentTarget.dataset.showservice;
    that.setData({
      allservice: false,
      showService: e.currentTarget.dataset.showservice
    })
    if (keyworld == "全部服务") {
      that.initShopList(lat, lng, searchType, "");
    } else {
      that.initShopList(lat, lng, searchType, keyworld);
    }
    //调用 数组循环门店列表的方法
    that.initShopList(lat, lng, searchType, keyworld);
    that.hideModal();
  },
  findServiceStores: function (e) {
    var that = this;
    var searchType = that.data.searchType;
    var lat = that.data.lat;
    var lng = that.data.lng;
    var keyworld = that.data.keyWord;
    //调用 关键字查询门店列表的方法
    that.searchStoreByWord(lat, lng, searchType, keyworld);
    that.hideModal();

  },
  //排序查询
  GetSortShops: function (e) {
    var that = this;
    var searchType = e.currentTarget.dataset.searchtype;
    var lat = that.data.lat;
    var lng = that.data.lng;
    that.setData({
      nearfirst: false,
      showMsg: e.currentTarget.dataset.showmsg,
      searchType: searchType
    })
    //调用 数组循环门店列表的方法
    that.initShopList(lat, lng, searchType);
    that.hideModal();
  },
  //跳转到地图
  gosearchMap: function () {
    wx.navigateTo({
      url: '../searchmap/searchmap',
    })
  },
  //关键字查询门店列表的方法
  searchStoreByWord: function (lat, lng, searchType, keyWord) {
    var that = this;
    app.request({
      url: app.globalData.testUrl + '/search/wxSearchStore',
      method: "post",
      data: {
        searchType: searchType,
        lat: lat,
        lng: lng,
        keyWord: keyWord
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (result) {
        wx.hideLoading()
        var msg = result.data.data;
        that.setData({
          shopList: msg,
        })
      }
    })
  },


  getDistance: function (lat1, lng1, lat2, lng2) {
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