//https://zhuanlan.zhihu.com/p/200805837
function request(options) {
  return new Promise((resolve, reject) => {
    // 逻辑：发送请求到服务器
    //console.log(options.data)
    wx.request({
      url: options.url,
      method: options.method || "GET",
      data:  {data: JSON.stringify(options.data) || "{}"},
      header: options.header || {'Content-Type': 'application/json;charset=UTF-8'},
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
// 暴露给外界
export default request;