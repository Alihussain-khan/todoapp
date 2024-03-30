<template>
  <div v-if="isloading" class="loader animate-spin mx-auto mt-10"></div>
  <div v-if="!isloading" class="container mx-auto mt-10 ps-10">
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

//variabels
const token = window.localStorage.getItem("todotoken");
const data = ref(null);
const route = useRoute();
const title = ref(null);
const description = ref(null);
const isloading = ref(true);

//update apicall
function update() {
  isloading.value = true;
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
          isloading.value = false;
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

//get call
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
      isloading.value = false;
    })
    .catch((err) => console.log(err));
});
</script>

<style scoped>
.loader {
  border: 3px solid #0f172a;
  border-top: 3px solid #00c16a;
  border-right: 3px solid #00c16a;
  border-bottom: 3px solid #00c16a;
  border-radius: 90%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}
</style>
