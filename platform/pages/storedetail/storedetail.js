// pages/storedetail/storedetail.js
var app = getApp();
var thisBusinessId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lng: "",
    lat: "",
    noshow: true,
    showstoreactivity: true,
    showChangetyre: false,
    showBrand: false,
    showList: false,
    showModaleva: false,
    nocommsg: false,
    showModalcart: false,
    hiddencart: true,
    showCollect: false,
    showcartdetail: false,
    shopServiceList: false,
    showdelect: false,
    score: 0,
    searchbrand: '选品牌',
    onum: "",
    minusStatus: 'disabled',
    phonecall: '',
    bussinessId: "",
    businessState: "",
    storedetail: "",
    storedetail: "",
    storeName: "",
    score: "",
    people: "",
    address: "",
    starttime: "",
    endtime: "",
    phonecall: "",
    amount: null,
    obj: null,
    arr: [],
    indexnum: 1,
    carts: "",
    count: 1,
    bargainActivitis: "",
    discounts: "",
    groupActivitis: "",
    phone: "",
    startSrc: 'http://116.62.151.139/res/img/star.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        var olat = res.latitude;
        var olng = res.longitude;
        wx.getStorage({
          key: 'businessId',
          success: function (res) {
            console.log(res)
            thisBusinessId = res.data;
            that.setData({
              bussinessId: thisBusinessId
            }),
              console.log(thisBusinessId, olat, olng)
            wx.request({
              url: app.globalData.testUrl + '/storeInformation/storeDetail',
              method: 'post',
              data: {
                businessId: thisBusinessId,
                lat: olat,
                lng: olng
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (msg) {
                console.log(msg);
                var score = msg.data.data.score;
                console.log(score);
                wx.setStorage({
                  key: 'score',
                  data: score,
                })
                wx.getLocation({
                  type: 'wgs84',
                  success: function (res) {
                    var distance = that.getDistance(msg.data.data.lat, msg.data.data.lng, res.latitude, res.longitude);
                    that.setData({
                      distance: distance,
                    })
                  }
                })
                var state = msg.data.data.businessState;
                app.globalData.merchantName = msg.data.data.storeName
                wx.setStorage({
                  key: 'status',
                  data: state,
                })
                that.setData({
                  businessState: msg.data.data.businessState,
                  storedetail: msg.data.data.facadePhotoUrl,
                  storeName: msg.data.data.storeName,
                  score: msg.data.data.score,
                  people: msg.data.data.amount,
                  address: msg.data.data.facadeAdd,
                  starttime: msg.data.data.startTime,
                  endtime: msg.data.data.endTime,
                  phonecall: msg.data.data.phone
                })
              }
            })
            //请求商户服务
            wx.request({
              url: app.globalData.testUrl + '/search/wxStoreService',
              method: 'post',
              data: {
                shopId: that.data.bussinessId
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (msg) {
                that.setData({
                  showListMsg: msg.data.data,
                  showList: true
                })
              }
            })
            wx.request({
              url: app.globalData.testUrl + '/search/judgeCollectStore',
              method: 'post',
              data: {
                merchantId: that.data.bussinessId,
                userId: app.globalData.userId
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (msg) {
                that.setData({
                  showCollect: msg.data.data
                })
              }
            })
            // 店铺活动
            wx.getStorage({
              key: 'status',
              success: function (res) {
                console.log(res.data);
                var status = res.data;
                wx.request({
                  url: app.globalData.testUrl + '/search/searchMerActivity',
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    merchantId: thisBusinessId,
                    status: status
                  },
                  success: function (res) {
                    console.log(res)
                    console.log(thisBusinessId, status)
                    that.setData({
                      bargainActivitis: res.data.data.bargainActivitis,
                      discounts: res.data.data.discounts,
                      groupActivitis: res.data.data.groupActivitis
                    })
                  }
                })
              },
            })
          },
        })
      }
    })
  },
  // 加入购物车
  addPlus: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let allData = that.data.shopServicesMsg;
    //console.log(e,index)
    let num = that.data.count;
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].serviceId == id) {
        wx.request({
          url: app.globalData.testUrl + '/cartServcie/addShoppingCart',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userId: app.globalData.userId,
            merchantBusinessId: id,
            num: that.data.count
          },
          success: function (res) {
            console.log(app.globalData.userId, id, that.data.count);
            let msg = res.data.code;
            if (msg == 1) {
              wx.showToast({
                title: '添加成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
            }
            var isShow = that.data.showModalcart;
            that.setData({
              showModalcart: true,
              hiddencart: false,
            })
          }
        })
      }
    };
    //查询购物车
    wx.request({
      url: app.globalData.testUrl + '/cartServcie/searchShoppingCartDetails',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: app.globalData.userId,
        merchantId: that.data.bussinessId,
      },
      success: function (res) {
        console.log(res);
      }
    })

  },
  selectbrand: function (e) {
    this.setData({
      searchbrand: e.currentTarget.dataset.brandname,
      showBrand: false,
    })
  },

  //  客服电话
  callPhone: function (e) {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phonecall
    })
  },
  goMap: function (e) {
    wx.navigateTo({
      url: '../searchmap/searchmap',
    })
  },
  /**
   * 收藏/取消收藏门店  
   */
  collectstore: function (e) {
    var that = this;
    if (!that.data.showCollect) {
      wx.request({
        url: app.globalData.testUrl + "/storeInformation/collectStore",
        method: 'post',
        data: {
          merchantId: thisBusinessId,
          userId: app.globalData.userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'//默认值
        },
        success: function (msg) {
          var collect = that.data.showCollect;
          that.setData({
            showCollect: !collect
          })
        }
      })
    } else {
      wx.request({
        url: app.globalData.testUrl + "/storeInformation/cancelCollect",
        method: 'post',
        data: {
          merchantId: thisBusinessId,
          userId: app.globalData.userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'//默认值
        },
        success: function (msg) {
          var collect = that.data.showCollect;
          that.setData({
            showCollect: !collect
          })
        }
      })
    }
  },
  /**
  * 弹窗
  */
  //店铺活动
  showStoreactivity: function () {
    var that = this;
    that.setData({
      noshow: true,
      shopServiceList: false,
      showstoreactivity: true,
      showModal: false,
      showChangetyre: false,
      showBrand: false,
      nocommsg: false,
    })
  },
  //轮胎更换
  showChangetyre: function () {
    var isShow = this.data.showChangetyre;
    this.setData({
      showChangetyre: !isShow,
      showstoreactivity: false,
    });
  },
  //选品牌
  showSelectbrand: function () {
    var that = this;
    var isShow = this.data.showBrand;
    this.setData({
      showModal: !isShow,
      showBrand: !isShow,
      showChangetyre: true,
    })
    wx.request({
      url: app.globalData.testUrl + '/search/searchTire',
      method: 'post',
      data: {
        merchantId: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        that.setData({
          tireBrandList: msg.data.data
        })
      }
    })

  },
  //显示全部服务
  showAllServices: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/storeInformation/carService',
      method: 'post',
      data: {
        shopId: thisBusinessId,
        businessId: '',
        type: 1,
        sn: '',
        businessName: ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log("返回成功啦111111111");
        // console.log(msg);
        that.setData({
          noshow: false,
          shopServicesMsg: msg.data.data
        })
        var isShow = that.data.shopServiceList;
        that.setData({
          shopServiceList: true,
          showstoreactivity: false,
          showModal: false,
          showChangetyre: false,
          showBrand: false,
        })
      }
    })
  },
  //获取服务详情
  showServicesDetail: function (e) {
    var that = this;
    //console.log(e.currentTarget.dataset.businessname);
    wx.request({
      url: app.globalData.testUrl + '/storeInformation/carService',
      method: 'post',
      data: {
        shopId: thisBusinessId,
        businessId: e.currentTarget.dataset.business,
        type: 1,
        sn: e.currentTarget.dataset.sn,
        businessName: e.currentTarget.dataset.businessname
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log("返回成功啦111111111");
        //console.log(msg);
        that.setData({
          shopServicesMsg: msg.data.data,
        })
        var isShow = that.data.shopServiceList;
        that.setData({
          shopServiceList: true,
          showstoreactivity: false,
          showModal: false,
          showChangetyre: false,
          showBrand: false,
          showChangetyre: false,
          nocommsg: false,
        })

        if (e.currentTarget.dataset.businessname == '轮胎更换') {
          that.setData({
            showChangetyre: true
          })
        }
      }
    })
  },
  //服务
  showService: function () {
    var isShow = this.data.showList;
    //console.log(isShow);
    this.setData({
      showList: true,
      showModaleva: false,
      nocommsg: false,
    })
  },
  //评价
  showEvaluate: function () {
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/storeInformation/shopEvaluateQuery',
      method: 'post',
      data: {
        shopId: thisBusinessId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        console.log(msg)
        var oarr = msg.data.data;
        if (oarr.length == 0) {
          that.setData({
            showModaleva: false,
            nocommsg: true,
            showList: false,
            showstoreactivity: false,
            showChangetyre: false,
            shopServiceList: false
          })
        } else {
          var isShow = that.data.showModaleva;
          that.setData({
            evaluateList: msg.data.data,
            showModaleva: true,
            showList: false,
            nocommsg: false,
            showstoreactivity: false,
            showChangetyre: false,
            shopServiceList: false
          })
        }
      }
    })
  },
  //显示购物车
  checked: function () {
    var isShow = this.data.showModalcart;
    this.setData({
      showModalcart: !isShow,
      hiddencart: false,
    })
  },
  //购物车显示隐藏事件
  checkedreturn: function () {
    var isShow = this.data.hiddencart;
    this.setData({
      hiddencart: !isShow,
      showModalcart: false,
      showModalb: false,
      showcartdetail: false,
    })
  },
  //购物车详情
  cartdetail: function () {
    var isShow = this.data.showcartdetail;
    this.setData({
      showModalb: !isShow,
      showcartdetail: !isShow,
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
      showstoreactivity: false,
      showBrand: false,
      showModaleva: false,
    });
  },
  hideModalb: function () {
    this.setData({
      showModalb: false,
      showcartdetail: false,
    });
  },
  checkdetail: function () {
    wx.navigateTo({
      url: '../storedetailb/storedetailb',
    })
  },
  //跳转到 自选规格页面
  bindViewSelectstandard: function () {
    wx.navigateTo({
      url: '../selectstandard/selectstandard',
    })
  },
  //跳转到 门店详情
  bindViewStoredetailb: function () {
    wx.navigateTo({
      url: '../storedetailb/storedetailb',
    })
  },
  //跳转到 购物车界面
  bindViewPay: function () {
    wx.navigateTo({
      url: '../shopcar/shopcar',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //循环轮胎列表方法
  initTyreList: function () {
    this.setData({
      tyreList: [
        {
          tyre: "",
          tyrename: "倍耐力轮胎",
          model: '235/55 R19 105V LR',
          tyreprice: '388',
          plus: '+',
        },
        {
          tyre: "",
          tyrename: "倍耐力轮胎",
          model: '235/55 R19 105V LR',
          tyreprice: '388',
          plus: '+',
        },
      ]
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
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  }
})