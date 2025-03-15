import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const WEATHER_API_KEY = '512e26fe7cb190dd2023f41afe4e8952'
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

app.get('/weather', async (req, res) => {
  const { location } = req.query

  if (!location) {
    return res.status(400).json({ error: 'Location is required' })
  }

  try {
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        q: `${location},AU`,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    })

    const { coord, main, weather } = weatherResponse.data

    const uvResponse = await axios.get(`https://api.openweathermap.org/data/2.5/uvi`, {
      params: {
        lat: coord.lat,
        lon: coord.lon,
        appid: WEATHER_API_KEY,
      },
    })

    res.json({
      location: location,
      temperature: main.temp,
      weather: weather[0].description,
      uvIndex: uvResponse.data.value,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
