var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personName: '淦隆汽车小设计',
    phoneNumber: '18939979659',
    shopLogo: 'http://192.168.1.111:91/shopsdetail.png',
    shopsName: '淦隆汽车',
    shopsPlace: '上海浦东新区华夏东路2518号',
    shopsDistance: '15.8km',

    OrderList: [
      {
        serveLogo: 'http://192.168.1.111:91/oil.png',
        serveName: '更换机油',
        serveDetail: '美孚金装4L',
        servePrice: '￥259.00',
        serveNumber: '×1',

      },
      {
        serveLogo: 'http://192.168.1.111:91/oilcleaner.png',
        serveName: '更换机油滤清器',
        serveDetail: '美孚金装',
        servePrice: '￥30.00',
        serveNumber: '×1',
      },
    ],
    projectList: [
      {
        projectName: '商品总额',
        projectPrice: '￥30.00',
      },
      {
        projectName: '优惠券',
        projectPrice: '-￥5.00',
      },
      {
        projectName: '实付款',
        projectPrice: '￥25.00',
      },
    ],
    orderNumbertList: [
      {
        orderState: '订单编号：',
        orderStateN: 'D2018022405080003483508',
      },
      {
        orderState: '订单时间：',
        orderStateN: '2018-02-24',
      },
      {
        orderState: '订单编号：',
        orderStateN: 'D2018032905080003483508',
      }
    ],
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'id',
      success: function (res) {
        var id = res.data;
        wx.getLocation({
          success: function (res) {
            wx.request({
              url: app.globalData.testUrl + '/order/wxOrderDetails',
              method: 'post',
              data: {
                orderId: id,
                lng: res.longitude,
                lat: res.latitude
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'//默认值
              },
              success: function (msg) {
                var data = msg.data.data;
                console.log(msg);
                that.setData({
                  personName: data.userMsg.user_name,
                  phoneNumber: data.userMsg.mobile,
                  shopsName: data.merchantMsg.merchant_name,
                  shopsPlace: data.merchantMsg.address,
                  shopsDistance: data.distance2,
                  shopLogo: data.merchantMsg.merchant_img,
                  OrderList: data.orderMsg.orderServices,
                  totalMoney: data.orderMsg.totalMoney,
                  discountPrice: data.orderMsg.discountPrice,
                  payPrice: data.orderMsg.payPrice,
                  orderCode: data.orderMsg.orderCode,
                  orderDate: data.orderMsg.orderDate,
                  portait: data.userMsg.portait
                })
              }
            })
          },
        })
      },
    })
  },
  bindViewpay: function () {
    wx: wx.navigateTo({
      url: '../pay/pay',

    })

  }
})