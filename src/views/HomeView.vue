<template>
  <div class="flex justify-center mt-72">
    <h1 class="font-semibold text-2xl">Welcome to the home screen</h1>
    <br />
  </div>
  <div class="flex justify-center mt-2 space-x-5 text-white">
    <RouterLink
      class="bg-green-400 px-3 py-1 rounded hover:bg-green-500"
      to="/login"
      >Login</RouterLink
    >
    <RouterLink
      class="bg-green-400 px-3 py-1 rounded hover:bg-green-500"
      to="/register"
      >Register
    </RouterLink>
  </div>
</template>

<script setup></script>
