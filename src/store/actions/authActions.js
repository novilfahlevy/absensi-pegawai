import API from 'store/api.js';

export const login = ({ email, password }, push) => {
  return dispatch => {
    dispatch({ type: 'LOGIN_LOADING_START' });

    API.post('/auth/login', {
      email, password
    })
    .then(response => {
      if( response.status === 200 ) {
        dispatch({ 
          type: "LOGIN_SUCCESS",
          user: response.data.message
        });
        push('/admin/index');
      }
    })
  };
}

export const logout = () => {
  return dispatch => {
    // Logout logic
  };
}