<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
const emit = defineEmits(['closeDrawer', 'createOrders'])

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isDisabledButtonCart: Boolean,
  openDrawer: Boolean,
  orderId: Number
})
</script>

<template>
  <div
    @click="emit('closeDrawer')"
    class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
    :class="openDrawer ? 'open-cart' : ''"
  ></div>
  <div
    class="bg-white fixed w-96 h-full right-0 top-0 z-20 p-8 flex flex-col overflow-y-auto"
    v-auto-animate="{ duration: 500 }"
  >
    <DrawerHead />
    <CartItemList v-if="totalPrice" key="cart-list" />
    <div v-if="!totalPrice || orderId" class="flex my-auto">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
        title="Корзина пустая"
        imageUrl="package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        title="Заказ оформлен!"
        imageUrl="order-success-icon.png"
        colorTitle="green"
      />
    </div>

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-8 mb-6">
      <div class="flex gap-2 items-baseline">
        <span>Итого</span>
        <div class="flex-1 border-b border-dashed"></div>
        <span class="font-bold">{{ totalPrice }} руб.</span>
      </div>

      <div class="flex gap-2 items-baseline">
        <span>Налог 5%</span>
        <div class="flex-1 border-b border-dashed"></div>
        <span class="font-bold">{{ vatPrice }} руб.</span>
      </div>
    </div>
    <button
      v-if="totalPrice"
      @click="emit('createOrders')"
      class="bg-lime-500 w-full text-white p-4 rounded-xl hover:bg-lime-600 transition disabled:bg-slate-300"
      type="button"
      :disabled="totalPrice === 0 || isDisabledButtonCart"
    >
      Оформить заказ
    </button>
  </div>
</template>