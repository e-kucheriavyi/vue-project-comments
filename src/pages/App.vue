<script setup>
import { onMounted, ref, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

const favorites = ref([])

const cart = ref([])

const orderId = ref(null)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const drawerOpen = ref(false)

const isDisabledButtonCart = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
  orderId.value = null
}

const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = !item.isFavorite
      const { data } = await axios.post('https://715be631198d11a6.mokky.dev/favorites', {
        item_id: item.id
      })

      item.favoriteId = data.id
    } else {
      item.isFavorite = !item.isFavorite
      await axios.delete(`https://715be631198d11a6.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const clickToCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const checkToCart = (items) => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
}

const createOrders = async () => {
  try {
    isDisabledButtonCart.value = true
    const { data } = await axios.post('https://715be631198d11a6.mokky.dev/orders', {
      items: cart.value,
      total: totalPrice.value,
      createdAt: new Date()
    })

    cart.value = []
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: false
    }))

    favorites.value = favorites.value.map((item) => ({
      ...item,
      isAdded: false
    }))

    orderId.value = data.id

    localStorage.removeItem('cart')
  } catch (error) {
    console.log(error)
  } finally {
    isDisabledButtonCart.value = false
  }
}

onMounted(() => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
})

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  removeFromCart,
  addToCart,
  checkToCart,
  clickToCart
})

provide('items', items)
provide('addToFavorites', addToFavorites)
provide('favorites', favorites)
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    @close-drawer="closeDrawer"
    @create-orders="createOrders"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :is-disabled-button-cart="isDisabledButtonCart"
    :open-drawer="drawerOpen"
    :order-id="orderId"
  />
  <div class="w-4/5 mx-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <Header :total="totalPrice" @open-drawer="openDrawer" />
    <main class="p-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>