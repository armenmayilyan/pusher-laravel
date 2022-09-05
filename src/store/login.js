import axios from "axios";

const store = ({
    state: {
        user: {}
    },
    getters: {
        user: state => state.user,
    },

    mutations: {
        SET_USER(state, data) {
            state.user = data.user
        },
        REMOVE_AUTH(state) {
            state.user = {}
        }
    },
    actions: {
        login(store, data) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', data).then(response => {
                    localStorage.setItem('auth_token', response.data.token)
                    store.commit('SET_USER', response.data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAuth(context) {
            axios.get('api/auth/user')
                .then((res) => {
                    context.commit('SET_USER', res.data)
                    console.log(context.commit('SET_USER', res))
                })
        },
        async removeAuth(context) {
            try {
                context.commit('REMOVE_AUTH')
                localStorage.removeItem('auth_token')
                return {'success': 1}
            } catch (error) {
                console.log(error)
            }
        }

    },


    namespaced: true
})
export default store