import axios from 'axios';

class AppService {
  getTestContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}`);
  }
}

export default AppService = new AppService();
