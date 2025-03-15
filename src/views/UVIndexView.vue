<template>
  <div class="weather-app">
    <!-- Hero Image -->
    <div class="image-container">
      <img src="/images/sun-safety.jpg" alt="Sun Safety" />
    </div>

    <h1>Weather Inquiry for VIC Region</h1>
    <div class="search-container">
      <input v-model="location" placeholder="Enter region (e.g. Melbourne)" />
      <button @click="fetchWeather">Inquiry</button>
    </div>

    <div v-if="weatherData" class="weather-container">
      <!-- Weather Information Table -->
      <table class="weather-table">
        <tbody>
          <tr>
            <td>📍 Region</td>
            <td>{{ weatherData.location }}</td>
          </tr>
          <tr>
            <td>🌡️ Temperature</td>
            <td>{{ weatherData.temperature }}°C</td>
          </tr>
          <tr>
            <td>☀️ UV Index</td>
            <td>{{ weatherData.uvIndex }}</td>
          </tr>
        </tbody>
      </table>

      <!-- UV Index Gauge -->
      <div class="uv-index-container">
        <div class="uv-index-bar">
          <div class="uv-indicator" :style="{ left: `${(weatherData.uvIndex / 11) * 100}%` }"></div>
        </div>
        <div class="uv-labels">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Very High</span>
          <span>Extreme</span>
        </div>
      </div>

      <div class="image-container small">
        <img src="/images/UVIndex.jpg" alt="UV Index photo" />
      </div>

      <!-- Sun Protection & Sunscreen Recommendation -->
      <div class="sun-protection-container">
        <div class="protection-tips">
          <h3>Protect Yourself from the Sun</h3>
          <div class="protection-icons">
            <img src="/images/sunglasses.jpg" alt="Sunglasses" />
            <img src="/images/sunShirt.jpg" alt="Sun Shirt" />
            <img src="/images/sunHat.jpg" alt="Sun Hat" />
          </div>
        </div>

        <div class="sunscreen-tips">
          <h3>Recommended Sunscreen Amount (tsp)</h3>
          <select v-model="skinTone">
            <option disabled value="">Select skin tone</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
          <div class="sunscreen-drops">
            <span v-for="(drop, index) in recommendedSunscreen" :key="index" class="drop">
              💧
            </span>
          </div>
        </div>
      </div>

      <!-- Sunscreen Reminder Toggle -->
      <div class="reminder-container">
        <h3>Get reminded to put on sunscreen!</h3>
        <label class="toggle-switch">
          <input type="checkbox" v-model="reminderActive" @change="startReminder" />
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Countdown Popup -->
    <div v-if="showCountdownPopup" class="countdown-popup">
      <div class="popup-content">
        <h3>Reminder Active</h3>
        <p>
          Reapply sunscreen in: <strong>{{ countdown }}s</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const weatherData = ref(null)
    const skinTone = ref('')
    const recommendedSunscreen = ref(3)
    const reminderActive = ref(false)
    const showCountdownPopup = ref(false)
    const countdown = ref(120 * 60) //
    let timer = null

    // Start sunscreen reminder countdown
    const startReminder = () => {
      if (reminderActive.value) {
        showCountdownPopup.value = true
        countdown.value = 120 * 60 //

        timer = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--
          } else {
            clearInterval(timer)
            showCountdownPopup.value = false
            reminderActive.value = false

            setTimeout(() => {
              alert('Time to reapply your sunscreen! ☀️')
            }, 500)
          }
        }, 1000)
      } else {
        clearInterval(timer)
        showCountdownPopup.value = false
      }
    }

    return {
      weatherData,
      skinTone,
      recommendedSunscreen,
      reminderActive,
      showCountdownPopup,
      countdown,
      startReminder,
    }
  },
  data() {
    return {
      location: '',
      errorMessage: '',
    }
  },
  methods: {
    async fetchWeather() {
      if (!this.location) {
        this.errorMessage = 'Please enter a valid region'
        return
      }

      try {
        this.errorMessage = ''
        const response = await axios.get('http://127.0.0.1:5001/fit5120-b75ac/us-central1/weatherApi/weather', {  //http://localhost:3000/weather
          params: { location: this.location },
        })

        this.weatherData = response.data
      } catch (error) {
        this.errorMessage = 'Failed to retrieve weather information. Please try again.'
      }
    },
  },
}
</script>

<style scoped>
/* Center align all content */
.weather-app {
  text-align: center;
}
.weather-container {
  margin-top: 50px;
  margin-bottom: 50px;
}
/* Hero image container */
.image-container {
  margin-bottom: 30px;
  margin-top: 10px;
}

.image-container.small {
  max-width: 600px;
  margin: 0 auto;
}
.image-container.small img {
  width: 100%;
  height: auto;
  max-width: 100%;
}

/* Search input and button styling */
.search-container {
  margin-bottom: 20px;
}
input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 12px;
}

/* Weather information table */
.weather-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin: 10px auto;
  font-size: 16px;
  margin-bottom: 80px;
}
.weather-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.weather-table td:first-child {
  font-weight: bold;
  text-align: left;
}

/* UV Index Bar */
.uv-index-container {
  text-align: center;
  margin: 20px auto;
  width: 500px;
}
.uv-index-bar {
  width: 100%;
  height: 15px;
  background: linear-gradient(to right, green, yellow, orange, red, purple);
  position: relative;
  border-radius: 8px;
}
.uv-indicator {
  position: absolute;
  top: -5px;
  width: 3px;
  height: 25px;
  background: black;
}
.uv-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.uv-labels span {
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
}

.uv-labels span:nth-child(1) { color: green; }
.uv-labels span:nth-child(2) { color: yellow; }
.uv-labels span:nth-child(3) { color: orange; }
.uv-labels span:nth-child(4) { color: red; } 
.uv-labels span:nth-child(4) { color: purple; } /* Extreme */

/* Sun Protection & Sunscreen Sections */
.sun-protection-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px auto;
  width: 90%;
  max-width: 1000px;
}
.protection-tips,
.sunscreen-tips {
  width: 45%;
}
.protection-icons img {
  width: 50px;
  margin: 5px;
}
.sunscreen-drops {
  font-size: 24px;
  margin-top: 10px;
}

/* Error message styling */
.error {
  color: red;
}

/* Next button styling */
.next-button {
  display: block;
  width: 160px;
  margin: 20px auto;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.next-button:hover {
  background-color: #0056b3;
}

/* Sunscreen Reminder Toggle */
.reminder-container {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 80px;
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #4caf50;
}
input:checked + .slider:before {
  transform: translateX(24px);
}

/* Countdown Popup */
.countdown-popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.popup-content h3 {
  margin: 0;
  font-size: 16px;
}
.popup-content p {
  margin: 10px 0 0;
  font-size: 14px;
}
</style>
