<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import axios from 'axios'
import { onMounted, ref, inject, watch } from 'vue'

const orders = ref([])

const { cart } = inject('cart')

const fetchOrders = async () => {
  const { data } = await axios.get('https://715be631198d11a6.mokky.dev/orders')
  orders.value = data
}

onMounted(async () => {
  await fetchOrders()
})

watch(cart, () => {
  fetchOrders()
})
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-5 mb-6">
    <h1 class="text-3xl font-bold w-full">Мои заказы</h1>
    <p class="text-slate-600">Всего заказов: {{ orders.length }}</p>
  </div>
  <div class=""><!--Ещё мусор. Класс не нужно указывать, если он пустой-->
    <ul>
      <li
        v-for="order in orders"
        :key="order.id"
        class="border border-slate-200 p-4 rounded-lg mb-3"
      >
        <div class="">
          <h2 class="text-xl font-bold w-full">Заказ №{{ order.id }}</h2>
          <div class="flex gap-4 mb-2">
            <span>Дата:</span>
            <time :datetime="order.createdAt">{{
              dayjs(order.createdAt).format('D MMMM YYYY в HH:mm')
            }}</time>
          </div>

          <div class="flex gap-2 flex-wrap mb-5">
            <div v-for="item in order.items" :key="item.id">
              <img
                class="w-32 h-32 object-contain"
                :src="item.imageUrl"
                :alt="item.title"
                :title="item.title"
              />
              <span>{{ item.price }} руб.</span>
            </div>
          </div>
          <div class="flex gap-2 flex-col">
            <span class="text-slate-600">Всего позиций: {{ order.items.length }}</span>
            <span>Общая стоимость: {{ order.total }} руб.</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>