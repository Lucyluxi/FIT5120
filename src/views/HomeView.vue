<template>
  <div class="row">
    <!-- <div class="col-12 d-flex justify-content-center mt-5">
      <img :src="imageUrl1" alt="Mental Health Header" class="mx-auto responsive-image" />
    </div> -->
    <div
      class="brief column mt-3 text-center"
      style="display: flex; flex-direction: column; align-items: center; background-color: white"
    >
      <h1 class="col-lg-8 col-10 mt-5">Welcome to Home page</h1>
      <span class="col-lg-8 col-10 my-3" style="font-size: 1.25rem"> testing </span>
      <p class="col-lg-8 col-10 my-5" style="font-size: 1.25rem">testing</p>
    </div>
  </div>
</template>

<!-- <script>
import imageUrl from '@/assets/images/mentalHealth.jpg'
import imageUrl1 from '@/assets/images/homeHeader3.png'

export default {
  data() {
    return {
      imageUrl,
      imageUrl1,
    }
  },
  methods: {
    goToBooking() {
      this.$router.push('/booking')
    },
    goToResource() {
      this.$router.push('/resourceView')
    },
    goToParent() {
      this.$router.push('/forParentView')
    },
    goToAbout() {
      this.$router.push('/contact')
    },
  },
}
</script> -->

<style scoped>
.responsive-image {
  width: 40%;
  height: auto;
}

@media (max-width: 992px) {
  .responsive-image {
    width: 60%;
  }
}

@media (max-width: 768px) {
  .responsive-image {
    width: 80%;
  }
}

@media (max-width: 576px) {
  .responsive-image {
    width: 100%;
  }
}

h2 {
  font-size: 2rem;
  color: #007bff; /* Primary color */
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
}
</style>
