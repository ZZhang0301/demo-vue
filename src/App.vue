<template>
   <div id="app">
     <router-view />
     </div>
</template>

<script>
export default {
  name: 'App'
};
</script>



<style>
@import './tailwindcss.css';

#app {
  margin: auto;
  background: #b9e8ff;
  border-radius: 8px;
  height: auto;
}
</style>