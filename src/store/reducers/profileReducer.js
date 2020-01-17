import Swal from 'sweetalert2';
const state = {
    profile: []
}
const profileReducer = (initState = state, action) => {
    switch (action.type) {
        case 'CHANGE_PROFILE_SUCCESS':
            Swal.fire(
                'Berhasil!',
                'Gambar profile berhasil diubah',
                'success'
            )
            console.log('tambah pegawai berhasil', action.res);
            return action.res;
        case 'CHANGE_PROFILE_ERROR':
            Swal.fire(
                'Gagal!',
                'Gambar profile gagal diubah! Coba sekali lagi..',
                'error'
            )
            console.log('tambah pegawai gagal');
            return action.err;
        default:
            return state;
    }
}

export default profileReducer;