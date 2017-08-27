import axios from 'axios';

const { requestFail } = require('../config/notify');
const HTTP_ERROR = require('./httpError');
const CUSTOM_ERROR = require('./customError');


// const CancelToken = axios.CancelToken;

function validateStatus(status) {
  return status >= 200 && status < 300; // default
}

const http = axios.create({
  validateStatus,
  timeout: 2500,
  withCredentials: false,
  // cancelToken: CancelToken.source,
});

// http.prototype.cancel = CancelToken.cancel;

http.interceptors.request.use(config => config, (error) => {
  if (error.request) {
    requestFail({ code: error.request.status, message: HTTP_ERROR[error.request.status] });
  } else {
    requestFail({ code: error.status, message: HTTP_ERROR[error.status] });
  }
  // return Promise.reject(error);
});

http.interceptors.response.use((response) => {
  if (validateStatus(response.data.statusCode)) {
    response.data = response.data.data;
    return Promise.resolve(response);
  }
  requestFail({
    code: response.data.statusCode,
    message: CUSTOM_ERROR[response.data.statusCode],
  });
  // return Promise.reject(error);
}, (error) => {
  if (error.response) {
    requestFail({
      code: error.response.status,
      message: CUSTOM_ERROR[error.response.status],
    });
  } else {
    requestFail({ code: error.status, message: CUSTOM_ERROR[error.status] });
  }
  // return Promise.reject(error);
});

module.exports = http;
