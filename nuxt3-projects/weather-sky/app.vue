<template>
  <div class="bg-slate-100 min-h-screen">
    <u-container>
      <u-card>
          <h1 class="text-3xl font-bold text-center text-gray-700 mb-6">
              Weather Sky
          </h1>
          <p class="text-center text-gray-500 mb-4">
              Search for current weather data by city
          </p>
          <cities-lookup @change="onCityChange" />
      </u-card>
      <empty-placeholder v-if="!weatherData && !loading" />
      <div v-if="loading" class="animate-pulse w-full space-y-4">
        <div class="h-96 bg-slate-300 dark:bg-slate-900 rounded" />
        <div class="h-96 bg-slate-300 dark:bg-slate-900 rounded" />
      </div>
      <u-card v-else-if="weatherData">
        {{ weatherData }}
      </u-card>
      <current-weather-data />
    </u-container>
  </div>
</template>

<script setup>
const loading = ref(false)
const weatherStore = useWeatherStore()
const { activeCity, weatherData } = storeToRefs(weatherStore)

const onCityChange = async (city) => {
    loading.value = true
    await weatherStore.getWeatherData(city)
    loading.value = false
    console.log(`change city ${city.name}`)
}
</script>
