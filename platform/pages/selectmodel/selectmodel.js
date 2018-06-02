// pages/selectmodel/selectmodel.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    showModeldetail:false,
    modellist: '',

    //下面是字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    newmodel: [
      {
        carbrand: 'https://116.62.151.139/res/img/public.png',
        carname: '大众',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/ford.png',
        carname: '福特',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/honda.png',
        carname: '本田',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/bieke.png',
        carname: '别克',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/toyota.png',
        carname: '丰田',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/audi.png',
        carname: '奥迪',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/modern.png',
        carname: '现代',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/chevrolet.png',
        carname: '雪佛兰',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/benz.png',
        carname: '奔驰',
      },
      {
        carbrand: 'https://116.62.151.139/res/img/bmw.png',
        carname: '宝马',
      },
    ],
    //下面是车型列表信息，这里只是模拟数据
    modellist: 
    [
      { 
      "letter": "A", 
      "data": [
        { "id": "v7", "modelName": "奥迪" }, 
        { "id": "v7", "modelName": "奥迪" }, 
        { "id": "v7", "modelName": "奥迪" }, 
        { "id": "v7", "modelName": "奥迪" }, 
        { "id": "v7", "modelName": "奥迪" }
       ] 
      }, 
      { 
        "letter": "B", 
        "data": [
          { "id": "v10", "modelName": "宝马" }, 
          { "id": "v4", "modelName": "宝马" }, 
          { "id": "v1", "modelName": "宝马" }
          ] 
      }, 
      {
        "letter": "D",
         "data": [
           { "id": "v15", "modelName": "大众" }
         ]
      }, 
      { 
        "letter": "E", 
        "data": [
          { "id": "v15", "modelName": "Eson" }
          ] 
      }
    ],
  },
  //点击车型
  modelTap(e) {
    const val = e.currentTarget.dataset.val || '',
      Index = e.currentTarget.dataset.index || '',
      that = this;
      this.setData({
        brandname: val.modelName
      })
      this.modeldetail(val.id);
  },
  //点击车型字母
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      modelListId: Item
    });
  },
  brandList: function(){
    console.log("1");
  },
  hostdetail : function(e){
    var that = this;
    wx.request({
      url: 'https://api.jisuapi.com/car/type',
      method: 'GET',
      data: {
        parentid: e.currentTarget.dataset.id,
        appkey: '3d857cc41c4aee47'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        //console.log(msg);
        that.setData({
          brandList: msg.data.result
        })
      }
    })
    this.setData({
      brandname: e.currentTarget.dataset.name,
      showModal: true,
      showModeldetail: true,
    })
  },
  // 车型详情
  modeldetail:function(modelId){
    var that = this;
    wx.request({
      url: 'https://api.jisuapi.com/car/type',
      method: 'GET',
      data: {
        parentid: modelId,
        appkey: '3d857cc41c4aee47'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (msg) {
        //console.log(msg);
        that.setData({
          brandList: msg.data.result
        })
      }
    })
      this.setData({
        showModal: true,
        showModeldetail: true,
      })
  },
  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showModal: false,
      showModeldetail: false,
    });
  },
  cars : function(e){
    wx.setStorage({
      key: 'id',
      data: e.currentTarget.dataset.id,
    })
    wx.setStorage({
      key: 'brandname',
      data: this.data.brandname,
    })
    wx.navigateTo({
      url: '../selectionmodel/selectionmodel',
    })
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    this.modellist();
    var that = this;
    wx.request({
      url: app.globalData.testUrl + '/project/searchCarBrand',
      method: 'post',
      data: {
        state :1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'//默认值
      },
      success: function (msg) {
        that.setData({
        newmodel : msg.data.data
        })
      }
    })
  },
  //车型列表接口对接
  modellist:function(){
    let that = this;
    wx.request({
      url: 'https://api.jisuapi.com/car/brand',
      method: 'post',
      data: {
        appkey: '3d857cc41c4aee47'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (msg) {
        //console.log(msg);
        var carBrand = msg.data.result;//所有品牌结果
        var letter = that.data.letter;//所有字母 26个字母加一个热字
        var modellist = new Array();
        for(var j = 0; j<letter.length;j++){
          var obj = new Object();//一个字母下的所有品牌总对象
          var list = new Object();//这个品牌品牌的字母
          var  datas = new Array();//品牌的详细信息的空数组
          list = letter[j];
          var num = 0;
          for(var i = 0;i<carBrand.length;i++){
            if (carBrand[i].initial == list){//如果品牌列表的字母和 26个字符中的一个对应
              var brand = new Object();
              brand.id = carBrand[i].id
              brand.modelName = carBrand[i].name
              brand.img = carBrand[i].logo
              datas[num] = brand;
              num++;
            }
          }
          obj.letter = list;//设置字母
          obj.data = datas;//设置数组
          modellist[j] = obj;//放到总的里面
        }
        that.setData({
          modellist: modellist
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})