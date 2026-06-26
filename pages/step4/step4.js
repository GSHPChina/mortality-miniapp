const app = getApp();
const calculator = require('../../utils/calculator.js');

Page({
  data: {
    airQuality: 'moderate',
    commute: 'walk',
    safety: 'good'
  },

  onLoad() {
    const formData = app.globalData.formData || {};
    this.setData({
      airQuality: formData.airQuality || 'moderate',
      commute: formData.commute || 'walk',
      safety: formData.safety || 'good'
    });
  },

  onAirQualityChange(e) {
    this.setData({airQuality: e.currentTarget.dataset.value});
  },

  onCommuteChange(e) {
    this.setData({commute: e.currentTarget.dataset.value});
  },

  onSafetyChange(e) {
    this.setData({safety: e.currentTarget.dataset.value});
  },

  prevStep() {
    tt.navigateBack();
  },

  calculate() {
    const {airQuality, commute, safety} = this.data;
    
    app.globalData.formData = {
      ...app.globalData.formData,
      airQuality,
      commute,
      safety
    };

    tt.showLoading({title: '计算中...'});

    setTimeout(() => {
      const result = calculator.calculateRisk(app.globalData.formData);
      app.globalData.result = result;
      
      tt.hideLoading();
      tt.navigateTo({url: '/pages/result/result'});
    }, 500);
  }
});
