const app = getApp()
Page({
  data: {
    
    },

  onReady: function () {
    this.initCouponsList();
  },
 
    initCouponsList: function () {
    this.setData({
      couponsList: [
        {
        currency: '￥',
        price: '5',
        require1: '满10可用',
        couponsName1: '淦隆汽车专享代金券',
        couponsTime1: '使用期限：2018-04 - 20至2018-04 - 25',
        couponsRange1: '全平台使用；限洗车服务.',
        getButton1: '立即领取',
      },
        {
          currency: '￥',
          price: '5',
          require1: '满10可用',
          couponsName1: '淦隆汽车专享代金券',
          couponsTime1: '使用期限：2018-04 - 20至2018-04 - 25',
          couponsRange1: '全平台使用；限洗车服务.',
          getButton1: '已领取',
        },
      ]
    })
  }
})