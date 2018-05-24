
 function getopenid(){
   var that=this;
   wx.login({
     success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
       console.log(res.code);
       wx.request({
         url: this.globalData.testUrl + '/Wx/aaa',
         method: "post",
         data: {
           code: res.code
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
           console.log(res);
           app.globalData.openId = res.data.openid;
           var openid = res.data.openid;
            wx.setStorage({
              key: 'openId',
              data: openid
            })
         }
       })
     }
   })
//登录成功获取userId
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
                 wx.hideLoading();
                 var data = res.data.data;
                 if (data == null) {
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
                 } else {
                   var userId = res.data.data.userId;
                   app.globalData.userId = userId;
                   wx.setStorage({
                     key: 'userId',
                     data: userId,
                   })
                 }
               },
             })
             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
             // 所以此处加入 callback 以防止这种情况
             if (that.userInfoReadyCallback) {
               that.userInfoReadyCallback(res)
             }
           }
         })
       } else {
         console.log("授权失败~===~")
       }
     }
   })

 };
 function modalTap(data) {  //弹出提示框
   wx.showModal({
     title: "提示信息",
     content: data,
     showCancel: false,
     confirmText: "确定"
   });
 }

 function loading(data, msg) {
   wx.showToast({
     title: msg,
     icon: "loading",
      duration: data
   })
 }

 function DoSuccess(data) {
   wx.showToast({
     title: data,
     icon: "success",
     duration: 2000
   })
 }
 exports.DoSuccess = DoSuccess
 exports.loading = loading
 exports.modalTap = modalTap
 exports.getopenid = getopenid