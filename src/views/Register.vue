<template>
  <div class="flex justify-center mt-28">
    <div class="bg-gray-200 py-20 px-10 rounded">
      <h1 class="text-2xl font-semibold text-center mb-5">Register</h1>
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
      <input
        class="mb-2 py-1 px-2 w-56 rounded"
        type="password"
        placeholder="repeat password"
        v-model="repassword"
      /><br />
      <button
        class="bg-green-400 px-3 py-1 rounded w-full text-white hover:bg-green-500"
        @click="register"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

//variables
const email = ref(null);
const password = ref(null);
const repassword = ref(null);

//register api call
function register() {
  if (ValidateEmail(email) && matchpassword(password.value, repassword.value)) {
    axios
      .post("http://3.232.244.22/api/register", {
        email: email.value,
        password: password.value,
        password_confirmation: repassword.value,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          alert("please check your inbox and login");
          router.push("/login");
        } else {
          alert("registration failed");
        }
      })
      .catch((err) => alert("user already exists"));
  } else {
    alert("invalid email or passwords dont match");
  }
}

//validate email
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return true;
  }
  return false;
}

// match password
function matchpassword(password, repassword) {
  if (password === repassword) {
    return true;
  }
  return false;
}
</script>

<style scoped></style>
