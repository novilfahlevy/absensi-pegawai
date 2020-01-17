import API from './../api.js';

export const addPegawai = (pegawai) => {
    return (dispatch, getState) => {
        API().post(`user/store`, pegawai)
            .then(res => dispatch({ type: 'ADD_PEGAWAI_SUCCESS', res }))
            .catch(err => dispatch({ type: 'ADD_PEGAWAI_ERROR', err }))
    }
}