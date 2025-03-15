import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const WEATHER_API_KEY = '512e26fe7cb190dd2023f41afe4e8952';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

app.get('/', (req, res) => {
  res.send("Cloud Function is running!");
});

app.get('/weather', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        q: `${location},AU`,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });

    const { main, weather } = weatherResponse.data;

    res.json({
      location: location,
      temperature: main.temp,
      weather: weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});
export const weatherApi = onRequest(app);

