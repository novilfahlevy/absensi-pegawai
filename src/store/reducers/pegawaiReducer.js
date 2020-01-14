import Swal from 'sweetalert2';
const state = {
    pegawai: []
}

const pegawaiReducer = (initState = state, action) => {
    switch (action.type) {
        case 'ADD_PEGAWAI_SUCCESS':
            console.log('tambah pegawai berhasil');
            return action.res;
        case 'ADD_PEGAWAI_ERROR':
            console.log('tambah pegawai gagal');
            return action.err;
        default:
            return state;
    }
}

export default pegawaiReducer