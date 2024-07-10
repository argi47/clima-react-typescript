import axios from 'axios'
import { SearchType } from '../types'

export default function useWeather() {

  const fetchWeather = async (search: SearchType) => {

    const appId = '12f79a81494418b0ecb67baa30fb6996'

    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const { data } = await axios.get(url)
    }
    catch (error) {
      console.log(error)
    }
  }

  return {
    fetchWeather
  }

}