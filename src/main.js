import Vue from 'vue'
import App from './App.vue'
import {router} from "./route"
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from "vue-router";
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import axios from "axios";
import VueAxios from 'vue-axios'


axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token')



router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middlweare = to.meta.middleware

    const context = {
        to,
        from,
        next,
    }
    return middlweare[0]({
        ...context
    })
})


import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '63a4791d664b24745388',
    cluster: 'ap2',
    forceTLS: true
});


Window.store = store
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(IconsPlugin)
Vue.use(store)
Vue.config.productionTip = false
Vue.use(Vuex)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
