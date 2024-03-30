<template>
  <div class="container mx-auto mt-10 ps-10">
    <div class="flex justify-center">
      <h1 class="font-semibold text-xl me-5">Title:</h1>
      <input
        class="border-b-2 w-[400px] focus:outline-none focus:border-green-400"
        type="text"
        v-model="title"
        disabled
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
        @click="update"
      >
        update
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import axios from "axios";

const token = window.localStorage.getItem("todotoken");
const data = ref(null);
const route = useRoute();
const title = ref(null);
const description = ref(null);

function update() {
  if (description.value) {
    axios
      .put(
        "http://3.232.244.22/api/item/" + route.params.id,
        {
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
        console.log(response);
        if (response.data.success) {
          router.push("/");
        } else {
          alert("coultdnt update");
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("cannot be empty");
  }
}

onMounted(() => {
  axios
    .get("http://3.232.244.22/api/item/" + route.params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      data.value = response.data.item;
      title.value = data.value.title;
      description.value = data.value.description;
    })
    .catch((err) => console.log(err));
});
</script>

<style scoped></style>
