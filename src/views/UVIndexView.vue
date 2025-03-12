<template>
  <div class="weather-app">
    <h1>Weather Inquiry for VIC Region</h1>
    <input v-model="location" placeholder="Input region name (e.g. Melbourne)" />
    <button @click="fetchWeather">Inquiry</button>

    <div v-if="weatherData" class="weather-container">
      <table class="weather-table">
        <tbody>
          <tr>
            <td>Region</td>
            <td>{{ weatherData.location }}</td>
          </tr>
          <tr>
            <td>🌡️Temperature</td>
            <td>{{ weatherData.temperature }}°C</td>
          </tr>
          <tr>
            <td>⛅Weather</td>
            <td>{{ weatherData.weather }}</td>
          </tr>
          <tr>
            <td>☀️UV Index</td>
            <td>{{ weatherData.uvIndex }}</td>
          </tr>
        </tbody>
      </table>

      <!-- UV Index Gauge Chart -->
      <div class="chart-container" ref="chartContainer"></div>

      <div>
        <!-- Next Button -->
        <button class="next-button" @click="goToProductView">Next</button>
      </div>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import * as echarts from 'echarts'

export default {
  setup() {
    const router = useRouter()
    const weatherData = ref(null) // ✅ 用 ref 代替 data 里的 weatherData

    const goToProductView = () => {
      if (!weatherData.value) {
        console.error('weatherData is not available!')
        return
      }

      router.push({
        path: '/products',
        query: {
          uvIndex: weatherData.value.uvIndex,
          temperature: weatherData.value.temperature,
          weather: weatherData.value.weather,
        },
      })
    }

    return { weatherData, goToProductView }
  },
  data() {
    return {
      location: '',
      errorMessage: '',
      chart: null,
    }
  },
  methods: {
    async fetchWeather() {
      if (!this.location) {
        this.errorMessage = 'Please enter the region name'
        return
      }

      try {
        this.errorMessage = ''
        const response = await axios.get('http://localhost:3000/weather', {
          params: { location: this.location },
        })

        this.weatherData = response.data // ❌ 旧方法
        this.$options.setup().weatherData.value = response.data // ✅ 新方法

        await nextTick()
        this.initChart()
        this.updateChart(response.data.uvIndex)
      } catch (error) {
        this.errorMessage = 'Failed to retrieve weather information. Please check your input.'
      }
    },
    initChart() {
      if (!this.$refs.chartContainer) {
        console.error('Chart container not found! Waiting...')
        return
      }

      console.log('Chart container found:', this.$refs.chartContainer)

      if (this.chart) {
        this.chart.dispose()
      }

      this.chart = echarts.init(this.$refs.chartContainer)
      this.chart.setOption(this.getChartOption(0)) // default UV Index = 0
    },
    updateChart(uvIndex) {
      if (this.chart) {
        this.chart.setOption(this.getChartOption(uvIndex))
      }
    },
    getChartOption(uvIndex) {
      return {
        title: {
          left: 'center',
          top: '10%',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 15,
            splitNumber: 5,
            radius: '90%',
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.13, '#00FF00'], // Low (0-2)
                  [0.33, '#FFFF00'], // Moderate (3-5)
                  [0.47, '#FFA500'], // High (6-7)
                  [0.67, '#FF4500'], // Very High (8-10)
                  [1, '#8B0000'], // Extreme (11+)
                ],
              },
            },
            axisLabel: {
              formatter: function (value) {
                if (value <= 2) return 'Low'
                if (value <= 5) return 'Moderate'
                if (value <= 7) return 'High'
                if (value <= 10) return 'Very High'
                return 'Extreme'
              },
              fontSize: 10,
              distance: -30,
            },
            pointer: {
              width: 6,
              length: '60%',
              color: '#000',
            },
            detail: {
              formatter: '{value}',
              fontSize: 18,
            },
            data: [{ value: uvIndex }],
          },
        ],
        legend: {
          bottom: '5%',
          left: 'center',
          data: ['Low', 'Moderate', 'High', 'Very High', 'Extreme'],
          textStyle: {
            fontSize: 12,
          },
          itemWidth: 20,
          itemHeight: 10,
        },
      }
    },
  },
}
</script>

<style>
.weather-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin: 10px auto;
  font-size: 16px;
}
.weather-table td {
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
}
.weather-table tr:last-child td {
  border-bottom: none;
}
.weather-table td:first-child {
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
}
.weather-table td:last-child {
  text-align: right;
  padding-right: 10px;
}

.weather-app {
  text-align: center;
  margin-top: 50px;
}
.weather-container {
  width: 80%;
  height: 500px;
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px;
}

input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 12px;
}
.chart-container {
  width: 100%;
  max-width: 300px;
  height: 200px;
  min-height: 100px;
  margin: 20px auto;
}
.error {
  color: red;
}

.next-button {
  display: block;
  width: 150px;
  margin: 20px auto;
  padding: 10px;
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
</style>
