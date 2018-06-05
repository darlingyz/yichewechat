var app = getApp();
var comServiceList = new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editModel: false,
    delImg: 'http://116.62.151.139/res/img/delete.png',
    addImg: 'http://116.62.151.139/res/img/add.png',
    allServelList:'',
    servelList:'',
    obj:"",
  },  
  onLoad: function () {
    var that = this;
    //我的服务接口
    wx.request({
      url: app.globalData.testUrl + '/search/seachCarComServcies',
      method: 'post',
      data: {
        userId:app.globalData.userId,
        sn1: 'beauty'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        console.log(msg.data.data);
        that.setData({
          servelList: msg.data.data
        })
      }
    })
    //所有的服务接口
    wx.request({
      url: app.globalData.testUrl + '/search/seachCarAllService',
      method: 'post',
      data: {
        sn1: 'beauty'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        that.setData({
          allServelList: msg.data.data.carServices
        })
      }
    })
  },
  //加号标注 添加到我的服务中
  addTap: function (e) {
    var that=this;
    var id = e.currentTarget.dataset.id;
    console.log(e);
    if (!this.data.editModel || id == '') {
      return;
    }
    this.addItem(id);//回掉
  },
//删除按钮操作
  deleteTap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(e);
    console.log(id);
    this.delItem(id);
    if (!this.data.editModel || id == '') {
      return;
    }
   
  },
// 遍历查找标志
  addItem: function (id) {
    var that=this,
     aitem = null,
     addarr=null,
     addarr = that.data.allServelList;
     for (var i = 0; i < addarr.length; i++) {
       if (addarr[i].businessId == id) {
         aitem = addarr[i];
        break;
      }
    };
    var servelList = that.data.servelList;
    if (servelList.length >= 4) {
      return;
    }
    for (var i = 0; i < servelList.length;i++){
      if (servelList[i].businessId == id){
        return;
      }
    }
    aitem.rank = servelList.length + 1;
    servelList.push(aitem);
    console.log(servelList);
    that.setData({
      servelList: servelList,
    });
    var com = new Array();
    for (var i = 0; i < servelList.length; i++){
      var obj = new Object();
      obj.businessDetailsId = servelList[i].businessId;
      obj.rank = servelList[i].rank;
      obj.businessId = servelList[i].serviceId;
      com[i] = obj;
    }
    comServiceList = com;
    console.log(comServiceList);
  },

  delItem: function (id) {
    var item = null;
    var arr=null;
    var that=this;
    arr = that.data.servelList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].businessId == id) {
        item = arr[i];
        console.log(item);
        arr.splice(i, 1);
         break;
      }
    };
    for (var i = 0; i < arr.length; i++) {
        arr[i].rank = i+1;
    };
    console.log(arr);
    that.setData({
      servelList : arr
    })
    var com = new Array();
    for (var i = 0; i < arr.length; i++) {
      var obj = new Object();
      obj.businessDetailsId = arr[i].businessId;
      obj.rank = arr[i].rank;
      obj.businessId = arr[i].serviceId;
      com[i] = obj;
    }
    comServiceList = com;
    console.log(comServiceList);
  },
    //点击显示和隐藏
  editTap: function (e) {
    var that = this;
    var editModel = that.data.editModel;
    that.setData({
      editModel: !editModel,
    })
    //editModel==true,此时回掉函数请求接口把数据返回给后台
    if (editModel) {
      var ser = JSON.stringify(comServiceList);
      console.log(ser)
      wx.request({
        url: app.globalData.testUrl + '/search/updeteCarAllServcie',
        method: 'post',
        data: {
          userId: app.globalData.userId,
          sn1 : 'beauty',
          comServicesList: ser
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'//默认值
        },
        success: function (msg) {
          console.log(msg);
        }
      })
    }
  },
})