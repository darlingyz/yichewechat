
function getopenid(){
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
          wx.getUserInfo({
            success: function (res) {
              var odata = JSON.parse(res.rawData);
              var nickName = odata.nickName;//昵称
              var avatarUrl = odata.avatarUrl;//头像
              wx.request({
                url: app.globalData.testUrl + '/login/wxLittleLogin',
                data: {
                  openId: openid,
                  userName: nickName,
                  portait: avatarUrl
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                success: function (res) {
                  
                  console.log(res);
                  var userId = res.data.data.userId
                  app.globalData.userId = userId;
                }
              })
            }
          })
          // that.globalData.sessionKey = msg.data.session_key
        }
      })
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