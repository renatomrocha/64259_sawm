import axios from 'axios';
import apis from '../APIs.json';

class BackendService {
  constructor() {}

  loginUser(userInfo) {
    let reqAddr = apis.myBackend.api + 'users/login';
    console.log(reqAddr);
    return axios.post(reqAddr, userInfo);
  }

  authenticateUser(userInfo) {
    let reqAddr = apis.myBackend.api + 'auth/login';

    return axios.post(
      reqAddr,
      {},
      {
        auth: {
          username: userInfo.username,
          password: userInfo.password,
        },
      },
    );
  }

  getUserProfile(bearerToken) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + bearerToken,
      },
    };
    console.log('Recebi bearer no pedido: ', bearerToken);
    let reqAddr = apis.myBackend.api + 'user/profile';
    return axios.get(reqAddr, config);
  }

  async getAllExchanges() {
    let reqAddr = apis.myBackend.api + 'exchanges';
    console.log('Get exchanges: ', reqAddr);
    return axios.get(reqAddr);
  }

  async getExchangesForUser(bearerToken) {
    let reqAddr = apis.myBackend.api + 'exchanges/connections';
    let config = {
      headers: {
        Authorization: 'Bearer ' + bearerToken,
      },
    };
    console.log('Vou pedir: ', reqAddr);
    return axios.get(reqAddr, config);
  }

  async connectToExchange(bearerToken, info) {
    let reqAddr = apis.myBackend.api + 'exchanges/connect';
    let config = {
      headers: {
        Authorization: 'Bearer ' + bearerToken,
      },
    };
    return axios.put(reqAddr, info, config);
  }

  async removeExchangeConnection(userId, connectionId) {
    let reqAddr =
      apis.myBackend.api +
      'users/' +
      userId +
      '/removeConnection/' +
      connectionId;
    console.log('Request: ', reqAddr);
    return axios.delete(reqAddr);
  }
}

export default BackendService;
