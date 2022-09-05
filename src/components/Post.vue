<template>
  <div class="update-post mt-5">
    <div class="mt-5 created-box shadow-lg p-3 mb-5 bg-body rounded container p-5 rounded">
      <div class="form-box">
        <form action="" method="post">
          <!-- name input -->
          <div class="form-outline mb-4">
            <input type="text" name="nameUpdate" v-model="form.name" placeholder="name..." id="form2Example1"
                   class="form-control"/>
            <div v-if="errors.nameError" :class=" errors.nameError != '' ? 'border border-danger' : '' "
                 class="alert alert-danger" role="alert">
              {{ errors.nameError }}
            </div>
          </div>

          <!-- description input -->
          <div class="form-group mb-4">
            <textarea class="form-control" name="descriptionUpadate" v-model="form.description"
                      placeholder="Description..."
                      id="exampleFormControlTextarea1" rows="1"></textarea>
            <div v-if="errors.descriptionError" :class=" errors.descriptionError != '' ? 'border border-danger' : '' "
                 class="alert alert-danger" role="alert">
              {{ errors.descriptionError }}
            </div>
          </div>

          <div class="form-outline mb-4">
            <input type="file" id="file" name="fileUpdate" @change="onFileChange($event,$route.params.id)"
                   class="form-control"/>
            <div v-if="errors.fileError" :class=" errors.fileError != '' ? 'border border-danger' : '' "
                 class="alert alert-danger" role="alert">
              {{ errors.fileError }}
            </div>
          </div>
          <div class="form-outline ">
            <button type="button" @click="updatePost($route.params.id)" class="btn btn-primary btn-block mb-4">Create
              Post
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: "post-vue",
  data() {
    return {
      form: {
        name: "",
        description: "",
      },
      files: {
        file: []
      },
      errors: {
        nameError: '',
        descriptionError: '',
        fileError: '',
      }

    }
  },
  computed: {
    post() {
      return this.$store.getters.post
    }

  },

  methods: {

    onFileChange(e) {

      let file = e.target.files[0]
      this.files.file = file
      console.log(this.files.file)
    },
    updatePost(id) {
      let formData = new FormData();
      formData.append('name', this.form.name)
      formData.append('description', this.form.description)
      formData.append('file', this.files.file);
      this.$store.dispatch('updatePost', {id, formData}).then(() => {
        this.$router.push({path: '/home'})
      }).catch(err => {
        console.log(err)
      })
    }
  }


}
</script>

<style scoped>
.update-post {
  margin-top: 150px !important;
  padding: 15px;
}
</style>