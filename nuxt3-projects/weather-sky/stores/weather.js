//import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', () => {
  const activeCity = ref()
  const weatherData = ref()

  const config = useRuntimeConfig()
  const apiKey = config.public.weatherApiKey
  const url = 'http://localhost:8080'

  const citiesLookup = async (query) => {
    if (!query) return

    const response = await $fetch(`${url}/?q=${query}&apikey=${apiKey}`)

    return response
  }

  const getWeatherData = async (city) => {
    try {
        weatherData.value = await $fetch(`http://localhost:8080/${city.name}?apikey=${apiKey}`)
        console.log(weatherData.value)
    } catch(err) {
        console.error('Error fetching data: ', err)
    }
    console.log(`change city ${city.name}`)
  }

  return { activeCity, weatherData, citiesLookup, getWeatherData }
})
