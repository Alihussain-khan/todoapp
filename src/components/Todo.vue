<template>
  <!-- Main heading -->
  <h1 class="text-center font-blod text-2xl my-5">
    Your Current Tasks are listed below
  </h1>

  <div class="flex justify-between mt-5 w-4/5 mx-auto">
    <!-- create toto items -->
    <div>
      <RouterLink to="/create">
        <button
          class="bg-green-400 px-3 pb-1 rounded hover:bg-green-500 text-white text-2xl"
        >
          +
        </button>
      </RouterLink>
    </div>

    <!-- Search Bar -->
    <div class="relative">
      <input
        v-on:blur="changeVisibilty"
        class="border-2 focus:outline-none focus:border-green-400 p-1 rounded w-56"
        placeholder="search..."
        v-model="searchinput"
      />
      <div v-if="isvisible" class="z-20 absolute bg-blue-950 text-white">
        <div
          class="hover:bg-slate-100 hover:text-black px-5 cursor-pointer w-56"
          v-for="item in searchlist"
        >
          <RouterLink
            class="hover:font-semibold"
            @click="ok()"
            :to="'/update/' + item.id"
            >{{ item.title }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="flex justify-center mx-auto mt-10" ref="scrollingdiv">
    <table class="w-4/5">
      <tr class="bg-green-500 text-white">
        <th class="font-semibold text-xl py-1">number</th>
        <th class="font-semibold text-xl py-1">title</th>
        <th class="font-semibold text-xl py-1">description</th>
        <th class="font-semibold text-xl py-1">update</th>
        <th class="font-semibold text-xl py-1">delete</th>
      </tr>
      <tr v-for="(item, index) in data">
        <td class="text-center py-2 border-b-2">{{ index + 1 }}</td>
        <td class="text-center py-2 border-b-2">{{ item.title }}</td>
        <td class="text-center py-2 border-b-2">{{ item.description }}</td>
        <td class="text-center py-2 border-b-2">
          <RouterLink
            class="bg-orange-400 px-2 rounded-xl text-white"
            :to="'/update/' + item.id"
            >update</RouterLink
          >
        </td>
        <td class="text-center py-2 border-b-2">
          <button
            class="bg-red-600 px-1 rounded text-white"
            @click="deleteItem(item.id)"
          >
            X
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { onUnmounted, onMounted, ref, watch } from "vue";
import axios from "axios";

//variables
const token = window.localStorage.getItem("todotoken");
const data = ref([]);
const searchinput = ref("");
const searchlist = ref("");
const isvisible = ref(false);
const scrollingdiv = ref(null);
const pagecount = ref(1);

//delete api call
const deleteItem = (id) => {
  axios
    .delete("http://3.232.244.22/api/item/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        data.value = data.value.filter((item) => item.id !== id);
      } else {
        alert("registration failed");
      }
    })
    .catch((err) => console.log(err));
};

//onMount get api call
onMounted(() => {
  apicall();
  pagecount.value = pagecount.value + 1;
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

//onUnMount remove listener
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

//handlescroll
const handleScroll = (e) => {
  let element = scrollingdiv.value;
  if (element.getBoundingClientRect().bottom <= window.innerHeight) {
    console.log("more posts");
    apicall();
  }
};

// api call
const apicall = () => {
  console.log("pagecount value----", pagecount.value);
  axios
    .get("http://3.232.244.22/api/items?page=" + pagecount.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data.items.data.length > 1) {
        data.value.push(...response.data.items.data);
        pagecount.value = pagecount.value + 1;
        console.log("page count afte addition---", pagecount.value);
      }
    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized") {
        axios
          .post("http://3.232.244.22/api/refresh-token/" + token, {})
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
};

// search filter
function filteredList() {
  return data.value.filter((item) =>
    item.title.toLowerCase().includes(searchinput.value.toLowerCase())
  );
}

//watching input
watch(searchinput, () => {
  isvisible.value = true;
  searchlist.value = filteredList();
});

// changing search item visibility
const changeVisibilty = () => {
  console.log("it workds");
  setTimeout(() => {
    isvisible.value = false;
  }, 300);
};
</script>

<style scoped></style>
