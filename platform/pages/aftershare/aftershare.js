Page({


  data: {
         store:'http://192.168.1.111:91/stores.png',
         wash:'洗车',
         onsale:'限时优惠',
         onsale1: '新年感恩',
         price:'￥',
         price1:'9.9',
         ex_price:'原价40.0',
         discount:'--砍价低至2.5折',
         serve_end:'该洗车券可用于该平台所有车行，您洗车，一车独秀帮您付钱~',
         place_dot:'http://192.168.1.111:90/place.png',
         telphone:'http://192.168.1.111:90/telphone.png',
         place:'上海浦东新区川沙镇顺路车行',
         phone_number:'189 9999 6666',
         residueNumbers:'2',
         time:'23:59：42',
         pic_1:'http://192.168.1.111:91/team-user.png',
         pic_2:'http://192.168.1.111:91/user-answer.png',
         pic_3:'http://192.168.1.111:91/user-answer.png',
         group_invite:'支付开团后,可邀请2人参团，人数不足自动退款',
         like_1:'http://192.168.1.111:91/guessyourlike.png',
         like_2: 'http://192.168.1.111:91/guessyourlike.png',
         residueNumbers:'2',
         button_1:'￥9.9参与拼团',
  },
  //跳转至拼团规则
  bindViewrules: function () {
    wx.navigateTo({
      url: '../rules/rules'
    });
  },
//跳转至首页
  bindViewhome:function(){
    wx.switchTab({
      url: '../home/home',
    })
 
 },
 //跳转至支付
  bindViewpay: function () {
    wx.navigateTo({
      url: '../pay/pay',
    })
  },

})