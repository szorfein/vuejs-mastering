<template>
    <div class="grid md:grid-cols-2 min-h-screen bg-gray-100">
        <div class="hidden md:flex md:col-span-1 items-center justify-center bg-white">
            <img src="~/assets/images/auth.svg" class="max-w-md" />
        </div>
        <div class="col-span-1 flex justify-center items-center">
            <slot />
        </div>
    </div>
</template>
