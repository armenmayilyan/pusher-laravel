<template>
  <div class="mt-5">
    <div class="mt-5 created-box shadow-lg p-3 mb-5 bg-body rounded container p-5 rounded">
      <div class="form-box">
        <form action="" method="putch" enctype="multipart/form-data">
          <!-- name input -->
          <div class="form-outline mb-4">
            <input type="text" name="name" v-model="form.name" placeholder="name..." id="form2Example1"
                   class="form-control"/>
            <div v-if="errors.nameapdateError" :class=" errors.nameapdateError != '' ? 'border border-danger' : '' "
                 class="alert alert-danger" role="alert">
              {{ errors.nameapdateError }}
            </div>
          </div>

          <!-- description input -->
          <div class="form-group mb-4">
            <textarea class="form-control" v-model="form.description" placeholder="Description..."
                      id="exampleFormControlTextarea1" rows="1"></textarea>
            <div v-if="errors.descriptionError" :class=" errors.descriptionError != '' ? 'border border-danger' : '' "
                 class="alert alert-danger" role="alert">
              {{ errors.descriptionError }}
            </div>
          </div>

          <div class="form-outline mb-4">
            <input type="file" id="file" name="file" @change="onFileChange" class="form-control"/>
            <div v-if="errors.fileError" :class=" errors.fileError != '' ? 'border border-danger' : '' "
                 class="alert alert-danger" role="alert">
              {{ errors.fileError }}
            </div>
          </div>
          <div class="form-outline ">
            <button type="button" @click="createdPost" class="btn btn-primary btn-block mb-4">Create Post</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Created-vue",
  data() {
    return {
      form: {
        name: "",
        description: "",
        file: []
      },
      errors: {
        nameupdateError: '',
        descriptionError: '',
        fileError: '',
      }

    }
  },
  watch: {
    'form.name'(val) {
      if (val.length < 5) {
        this.errors.nameapdateError = 'name is not correct'
      } else {
        this.errors.nameapdateError = ''
      }
    },
    'form.description'(val) {
      if (val.length < 10) {
        this.errors.descriptionError = 'description is not correct'
      } else {
        this.errors.descriptionError = ''
      }
    },
  },
  methods: {

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return
      } else {
       this.form.file = files[0]
      }
    },
    createdPost() {
      let formData = new FormData();
      formData.append('file', this.form.file);
      formData.append('description', this.form.description);
      formData.append('name', this.form.name);
      this.$store.dispatch('createPost', formData).then( () => {
        this.$router.push({path: '/home'})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.form-box {
  padding: 200px;
}

.created-box {
  background-color: lightgray;
  margin-top: 100px !important;
  box-shadow: #2c3e50;

}
</style>