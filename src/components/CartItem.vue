<script setup>
defineProps({
  id: Number,
  title: String,
  price: Number,
  imageUrl: String,
  removeFromCart: Function
})
</script>

<template>
  <div class="flex justify-between gap-10 items-center border border-slate-100 p-4 rounded-xl">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col">
      <p class="mb-2">{{ title }}</p>

      <div class="flex justify-between">
        <span class="font-bold">{{ price }} руб.</span>
        <button
          @click="removeFromCart"
          type="button"
          aria-label="Удалить из корзины"
          class="w-8 h-8 bg-cover bg-no-repeat bg-[url(/close.svg)] opacity-60 hover:opacity-100 transition-opacity"
          title="Удалить из корзины"
        ></button>
      </div>
    </div>
  </div>
</template>