import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
  weather: Weather
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2 data-testid='title'>Clima de: {weather.name}</h2>
      <p className={styles.current} data-testid='temp'>{formatTemperature(weather.main.temp)}&deg;C</p>

      <div className={styles.temperatures}>
        <p>Min: <span data-testid='minTemp'>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
        <p>Max: <span data-testid='maxTemp'>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
      </div>
    </div>
  )
}
