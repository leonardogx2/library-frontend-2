import axios from 'axios';

let user = {
  name: '',
  token: '',
  email: '',
};

const stringUser = localStorage.getItem('user');
if (stringUser && stringUser !== '') {
  user = JSON.parse(stringUser);
}

export const axiosFetch = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: 'Bearer ' + user.token,
  },
});
