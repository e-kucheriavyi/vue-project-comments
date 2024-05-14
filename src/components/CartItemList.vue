<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart } = inject('cart')

const { removeFromCart } = inject('cart')
</script>

<template>
  <ul v-auto-animate="{ duration: 500 }" class="flex flex-col gap-6 flex-1">
    <li v-for="item in cart" :key="item.id">
      <CartItem
        :imageUrl="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :remove-from-cart="() => removeFromCart(item)"
      />
    </li>
  </ul>
</template>