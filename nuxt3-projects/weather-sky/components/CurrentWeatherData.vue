<template>
    <div class="text-center">
        <h2 class="text-4xl font-bold">
            {{ weatherData.timezone }}
        </h2>
        <p class="text-xl">
            {{ weatherData.lang }}
        </p>
    </div>
</template>

<script setup>
const weatherStore = useWeatherStore()
const { weatherData } = storeToRefs(weatherStore)
</script>
