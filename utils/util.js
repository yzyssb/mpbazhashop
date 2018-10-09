var app = getApp();
module.exports = {
  unique: function (array) {//数组去重
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
      for (var j = i + 1; j < l; j++)
        if (array[i] === array[j]) j = ++i;
      r.push(array[i]);
    }
    return r;
  },
  toFix: function (value) {
    var val = parseFloat(value)
    return val.toFixed(1)  //此处2为保留两位小数
  },

  // 验证手机号是否有误  
  isPhoneAvailable: function (phone) { 
    var myreg = /^[1][1-9][0-9]{9}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  },

  navTo: function (obj) {
    //次方法 防止用户的暴力点击  快速点击多次   多次进入同一页面
    var app = getApp();
    if (app.isClicked) {
      return;
    }
    app.isClicked = true;
    wx.navigateTo({
      url: obj.url,
      success: typeof (obj.success) === 'function' ? obj.success : function () { },
      fail: typeof (obj.fail) === 'function' ? obj.fail : function () { },
      complete: function (res) {
        setTimeout(function () {
          app.isClicked = false;
        }, 1000);
        if (typeof (obj.complete) === 'function') {
          obj.complete()
        }
      },
    });
  },/*获取当前页带参数的url*/
  getCurrentPageUrlWithArgs:function (){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
},
  /*获取当前页url*/
  getCurrentPageUrl: function (){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}
}