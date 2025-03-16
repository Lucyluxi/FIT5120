<template>
  <div class="row">
    <h1 class="title">Australia's sunshine is beautiful, but it comes with hidden dangers.</h1>
    <div class="col-12 d-flex justify-content-center">
      <div class="image-container">
        <img src="/images/home.jpg" class="responsive-image" alt="Beach Background" />
        <div class="image-text">
          In 2023, it is estimated that <br />
          <span class="highlight">18,257</span> new cases of melanoma of the  <br />
          skin will be diagnosed in Australia.
        </div>
        <router-link to="/uvindex" class="click-here">Learn how to protect yourself →</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.responsive-image {
  width: 100%;
  height: 50vh; /* Show only the top half of the image */
  object-fit: cover;
  object-position: top center;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 60%;
  height: 50vh;
  overflow: hidden;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: #333;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 10px;
}

.image-text {
  position: absolute;
  top: 30%; /* Moved text lower */
  left: 10%; /* Align text to the left */
  transform: translateY(-50%);
  font-size: 2.2rem; /* Increased font size */
  text-align: left;
  color: #f0f8ff; /* Soft white-blue tone to match blue background */
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 80%;
}

.highlight {
  display: block;
  font-size: 2.8rem; /* Larger highlight text */
  font-weight: 600;
  color: #ffcccb; /* Soft red to contrast with blue */
}

.click-here {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease-in-out;
}

.click-here:hover {
  transform: scale(1.1);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
}
</style>

