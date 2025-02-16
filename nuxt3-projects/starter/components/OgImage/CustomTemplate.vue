<template>
    <div class="h-full w-full flex flex-row relative">
        <div class="flex flex-col justify-between w-2/3 p-16 bg-slate-800">
            <img
                src="/logo.png"
                class="w-32 object-contain"
                width="128"
                height="128" />
            <h1 class="text-[64px] font-black text-white">
                {{ title }}
            </h1>
            <div class="text-2xl leading-10 font-black text-slate-100 mb-4">
                {{ description }}
            </div>
            <p class="text-2xl font-bold text-primary mb-0">
                {{ siteConfig.url }}
            </p>
        </div>
        <img
            :src="image"
            class="w-1/3 h-full object-cover"
            alt="Card Image" />
    </div>
</template>

<script setup>
 // useSiteConfig for load nuxt.config for Nuxt/SEO
 const siteConfig = useSiteConfig()
 // withDefaults come from Vue, make default value to $props
 const $props = defineProps({
     title: { type: String, default: '' },
     description: { type: String, default: '' },
     image: { type: String, default: '/images/hero.png' }
 })
</script>
