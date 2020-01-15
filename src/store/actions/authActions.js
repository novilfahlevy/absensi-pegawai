import API from 'store/api.js';
import Swal from 'sweetalert2';

export const login = ({ email, password }, push) => {
  return dispatch => {
    dispatch({ type: 'LOGIN_LOADING' });

    API.post('/auth/login', { email, password })
    .then(response => {
      if ( response.data.status === 200 ) {
        dispatch({ type: 'LOGIN_SUCCESS', user: response.data.message });
        localStorage.setItem('auth', 1);
        push('/admin/index');
      }
      else {
        dispatch({ type: 'LOGIN_FAILED', errorMessage: response.data.message });
      }
    })
    .catch(error => {
      dispatch({ type: 'LOGIN_FAILED', errorMessage: error.message });
    });
  };
}

export const logout = push => {
  return dispatch => {
    Swal.fire({
      title: 'Apakah anda ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Gak jadi!',
      reverseButton: true
    }).then((result) => {
      if (result.value) {
        localStorage.setItem('auth', 0);
        dispatch({ type: 'LOGOUT' });
        push('/auth/login');
      }
    })
  };
}