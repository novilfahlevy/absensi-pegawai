import API from './../api.js';

export const changeProfile = (data, success, error) => {
    return (dispatch, getState) => {
        let sendData = new FormData();
        sendData.append('profile', data.profile)
        sendData.append('user_id', data.user_id);
        API().post('user/edit', sendData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                dispatch({ type: 'CHANGE_PROFILE_SUCCESS', res });
                success();
            })
            .catch(err => {
                dispatch({ type: 'CHANGE_PROFILE_ERROR', err });
                error();
            });
    }
}
