module.exports = {
  requestFail(error) {
    console.error(`${error.code}: ${error.message}`);
  },
  verifyFail() {
    alert('参数验证失败！');
  },
};
