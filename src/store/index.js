import Vue from "vue";
import Vuex from "vuex";
import register from './register'
import login from './login'
import posts from './posts'


const storeObject = {
    modules: {
        register,
        login,
        posts

    }
}

Vue.use(Vuex)
export default new Vuex.Store(storeObject)