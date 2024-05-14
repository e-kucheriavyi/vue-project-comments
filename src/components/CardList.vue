<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <ul
    class="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    v-auto-animate="{ duration: 500 }"
  >
    <li v-for="item in items" :key="item.id">
      <Card
        :imgUrl="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :isFavorite="item.isFavorite"
        :isAdded="item.isAdded"
        :onClickAdd="() => onClickAdd(item)"
        :onClickFavorite="() => onClickFavorite(item)"
      />
    </li>
  </ul>
</template>