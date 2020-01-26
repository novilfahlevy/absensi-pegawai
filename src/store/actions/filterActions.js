export const storeJobs = jobs => {
  return dispatch => {
    dispatch({ type: 'STORE_JOBS', jobs });
  };
}

export const storeRoles = roles => {
  return dispatch => {
    dispatch({ type: 'STORE_ROLES', roles });
  };
}