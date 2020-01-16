import API from './../api.js';

export const changeProfile = data => {
    return (dispatch, getState) => {
        API.put('user/edit', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => dispatch({ type: 'CHANGE_PROFILE_SUCCESS', res }))
            .catch(err => console.log(err.response.data, data))
    }
}
