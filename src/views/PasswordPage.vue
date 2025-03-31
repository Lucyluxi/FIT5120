<template>
  <div class="password-page">
    <h2>Enter Password to Access the Website</h2>
    <input v-model="password" type="password" placeholder="Enter password" />
    <button @click="submitPassword">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
    }
  },
  methods: {
    submitPassword() {
      const correctPassword = '123456' // Set your desired password
      if (this.password === correctPassword) {
        localStorage.setItem('site_password', this.password) // Store password
        this.$router.push('/') // Redirect to the home page 
      } else {
        alert('Incorrect password. Please try again.')
      }
    },
  },
}
</script>

<style scoped>
.password-page {
  text-align: center;
  margin-top: 50px;
}
input {
  margin: 10px;
  padding: 5px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
