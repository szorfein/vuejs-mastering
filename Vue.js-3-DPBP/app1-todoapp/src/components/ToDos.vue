<template>
    <h1>ToDoApp</h1>
    <div>
        <input autofocus
               v-model="todo_text"
               @keyup.enter="addToDo()"
               placeholder="Type your task here."
        />
        <button @click="clearToDo()">Clear</button>
        <button @click="addToDo()">Add</button>
    </div>

    <div>
        Pending ({{ pending.length }})
    </div>
    <div v-for="todo in pending" :key="todo.id">
        <label>
            <input type="checkbox" v-model="todo.checked">
            <span>{{ todo.text }}</span>
        </label>
    </div>
    <div v-show="pending.length == 0">No tasks</div>
    <div>Completed ({{ done.length }})</div>
    <div v-for="todo in done" :key="todo.id">
        <label>
            <input type="checkbox" v-model="todo.checked">
            <span>{{ todo.text }}</span>
        </label>
    </div>
    <div v-show="done.length == 0">No task completed</div>
</template>

<script setup>
 import { ref, computed } from 'vue'

 const
 todo_text = ref(""),
 todo_list = ref([]),
 pending = computed(() => {
     return todo_list.value.filter(item => !item.checked)

 }),
 done = computed(() => {
     return todo_list.value.filter(item => item.checked)
 })

 function clearToDo() {
     todo_text.value = ""
 }
 function addToDo() {
     if (todo_text.value && todo_text.value !== "") {
         todo_list.value.push({ id: new Date().valueOf(),
                                text: todo_text.value,
                                checked: false
         })
         clearToDo()
     }
 }
</script>
