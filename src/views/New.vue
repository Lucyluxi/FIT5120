<template>
  <div>
    <div class="search-container">
      <select v-model="selectedLocation" class="form-select" @change="onLocationChange">
        <option v-for="location in locations" :key="location.locality" :value="location">
          {{ location.locality }}
        </option>
      </select>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import Papa from "papaparse";

export default {
  setup() {
    const map = ref(null);
    const selectedLocation = ref(null);
    const locations = ref([]);
    const markers = ref([]);
    const uvDataPoints = ref([]);

    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicHJhbmVldGhrdW1hcjk5IiwiYSI6ImNtMnQ2MTgxbDAwazUya3BzcDlzbnVrYTcifQ.2RmHZoNBD8IJbcEiL_kQcg";
    const OPENWEATHER_API_KEY = "512e26fe7cb190dd2023f41afe4e8952";

    const initializeMap = () => {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      map.value = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [133.7751, -25.2744],
        zoom: 4,
      });
      map.value.addControl(new mapboxgl.NavigationControl());
    };

    const fetchUV = async (lat, lon) => {
      try {
        const response = await fetch(`https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`);
        const data = await response.json();
        return data?.now?.uvi ?? "N/A";
      } catch (error) {
        return "Error";
      }
    };

    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        return {
          temperature: data.main?.temp ?? "N/A",
          description: data.weather[0]?.description ?? "Unknown",
        };
      } catch (error) {
        return { temperature: "Error", description: "Unknown" };
      }
    };

    const clearMarkers = () => {
      markers.value.forEach((marker) => marker.remove());
      markers.value = [];
      uvDataPoints.value = [];
    };

    const addMarker = async (location) => {
      const lat = parseFloat(location.lat);
      const lon = parseFloat(location.long);
      const city = location.locality;

      if (!isNaN(lat) && !isNaN(lon)) {
        const uvIndex = await fetchUV(lat, lon);
        const weather = await fetchWeather(lat, lon);

        uvDataPoints.value.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [lon, lat] },
          properties: { uv: uvIndex },
        });

        const popupContent = `
          <b>${city}</b><br>
          🌞 UV Index: <strong>${uvIndex}</strong><br>
          🌡️ Temp: <strong>${weather.temperature}°C</strong><br>
        `;

        const marker = new mapboxgl.Marker()
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setHTML(popupContent))
          .addTo(map.value);

        markers.value.push(marker);
      }
    };

    const updateUVHeatmap = () => {
      if (map.value.getSource("uv-data")) {
        map.value.getSource("uv-data").setData({
          type: "FeatureCollection",
          features: uvDataPoints.value,
        });
      } else {
        map.value.addSource("uv-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: uvDataPoints.value,
          },
        });

        map.value.addLayer({
          id: "uv-heatmap",
          type: "heatmap",
          source: "uv-data",
          paint: {
            "heatmap-weight": ["interpolate", ["linear"], ["get", "uv"], 0, 0, 11, 1],
            "heatmap-intensity": 3,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(0,255,0,0.2)",
              0.2, "rgba(255,255,0,0.5)",
              0.4, "rgba(255,165,0,0.7)",
              0.6, "rgba(255,0,0,0.9)",
              1, "rgba(128,0,128,1)"
            ],
            "heatmap-opacity": 0.75,
          },
        });
      }
    };

    const displayRandomMarkers = async () => {
      clearMarkers();
      const randomSelection = locations.value.sort(() => 0.5 - Math.random()).slice(0, 10);
      for (const row of randomSelection) {
        await addMarker(row);
      }
      updateUVHeatmap();
    };

    const onLocationChange = async () => {
      if (selectedLocation.value) {
        clearMarkers();
        await addMarker(selectedLocation.value);
        map.value.flyTo({ center: [selectedLocation.value.long, selectedLocation.value.lat], zoom: 10 });
        updateUVHeatmap();
      }
    };

    const loadCSV = () => {
      fetch("/data/australian_postcodes.csv")
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
              locations.value = results.data;
              await displayRandomMarkers();
            },
          });
        })
        .catch((error) => console.error("Error loading CSV:", error));
    };

    onMounted(() => {
      initializeMap();
      loadCSV();
    });

    return { map, selectedLocation, locations, onLocationChange };
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 90vh;
}
.search-container {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
  width: 300px;
}
</style>