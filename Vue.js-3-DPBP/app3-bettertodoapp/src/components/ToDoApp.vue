<template>
    <h1>Todo App</h1>
    <div>
        <ToDoSummary :items="items" />
        <ToDoFilter v-model="_filter" />

        <ToDoList v-model="items"
                  :filter="_filter"
                  @toggle="toggleStatus"
                  @edit="showModal(false, $event)"
                  @delete="deleteItem"
        >
            <button @click="showModal(true)">Add a new item</button>
        </ToDoList>

        <Modal name="newEditItem" title="To Do Item">
            <ToDoItemForm v-model="item" />
        </Modal>

        <Modal name="deleteItem" title="Delete item">
            to delete: {{ item.text }}
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
 _filter = ref(''),
 item = ref(todoService.getDefault()),
 items = ref([])

 function showModal(new_item = true, item = {}) {
     if (new_item) {
         item.value = todoService.getDefault()
         let tojson = JSON.stringify(item.value)
         console.log(`item if new_item > ${tojson}`)
     } else {
         item.value = todoService.makeCopy(item)
         let tojson = JSON.stringify(item.value)
         console.log(`item if not new_item > ${tojson}`)
     }

     $modals.show('newEditItem').then(() => {
         if (new_item) {
             let tojson = JSON.stringify(item.value)
             console.log(`modal got new_item: > ${tojson}`)
             items.value.push(item.value)
         } else {
             let index = getIndex(item)
             if (index >= 0) {
                 items.value[index] = item.value
                 let tojson = JSON.stringify(items.value[index])
                 console.log(`modal show > ${tojson}`)
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

 function deleteItem(item) {
     $modals.show('deleteItem').then(() => {
         let index = getIndex(item)
         if (index >= 0) {
             items.value.splice(index, 1)
         }
     }, () => {})
 }

 function toggleStatus(item) {
     item.status = todoService.toggleStatus(item.status)
 }
</script>
