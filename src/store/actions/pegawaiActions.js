import API from './../api.js';

export const addPegawai = (pegawai, successCallback = () => {}, errorCallback = () => {}) => {
    return (dispatch, getState) => {
        API().post(`user/store`, pegawai)
            .then(res => {
                dispatch({ type: 'ADD_PEGAWAI_SUCCESS', res });
                successCallback();
            })
            .catch(err => {
                dispatch({ type: 'ADD_PEGAWAI_ERROR', err });
                errorCallback(err);
            });
    }
}

export const editPegawai = (pegawai, successCallback = () => {}, errorCallback = () => {}) => {
    return (dispatch, getState) => {
        alert(pegawai.name);
    }
}

export const hapusPegawai = (pegawai, successCallback = () => {}, errorCallback = () => {}) => {
    return (dispatch, getState) => {
        
    }
}