<template>
    <h1>Todo App</h1>
    <div>
        <ToDoSummary :items="items" />
        <ToDoFilter />

        <ToDoList v-model="items"
                  @toggle="toggleStatus"
                  @edit="showModal(false, $event)"
        >
            <button @click="showModal(true)">Add a new item</button>
        </ToDoList>

        <Modal name="newEditItem" title="To Do Item">
            <ToDoItemForm v-model="item" />
        </Modal>
    </div>
</template>

<script setup>
 import { ref, inject } from 'vue'
 import todoService from '../services/todo'
 import ToDoSummary from './ToDoApp/Summary.vue'
 import ToDoFilter from './ToDoApp/Filter.vue'
 import ToDoList from './ToDoApp/List.vue'
 import ToDoItemForm from './ToDoApp/ItemForm.vue'

 const
 $modals = inject('$modals'),
 filter = ref(''),
 item = ref(todoService.getDefault()),
 items = ref([])

 function showModal(new_item = true, item = {}) {

     if (new_item) {
         item.value = todoService.getDefault()
     } else {
         item.value = todoService.makeCopy()
     }

     $modals.show('newEditItem').then(() => {
         if (new_item) {
             items.value.push(item.value)
         } else {
             let index = getIndex(item)
             if (index >= 0) {
                 items.value[index] = item.value
             } else {
                 alert('Error updating item')
             }
         }
     }, () => {
         // handle cancel
     })
 }

 function getIndex(item) {
     let index = items.value.findIndex(it => {
         return it.id == item.id
     })
     if (index == -1) {
         return false
     } else {
         return index
     }
 }
</script>
