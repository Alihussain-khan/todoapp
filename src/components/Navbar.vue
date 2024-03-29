<template>
  <div class="bg-blue-950 py-3">
    <div class="container mx-auto">
      <nav class="text-white flex">
        <RouterLink class="me-auto" to="/"
          ><h3 class="font-semibold text-2xl">todo</h3></RouterLink
        >
        <ul class="flex space-x-3">
          <!-- <li><RouterLink to="/">home</RouterLink></li> -->
          <li><RouterLink to="/register">Register</RouterLink></li>
          <li><RouterLink to="/login">Login</RouterLink></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
