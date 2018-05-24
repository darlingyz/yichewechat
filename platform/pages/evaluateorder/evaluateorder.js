// pages/evaluateorder/evaluateorder.js //1.2.9
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
    /** 
   * 统一满分为5星 
   */
  data: {
    orderId:'',
    productInfo: {} ,
    stars: [0, 1, 2, 3, 4], 
    nonestar: 'http://116.62.151.139/res/img//nonestar.png ',
    star: 'http://116.62.151.139/res/img//star.png',
    halfstar: 'http://116.62.151.139/res/img//halfstar.png',
    key: 0,//评分
    personcom:"",
    src:'',
    havepic:true,
    picture:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    var orderstr = options.orderId;
    var orderId = parseInt(orderstr);
      this.setData({
        orderId: orderId
      })
  },
  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initcommentList();
  },
  initcommentList:function(){
    this.setData({
      commentList:[
        {
          comment: '好评'
        },
      ]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  //评论
  itemcommont:function(e){
    var that=this;
      console.log(e)
      var itemcont = e.detail.value;
        that.setData({
          personcom: itemcont
        })
  },
//发表评论
  gocommont:function(event){
    var that=this;
    wx.request({
      url: app.globalData.testUrl +'/order/wxAppraise',
      method:'post',
      header:{
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      data:{
        userId: app.globalData.userId,
        orderId: that.data.orderId,//订单id
        satisfaction:that.data.key,//满意度,
        desn: that.data.personcom,//描述
        picture: that.data.picture//图片
      },
      success:function(res){
          console.log(res)
          var codes = res.data.code;
          if(codes==1){
            wx.showToast({
              title: '评价成功',
              icon:"success",
              duration:1000
            })
            wx.navigateTo({
              url: '../orderdetailed/orderdetailed',
            })
          }
      }
    })
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
  
  },
  //添加Banner  
bindChooiceProduct: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0])
        that.setData({
          havepic:false,
         src: tempFilePaths
        })
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        wx.uploadFile({
          url: app.globalData.testUrl + '/upload/upforJsonFullPath',
          filePath: tempFilePaths[0],
          name: '评论图片',
          formData: {
            'user': 'test'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            console.log(res)
            var data = JSON.parse(res.data);
            var picture=data.data;
            that.setData({
              picture: picture
            })
          }
        })

       /** var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: app.globalData.testUrl + '/upload/upforJsonFullPath',
            filePath: tempFilePaths[0],
            name: 'uploadfile_ant',
            formData: {
              'user': 'test'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              uploadImgCount++;
              console.log(res)
              var data = JSON.parse(res.data); 
              var productInfo = that.data.productInfo;
              if (productInfo.bannerInfo == null) {
                productInfo.bannerInfo = [];
              }
              productInfo.bannerInfo.push({
                "catalog": data.Catalog,
                "fileName": data.FileName,
                "url": data.Url
              });
              that.setData({
                productInfo: productInfo
              });

              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }**/
      }
    });
  }  
})