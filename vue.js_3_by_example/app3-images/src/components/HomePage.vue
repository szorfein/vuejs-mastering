<template>
    <h1>Photos</h1>
    <div class="row">
        <div>Name</div>
        <div>Photo</div>
        <div>Description</div>
        <div>Actions</div>
    </div>
    <div v-for="p of photos" :key="p.id" class="row">
        <div>
            <img :src="p.photoFile" />
        </div>
        <div>{{ p.name }}</div>
        <div>{{ p.description }}</div>
        <div>
            <button @click="edit(p.id)">edit</button>
            <button @click="deletePhoto(p.id)">delete</button>
        </div>
    </div>
</template>

<script>
 import axios from "axios";
 import { APIURL } from "../constant.js";
 export default {
     data() {
         return {
             photos: [],
         };
     },
     methods: {
         async load() {
             const { data } = await axios.get(`${APIURL}/photos`);
             this.photos = data;
         },
         edit(id) {
             this.$router.push({ path: `/edit-photo-form/${id}` });
             console.log(`edit photo ${id}.`);
         },
         async deletePhoto(id) {
             await axios.delete(`${APIURL}/photos/${id}`);
             this.photos = [];
             this.load();
         },
     },
     beforeMount() {
         this.load();
     }
 };
</script>
