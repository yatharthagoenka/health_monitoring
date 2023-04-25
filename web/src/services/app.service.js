import axios from 'axios';
import authHeader from './auth-header';

class AppService {
  getTestContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}`);
  }
}

export default new AppService();
