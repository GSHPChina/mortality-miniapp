const app = getApp();

Page({
  data: {
    result: null,
    maxProb: 0
  },

  onLoad() {
    const result = app.globalData.result;
    if (result) {
      const maxProb = result.causes.length > 0 ? result.causes[0].prob : 0;
      this.setData({result, maxProb});
    }
  },

  formatPercent(value) {
    return (value * 100).toFixed(2) + '%';
  },

  goHome() {
    tt.switchTab({url: '/pages/index/index'});
  }
});
