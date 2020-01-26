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
import React from 'react';
import Profile from "views/Profile.jsx";
import Absensi from 'views/absensi/Absensi.jsx';
import DetailAbsensi from 'views/absensi/DetailAbsensi.jsx';
import Login from 'views/auth/Login.jsx';
import Lembur from 'views/lembur/Lembur.jsx';
import Register from 'views/auth/Register.jsx';
import Dashboard from 'views/dashboard/Dashboard.jsx'
import JamKerja from 'views/jam-kerja/JamKerja.jsx';
import PegawaiIndex from 'views/pegawai/PegawaiIndex.jsx';
import PegawaiDetails from 'views/pegawai/PegawaiDetails.jsx';
import LaporanPegawai from 'views/pegawai/LaporanPegawai.jsx';
import ProjectManager from 'views/pm/ProjectManager.jsx';
import TambahAnggota from 'views/pm/TambahAnggota.jsx';
import DetailLembur from 'views/lembur/DetailLembur.jsx';
import RiwayatLembur from 'views/lembur/RiwayatLembur.jsx';
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt text-primary",
    component: props => <Dashboard {...props} />,
    layout: "/admin",
    isActive: true,
    roles: ['admin']
  },
  {
    path: "/pegawai",
    name: "Pegawai",
    icon: "fas fa-user-tie text-danger",
    component: props => <PegawaiIndex {...props} />,
    layout: "/admin",
    isActive: true,
    roles: ['admin']
  },
  {
    path: "/absensi",
    name: "Absensi",
    icon: "fas fa-list-alt text-red",
    component: Absensi,
    layout: "/admin",
    isActive: true,
    roles: ['admin']
  },
  {
    path: "/detail-pegawai/:id",
    name: "Detail Pegawai",
    icon: "fas fa-user-tie",
    component: PegawaiDetails,
    layout: "/admin",
    isActive: false,
    roles: ['admin']
  }, {
    path: "/laporan-pegawai",
    name: "Laporan Pegawai",
    icon: "",
    component: LaporanPegawai,
    layout: "/admin",
    isActive: false,
    roles: ['admin']
  },
  {
    path: "/detail-absensi/:id",
    name: "Detail Absen Pegawai",
    icon: "",
    component: DetailAbsensi,
    layout: "/admin",
    isActive: false,
    roles: ['admin']
  },
  {
    path: "/lembur",
    name: "Lembur",
    icon: "fas fa-moon text-purple",
    component: Lembur,
    layout: "/admin",
    isActive: true,
    roles: ['admin']
  },
  {
    path: "/detail-lembur/:id",
    name: "Detail Lembur",
    icon: "fas fa-moon text-purple",
    component: DetailLembur,
    layout: "/admin",
    isActive: false,
    roles: ['admin', 'project manager']
  },
  {
    path: "/riwayat-lembur",
    name: "Riwayat Lembur",
    icon: "fas fa-moon text-purple",
    component: RiwayatLembur,
    layout: "/admin",
    isActive: false,
    roles: ['admin', 'project manager']
  },
  {
    path: "/jam-kerja",
    name: "Jam Kerja",
    icon: "fas fa-clock text-yellow",
    component: JamKerja,
    layout: "/admin",
    isActive: true,
    roles: ['admin']
  },
  {
    path: "/project-manager",
    name: "Anggota",
    icon: "fas fa-user-tie text-green",
    component: ProjectManager,
    layout: "/admin",
    isActive: true,
    roles: ['project manager']
  },
  {
    path: "/lembur",
    name: "Lembur",
    icon: "fas fa-moon text-purple",
    component: Lembur,
    layout: "/admin",
    isActive: true,
    roles: ['project manager']
  },
  {
    path: "/tambah-anggota",
    name: "Tambah Anggota",
    // icon: "fas fa-user-tie text-green",
    component: TambahAnggota,
    layout: "/admin",
    isActive: false,
    roles: ['project manager']
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "fas fa-user text-blue",
    component: Profile,
    layout: "/admin",
    isActive: true,
    roles: ['admin', 'project manager']
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: props => <Login {...props} />,
    layout: "/auth",
    isActive: false,
    roles: ['admin']
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    isActive: false,
    roles: ['admin']
  }
];
export default routes;
