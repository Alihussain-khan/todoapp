<template>
  <div class="flex justify-center mt-28">
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
import router from "@/router";
import store from "@/store/auth";

// variables
const email = ref(null);
const password = ref(null);

//apicall
function login() {
  if (ValidateEmail(email)) {
    if (password.value) {
      axios
        .post("http://3.232.244.22/api/login", {
          email: email.value,
          password: password.value,
        })
        .then((response) => {
          window.localStorage.setItem("todotoken", response.data.user.token);
          if (response.data.success) {
            store.state.isloggedin = true;
            router.push("/");
            console.log("but why");
          } else {
            alert("registration failed");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("wrong email or password");
        });
    } else {
      alert("password cannot be empty");
    }
  } else {
    alert("invalid email");
  }
}

//validate email
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return true;
  }
  return false;
}
</script>

<style scoped></style>
