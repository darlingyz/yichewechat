//pages/selectcity/selectcity.js
// 引用百度地图微信小程序JSAPI模块
var app=getApp(); 
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //下面是字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    cityListId: '',
    //下面是城市列表信息，这里只是模拟数据
    citylist: [{ "letter": "A", "data": [{ "id": "v7", "cityName": "安徽" }] }, { "letter": "B", "data": [{ "id": "v10", "cityName": "巴中" }, { "id": "v4", "cityName": "包头" }, { "id": "v1", "cityName": "北京" }] }, { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }],
    //下面是热门城市数据，模拟数据
    newcity: ['上海', '北京', '广州', '福建', '昆明', '海南', '杭州','南京', '江苏', '武汉'],
    // citySel: '全国',
    locateCity: '',
    currentCity: ''
  },
  //点击城市
  cityTap(e) {
    console.log(e)
    const val = e.currentTarget.dataset.val || '',
      types = e.currentTarget.dataset.types || '',
      Index = e.currentTarget.dataset.index || '',
      that = this;
    let city = this.data.citySel;
    switch (types) {
      case 'locate':
        //定位内容
        city = this.data.locateCity;
        break;
      case 'national':
        //全国
        city = '全国';
        break;
      case 'new':
        //热门城市
        city = val;
        break;
      case 'list':
        //城市列表
        city = val.cityName;
        break;
    }
    if (city) {
      wx.setStorage({
        key: 'city',
        data: city
      })

    } else {
      console.log('还没有');
      this.getLocate();
    }

  },
  //点击城市字母
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      cityListId: Item
    });
  },
  //调用定位
  getLocate() {
    let that = this;
    var app = getApp();

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.data.latitude = latitude;   

        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
          ak: app.globalData.baiduMapKey
      }); 

        var cityName = "";
        // 发起regeocoding检索请求 
        BMap.regeocoding({
          success: function(res) {
            console.log(res);
            var addr = res.wxMarkerData[0].address;
            if (addr.indexOf('市') !== -1) {
              cityName = addr.slice(0, addr.indexOf('市'));
            }

            that.setData({
              locateCity: cityName
            });
            //把获取的定位和获取的时间放到本地存储
            //wx.setStorageSync('locatecity', { city: cityName, time: new Date().getTime() });
          },
          fail: function(res) {
            console.log('err');
            //console.log(res);
          }
        }); 
        
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';

    if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) {//每隔30分钟请求一次定位
      this.getLocate();
    } else {//如果未满30分钟，那么直接从本地缓存里取值
      that.setData({
        locateCity: cityOrTime.city
      })
    };
    this.initload();
},
//页面加载，获取位置
  initload: function () {
    //定位成功，调取百度接口去逆解析地址
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'ymNQk372B1LOebIHILNz0kHzbSDnHH2V'
    });
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        //console.log(latitude, longitude);
        //定位成功，调取百度接口去逆解析地址
        BMap.regeocoding({
          location: latitude + ',' + longitude,
          success: function (res) {
            console.log(res)
            var odata = res.originalData.result.addressComponent;
            that.setData({
              currentCity: odata.city
            })
          },
          fail: function () {
            console.log('小程序得到坐标失败')
          },
        })
      }
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
  
  },
  //搜索接口，跳转到其他页面


})