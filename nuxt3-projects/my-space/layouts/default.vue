<template>
    <nav class="bg-gray-800 text-white py-4">
        <div class="container flex justify-between items-center">
            <div class="text-xl font-bold uppercase">
                <nuxt-link to="/">My space</nuxt-link>
            </div>
            <div class="flex gap-x-4">
                <UButton to="/posts/create">New post</UButton>
            </div>
        </div>
    </nav>

    <main>
        <slot />
    </main>
</template>
