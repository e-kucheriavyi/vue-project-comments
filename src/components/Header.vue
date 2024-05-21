<script setup>
import { useRoute } from 'vue-router'
defineProps({
  total: Number
})

const emit = defineEmits(['openDrawer'])

const route = useRoute()
</script>

<template>
  <header
    class="flex justify-between items-center flex-wrap gap-4 border-b border-slate-300 px-10 py-8"
  >
    <router-link :to="{ name: 'home' }"
      ><div class="flex items-center">
        <img src="/logo.png" alt="Logo" class="w-10 mr-4" />
        <div>
          <span class="text-xl font-bold uppercase">Vue-project</span>
          <h1 class="text-slate-500">Магазин</h1>
        </div>
      </div>
    </router-link>

    <nav>
      <ul class="flex items-center gap-4 flex-wrap sm:gap-10">
        <li
          v-if="route.path !== '/'"
          class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black"
        >
          <router-link
            :to="{ name: 'home' }"
            class="bg-[url(/sneakers.svg)] bg-no-repeat pl-8 bg-left bg-contain"
            active-class="text-black"
            >Каталог</router-link
          >
        </li>
        <li class="cursor-pointer text-slate-600 hover:text-black">
          <button
            aria-label="Корзина"
            @click="emit('openDrawer')"
            class="font-bold bg-[url(/cart.svg)] bg-no-repeat pl-8 bg-left"
            type="button"
          >
            {{ total }} руб.
          </button>
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black">
          <router-link
            :to="{ name: 'favorites' }"
            class="bg-[url(/heart.svg)] bg-no-repeat pl-8 bg-left"
            active-class="text-black"
            >Закладки</router-link
          >
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black">
          <router-link
            :to="{ name: 'profile' }"
            class="bg-[url(/profile.svg)] bg-no-repeat pl-8 bg-left"
            active-class="text-black"
            >Профиль</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>