Page({
  data: {

  },
  onReady: function () {
    this.initCouponsList();
  },

  initCouponsList: function () {
    this.setData({
      CouponsList: [
        {
          store: 'http://192.168.1.111:91/stores.png',
          currency:'￥',
          price:'5',
          require:'满10可用',
          couponsNname:'淦隆汽车专享代金券',
          couponsTime:'2018-04-20至2018-04-25',
          couponsRange:'限门店',
          shopPlace:'浦东新区华夏东路2518号',
          shopDistance:'4km',
          shopName:'淦隆汽车',
        },
        {
          store: 'http://192.168.1.111:91/stores.png',
          currency: '￥',
          price: '5',
          require: '满10可用',
          couponsNname: '淦隆汽车专享代金券',
          couponsTime: '2018-04-20至2018-04-25',
          couponsRange: '限门店',
          shopPlace: '浦东新区华夏东路2518号',
          shopDistance: '4km',
          shopName: '淦隆汽车',
        },
       
      ]
    })
  }

})