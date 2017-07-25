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
      title: '她',
      viewPage: 'index'
    },
    banners: [
      {
        id: 3,
        img: '../../imgs/banner1.jpg',
        url: '',
        name: '头像'
      },
      {
        id: 1,
        img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/index/banner_1.jpg',
        url: '',
        name: '告别午高峰'
      },
      {
        id: 2,
        img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/index/banner_2.jpg',
        url: '',
        name: '金牌好店'
      }
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
    let title = "她";
    let viewPage = 'index';
    let { page } = this.data;
    page.title = title;
    page.viewPage = viewPage;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoMyself(e) {
    let { ui } = this.data;
    let title = "我";
    let viewPage = 'myself';
    let { page } = this.data;
    page.title = title;
    page.viewPage = viewPage;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  },
  gotoYouAndMe(e) {
    let { ui } = this.data;
    let title = "我和她";
    let viewPage = 'youAndMe';
    let { page } = this.data;
    page.title = title;
    page.viewPage = viewPage;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui, page: page })
    }
  }
})
