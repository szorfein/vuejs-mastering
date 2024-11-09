<template>
    <h1>New ToDo</h1>
    <div>
        <strong>Descrition</strong>
        <input type="text" v-model.string="item.text" @blur="emitUpdate()">

        <strong>Status</strong>
        <select v-model.string="item.status" @change="emitUpdate()">
            <option v-for="state in todoService.getStatusList()" :key="state.id" :value="state.id">
                {{ state.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
 import { ref } from 'vue'
 import todoService from '../../services/todo'

 const
 $props = defineProps({
     modelValue: { type: Object, default: () => {} }
 }),
 $emit = defineEmits(['update:modelValue']),
 item = ref({})

 item.value = { ...$props.modelValue }

 function emitUpdate() {
     $emit("update:modelValue", item.value)
 }
</script>
