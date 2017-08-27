import axios from 'axios';
import LoadingBar from 'iview/src/components/loading-bar';
import Message from 'iview/src/components/message';

function validateStatus(status) {
  return status >= 200 && status < 300; // default
}

const fetch = axios.create({
  validateStatus,
  withCredentials: false,
});

fetch.interceptors.request.use((config) => {
  LoadingBar.start();
  return config;
}, (error) => {
  LoadingBar.error();
  if (error.request) {
    Message.error(error.request);
  } else {
    Message.error(error.message);
  }
});

fetch.interceptors.response.use((response) => {
  LoadingBar.finish();
  return response;
}, (error) => {
  LoadingBar.error();
  if (error.response) {
    Message.error(`${error.response.status} ${error.response.statusText}`);
  } else if (error.message) {
    Message.error(error.message);
  }
});

export default fetch;
