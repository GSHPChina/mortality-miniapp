const app = getApp();

Page({
  data: {
    hypertensionIndex: 0,
    diabetes: 'none',
    hasCHD: false,
    hasStroke: false,
    hasCOPD: false,
    hasCancer: false,
    hasLiverCirrhosis: false,
    hasCKD: false,
    hasHeartFailure: false,
    familyCV: 'no',
    familyCancer: 'no',
    hypertensionOptions: [
      {value: 0, label: '无/正常'},
      {value: 1, label: '1级（140-159/90-99mmHg）'},
      {value: 2, label: '2级（160-179/100-109mmHg）'},
      {value: 3, label: '3级（≥180/≥110mmHg）'}
    ]
  },

  onLoad() {
    const formData = app.globalData.formData || {};
    if (formData.hypertension !== undefined) {
      this.setData({
        hypertensionIndex: formData.hypertension || 0,
        diabetes: formData.diabetes || 'none',
        hasCHD: formData.hasCHD || false,
        hasStroke: formData.hasStroke || false,
        hasCOPD: formData.hasCOPD || false,
        hasCancer: formData.hasCancer || false,
        hasLiverCirrhosis: formData.hasLiverCirrhosis || false,
        hasCKD: formData.hasCKD || false,
        hasHeartFailure: formData.hasHeartFailure || false,
        familyCV: formData.familyCV || 'no',
        familyCancer: formData.familyCancer || 'no'
      });
    }
  },

  onHypertensionChange(e) {
    this.setData({hypertensionIndex: e.detail.value});
  },

  onDiabetesChange(e) {
    this.setData({diabetes: e.currentTarget.dataset.value});
  },

  toggleDisease(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({[key]: !this.data[key]});
  },

  onFamilyCVChange(e) {
    this.setData({familyCV: e.currentTarget.dataset.value});
  },

  onFamilyCancerChange(e) {
    this.setData({familyCancer: e.currentTarget.dataset.value});
  },

  prevStep() {
    tt.navigateBack();
  },

  nextStep() {
    const {hypertensionIndex, hypertensionOptions, diabetes, hasCHD, hasStroke, hasCOPD, hasCancer, hasLiverCirrhosis, hasCKD, hasHeartFailure, familyCV, familyCancer} = this.data;
    
    app.globalData.formData = {
      ...app.globalData.formData,
      hypertension: hypertensionOptions[hypertensionIndex].value,
      diabetes,
      hasCHD,
      hasStroke,
      hasCOPD,
      hasCancer,
      hasLiverCirrhosis,
      hasCKD,
      hasHeartFailure,
      familyCV,
      familyCancer
    };

    tt.navigateTo({url: '/pages/step3/step3'});
  }
});
