<template>
    <h1>Modal</h1>
    <div v-if="show">
        <header>{{ $props.title }}</header>
        <main><slot></slot></main>
        <footer>
            <button @click="closeModal(true)">Accept</button>
            <button @click="closeModal(false)">Close</button>
        </footer>
    </div>
</template>

<script setup>
 import { inject, computed } from 'vue'

 const
 $props = defineProps({
     name: { type: String, default: '' },
     title: { type: String, default: 'Modal dialog' }
 }),
 $modals = inject('$modals'),
 show = computed(() => {
     return $modals.active() == $props.name
 })

 function closeModal(accept = false) {
     accept ? $modals.accept() : $modals.cancel()
 }
</script>
