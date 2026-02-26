import Axios from 'axios';

import { HTTPService } from './HTTP.service';

const axiosInstance = Axios.create();

export const APIService = new HTTPService({
  request: (path, method, body, params) => {
    return axiosInstance.request({
      method,
      url: path,
      data: body,
      params
    }).then((response) => response.data);
  }
}, 'http://localhost:3001');
