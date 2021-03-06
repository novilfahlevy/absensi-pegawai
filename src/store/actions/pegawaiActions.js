import API from './../api.js';

export const addPegawai = (pegawai, success, error) => {
    return (dispatch, getState) => {
        API().post(`user/store`, pegawai)
            .then(res => {
                if ( res.data.status === 422 ) {
                    dispatch({ type: 'ADD_PEGAWAI_ERROR', err: res.data.message });
                } else {
                    dispatch({ type: 'ADD_PEGAWAI_SUCCESS', res });
                }
                success();
            })
            .catch(err => {
                dispatch({ type: 'ADD_PEGAWAI_ERROR', err });
            });
    }
}

export const editPegawai = (pegawai, success, error) => {
    return (dispatch, getState) => {
        
    }
}

export const hapusPegawai = id => {
    return (dispatch, getState) => {
        alert(id);
    }
}