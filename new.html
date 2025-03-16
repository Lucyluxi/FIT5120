<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mapbox UV Index & Weather</title>

    <!-- Mapbox -->
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js"></script>
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css"
      rel="stylesheet"
    />

    <!-- Bootstrap for Styling -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- PapaParse for CSV Parsing -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>

    <style>
      body,
      html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
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
  </head>
  <body>
    <!-- Searchable Dropdown -->
    <div class="search-container">
      <select
        id="location-select"
        class="form-select selectpicker"
        data-live-search="true"
      ></select>
    </div>

    <div id="map"></div>

    <script>
      mapboxgl.accessToken =
        "pk.eyJ1IjoicHJhbmVldGhrdW1hcjk5IiwiYSI6ImNtMnQ2MTgxbDAwazUya3BzcDlzbnVrYTcifQ.2RmHZoNBD8IJbcEiL_kQcg";
      const OPENWEATHER_API_KEY = "512e26fe7cb190dd2023f41afe4e8952";

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [133.7751, -25.2744], // Australia
        zoom: 4,
      });

      map.addControl(new mapboxgl.NavigationControl());

      let markers = [];
      let uvDataPoints = [];

      // Function to populate the dropdown
      function populateDropdown(data) {
        const select = document.getElementById("location-select");
        select.innerHTML = "";
        data.forEach((row) => {
          const option = document.createElement("option");
          option.value = JSON.stringify(row);
          option.textContent = row.locality;
          select.appendChild(option);
        });
        $(".selectpicker").selectpicker("refresh"); // Refresh Bootstrap select
      }

      // Function to fetch UV Index
      async function fetchUV(lat, lon) {
        const url = `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data?.now?.uvi ?? "N/A";
        } catch (error) {
          return "Error";
        }
      }

      // Function to fetch Weather Data
      async function fetchWeather(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          return {
            temperature: data.main?.temp ?? "N/A",
            description: data.weather[0]?.description ?? "Unknown",
          };
        } catch (error) {
          return { temperature: "Error", description: "Unknown" };
        }
      }

      // Function to add a marker
      async function addMarker(location) {
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.long);
        const city = location.locality;

        if (!isNaN(lat) && !isNaN(lon)) {
          const uvIndex = await fetchUV(lat, lon);
          const weather = await fetchWeather(lat, lon);

          uvDataPoints.push({
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
            .addTo(map);

          markers.push(marker);
        }
      }

      // Function to clear markers
      function clearMarkers() {
        markers.forEach((marker) => marker.remove());
        markers = [];
        uvDataPoints = [];
      }

      // Function to display random markers
      async function displayRandomMarkers(data) {
        clearMarkers();
        const randomSelection = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        for (const row of randomSelection) {
          await addMarker(row);
        }
        updateUVHeatmap();
      }

      // Function to update UV heatmap
      function updateUVHeatmap() {
        if (map.getSource("uv-data")) {
          map.getSource("uv-data").setData({
            type: "FeatureCollection",
            features: uvDataPoints,
          });
        } else {
          map.addSource("uv-data", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: uvDataPoints,
            },
          });

          map.addLayer({
            id: "uv-heatmap",
            type: "heatmap",
            source: "uv-data",
            paint: {
              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "uv"],
                0,
                0,
                11,
                1,
              ],
              "heatmap-intensity": 3,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(0,255,0,0.2)", // Green (low UV)
                0.2,
                "rgba(255,255,0,0.5)", // Yellow (moderate UV)
                0.4,
                "rgba(255,165,0,0.7)", // Orange (high UV)
                0.6,
                "rgba(255,0,0,0.9)", // Red (very high UV)
                1,
                "rgba(128,0,128,1)", // Purple (extreme UV)
              ],
              "heatmap-opacity": 0.75,
            },
          });
        }
      }

      // Function to populate the dropdown
      function populateDropdown(data) {
        const select = document.getElementById("location-select");
        select.innerHTML = "";
        data.forEach((row) => {
          const option = document.createElement("option");
          option.value = JSON.stringify(row);
          option.textContent = row.locality;
          select.appendChild(option);
        });
      }

      // Load CSV data
      function loadCSV() {
        fetch("australian_postcodes.csv")
          .then((response) => response.text())
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              complete: async function (results) {
                populateDropdown(results.data);
                await displayRandomMarkers(results.data);
              },
            });
          })
          .catch((error) => console.error("Error loading CSV:", error));
      }

      // Event listener for location selection
      document
        .getElementById("location-select")
        .addEventListener("change", async function () {
          const location = JSON.parse(this.value);
          clearMarkers();
          await addMarker(location);
          map.flyTo({ center: [location.long, location.lat], zoom: 10 });
          updateUVHeatmap();
        });

      loadCSV();
    </script>
  </body>
</html>
