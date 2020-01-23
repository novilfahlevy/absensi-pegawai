export default (data = '') => {
  if ( localStorage.getItem('auth') ) {
    return JSON.parse(atob(localStorage.getItem('auth')))[data] || null;
  }
  return null
}