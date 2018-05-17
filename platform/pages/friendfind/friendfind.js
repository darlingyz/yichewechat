
Page({
  data: {
    store:'http://192.168.1.111:91/stores.png',
    wash:'洗车',
    onsale:'限时优惠',
    onsale1:'新年感恩',
    price:'￥',
    price1:'9.9',
    ex_price:'原价￥40.0',
    discount:'-砍价低至2.5折-',
    count:'已有3人参加',
    pic_1:'http://192.168.1.111:91/team-user.png',
    pic_2: 'http://192.168.1.111:91/team-user.png',
    pic_3: 'http://192.168.1.111:91/team-user.png',
    rule:'支付开团后，可邀请2人参团，人数不足自动退款',
    detailedArrow:'http://192.168.1.111:90/detailed_arrow.png',
    },

//跳转至拼团规则
bindViewrules: function() {
  wx.navigateTo({
    url: '../rules/rules'
                }) 
},
//跳转至开始拼团
  bindViewstartgroup: function () {
  wx.navigateTo({
    url: '../startgroup/startgroup'
                })
  },
//跳转至首页
  bindViewhome: function () {
    wx.switchTab({
      url: '../home/home',
    })
    },
})
