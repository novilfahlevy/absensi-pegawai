import API from './../api.js';

export const addPegawai = (pegawai, success, error) => {
    return (dispatch, getState) => {
        API().post(`user/store`, pegawai)
            .then(res => {
                dispatch({ type: 'ADD_PEGAWAI_SUCCESS', res });
                success();
            })
            .catch(err => {
                dispatch({ type: 'ADD_PEGAWAI_ERROR', err });
                error(err);
            });
    }
}

export const editPegawai = (pegawai, success, error) => {
    return (dispatch, getState) => {
        alert(pegawai.name);
    }
}

export const hapusPegawai = id => {
    return (dispatch, getState) => {
        alert(id);
    }
}