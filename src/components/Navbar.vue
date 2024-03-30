<template>
  <div class="bg-blue-950 py-3">
    <div class="container mx-auto">
      <nav class="text-white flex">
        <RouterLink class="me-auto" to="/"
          ><h3 class="font-semibold text-2xl">todo</h3></RouterLink
        >
        <ul v-if="!$store.state.isloggedin" class="flex space-x-3">
          <!-- <li><RouterLink to="/">home</RouterLink></li> -->
          <li><RouterLink to="/register">Register</RouterLink></li>
          <li><RouterLink to="/login">Login</RouterLink></li>
        </ul>
        <ul v-if="$store.state.isloggedin" class="flex space-x-3">
          <li class="cursor-pointer" @click="logout">Logout</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import store from "@/store/auth";
const token = window.localStorage.getItem("todotoken");
const auth = ref(false);
onMounted(() => {
  if (token) {
    auth.value = true;
  }
});

const logout = () => {
  window.localStorage.removeItem("todotoken");
  store.state.isloggedin = false;
  router.push("/");
};
</script>
