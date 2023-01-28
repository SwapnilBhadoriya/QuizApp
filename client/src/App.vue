<template>
  <div id="app">
    <nav>

    </nav>
    <Admin></Admin>
    <router-view />
  </div>
</template>
<script>
import Admin from './views/AdminQuiz.vue';
export default {
  components: { Admin }
}
</script>

