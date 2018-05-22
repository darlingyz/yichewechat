var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appGeneralize: '汽车服务全包揽 , 用一车独秀APP',
    activityId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success:function(res){
          console.log(res)
      }
    })
    wx.request({
      url: app.globalData.testUrl + '/project/searchMyActivity',
      method: 'post',
      data: {
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg);
        that.setData({
          bargainactiveList:msg.data.data.bargainActivity,
          groupList :msg.data.data.groupActivity
        })
      }
    })
  },
  bargainDetailView:function(e){
    var that=this;
    var status = e.currentTarget.dataset.status;
    var activityId = e.currentTarget.dataset.id;
    console.log(activityId)
    that.setData({
      activityId: activityId
    })
    wx.setStorage({
      key: 'activityId',
      data: activityId,
    })
    if(status == -1){//失败页
      wx.navigateTo({
        url: '../friendsbargaine/friendsbargaine',
      })
    }else if(status == 0){//等待中
      wx.navigateTo({
        url: '../friendsbargainc/friendsbargainc',
      })
    }else if(status == 1){//中间价
      wx.navigateTo({
        url: '../friendsbargainc/friendsbargainc',
      })
    }else{//完成
      wx.navigateTo({
        url: '../friendsbargaind/friendsbargaind',
      })
    }
  },
  groupDetailView : function(e){
    var that=this;
    var status = e.currentTarget.dataset.status;
    var group = e.currentTarget.dataset.group;
    wx.setStorage({
      key: 'activityId',
      data: e.currentTarget.dataset.id,
    })
    if (status == -1) {//失败页
      wx.navigateTo({
        url: '../groupfailure/groupfailure?group=' + group,
      })
    }else if(status == 0){//拼团中
      wx.navigateTo({
        url: '../startgroupmiddle/startgroupmiddle?group=' + group,
      })
    }else{//成功
      wx.navigateTo({
        url: '../groupsuccess/groupsuccess?group=' + group,
      })
    }

  },
  godown:function(){
    wx.request({
      url: 'http://www.glongcar.com/xlxq/#/download',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    
  }
})