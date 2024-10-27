<template>
    <div>
        <h1>Search</h1>
        <form @submit.prevent="submit" id="search">
            <div>
                <label for="name">Keyword</label>
                <br />
                <input type="text"
                       v-model="keyword"
                       name="keyword"
                       id="keyword"
                       class="form-field"
                />
            </div>
            <div>
                <input type="submit" value="Search" />
            </div>
        </form>
        <div v-for="p of photos" :key="p.id" class="row">
            <div>
                <img :src="p.photoFile" />
            </div>
            <div>
                <div>{{ p.name }}</div>
                <div>{{ p.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
 import axios from "axios";
 import { APIURL } from "../constant.js";

 export default {
     name: "SearchPage",
     data() {
         return {
             keyword: "",
             photos: [],
         }
     },
     methods: {
         async search() {
             const { data } = await axios.get(
                 `${APIURL}/photos?name_like=${this.$route.query.q}`
             );
             this.photos = data;
         },
         submit() {
             console.log(this.keyword);
             this.$router.push({ path: "/search", query: { q: this.keyword } });
         },
     },
     watch: {
         $route: {
             immediate: true,
             handler() {
                 this.keyword = this.$route.query.q;
                 this.search();
             },
         },
     }
 };
</script>
