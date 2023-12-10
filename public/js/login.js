import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/users/login',
      data: { email, password },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfully');

      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    console.log(res);
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      url: 'http://localhost:8000/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (error) {
    showAlert('error', 'Error loggin out! try again');
  }
};
