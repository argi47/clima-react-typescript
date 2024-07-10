import { useMemo, useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
// import { object, string, number, InferOutput, parse } from 'valibot'
import { SearchType } from '../types'

//  Zod
const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})
export type Weather = z.infer<typeof WeatherSchema>

//  Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   })
// })
// type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

export default function useWeather() {

  const [weather, setWeather] = useState<Weather>(initialState)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search: SearchType) => {

    const appId = import.meta.env.VITE_API_KEY

    setWeather(initialState)
    setLoading(true)

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const { data } = await axios.get(geoUrl)

      //  Comprobar si existe
      if (!data[0]) {
        setNotFound(true)
      }
      else {
        setNotFound(false)
      }

      const lat = data[0].lat
      const lon = data[0].lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

      const { data: weatherData } = await axios.get(weatherUrl)

      //  Zod
      const result = WeatherSchema.safeParse(weatherData)
      if (result.success) {
        setWeather(result.data)
      }

      //  Valibot
      // const result = parse(WeatherSchema, weatherData)
      // if (result) {
      //   console.log(result)
      // }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData
  }

}