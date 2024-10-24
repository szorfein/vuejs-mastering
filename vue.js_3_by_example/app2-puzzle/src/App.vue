<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <AppPuzzles  @puzzle-changed="selectedPuzzleId = $event" />
  <SliderPuzzle :puzzleId="selectedPuzzleId" />
</template>

<script>
  import SliderPuzzle from "./components/SliderPuzzle.vue"
  import AppPuzzles from "./components/Puzzles.vue"

  export default {
    name: "App",
    components: {
      SliderPuzzle,
      AppPuzzles,
    },
    data() {
      return {
        selectedPuzzleId: "cut-pink",
      };
    },
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
