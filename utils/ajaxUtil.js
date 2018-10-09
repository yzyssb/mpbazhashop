// request请求的封装
const urlConfig = require('./urlConfig.js');

var app = getApp();
module.exports = {
    postJson: function(url, data) {
        let _this=this;
        var params = data;
        params.token = wx.getStorageSync('token');
        //返回一个promise实例
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: params,
                method: 'POST',
                header: {
                    'content-type': "application/x-www-form-urlencoded"
                },
                success: function(res) {
                  console.log(res)
                    if (res.data.errorNo == '1006') {
                        wx.showToast({
                            title: res.data.errorMsg || '',
                            icon: 'none',
                            duration: 2000
                        })
                    } else if (res.data.errorNo == '1007') {
                        _this.loginInfo()
                    }else{
                      
                    }
                    resolve(res ? res.data : res)
                },
                fail: function(res) {
                    // console.log(res)
                    reject(res ? res.data : res);
                },
                complete: function(res) {
                    // console.log(res)
                }
            })
        })
    },
    getJson: function(url, data) {
        //返回一个promise实例
        let _this=this;
        var params = data;
        params.token = wx.getStorageSync('token');
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: params,
                method: 'GET',
                success: function(res) {
                    if (res.data.errorNo == '1006') {
                        wx.showToast({
                            title: res.data.errorMsg || '',
                            icon: 'none',
                            duration: 2000
                        })
                    } else if (res.data.errorNo == '1007') {
                        _this.loginInfo()
                        return
                    }
                    resolve(res ? res.data : res)
                },
                fail: function(res) {
                    reject(res ? res.data : res);
                },
                complete: function() {}
            })
        })
    },
    //上传图片的方法
    upload_file: function(url, filePath, data, name) {
        var params = data;
        params.token = wx.getStorageSync('token');
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: url,
                filePath: filePath,
                formData: params, // HTTP 请求中其他额外的 form data        
                name: name, // 图片参数Key
                header: { 'content-type': "application/x-www-form-urlencoded" },
                success: function(res) {
                    resolve(res ? res.data : res)

                },
                fail: (res) => {
                    reject(res ? res.data : res)
                },
                complete: function() {}
            })
        })
    }
}