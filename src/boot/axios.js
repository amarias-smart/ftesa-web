import Vue from "vue";
import axios from "axios";

const PROD = location.origin + "/ft-esa/";

if (process.env.PROD) axios.defaults.baseURL = PROD;
// axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;
