/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Profile from "views/Profile.jsx";
import Absensi from 'views/absensi/Absensi.jsx';
import TambahAbsensi from 'views/absensi/TambahAbsensi.jsx';
import DetailAbsensi from 'views/absensi/DetailAbsensi.jsx';
import RiwayatAbsensi from 'views/absensi/RiwayatAbsensi.jsx';
import Login from 'views/auth/Login.jsx';
import Lembur from 'views/lembur/Lembur.jsx';
import PermintaanLembur from 'views/lembur/PermintaanLembur.jsx';
import PengajuanLembur from 'views/lembur/PengajuanLembur.jsx';
import Register from 'views/auth/Register.jsx';
import PegawaiIndex from 'views/pegawai/PegawaiIndex.jsx';
import PegawaiDetails from 'views/pegawai/PegawaiDetails.jsx';

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
    component: Index,
    layout: "/admin",
    isActive: true
  },
  {
    path: "/pegawai",
    name: "Pegawai",
    icon: "fas fa-user-tie",
    component: PegawaiIndex,
    layout: "/admin",
    isActive: true
  },
  {
    name: "Absensi",
    icon: "far fa-list-alt",
    subMenu: [
      {
        path: "/tambah-absensi",
        name: "Tambah Absensi",
        icon: "fas fa-plus",
        component: TambahAbsensi,
        layout: "/admin",
        isActive: true
      },
      {
        path: "/absensi",
        name: "Absensi Pegawai",
        icon: "fas fa-user-tie",
        component: Absensi,
        layout: "/admin",
        isActive: true
      },
      {
        path: "/riwayat-absensi",
        name: "Riwayat Absensi",
        icon: "fas fa-history",
        component: RiwayatAbsensi,
        layout: "/admin",
        isActive: true
      },
    ],
    isActive: true
  },
  {
    path: "/detail-pegawai/:id",
    name: "Detail Pegawai",
    icon: "fas fa-user-tie",
    component: PegawaiDetails,
    layout: "/admin",
    isActive: false
  },
  {
    path: "/detail-absensi",
    name: "Detail Absen Pegawai",
    icon: "",
    component: DetailAbsensi,
    layout: "/admin",
    isActive: false
  },
  {
    name: "Lembur",
    icon: "fas fa-moon",
    subMenu: [
      {
        path: "/pengajuan-lembur",
        name: "Pengajuan Lembur",
        icon: "fas fa-plus",
        component: PengajuanLembur,
        layout: "/admin",
        isActive: true
      },
      {
        path: "/lembur",
        name: "Daftar Lembur",
        icon: "fas fa-list-alt",
        component: Lembur,
        layout: "/admin",
        isActive: true
      },
      {
        path: "/permintaan-lembur",
        name: "Permintaan Lembur",
        icon: "fas fa-check",
        component: PermintaanLembur,
        layout: "/admin",
        isActive: true
      },
    ],
    isActive: true
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "fas fa-user",
    component: Profile,
    layout: "/admin",
    isActive: true
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    isActive: false
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    isActive: false
  }
];
export default routes;
