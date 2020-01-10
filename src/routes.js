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
import Login from 'views/auth/Login.jsx';
import Register from 'views/auth/Register.jsx';
import PegawaiIndex from './views/pegawai/PegawaiIndex.jsx';
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
    path: "/absensi",
    name: "Absensi",
    icon: "far fa-list-alt",
    component: Index,
    layout: "/admin",
    isActive: true
  },
  {
    path: "/lembur",
    name: "Lembur",
    icon: "fas fa-moon",
    component: Index,
    layout: "/admin",
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
