<template>
    <h1>New ToDo</h1>
    <div>
        <strong>Descrition</strong>
        <input type="text" v-model.string="_item.text" @blur="emitUpdate()">

        <strong>Status</strong>
        <select v-model.string="_item.status" @change="emitUpdate()">
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
 _item = ref({})

 _item.value = { ...$props.modelValue }

 function emitUpdate() {
     let tojson = JSON.stringify(_item.value)
     console.log(`Emit from form > ${tojson}`)
     $emit("update:modelValue", _item.value)
 }
</script>
