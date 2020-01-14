import API from 'store/api.js';

export const login = ({ email, password }, push) => {
  return dispatch => {
    dispatch({ type: 'LOGIN_LOADING' });

    API.post('/auth/login', { email, password })
    .then(response => {
      console.log(response);
      if ( response.data.status === 200 ) {
        dispatch({ type: 'LOGIN_SUCCESS', user: response.data.message });
        localStorage.setItem('isUserAuthenticated', 1);
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

export const logout = () => {
  return dispatch => {
    // Logout logic
  };
}