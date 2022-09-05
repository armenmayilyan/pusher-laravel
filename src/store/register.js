import axios from "axios";

const store = ({
    state: {
        state: {
            success: 0
        },
    },
    mutations: {
        SET_SUCCESS(state, data) {
            state.success = data.success
        }
    },
    getters: {},

    actions: {
        async register(context, data) {
            console.log(context)
            let response = await axios.post('api/register', data)
            context.commit('SET_SUCCESS', response.data)
            console.log(context.commit('SET_SUCCESS', response.data))
            return response.data;
        }
    },

})

export default store
