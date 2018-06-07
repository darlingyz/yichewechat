var bmap = require('../../libs/bmap-wx.min.js');
var app = getApp();
Page({
  data: {
    nomsg: true,
    havemsg: false,
    showit: true,
    reson: false,
    activemsg: false,
    showcoupondetail: false,
    showModal: false,
    maskModal: false,
    userId: "",
    cateInfoList: "",
    ocateInfoList: "",
    lat: '',
    long: '',
    shopInfo: '',
    currentCity: '',
    obargainList: '',
    odata: '',
    ogroup: '',
    myCar: "",
    loactionString: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgheights: [],
    current: 0,
    loginstatus: false,
    beautyList: "",
    maintainList: "",
    activeList: ""
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

    // wx.showLoading({ title: '努力加载中...' }),
    this.initlogin();//授权登陆

    this.initShopInfo();// 初始化门店推荐
    this.initAdsInfo();// 初始化中屏广告
    this.initlocation();//初始定位
    this.initactive();//附近优惠活
    // this.imageLoad(e);
  },
  initlogin: function () {
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("授权成功~~~")
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              var vatarUrl = userInfo.avatarUrl;
              var openid = app.globalData.openId;
              app.globalData.nickName = nickName;
              app.globalData.vatarUrl = vatarUrl;
              wx.getStorage({
                key: 'openId',
                success: function (res) {
                  console.log(res)
                  var openId = res.data;
                  wx.request({
                    url: app.globalData.testUrl + '/login/wxLittleLogin',
                    data: {
                      openId: openId,
                      userName: nickName,
                      portait: vatarUrl
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'post',
                    success: function (res) {
                      console.log(res)
                      wx.hideLoading();
                      var data = res.data.data;
                      if (data != null) {
                        var userId = res.data.data.userId;
                        var carMap = res.data.data.carMap;
                        if (carMap == null) {
                          that.setData({
                            nomsg: true,
                            havemsg: false
                          })
                        } else {
                          var breakRulesList = carMap.carMsg.breakRules;
                          var ocarList = carMap.carMsg;
                          console.log(ocarList.carId)
                          app.globalData.carId = ocarList.carId;
                          if (breakRulesList == null || breakRulesList.length == 0) {
                            that.setData({
                              nomsg: false,
                              havemsg: true,
                              reson: false,
                              myCar: ocarList
                            })
                          } else {
                            that.setData({
                              nomsg: false,
                              havemsg: true,
                              reson: true,
                              myCar: ocarList
                            })
                          }
                        }
                        app.globalData.userId = userId;
                        console.log(userId)
                        //that.initshowCar(userId);//初始化车辆
                        that.initCateInfo(userId);// 初始化栏目信息
                        that.initbao(userId);//初始化红包
                        that.setData({
                          loginstatus: true,
                          userId: userId
                        })
                      } else {
                        console.log("没有返回信息~提醒绑定手机~~~");
                        // console.log(res)
                        wx.showModal({
                          title: '温馨提示',
                          content: '请先绑定手机号!',
                          success: function (res) {
                            if (res.confirm) {
                              //console.log('用户点击确定去注册手机号')
                              wx.navigateTo({
                                url: '../phonelogin/phonelogin',
                              })
                            } else if (res.cancel) {
                              //用户点击取消退出小程序
                              wx.navigateBack({
                                delta: 0
                              })
                            }
                          }
                        })
                      }
                    },
                  })
                },
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else if (!res.authSetting['scope.userInfo']) {
          var astatue = that.data.loginstatus
          if (!astatue) {
            console.log("授权失败~===~")
            that.setData({
              maskModal: true,
            })
          }
        }
      }
    })
  },

  //获取用户信息
  getUserInfo: function (res) {
    var that = this;
    that.setData({
      maskModal: false,
    })
    var models = that.data.maskModal;
    var userInfo = res.detail.userInfo;
    var nickName = userInfo.nickName;
    var vatarUrl = userInfo.avatarUrl;
    var openid = app.globalData.openId;
    app.globalData.nickName = nickName;
    app.globalData.vatarUrl = vatarUrl;
    wx.request({
      url: app.globalData.testUrl + '/login/wxLittleLogin',
      data: {
        openId: openid,
        userName: nickName,
        portait: vatarUrl
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        var data = res.data.data;
        if (data != null) {
          var userId = res.data.data.userId;
          app.globalData.userId = userId;
          that.initbao(userId);
          that.initCateInfo(userId);
          var carMap = res.data.data.carMap;
          if (carMap == null) {
            that.setData({
              nomsg: true,
              havemsg: false
            })
          } else {
            var breakRulesList = carMap.carMsg.breakRules;
            var ocarList = carMap.carMsg;
            console.log(ocarList.carId)
            app.globalData.carId = ocarList.carId;
            if (breakRulesList == null || breakRulesList.length == 0) {
              that.setData({
                nomsg: false,
                havemsg: true,
                reson: false,
                myCar: ocarList
              })
            } else {
              that.setData({
                nomsg: false,
                havemsg: true,
                reson: true,
                myCar: ocarList
              })
            }
          }
          that.setData({
            userId: userId
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '请先绑定手机号!',
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定去注册手机号')
                wx.navigateTo({
                  url: '../phonelogin/phonelogin',
                })
              } else if (res.cancel) {
                //用户点击取消退出小程序
                wx.navigateBack({
                  delta: 0
                })
              }
            }
          })
        }
      },
    })
    app.globalData.userInfo = res.detail.userInfo;
  },
  // 点击跳转到违章车库列表
  goillegal: function () {
    wx.navigateTo({
      url: '../illegallist/illegallist',
    })
  },
  //点击地图跳转到定位首页
  goSearch: function (event) {
    wx.navigateTo({
      url: '../selectcity/selectcity'
    })
  },
  //跳转...............
  goStore: function (e) {
      console.log(e)
      var keyWorld = e.currentTarget.dataset.name;
      console.log(keyWorld);
      wx.setStorage({
        key: 'keyWorld',
        data: keyWorld,
      })
      wx.switchTab({
        url: '../store/store',
      })
  },
  //点击领取优惠券
  coupondetail: function () {
    var isShow = this.data.showcoupondetail;
    this.setData({
      showModal: !isShow,
      showcoupondetail: !isShow,
    })
  },
  initbao(userId) {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/coupon/weekSign',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: userId
      },
      success: function (res) {
        // console.log(res, userId);
        var odata = res.data.data;
        if (odata == false) {
          that.setData({
            showit: false
          })
        } else {
          that.setData({
            showit: true
          })
        }
      }
    })
  },
  /**
    * 隐藏模态对话框
    */
  hideModal: function () {
    this.setData({
      showcoupondetail: false,
      showModal: false,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var ostatue = that.data.loginstatus;
    if (!ostatue) {
      that.initlogin()
    }
  },
  // 循环优惠券列表方法
  coupondetail: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/coupon/SignCouponQuery',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sign: 1
      },
      success: function (res) {
        var ocoup = res.data.data;
        that.setData({
          showcoupondetail: true,
          showModal: true,
          couponList: ocoup
        })
        var code = res.data.code;
      }
    })
  },
  gomoney: function (res) {
    var that = this;
    var id = res.currentTarget.dataset.id;
    that.setData({
      showcoupondetail: false,
      showModal: false,
      showit: false,
    })
    wx.request({
      url: app.globalData.testUrl + '/coupon/signIn',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: app.globalData.userId,
        sign: 1,
        discountId: id
      },
      success: function (res) {
        wx.showToast({
          title: '领取成功',
          icon: "success",
          duration: 1000
        })
      }
    })
  },
  //车俩i
  initshowCar: function (userId) {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/carInformation/wxUserDefaultCarQuery',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: userId
      },
      success: function (res) {
        var msg = res.data.msg;
        if (msg == "没有默认车辆，请设置") {
          that.setData({
            nomsg: true,
            havemsg: false
          })
        } else {
          var breakRules = res.data.data;
          app.globalData.carId = res.data.data.carId;//直接查询把车辆Id直接赋值为全局变量
          if (breakRules.breakRules == null) {
            that.setData({
              nomsg: false,
              havemsg: true,
              reson: false,
              myCar: res.data.data
            })
          } else {
            that.setData({
              nomsg: false,
              havemsg: true,
              reson: true,
              myCar: res.data.data
            })
          }
        }
      }
    })
  },
  //点击周边门店 存shopid=businessid;用于页面间传值
  storedetail: function (e) {
    wx.navigateTo({
      url: '../storedetail/storedetail',
    });
    wx.setStorage({
      key: 'businessId',
      data: e.currentTarget.dataset.shopid,
    })
  },
  //优惠活动
  initactive: function (event) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        //定位成功，请求接口去查找信息
        wx.request({
          url: app.globalData.testUrl + '/project/searchAllActivitis',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            lat: latitude,
            lng: longitude
          },
          success: function (res) {
            //console.log(res)
            var ogroups = res.data.data.groupActivities;
            var ores = res.data.data.bargainActivities;
            if (ogroups.length == 0 & ores == 0) {
              that.setData({
                activemsg: false,
              })
            } else {
              that.setData({
                activemsg: true,
                odata: ores,
                ogroup: ogroups
              })
            }
          }
        })
      },
    })
  },
  //汽车美容更多
  searchMore: function () {
    wx.navigateTo({
      url: '../morecarbeauty/morecarbeauty',
    })
  },
  //汽车保养
  maintainMore: function () {
    wx.navigateTo({
      url: '../morecarmaintain/morecarmaintain',
    })
  },
  //活动
  activeMore:function(){
    wx.navigateTo({
      url: '../moreserve/moreserve',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    if (userId==null){
      return
    }else{
      this.initshowCar(userId)
    }
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
    this.onLoad();
    wx.hideLoading();

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: '一车独秀',
        path: '/pages/index/index',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    return {
      title: '一车独秀',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 初始化中屏广告
  initAdsInfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/project/carousel',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        position: 1
      },
      success: function (res) {
        var oimg = res.data.data;
        that.setData({
          adsInfo: oimg
        })
      }
    })
  },
  //初始化定位
  initlocation: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'ymNQk372B1LOebIHILNz0kHzbSDnHH2V'
    });
    wx.getLocation({
      success: function (res) {
        //console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        // console.log(latitude, longitude);
        //定位成功，调取百度接口去逆解析地址
        BMap.regeocoding({
          location: latitude + ',' + longitude,
          success: function (res) {
            var odata = res.originalData.result.addressComponent;
            that.setData({
              currentCity: odata.city
            })
          },
          fail: function (res) {
            //console.log('小程序得到坐标失败')
            console.log(res)
          },
        })
      },
    })
  },
  // 初始化门店推荐
  initShopInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var lat = res.latitude;
        var long = res.longitude;
        //定位成功，请求接口，获取该位置的附近的信息
        wx.request({
          url: app.globalData.testUrl + '/search/storeRecommend',
          method: "post",
          data: {
            lat: lat,
            lng: long,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            that.setData({
              shopInfo: res.data.data
            })
          }
        });
      }
    });
  },
  //客服打电话
  callPeople: function (event) {
    wx.makePhoneCall({
      phoneNumber: '(021)58180562'
    })
  },
  // 初始化栏目信息
  initCateInfo: function (userId) {
    //请求洗车服务的接口
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/search/seachCarComServcies',
      method: 'post',
      data: {
        userId: userId,
        sn1: 'beauty'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg.data.data);
        that.setData({
          beautyList: msg.data.data
        })
      }
    })
  
    //请求汽车保养的接口
    wx.request({
      url: app.globalData.testUrl + '/search/seachCarComServcies',
      method: 'post',
      data: {
        userId: userId,
        sn1: 'maintain'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        that.setData({
          maintainList: msg.data.data
        })
      }
    })
    this.setData({
      // rowPos: 'last',
      // moreUrl: '../moreserve/moreserve',url: '../moreserve1/moreserve1'
      activeList: [
        {
          img: 'http://116.62.151.139/res/img/cate1.png',
          businessName: '拼团活动',
          memo: '',
          url: '../groupactivity/groupactivity'
        },
        {
          img: 'http://116.62.151.139/res/img/cate1.png',
          businessName: '砍价活动',
          memo: '',
          url: '../bargainactivity/bargainactivity'
        },
        {
          img: 'http://116.62.151.139/res/img/cate1.png',
          businessName: '优惠券',
          memo: '',
          url: '../mycoupons/mycoupons'
        },
        {
          img: 'http://116.62.151.139/res/img/cate1.png',
          businessName: '代金券',
          memo: '',
          url: '../mycoupons/mycoupons'
        }]
    });
  },

  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    // console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  goSearcar: function (event) {
    wx.navigateTo({
      url: '../searchmap/searchmap'
    })
  },
  //参加活动，去其他页面
  goActive: function (e) {
    //console.log(e);
    let businessId = e.currentTarget.dataset.shopid;
    let activeId = e.currentTarget.dataset.activeid;
    app.globalData.activeId = activeId;
    wx.setStorage({
      key: 'businessId',
      data: businessId,
    });
    wx.navigateTo({
      url: '../bargainactivity/bargainactivity',
    })
  },
  goGroup: function (e) {
    let businessId = e.currentTarget.dataset.shopid;
    let activeId = e.currentTarget.dataset.activeid;
    app.globalData.activeId = activeId;
    wx.setStorage({
      key: 'businessId',
      data: businessId,
    });
    wx.navigateTo({
      url: '../groupactivity/groupactivity',
    })
  },
  close: function () {
    wx.navigateBack({
      delta: 0
    })
  }
})
