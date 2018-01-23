import axios from 'axios';
// const API_KEY='upXnRcDqiUara6f-mvh5-g11781';
const API_URL ='https://api.getAddress.io/find';
const API_KEY = 'GfqxpGMHb0qj9N2vHR8lxg11878';

const httpService = {

  getAddressData(query) {
    return axios.get(`${API_URL}/${query}?api-key=${API_KEY}`)
      .then(response => response, {})
      .catch(err => err)
  }
}

export default httpService
