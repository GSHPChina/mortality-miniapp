const app = getApp();

Page({
  data: {
    age: 30,
    sex: 'male',
    marriage: 'married',
    educationIndex: 3,
    incomeIndex: 3,
    occupationIndex: 0,
    educationOptions: [
      {value: 'none', label: '未受过教育'},
      {value: 'primary', label: '小学'},
      {value: 'low', label: '初中'},
      {value: 'medium', label: '高中/中专'},
      {value: 'high', label: '大专/本科'},
      {value: 'postgrad', label: '硕士及以上'}
    ],
    incomeOptions: [
      {value: 'poverty', label: '≤3万'},
      {value: 'low', label: '3-8万'},
      {value: 'medium_low', label: '8-15万'},
      {value: 'medium', label: '15-30万'},
      {value: 'medium_high', label: '30-50万'},
      {value: 'high', label: '50-100万'},
      {value: 'very_high', label: '>100万'}
    ],
    occupationOptions: [
      {value: 'office', label: '办公室/白领'},
      {value: 'teacher', label: '教育/科研'},
      {value: 'service', label: '服务业'},
      {value: 'healthcare', label: '医疗卫生'},
      {value: 'construction', label: '建筑/采矿'},
      {value: 'agriculture', label: '农业/林业'},
      {value: 'transport', label: '运输/物流'},
      {value: 'factory', label: '工厂/制造'},
      {value: 'it', label: 'IT/互联网'},
      {value: 'finance', label: '金融/商务'},
      {value: 'retired', label: '退休'},
      {value: 'student', label: '学生'},
      {value: 'unemployed', label: '无业'}
    ]
  },

  onLoad() {
    const formData = app.globalData.formData || {};
    if (formData.age) {
      this.setData({
        age: formData.age,
        sex: formData.sex || 'male',
        marriage: formData.marriage || 'married'
      });
    }
  },

  onAgeInput(e) {
    this.setData({age: parseInt(e.detail.value) || 0});
  },

  onSexChange(e) {
    this.setData({sex: e.currentTarget.dataset.value});
  },

  onMarriageChange(e) {
    this.setData({marriage: e.currentTarget.dataset.value});
  },

  onEducationChange(e) {
    this.setData({educationIndex: e.detail.value});
  },

  onIncomeChange(e) {
    this.setData({incomeIndex: e.detail.value});
  },

  onOccupationChange(e) {
    this.setData({occupationIndex: e.detail.value});
  },

  nextStep() {
    const {age, sex, marriage, educationIndex, incomeIndex, occupationIndex, educationOptions, incomeOptions, occupationOptions} = this.data;
    
    if (age < 1 || age > 120) {
      tt.showToast({title: '请输入有效年龄', icon: 'none'});
      return;
    }

    app.globalData.formData = {
      ...app.globalData.formData,
      age,
      sex,
      marriage,
      education: educationOptions[educationIndex].value,
      income: incomeOptions[incomeIndex].value,
      occupation: occupationOptions[occupationIndex].value
    };

    tt.navigateTo({url: '/pages/step2/step2'});
  }
});
