const app = getApp();

Page({
  data: {
    smoke: 'never',
    cigarettes: 0,
    alcohol: 'none',
    exercise: 120,
    height: 170,
    weight: 65,
    sleep: 7,
    bmi: 0,
    bmiCategory: ''
  },

  onLoad() {
    const formData = app.globalData.formData || {};
    this.setData({
      smoke: formData.smoke || 'never',
      cigarettes: formData.cigarettes || 0,
      alcohol: formData.alcohol || 'none',
      exercise: formData.exercise || 120,
      height: formData.height || 170,
      weight: formData.weight || 65,
      sleep: formData.sleep || 7
    });
    this.calculateBMI();
  },

  onSmokeChange(e) {
    this.setData({smoke: e.currentTarget.dataset.value});
  },

  onCigarettesInput(e) {
    this.setData({cigarettes: parseInt(e.detail.value) || 0});
  },

  onAlcoholChange(e) {
    this.setData({alcohol: e.currentTarget.dataset.value});
  },

  onExerciseInput(e) {
    this.setData({exercise: parseInt(e.detail.value) || 0});
  },

  onHeightInput(e) {
    this.setData({height: parseInt(e.detail.value) || 0});
    this.calculateBMI();
  },

  onWeightInput(e) {
    this.setData({weight: parseInt(e.detail.value) || 0});
    this.calculateBMI();
  },

  onSleepInput(e) {
    this.setData({sleep: parseFloat(e.detail.value) || 0});
  },

  calculateBMI() {
    const {height, weight} = this.data;
    if (height > 0 && weight > 0) {
      const h = height / 100;
      const bmi = (weight / (h * h)).toFixed(1);
      let category = '';
      if (bmi < 18.5) category = '偏瘦';
      else if (bmi < 24) category = '正常';
      else if (bmi < 28) category = '超重';
      else if (bmi < 32) category = '肥胖';
      else category = '重度肥胖';
      this.setData({bmi, bmiCategory: category});
    }
  },

  prevStep() {
    tt.navigateBack();
  },

  nextStep() {
    const {smoke, cigarettes, alcohol, exercise, height, weight, sleep} = this.data;
    
    app.globalData.formData = {
      ...app.globalData.formData,
      smoke,
      cigarettes,
      alcohol,
      exercise,
      height,
      weight,
      sleep
    };

    tt.navigateTo({url: '/pages/step4/step4'});
  }
});
