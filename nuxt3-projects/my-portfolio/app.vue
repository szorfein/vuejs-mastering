<template>
  <div class="bg-neutral">
    <base-header />
    <NuxtRouteAnnouncer />
    <div class="text-7xl text-primary">Nuxt 3 + TailwindCSS</div>
    <section>
      <div clas="container grid md:grid-cols-2">
        <div class="col-span-1 flex flex-col justify-center">
          Hi FullStack dev
          <button @click="useScrollTo('showcase')" class="bg-primary text-white px-8 py-4 rounded-full :hover:bg-opacity-90 transition duration-300">
            View my work
          </button>
        </div>
        <div class="col-span-1 flex justify-end">
          <div class="container mx-auto text-center">
            <img src="~/assets/images/logo.png" class="h-[350px]" />
          </div>
        </div>
      </div>
    </section>
    <!-- About section  -->
    <section id="about" class="py-16 bg-neutral">
      <div class="container mx-auto text-center">
        <img src="~/assets/images/my-head.png" alt="Bob" class="rounded-full w-48 h-48 mx-auto mb-6 shadow-xl border-4 border-dashed border-primary" />
        <p class="text-gray-700 max-w-4xl mx-auto text-lg">
          Hello, i'm Bob, a fullstack developer specialize on Javascript (node, express, vue, nuxt), Ruby and More...
        </p>
        <div class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
          <skill-chip>Javascript</skill-chip>
          <skill-chip>Vue</skill-chip>
          <skill-chip>Ruby</skill-chip>
        </div>
      </div>
    </section>

    <curved-divider />

    <section id="showcase" class="py-16 bg-slate-200">
      <h2 class="text-primary text-3xl mb-8 text-center">
        My projects
      </h2>
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <project-showcase v-for="project in projects"
                          :key="project.name"
                          :project="project"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
 const projects = [
   { name: 'VueShop', image: '', description: 'E-Commerce using Vue' },
   { name: 'NuxtBlog', image: '', description: 'E-Commerce using Vue' },
   { name: 'VueWeather', image: '', description: 'E-Commerce using Vue' },
 ]
</script>
