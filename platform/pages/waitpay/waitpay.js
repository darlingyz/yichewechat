Page({

  /**
   * 页面的初始数据
   */
  data: {
    personName: '淦隆汽车小设计',
    phoneNumber: '18939979659',
    shopLogo: 'http://116.62.151.139/res/img//oilcard.png',
    shopsName: '淦隆汽车',
    shopsPlace: '上海浦东新区华夏东路2518号',
    shopsDistance:'15.8km',

    OrderList: [
      {
        serveLogo: 'http://116.62.151.139/res/img//oilcard.png',
        serveName: '更换机油',
        serveDetail: '美孚金装4L',
        servePrice: '￥259.00',
        serveNumber: '×1',

      },
      {
        serveLogo: 'http://116.62.151.139/res/img//oilcard.png',
        serveName: '更换机油滤清器',
        serveDetail: '美孚金装',
        servePrice: '￥30.00',
        serveNumber: '×1',
      },
    ],
    projectList:[
       {
        projectName:'商品总额',
        projectPrice:'￥30.00',
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
    orderNumbertList:[
        {
        orderState:'订单编号：',
        orderStateN:'D2018022405080003483508',
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

  bindViewpay:function(){
    wx:wx.navigateTo({
      url: '../pay/pay',
     
    })

  }
})