import {
  AxiosRequestConfig
} from 'axios';
import {HomeAPI as API} from 'utils/request';

const getlist = async (config: AxiosRequestConfig): Promise<any> => API && API.get('/list', {...config})

const home: {
  getlist: Function
} = {
  getlist
}

export default home