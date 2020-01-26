const initState = {
  jobs: [],
  roles: []
};

export default (state = initState, actions) => {
  switch ( actions.type ) {
    case 'STORE_JOBS' :
      state = { ...state, jobs: actions.jobs };
      break;
    case 'STORE_ROLES' :
      state = { ...state, roles: actions.roles };
      break;
    default :
      return state;
  }
  return state;
};