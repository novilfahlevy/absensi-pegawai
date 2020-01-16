const initState = {
  user: {
    id: null,
    name: null
  },
  isLoginLoading: false,
  isLoginError: false,
  errorMessage: ''
};

export default (state = initState, action) => {
  switch ( action.type ) {
    case 'STORE_USER_DATA' :
      state = { 
        ...state,
        user: action.user
      };
      break;

    case 'LOGIN_SUCCESS' :
      state = { 
        ...state,
        isLoginLoading: false,
        isLoginError: false,
        errorMessage: ''
      };
      break;
    case 'LOGIN_FAILED':
      state = {
        ...state,
        isLoginError: true,
        errorMessage: action.errorMessage,
        isLoginLoading: false
      };
      break;
    case 'LOGIN_LOADING' :
      state = { ...state, isLoginLoading: true };
      break;
    case 'LOGOUT' :
      state = { 
        ...state, 
        isLoginLoading: false,
        isLoginError: false,
        errorMessage: ''
      };
      break;
    default:
      return state;
  }

  return state;
}