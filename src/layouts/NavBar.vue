<template>
  <div>
    <b-navbar class="fixed-top" type="dark" variant="dark">
      <b-navbar-brand href="#">Name</b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>
      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link to="/login" v-if="!isLoggedIn" class="nav-item nav-link">Login</router-link>
          <router-link to="/register" v-if="!isLoggedIn" class="nav-item nav-link">Register</router-link>
          <router-link to="/home" v-if="isLoggedIn" class="nav-item nav-link">Home</router-link>
          <router-link to="/created" v-if="isLoggedIn" class="nav-item nav-link">Created</router-link>

        </b-navbar-nav>
      </b-collapse>
      <div class="mr-auto logout-nav" v-if="isLoggedIn">
        <li @click="logout" class=" nav-item nav-link text-white ms-1">Logouth</li>
      </div>
    </b-navbar>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      isLoggedIn: false
    }
  },
  computed: {
    authUser() {
      return this.$store.getters['login/user']
    }
  },
  methods: {
    logout() {
      axios.get('/api/logout').then((res) => {
        let success = res.data.success
        if (success) {
          window.localStorage['auth_token'] = ''
          this.isLoggedIn = false
          this.$router.push({path: '/login'})
        }
      });
    }
  },
  watch: {
    authUser(val) {
      console.log(val)
      if (Object.keys(val)) {
        console.log(val)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token')
        return this.isLoggedIn = true
      } else {
        window.localStorage['auth_token'] = ''
        return this.isLoggedIn = false
      }
    },
  },
  created() {
    let token = window.localStorage.getItem('auth_token')
    if (!token) {
      return this.isLoggedIn = false
    } else {
      return this.isLoggedIn = true
    }
  }

}
</script>

<style scoped>
.logout-nav {
  cursor: pointer;
  margin-right: 100px;
  font-size: 20px;
}
</style>