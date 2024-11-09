<template>
    <h1>Summary</h1>
    <template>
        <div>
            <strong>Pending</strong>
            <h2>{{ state?.not_started }}</h2>
        </div>
        <div>
            <strong>In Progress</strong>
            <h2>{{ state?.in_progress }}</h2>
        </div>
        <div>
            <strong>Completed</strong>
            <h2>{{ state?.completed }}</h2>
        </div>
    </template>
</template>

<script setup>
 import { computed } from 'vue'
 import todoService from '../../services/todo'

 const
 $props = defineProps({
     items: { Type: Array, default: () => [] },
 }),
 state = computed(() => {
     let status = {}
     todoService.getStatusList().forEach(stat => {
         status[stat.id] = 0
     })
     $props.items.forEach(todo => {
         status[todo.status] += 1
     })
     return status
 })
</script>
