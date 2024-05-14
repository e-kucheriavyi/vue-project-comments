<script setup>
import { onMounted, inject, provide, watch } from 'vue'
import CardList from '../components/CardList.vue'
import InfoBlock from '@/components/InfoBlock.vue'
import axios from 'axios'

const favorites = inject('favorites', [])

const { cart } = inject('cart')

const { checkToCart, clickToCart } = inject('cart')

onMounted(async () => {
  const { data } = await axios.get('https://715be631198d11a6.mokky.dev/favorites?_relations=items')
  favorites.value = data.map((obj) => ({ ...obj.item, favoriteId: obj.id, isFavorite: true }))
  checkToCart(favorites)
})

const removeFromFavorites = async (item) => {
  try {
    item.isFavorite = false
    await axios.delete(`https://715be631198d11a6.mokky.dev/favorites/${item.favoriteId}`)
    favorites.value = favorites.value.filter((obj) => obj.isFavorite)
  } catch (error) {
    console.log('Error:', error)
  }
}

watch(cart.value, () => {
  checkToCart(favorites)
})

provide(favorites, 'favorites')
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-5">
    <h2 class="text-3xl font-bold w-full">Мои закладки</h2>
  </div>

  <CardList :items="favorites" :onClickFavorite="removeFromFavorites" :onClickAdd="clickToCart" />
  <div v-if="favorites.length === 0" class="flex justify-center items-center min-h-[50vh]">
    <InfoBlock
      title="Закладок нет :("
      description="Вы ничего не добавляли в закладки"
      imageUrl="emoji-1.png"
    />
  </div>
</template>