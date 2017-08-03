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
      z_index_getBrand: 10,
      title: "她"
    },
    userList: [
      {
        sex: 0,
        age: 20,
        constellation: "摩羯座",
        job: "学生",
        distance: 0.5,
        pictrueUrl: "../../imgs/user1.jpg",
        want: "三杯奶茶",
        giveMessage: "本人放荡不羁爱自由，送我的人需谨慎...哈。哈。哈"
      }, {
        sex: 1,
        age: 30,
        constellation: "摩羯座",
        job: "前端开发工程师",
        distance: 1.6,
        pictrueUrl: "../../imgs/user2.jpg",
        want: "写个软件",
        giveMessage: "性格暴躁、易怒、死宅"
      },
    ],
  },
  onLoad() {
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ui: this.data.ui})
    } catch (e) {
    }
  },
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
    let title = "她";
    page.z_index_user = 20; 
    page.z_index_myInfo = 10,
    page.z_index_getBrand = 10;
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
    page.z_index_myInfo = 20,
    page.z_index_getBrand = 10;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoMyBrand(e) {
    let { ui } = this.data;
    let { page } = this.data;
    let title = "我送的牌子";
    page.z_index_user = 10;
    page.z_index_myInfo = 10,
    page.z_index_getBrand = 20;
    page.title = title;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  }
})
