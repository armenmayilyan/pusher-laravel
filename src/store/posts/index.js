import axios from "axios";

const store = ({
    state: {
        posts: [],
        post: {}
    },
    getters: {
        posts: state => state.posts,
        post: state => state.post,
    },

    mutations: {
        SET_POSTS(state, data) {
            state.posts = data
        },
        SET_POST(state, data) {
            state.post = data
        },
    },
    actions: {
        getPost({commit}, id){
            return new Promise((resolve, reject) => {
                axios.get('/api/posts/'+id).then(response => {
                    commit('SET_POST', response.data.post)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })

        },
        deletePost({commit}, id){
            return new Promise((resolve, reject) => {
                axios.delete('/api/posts/'+id).then(response => {
                    commit('SET_POST', response.data.data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })

        },
        updatePost( commit, {id, formData}){
            axios.post(`/api/posts/${id}`, formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then((response) => {
              console.log(response)
            })

        },
        createPost({commit}, data ) {
            return new Promise((resolve, reject) => {
              axios.post('/api/posts', data, {
                    headers: {
                        'enctype': 'multipart/form-data'
                    },
                }).then(response => {

                    commit('SET_POSTS', response.data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        fetchPosts({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('/api/posts').then(response => {
                    commit('SET_POSTS', response.data.data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
})
export default store