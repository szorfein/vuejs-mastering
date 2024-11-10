<template>
    <h1>Filter</h1>
    <div>
        <input type="text"
               v-model="_value"
               @keyup="publishValue()"
               placeholder="Enter filter text..."
        >
        <button @click="clear()">clear</button>
    </div>
</template>

<script setup>
 import { ref, onMounted } from 'vue'
 const
 $props = defineProps(['modelValue']),
 $emit = defineEmits(['update:modelValue']),
 _value = ref('')

 onMounted(() => {
     _value.text = $props.modelValue
 })

 function clear() {
     _value.value = ''
     publishValue()
 }

 function publishValue() {
     $emit("update:modelValue", _value.value)
 }
</script>
