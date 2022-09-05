<template>
  <div>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">

                  <h2 class="fw-bold mb-2 text-uppercase">Register</h2>

                  <div class="form-outline form-white mb-4">
                    <input type="text" v-model="form.name" id="typeNameX" name="name" placeholder="Name"
                           class="form-control form-control-lg"/>
                    <div v-if="errors.nameError" class="alert alert-danger" role="alert">
                      {{ this.errors.nameError }}
                    </div>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="email" v-model="form.email" id="typeEmailX" name="email" placeholder="Email"
                           class="form-control form-control-lg"/>
                    <div v-if="errors.emailError" class="alert alert-danger" role="alert">
                      {{ this.errors.emailError }}
                    </div>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" v-model="form.password" name="password" placeholder="Password"
                           id="typePasswordX"
                           class="form-control form-control-lg"/>
                    <div v-if="errors.passwordError" class="alert alert-danger" role="alert">
                      {{ this.errors.passwordError }}
                    </div>

                  </div>
                  <div class="form-outline form-white mb-4">
                    <input type="password" v-model="form.confirmation" name="confirmPassword"
                           placeholder="Confirmation Password"
                           id="typeconfirmPasswordX"
                           class="form-control form-control-lg"/>
                    <div v-if="errors.confirmationError" class="alert alert-danger" role="alert">
                      {{ this.errors.confirmationError }}
                    </div>
                  </div>

                  <button class="btn btn-outline-light btn-lg px-5" @click="userRegister" type="submit">Register
                  </button>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>


export default {
  name: "Register-vue",
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmation: ''
      },

      errors: {
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmationError: ''

      }
    }
  },
  watch: {
    'form.name'(val) {
      if (val.length <= 2 || val.length >= 10) {
        this.errors.nameError = 'Name is not correct'
      } else {
        this.errors.nameError = ''
      }
    },
    'form.password'(val) {
      if (val.length < 6) {
        this.errors.passwordError = 'Must be minimum 6'
      } else {
        this.errors.passwordError = ''
      }
    },
    'form.confirmation'(val) {
      if (this.form.password !== val) {
        this.errors.confirmationError = 'Must be match'
      } else {
        this.errors.confirmationError = ''
      }
    },

    'form.email'(val) {
      if (!this.validateEmail(val)) {
        this.errors.emailError = 'Email is not correct'
      } else {
        this.errors.emailError = ''
      }
    },
  },
  methods: {
    validateEmail(email) {
      return String(email)
          .toLowerCase()
          .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
    },
    userRegister() {
      if (this.errors.emailError == '' || this.errors.nameError == '' || this.errors.passwordError == '' || this.errors.confirmationError == '') {
        if (this.form.name.length > 2 || this.form.password.length >= 6 || this.form.email.length > 5 || this.form.confirmation == this.form.password) {
          this.$store.dispatch('register', this.form).then(res => {
            console.log(res)
            this.$router.push({path: '/login'})
          }).catch(err => {
            console.log(err)
          })
        }

      }
    }
  }
}
</script>

<style scoped>

.gradient-custom {

  background: #6a11cb;


  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>