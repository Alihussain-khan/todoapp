<template>
  <div class="flex justify-center mt-48">
    <div class="bg-gray-200 py-20 px-10 rounded">
      <h1 class="text-2xl font-semibold text-center mb-5">login</h1>
      <input
        class="mb-2 px-2 py-1 w-56 rounded"
        type="email"
        placeholder="email"
        v-model="email"
      /><br />
      <input
        class="mb-2 py-1 px-2 w-56 rounded"
        type="password"
        placeholder="password"
        v-model="password"
      /><br />
      <button
        class="bg-green-400 px-3 py-1 rounded w-full text-white hover:bg-green-500"
        @click="login"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const email = ref(null);
const password = ref(null);

function login() {
  console.log(email.value + " " + password.value);
  if (email.value && password.value) {
    axios
      .post("http://3.232.244.22/api/login", {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        console.log(response.data.user);
        window.localStorage.setItem("todotoken", response.data.user.token);
        if (response.data.success) {
          alert("successfull");
        } else {
          alert("registration failed");
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("cannot be empty");
  }
}
</script>

<style scoped></style>
