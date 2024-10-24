<template>
    <h1>Puzzles</h1>
    <div v-for="p of puzzles" :key="p.id" class="row">
        <div>
            <img :src="require(`../assets/${p.image}`)" />
        </div>
        <div>
            <h2>{{ p.title }}</h2>
        </div>
        <div class="play-button">
            <button @click="selectPuzzle(p)">Play</button>
        </div>
    </div>
</template>

<script>

 export default {
     name: "AppPuzzles",
     emits: ['puzzle-changed'],
     data() {
         return {
             puzzles: [
                 { id: 'cut-pink', image: 'pink.jpg', title: 'Pink' },
                 { id: 'cut-purple', image: 'purple.jpg', title: 'Purple' },
                 { id: 'cut-red', image: 'red.jpg', title: 'Red' },
             ],
         };
     },
     methods: {
         selectPuzzle(name) {
             this.$emit('puzzle-changed', name.id);
             console.log('puzzle ' + name.id);
         },
     },
 };
</script>

<style scoped>
 .row {
     display: flex;
     max-width: 100vw;
     flex-wrap: wrap;
     justify-content: space-between;
 }
 .row img {
     width: 100px;
 }
</style>
