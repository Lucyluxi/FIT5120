<template>
  <div class="video-background">
    <video autoplay loop muted playsinline class="background-video">
      <source src="/videos/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="content">
      <h1 class="title animate-fade-up">
        Australia's sunshine is beautiful, but it comes with hidden dangers.
      </h1>

      <p class="image-text animate-fade-up" style="animation-delay: 0.4s;">
        In 2023, it is estimated that <br />
        <span class="highlight">18,257</span> new cases of melanoma of the skin <br />
        will be diagnosed in Australia.
      </p>

      <a href="https://your-link-here.com" class="click-here animate-fade-up" style="animation-delay: 0.8s;">
        Learn how to protect yourself →
      </a>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.video-background {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10%;
  color: white;
  font-family: 'Poppins', sans-serif;
}

.title {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.image-text {
  font-size: 1.8rem;
  font-weight: 400;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
  max-width: 80%;
}

.highlight {
  display: block;
  font-size: 2.5rem;
  font-weight: 600;
  color: #ffcccb;
}

.click-here {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.click-here:hover {
  transform: scale(1.1);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* ✨ Animation effect: fade in and float upward */
.animate-fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


