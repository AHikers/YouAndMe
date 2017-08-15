//wx-drawer
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
var app = getApp()
Page({
  data: {
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    },
    page: {
      z_index_user: 20,
      z_index_myInfo: 10,
      z_index_writeCard: 10,
      z_index_getBrand: 10,
      z_index_setInfo: 10,
      title: "卡片信息"
    },
    cardTypeClass: { getCard: "", sendCard:"cardTypeCoverSend"},
    cardTypeShow: { sendCard: true, getCard:false},
    userInfo: {
      tempFilePaths: "../../imgs/uploadImg.png",
      userName: "",
    },
    userList: [],
    getCardList: [{
      name:"起个名字好难",
      age:"20",
      constellation:"摩羯座",
      distance:"0.5",
      giveMessage:"本人放荡不羁爱自由，送我的人需谨慎...哈。哈。哈",
      id:1,
      job:"学生",
      pictrueUrl:"../../imgs/user2.jpg",
      sex: "0",
      want:"三杯奶茶",
      type: 1,  //1为收到，2为送出
      status: 1, //1为已处理， 2为未处理
      contactInfo: "949932122",  
    }, {
      name: "起个名字好难",
      age: "20",
      constellation: "摩羯座",
      distance: "0.5",
      giveMessage: "本人放荡不羁爱自由，送我的人需谨慎...哈。哈。哈",
      id: 1,
      job: "学生",
      pictrueUrl: "../../imgs/user2.jpg",
      sex: "0",
      want: "三杯奶茶",
      type: 1,  //1为收到，2为送出
      status: 2, //1为已处理， 2为未处理
      contactInfo: "949932122",
    }, {
      name: "随便起个名字",
      age: "20",
      constellation: "摩羯座",
      distance: "0.5",
      giveMessage: "本人放荡不羁爱自由，送我的人需谨慎...哈。哈。哈",
      id: 1,
      job: "学生",
      pictrueUrl: "../../imgs/user1.jpg",
      sex: "0",
      want: "三杯奶茶",
      type: 2,
      status: 2, //1为已处理， 2为未处理
      contactInfo: "949932122",
    }, {
      name: "随便起个名字",
      age: "20",
      constellation: "摩羯座",
      distance: "0.5",
      giveMessage: "本人放荡不羁爱自由，送我的人需谨慎...哈。哈。哈",
      id: 1,
      job: "学生",
      pictrueUrl: "../../imgs/user1.jpg",
      sex: "0",
      want: "三杯奶茶",
      type: 2,
      status: 1, //1为已处理， 2为未处理
      contactInfo: "949932122",
    }]
  },
  onLoad() {
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ui: this.data.ui})
      this.getUserList();
    } catch (e) {
    }
  },
  /*
  handlerStart(e) {
    let {clientX, clientY} = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ui: this.data.ui})
  },
  handlerMove(e) {
    let {clientX} = e.touches[0];
    let {ui} = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if(ui.offsetLeft <= 0) {
      ui.offsetLeft = 0;
    } else if(ui.offsetLeft >= ui.menuWidth) {
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ui: ui})
  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ui: this.data.ui})
    let {ui} = this.data;
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if(endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if(this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if(this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if(ui.offsetLeft >= ui.menuWidth/2){
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if(ui.offsetLeft >= ui.menuWidth/2){
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    this.setData({ui: ui})
  },
  */
  getUserList(e) {
    let url = "http://139.224.238.47:9090/card/cardsList.go";
    let self = this;
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == "1"){
          self.setData({userList: res.data.userList});
        } else {
          wx.showToast({
            title: '加载失败',
            duration: 2000
          });
        }
      }
    });
    console.log("sss");
  },
  handlerPageTap(e) {
    let {ui} = this.data;
    if(ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ui: ui})
    }
  },
  handlerAvatarTap(e) {
    let {ui} = this.data;
    if(ui.offsetLeft == 0) {
      ui.offsetLeft = ui.menuWidth;
      this.setData({ui: ui})
    }
  },
  gotoIndex(e) {
    let { ui } = this.data;
    let { page } = this.data;
    let title = "卡片信息";
    page.z_index_user = 20; 
    page.z_index_writeCard = 10,
    page.z_index_myInfo = 10,
    page.z_index_getBrand = 10;
    page.z_index_setInfo = 10;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoWriteCard(e) {
    let { ui } = this.data;
    let { page } = this.data;
    let title = "写卡片";
    page.z_index_user = 10;
    page.z_index_writeCard = 20,
    page.z_index_myInfo = 10,
    page.z_index_getBrand = 10;
    page.z_index_setInfo = 10;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoMyInfo(e) {
    let { ui } = this.data;
    let { page } = this.data;
    let title = "我的信息";
    page.z_index_user = 10;
    page.z_index_writeCard = 10,
    page.z_index_myInfo = 20,
    page.z_index_getBrand = 10;
    page.z_index_setInfo = 10;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoMyBrand(e) {
    let { ui } = this.data;
    let { page } = this.data;
    let title = "我的卡片";
    page.z_index_user = 10;
    page.z_index_writeCard = 10,
    page.z_index_myInfo = 10,
    page.z_index_getBrand = 20;
    page.z_index_setInfo = 10;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoSetInfo(e) {
    let { ui } = this.data;
    let { page } = this.data;
    let title = "设置";
    page.z_index_user = 10;
    page.z_index_writeCard = 10,
    page.z_index_myInfo = 10,
    page.z_index_getBrand = 10;
    page.z_index_setInfo = 20;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  viewSendCardList(e) {
    let { cardTypeClass } = this.data;
    let { cardTypeShow } = this.data;
    cardTypeClass.getCard = "";
    cardTypeClass.sendCard = "cardTypeCoverSend";
    cardTypeShow.sendCard = true;
    cardTypeShow.getCard = false;
    this.setData({ cardTypeClass: cardTypeClass, cardTypeShow: cardTypeShow });
  },
  viewGetCardList(e) {
    let { cardTypeClass } = this.data;
    let { cardTypeShow } = this.data;
    cardTypeClass.getCard = "cardTypeCoverGet";
    cardTypeClass.sendCard = "";
    cardTypeShow.sendCard = false;
    cardTypeShow.getCard = true;
    this.setData({ cardTypeClass: cardTypeClass, cardTypeShow: cardTypeShow });
  },
  upLoadUserImg(e) {
    let self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        self.setData({ 
          'userInfo.tempFilePaths': tempFilePaths
        });
        /*let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        });*/
      }
    });
  },
  sendUserInfo() {
    let userInfo = {
      userName: "",
      sex: 0,
      school: "",
      profession: "",
      adress: "",
      hobbies: ["打球","玩耍"],
      age: 20
    };
  }
})
