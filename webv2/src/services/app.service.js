import axios from 'axios';

class AppService {
  getTestContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}`);
  }

  async updateUser(field, value, userID) {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}` + "user/update", {
        field, 
        value
      },{
        params:{
          userID: userID
        }
      });
  }
}

export default AppService = new AppService();
