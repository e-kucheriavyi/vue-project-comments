<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
  colorTitle: String
})
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img class="h-16 w-16" :src="imageUrl" :alt="title" />
    <h2 class="mt-4 text-2xl font-medium" :class="colorTitle === 'green' ? 'text-green-600' : ''">
      {{ title }}
    </h2>
    <p class="text-slate-500 mt-2">{{ description }}</p>
  </div>
</template>