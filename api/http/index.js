import axios from 'axios';

const { verifyFail, requestFail } = require('../config/notify');
const HTTP_ERROR = require('./httpError');
const CUSTOM_ERROR = require('./customError');


// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

function validateStatus(status) {
  return status >= 200 && status < 300;
}

const http = axios.create({
  validateStatus,
  timeout: 2500,
  withCredentials: true,
  // cancelToken: source.token,
});

http.verifyFail = verifyFail;
http.requestFail = requestFail;

// http.prototype.cancel = CancelToken.cancel;

http.interceptors.request.use(config => config, (error) => {
  if (error.request) {
    requestFail({ code: error.request.status, message: HTTP_ERROR[error.request.status] });
  } else {
    requestFail({ code: error.status, message: HTTP_ERROR[error.status] });
  }
});

// eslint-disable-next-line
http.interceptors.response.use((response) => {
  if (validateStatus(response.data.statusCode)) {
    response.data = response.data.data;
    return Promise.resolve(response);
  }
  requestFail({
    code: response.data.statusCode,
    message: CUSTOM_ERROR[response.data.statusCode],
  });
}, (error) => {
  if (error.response) {
    requestFail({
      code: error.response.status,
      message: CUSTOM_ERROR[error.response.status],
    });
  } else {
    requestFail({ code: error.status, message: CUSTOM_ERROR[error.status] });
  }
});

module.exports = http;
