<script setup>
defineProps({
  imgUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  // Во Vue принято эмитить события, а не передавать коллбэки
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="bg-white relative border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition"
  >
    <button
      type="button"
      :aria-label="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
      class="absolute top-8 left-8 w-8 h-8 bg-cover bg-no-repeat hover:scale-105 transition"
      :class="isFavorite ? 'bg-[url(/like-2.svg)]' : 'bg-[url(/like-1.svg)]'"
      @click="onClickFavorite"
      :title="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
    ></button>
    <div class="max-w-[266px] max-h-[224px]">
      <img class="object-cover w-full h-auto" :src="imgUrl" alt="Sneaker" />
    </div>

    <h3 class="mt-2">{{ title }}</h3>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400 uppercase">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <button
        class="w-8 h-8 bg-cover bg-no-repeat hover:scale-105 transition"
        :class="isAdded ? 'bg-[url(/checked.svg)]' : 'bg-[url(/plus.svg)]'"
        type="button"
        :aria-label="isAdded ? 'Удалить из корзины' : 'Добавить в корзину'"
        @click="onClickAdd"
        :title="isAdded ? 'Удалить из корзины' : 'Добавить в корзину'"
      ></button>
    </div>
  </div>
</template>