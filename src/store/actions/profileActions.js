import API from './../api.js';

export const changeProfile = (data) => {
    return (dispatch, getState) => {
        let sendData = new FormData();
        sendData.append('profile', data.file)
        sendData.append('user_id', data.user_id);
        console.log(data.file);
        API.put('user/edit', sendData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => dispatch({ type: 'CHANGE_PROFILE_SUCCESS', res }))
            .catch(err => console.log(err.response.data, sendData.values()))
    }
}
