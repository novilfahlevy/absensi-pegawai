const initState = {
  isUserAuthenticated: false,
  user: {
    id: null,
    name: null,
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ3MjhjZjMxNzllM2UzZDdiNjYyN2JmNjNjZmIzNTlhMmQ5OWMzZGQ1YTAwYTQ1NmZjODA5YTMzODQ2YWQ2NWRmYmQxZGEwODdjNzgyNDdmIn0.eyJhdWQiOiIxIiwianRpIjoiNDcyOGNmMzE3OWUzZTNkN2I2NjI3YmY2M2NmYjM1OWEyZDk5YzNkZDVhMDBhNDU2ZmM4MDlhMzM4NDZhZDY1ZGZiZDFkYTA4N2M3ODI0N2YiLCJpYXQiOjE1Nzg5NzQzNjEsIm5iZiI6MTU3ODk3NDM2MSwiZXhwIjoxNjEwNTk2NzYxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dnSqV8zXkOOugFcmm5PWSM2JASZD5ocEvI7kh0YbJKZH8Tl2CjxvDf8rQT_R-ma743KIIRa0t6CnqieV46-RK3YUgqauH3XwVwRD1tSNabL4X7ZLc0i6IyE6_efiIfiAAGTwCBBasxgoPZCP7JGUW6vQnOw9zyry2C1I5AwBkZm23p7uPttS92xeae0rU6OY-YqXFSQIXm8OI1vu3ICM498qKdcI1o8UkwbWR4MIcwEk6ruiu80Yjc9XZrKvAHKWMrW4rAGtS--8ftNe_nX7Bfa_grEfgC24SnNj5AO83cHcq2fz6k4le5m2wytYvYOjZTiGQPlBM5X-_1nf8bJaTZggw9sCk9HT2RJVUWY0rrYs82ixyA6vpqWRHjiUZ59IXWaS63XqiJzBZNtYqpshdtVodmAUWpoMz7ltrSPc-SuR2FEDFpY4Nvr6hT3o2JtIYcga3oCGU1mGzDwxk9C3gvjUyKivHzw9A2D4k_f5nHW-ZMdQJ_XGQ3HPP9x8zql7nzhIIJYBiWHmuHTPl8RgnxUslD9UkzRBhzrxcD3Ml_pB8xvrBb83Y6SrEKDEFrN9WzYjEOcWrSp5wjKQTKTcD7TqyqYq5iq5JLOF5OtHc7z12WtfD9gl2T2cCOCzX0n6FLGjuEdQRFtAgpcwhcw1S4HqHnfC7BX5VeUxKM8gioE"
  },
  isLoginLoading: false,
  isLoginError: false,
  errorMessage: ''
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      state = {
        ...state,
        isUserAuthenticated: true,
        user: action.user,
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
    case 'LOGIN_LOADING_START':
      state = { ...state, isLoginLoading: true };
      break;
    case 'LOGOUT':
      state = {
        ...state,
        isUserAuthenticated: false,
        user: {},
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