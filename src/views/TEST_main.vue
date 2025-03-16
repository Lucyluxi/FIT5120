<template>
  <div class="map-container">
    <!-- 搜索 & 过滤 -->
    <div id="filter-container">
      <label for="search-location" class="form-label fw-bold">Search Location:</label>
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Type to search..."
        @input="filterDropdown"
      />
      <select v-model="selectedLocation" class="form-select mt-2" size="5">
        <option v-for="location in filteredLocations" :key="location">{{ location }}</option>
      </select>
      <button class="btn btn-primary mt-2 w-100" @click="applyFilter">Search</button>
    </div>

    <!-- 地图 -->
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import Papa from "papaparse";

export default {
  setup() {
    const searchQuery = ref("");
    const selectedLocation = ref("");
    const allData = ref([]);
    const filteredLocations = ref([]);
    const OPENWEATHER_API_KEY = "512e26fe7cb190dd2023f41afe4e8952";
    let map, markers = [];

    onMounted(async () => {
      mapboxgl.accessToken = "pk.eyJ1IjoicHJhbmVldGhrdW1hcjk5IiwiYSI6ImNtMnQ2MTgxbDAwazUya3BzcDlzbnVrYTcifQ.2RmHZoNBD8IJbcEiL_kQcg";
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [133.7751, -25.2744],
        zoom: 4,
      });
      map.addControl(new mapboxgl.NavigationControl());

      await loadCSV();
    });

    async function loadCSV() {
      const response = await fetch("/data/australian_postcodes.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          allData.value = results.data;
          filteredLocations.value = [...new Set(allData.value.map(row => row.locality))];
          displayRandomMarkers();
        },
      });
    }

    function filterDropdown() {
      const query = searchQuery.value.toLowerCase();
      filteredLocations.value = allData.value
        .map(row => row.locality)
        .filter(location => location.toLowerCase().includes(query));
    }

    async function applyFilter() {
      if (!selectedLocation.value) return;

      const filteredData = allData.value.filter(row => row.locality === selectedLocation.value);
      clearMarkers();

      for (const row of filteredData) {
        await addMarker(row);
      }

      if (filteredData.length > 0) {
        map.flyTo({
          center: [parseFloat(filteredData[0].long), parseFloat(filteredData[0].lat)],
          zoom: 10,
        });
      }
    }

    function displayRandomMarkers() {
      clearMarkers();
      const randomSelection = allData.value
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      randomSelection.forEach(async (row) => await addMarker(row));
    }

    function clearMarkers() {
      markers.forEach(marker => marker.remove());
      markers = [];
    }

    async function addMarker(row) {
      const lat = parseFloat(row.lat);
      const lon = parseFloat(row.long);
      const city = row.locality;

      if (!isNaN(lat) && !isNaN(lon)) {
        const weather = await fetchWeather(lat, lon);
        const uvIndex = await fetchUV(lat, lon);
        const popupContent = `
          <b>${city}</b><br>
          🌞 UV Index: <strong>${uvIndex}</strong><br>
          🌡️ Temp: <strong>${weather.temperature}°C</strong><br>
          ${getWeatherIcon(weather.description)} Weather: <strong>${weather.description}</strong>
        `;

        const marker = new mapboxgl.Marker()
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setHTML(popupContent))
          .addTo(map);

        markers.push(marker);
      }
    }

    async function fetchWeather(lat, lon) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API Error");
        const data = await response.json();
        return {
          temperature: data.main?.temp ?? "N/A",
          description: data.weather[0]?.description ?? "Unknown",
        };
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        return { temperature: "Error", description: "Unknown" };
      }
    }

    async function fetchUV(lat, lon) {
      try {
        const url = `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`;
        const response = await fetch(url);
        const data = await response.json();
        return data?.now?.uvi ?? "N/A";
      } catch (error) {
        console.error("Failed to fetch UV index:", error);
        return "Error";
      }
    }

    function getWeatherIcon(description) {
      const desc = description.toLowerCase();
      if (desc.includes("clear")) return "☀️";
      if (desc.includes("cloud")) return "☁️";
      if (desc.includes("rain")) return "🌧️";
      if (desc.includes("thunderstorm")) return "⛈️";
      if (desc.includes("snow")) return "❄️";
      return "🌥️";
    }

    return {
      searchQuery,
      selectedLocation,
      filteredLocations,
      applyFilter,
      filterDropdown,
    };
  },
};
</script>

<style scoped>
@import 'mapbox-gl/dist/mapbox-gl.css';
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
#map {
  width: 100%;
  height: 90vh;
}
#filter-container {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 250px;
  z-index: 10;
}
</style>
