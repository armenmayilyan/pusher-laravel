<template>
  <div class="container mt-5 p-5">

    <div class="card p-5 mb-4 shadow" v-for="post in posts" :key="post.id">
      <img class="card-img-top" :src="post.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{post.name}}</h5>
        <p class="card-text">This is a wider card with supporting text below as {{post.description}} a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">{{post.id}}</small></p>
      </div>
      <div class="d-flex justify-content-around mb-5">

          <button type="button" @click="deletePost(post.id)" class="btn btn-outline-danger">Delete</button>


          <button type="button" @click="updatePost(post.id)" class="btn btn-outline-warning">Update</button>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home-vue",
  created() {
    window.Echo.channel('post').listen('.post.created', () => {
      this.fetchPosts();
    })
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {

    posts () {
      return this.$store.getters.posts
    },
  },

  methods:{
    fetchPosts() {
      return this.$store.dispatch('fetchPosts')
    },

    deletePost(id){
      this.$store.dispatch('deletePost', id)
    },

    updatePost(id){
      this.$router.push({name: 'post',params: {"id": id}})
    }
  }
}
</script>

<style scoped>


</style>