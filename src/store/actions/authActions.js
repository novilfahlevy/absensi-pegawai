import api from 'store/api.js';
import Swal from 'sweetalert2';
import routes from 'routes.js';
import user from 'user.js';

export const login = ({ keyword, password }, push) => {
  return dispatch => {
    dispatch({ type: 'LOGIN_LOADING' });

    api().post('/auth/login', { keyword, password })
    .then(response => {
      if ( response.data.status === 200 ) {
        localStorage.setItem('auth', btoa(JSON.stringify(response.data.data)));
        routes.forEach(prop => {
          if ( prop.homepageFor === user('role').toLowerCase() ) {
            dispatch({ type: 'LOGIN_SUCCESS' });
            push(`/admin${prop.path}`);
          }
        });
      }
      else {
        dispatch({ type: 'LOGIN_FAILED', errorMessage: response.data.message });
      }
    })
    .catch(error => {
      if ( error.message === 'Network Error' ) {
        dispatch({ type: 'LOGIN_FAILED', errorMessage: 'Tidak ada koneksi.' });
      }
      else {
        dispatch({ type: 'LOGIN_FAILED', errorMessage: error.message });
      }
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
        localStorage.removeItem('auth');
        dispatch({ type: 'LOGOUT' });
        push('/auth/login');
      }
    })
  };
}

export const sudoLogout = push => {
  return dispatch => {
    localStorage.removeItem('auth');
    dispatch({ type: 'LOGOUT' });
    push('/auth/login');
  }
}

export const storeUserData = data => {
  return dispatch => {
    dispatch({ type: 'STORE_USER_DATA', user: JSON.parse(atob(data)) });
  }
}