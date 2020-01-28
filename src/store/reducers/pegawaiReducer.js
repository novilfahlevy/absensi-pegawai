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
            // if ( action.err.response.status === 422 ) {
            //     Swal.fire(
            //         'Gagal!',
            //         'Email sudah digunakan, coba dengan email lain.',
            //         'error'
            //     );
            //     return action.err;
            // };

            Swal.fire(
                'Gagal!',
                'Pegawai gagal ditambahkan! Coba sekali lagi!',
                'error'
            )
            return action.err;
        default:
            return state;
    }
}

export default pegawaiReducer