Page({
  data: {},
  
  onLoad() {
    console.log('首页加载');
  },
  
  startTest() {
    tt.navigateTo({
      url: '/pages/step1/step1'
    });
  }
});
