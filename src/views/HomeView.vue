<template>
  <div v-if="!$store.state.isloggedin">
    <Welcome />
  </div>
  <div v-if="$store.state.isloggedin">
    <Todo />
  </div>
</template>

<script setup>
import Welcome from "@/components/Welcome.vue";
import Todo from "@/components/Todo.vue";
</script>
