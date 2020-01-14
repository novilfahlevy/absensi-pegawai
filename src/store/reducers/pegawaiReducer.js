import Swal from 'sweetalert2';
const state = {
    pegawai: []
}

const pegawaiReducer = (initState = state, action) => {
    switch (action.type) {
        case 'ADD_PEGAWAI_SUCCESS':
            Swal.fire(
                'Berhasil!',
                'Pegawai berhasil ditambahkan',
                'success'
            )
            console.log('tambah pegawai berhasil');
            return action.res;
        case 'ADD_PEGAWAI_ERROR':
            Swal.fire({
                icon: 'Gagal!',
                title: 'Oops...',
                text: 'Sesuatu terjadi! Coba sekali lagi...',
            })
            console.log('tambah pegawai gagal');
            return action.err;
        default:
            return state;
    }
}

export default pegawaiReducer