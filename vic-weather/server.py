import os
import httpx
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "512e26fe7cb190dd2023f41afe4e8952")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
UV_API_URL = "https://api.openweathermap.org/data/2.5/onecall"

@app.get("/weather")
async def get_weather(location: str = Query(..., description="Location name")):
    if not location:
        return JSONResponse(status_code=400, content={"error": "Location is required"})

    async with httpx.AsyncClient() as client:
        try:
            weather_response = await client.get(WEATHER_API_URL, params={
                "q": f"{location},AU",
                "appid": WEATHER_API_KEY,
                "units": "metric",
            })

            if weather_response.status_code != 200:
                return JSONResponse(status_code=500, content={"error": "Failed to fetch weather data"})

            weather_data = weather_response.json()
            coord = weather_data["coord"]
            main = weather_data["main"]
            weather_desc = weather_data["weather"][0]["description"]

            uv_response = await client.get(UV_API_URL, params={
                "lat": coord["lat"],
                "lon": coord["lon"],
                "exclude": "minutely,hourly,daily,alerts",
                "appid": WEATHER_API_KEY,
            })

            if uv_response.status_code != 200:
                return JSONResponse(status_code=500, content={"error": "Failed to fetch UV index data"})

            uv_data = uv_response.json()

            return {
                "location": location,
                "temperature": main["temp"],
                "weather": weather_desc,
                "uvIndex": uv_data.get("current", {}).get("uvi", "N/A"),
            }
        except Exception as e:
            return JSONResponse(status_code=500, content={"error": "Failed to fetch weather data", "details": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 3000)))
