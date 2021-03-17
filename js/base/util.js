//https://zhuanlan.zhihu.com/p/200805837
function myrequest(options) {
  return new Promise((resolve, reject) => {
    // 逻辑：发送请求到服务器
    wx.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
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
export default myrequest;