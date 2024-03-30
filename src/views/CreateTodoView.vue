<template>
  <div class="container mx-auto mt-10 ps-10">
    <div class="flex justify-center">
      <h1 class="font-semibold text-xl me-5">Title:</h1>
      <input
        class="border-b-2 w-[400px] focus:outline-none focus:border-green-400"
        type="text"
        v-model="title"
      />
    </div>
    <div class="flex mt-10">
      <h1 class="font-semibold text-xl me-5">Description:</h1>
      <textarea
        class="border-2 p-1 w-full focus:outline-none focus:border-green-400 h-20"
        type="text"
        v-model="description"
      />
    </div>
    <div class="flex justify-center mt-10">
      <button
        class="bg-green-400 px-3 py-1 w-1/5 rounded text-white hover:bg-green-500"
        @click="Add"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import axios from "axios";
const title = ref(null);
const description = ref(null);
const token = window.localStorage.getItem("todotoken");
function Add() {
  console.log(title.value + " " + description.value);
  if (title.value && description.value) {
    axios
      .post(
        "http://3.232.244.22/api/item",
        {
          title: title.value,
          description: description.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          router.push("/");
        } else {
          alert("couldnt add");
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("cannot be empty");
  }
}
</script>

<style scoped></style>
