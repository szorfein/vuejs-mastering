<template>
    <h1>Display List</h1>
    <table>
        <thead>
            <tr>
                <th>Status</th>
                <th>Item</th>
                <th>
                    <slot></slot>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in filtered_list" :key="item.id">
                <td @click="emitEvent('toggle', item)">
                    <i v-if="item.status=='not_started'">not started</i>
                    <i v-if="item.status=='in_progress'">in progress</i>
                    <i v-if="item.status=='completed'">completed</i>
                </td>
                <td>{{ item.text }}</td>
                <td>
                    <span @click="emitEvent('edit', item)">Edit</span>
                    <span @click="emitEvent('delete', item)">Delete</span>
                </td>
            </tr>
            <tr v-if="filtered_list.length==0">
                <td></td>
                <td>List is empty</td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
 import { computed } from 'vue'

 const
 $props = defineProps({
     "modelValue": { type: Array, default: () => [] },
     "filter": { type: String, default: '' }
 }),
 $emit = defineEmits(["edit", "delete", "toggle"]),
 filtered_list = computed(() => {
     if ($props.filter) {
         return $props.modelValue.filter(item => {
             console.log('return filter')
             return item.text.toUpperCase().includes($props.filter.toUpperCase())
         })
     } else {
         console.log('return modelvalue')
         return $props.modelValue
     }
 })

 function emitEvent(event_name, payload) {
     let tojson = JSON.stringify(payload)
     console.log(`Emit from List >${event_name} ${tojson}`)
     $emit(event_name, payload)
 }
</script>
