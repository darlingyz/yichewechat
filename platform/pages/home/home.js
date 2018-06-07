// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcoupondetail:false,
    showModal:false,
  },

  //点击领取优惠券
  coupondetail: function () {
    var isShow = this.data.showcoupondetail;
    this.setData({
      showModal: !isShow,
      showcoupondetail: !isShow,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCateInfo();
    this.initShopInfo();
    this.initAdsInfo();

    this.setData({
      //所有图片的高度  
      imgheights: [],
      //默认  
      current: 0,
      myCar:{
        carname: "Audi A4L 2018款",
        logo: "http://192.168.1.111:91/carlogo.png",
        mileage: 100,
        state: "无违章",
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //调用 循环活动列表方法
    this.initBargainList();
    //调用 循环优惠券列表方法
    this.initCouponList();
  },
  //循环活动列表方法
  initBargainList: function () {
    this.setData({
      bargainList: [
        {
          storeSrc: 'http://192.168.1.111:91/stores.png',
          couponSrc: 'http://192.168.1.111:90/coupon.png',
          bargainSrc: 'http://192.168.1.111:90/bargain.png',
          washcar: '洗车',
          slogana: '限时优惠',
          sloganb: '新年感恩',
          currentPrice: '9.9',
          originalPrice: '40.0',
          discount: '2.5',
          storename: '道奇汽车美容中心',
          address: '浦东新区川沙路888号',
          distance: '4',
        },
        {
          storeSrc: 'http://192.168.1.111:91/stores.png',
          couponSrc: 'http://192.168.1.111:90/coupon.png',
          bargainSrc: 'http://192.168.1.111:90/groupbuy.png',
          washcar: '洗车',
          slogana: '限时优惠',
          sloganb: '新年感恩',
          currentPrice: '9.9',
          originalPrice: '40.0',
          discount: '2.5',
          storename: '道奇汽车美容中心',
          address: '浦东新区川沙路888号',
          distance: '4',
        },
        {
          storeSrc: 'http://192.168.1.111:91/stores.png',
          couponSrc: 'http://192.168.1.111:90/coupon.png',
          bargainSrc: 'http://192.168.1.111:90/clear.png',
          washcar: '洗车',
          slogana: '限时优惠',
          sloganb: '新年感恩',
          currentPrice: '9.9',
          originalPrice: '40.0',
          discount: '2.5',
          storename: '道奇汽车美容中心',
          address: '浦东新区川沙路888号',
          distance: '4',
        },
        {
          storeSrc: 'http://192.168.1.111:91/stores.png',
          couponSrc: 'http://192.168.1.111:90/coupon.png',
          bargainSrc: 'http://192.168.1.111:90/settime.png',
          washcar: '洗车',
          slogana: '限时优惠',
          sloganb: '新年感恩',
          currentPrice: '9.9',
          originalPrice: '40.0',
          discount: '2.5',
          storename: '道奇汽车美容中心',
          address: '浦东新区川沙路888号',
          distance: '4',
        },

      ]
    });
  },
  // 循环优惠券列表方法
  initCouponList: function(){
    this.setData({
      couponList:[
        {
          couponprice: '5',
          allusecoupons: '通用优惠券',
          residualtime: '30',
          userange: '适用于所有商家',
          enprice: '40',
        },
        {
          couponprice: '8',
          allusecoupons: '通用优惠券',
          residualtime: '30',
          userange: '适用于所有商家',
          enprice: '40',
        },
        {
          couponprice: '5',
          allusecoupons: '通用优惠券',
          residualtime: '30',
          userange: '适用于所有商家',
          enprice: '40',
        },
        {
          couponprice: '8',
          allusecoupons: '通用优惠券',
          residualtime: '30',
          userange: '适用于所有商家',
          enprice: '40',
        },
      ]
    })
  },
  storedetail:function(){
    wx.navigateTo({
      url: '../storedetail/storedetail',
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一车独秀',
      path: '/pages/home/home?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  // 初始化中屏广告
  initAdsInfo: function() {
    this.setData({
      adsInfo: [{
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        url: ''
      },
      {
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        url: ''
      }]
    });
  },

  // 初始化门店推荐
  initShopInfo: function() {
    this.setData({
      shopInfo: [{
        shop_name: '鑫隆汽车维修(顾村店)',
        img: 'http://192.168.1.111:91/store1.png',
        url: '',
        score: 9.2,
        buynum: 32,
        distance: 3
      },
      {
        shop_name: '泰德汽车维修(宝山店)',
        img: 'http://192.168.1.111:91/store2.png',
        url: '',
        score: 6.2,
        buynum: 3,
        distance: 5
      },
      {
        shop_name: '大众汽车城',
        img: 'http://192.168.1.111:91/store1.png',
        url: '',
        score: 8.2,
        buynum: 42,
        distance: 23
      }]
    });
  },

  // 初始化栏目信息
  initCateInfo: function() {
    this.setData({
      // 分类信息列表： cateInfo 5个一组
      cateInfoList: [{
        cateInfo : {
          rowPos: 'first',
          moreUrl: '',
          list: [{
            icon:'http://192.168.1.111:90/cate1.png',
            name: '汽车美容',
            memo: '选择专业 选择放心',
            url: '/pages/morecarbeauty/morecarbeauty'
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '标准洗车',
            memo: '',
            url: ''
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '内饰清洗',
            memo: '',
            url: ''
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '全车精洗',
            memo: '',
            url: ''
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '汽车打蜡',
            memo: '',
            url: ''
          }
        ]}
      },
      {
        cateInfo: {
          rowPos: 'middle',
          list: [{
          icon: 'http://192.168.1.111:90/cate1.png',
          name: '汽车保养',
          memo: '品质服务 呵护爱车',
          url: '/pages/morecarmaintain/morecarmaintain'
        },
        {
          icon: 'http://192.168.1.111:90/cate1.png',
          name: '轮胎更换',
          memo: '',
          url: ''
        },
        {
          icon: 'http://192.168.1.111:90/cate1.png',
          name: '空气滤清器',
          memo: '',
          url: ''
        },
        {
          icon: 'http://192.168.1.111:90/cate1.png',
          name: '机油',
          memo: '',
          url: ''
        },
        {
          icon: 'http://192.168.1.111:90/cate1.png',
          name: '机油滤清器',
          memo: '',
          url: ''
        }
        ]}
      },
      {
        cateInfo: {
          rowPos: 'last',
          list: [{
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '活动专区',
            memo: '超值特惠 感恩回馈',
            url: '/pages/moreserve1/moreserve1'
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '拼团活动',
            memo: '',
            url: ''
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '砍价活动',
            memo: '',
            url: ''
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '发起红包',
            memo: '',
            url: ''
          },
          {
            icon: 'http://192.168.1.111:90/cate1.png',
            name: '代金券',
            memo: '',
            url: ''
          }
          ]
        }
      }
      ]
    });
  },

  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
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
    console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  }
})