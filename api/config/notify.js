module.exports = {
  requestFail(error) {
    console.error(`${error.code}: ${error.message}`);
  },
};
