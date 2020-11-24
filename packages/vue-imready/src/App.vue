<template>
  <div :ref="register()">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    {{state.isPreReady}}
    {{state.isReady}}
    {{state.totalCount}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { useImReady } from "./components/useImReady";

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    console.log("SET");
    return useImReady();
  },
});
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
