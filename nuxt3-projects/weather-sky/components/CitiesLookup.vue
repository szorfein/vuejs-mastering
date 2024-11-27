<template>
    <USelectMenu
        v-model="activeCity"
        :loading="loading"
        :searchable="weatherStore.citiesLookup"
        placeholder="Search for a city..."
        option-attribute="name"
        by="name"
        @update:modelValue="emit('change', $event)"
    />
</template>

<script setup>
const weatherStore = useWeatherStore()
const { activeCity } = storeToRefs(weatherStore)
const emit = defineEmits(['change'])
</script>
