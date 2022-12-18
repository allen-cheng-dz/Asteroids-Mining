import axios from 'axios';
import { message } from 'antd'

const instance = axios.create({
  baseURL: 'https://asteroids.dev.mediasia.cn',
  timeout: 5000
})

instance.interceptors.response.use(
  function (response){
    if(response.status === 200) return response.data;
    else
      message.error(response.statusText)
  },
  function(error) {
    console.log('error-response', error.response);
    console.log('error-config', error.config);
    console.log('error-request', error.request);

    message.error(error?.response?.data?.message || 'Server Error');
    return Promise.reject(error);
  }
)

export default instance;