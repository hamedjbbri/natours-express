import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  console.log('before');

  try {
    console.log('after');
    const url =
      type === 'password'
        ? 'http://localhost:8000/api/v1/users/updateMyPassword'
        : 'http://localhost:8000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()}  updated successfully`);
    }
  } catch (error) {
    showAlert('error', 'error.response.data.message');
  }
};
