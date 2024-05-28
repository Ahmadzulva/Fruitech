<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import helper from '@/utilities/helper'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()

const { keranjang } = helper

const currentIndex = ref(0)
const images = ref([
  {
    src: '/assets/images/juice-orange.jpeg',
    alt: 'Product 1',
    text: 'Juice Orange - Fruitech',
    harga: 'Rp 9.900'
  },
  {
    src: '/assets/images/juice-watermelon.jpeg',
    alt: 'Product 2',
    text: 'Watermelon Juice - Fruitech',
    harga: 'Rp 9.900'
  },
  {
    src: '/assets/images/juice-lemon.jpeg',
    alt: 'Product 3',
    text: 'Lemon Juice -  Fruitech',
    harga: 'Rp 9.900'
  },
  {
    src: '/assets/images/juice-strawberry.jpeg',
    alt: 'Product 4',
    text: 'Strawberry Juice - Fruitech',
    harga: 'Rp 9.900'
  }
])

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
  router.push({ params: { id: currentIndex.value } })
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
  router.push({ params: { id: currentIndex.value } })
}

const addToCart = (product) => {
  keranjang.value.push(product)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Product added to cart',
    showConfirmButton: false,
    timer: 1500
  })
}

const cekCart = () => {
  if (keranjang.value.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your cart is empty!'
    })
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'You have ' + keranjang.value.length + ' item(s) in your cart.'
    })
  }
}
onMounted(() => {
  currentIndex.value = route.params.id
})
</script>

<template>
  <div class="container flex">
    <div class="slider">
      <transition name="fade" mode="out-in">
        <div>
          <img
            :src="images[currentIndex].src"
            :alt="images[currentIndex].alt"
            class="h-[485px] max-w-xl rounded-xl py-8 px-20"
            :key="images[currentIndex].src"
          />
        </div>
      </transition>
      <button
        @click="prev"
        type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        @click="next"
        type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full mx-[700px] cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <div class="title mx-8">
      <div class="w-full md:w-auto py-16 mb-8 w-max">
        <h2 class="text-3xl font-semibold mb-2 text-white">{{ images[currentIndex].text }}</h2>
        <span class="text-lg font-medium text-white line-through dark:text-white mb-2"
          >Rp 14.999</span
        >
        <span class="ms-3 text-lg font-medium text-white dark:text-white">{{
          images[currentIndex].harga
        }}</span>
        <div class="flex items-center mb-4">
          <p class="text-white mb-4 text-justify mt-4">
            Fruitech adalah kelezatan segar yang terkemas dalam setiap tetesnya. Dipenuhi dengan
            kebaikan buah-buahan pilihan yang diperas segar, setiap gelas adalah perpaduan sempurna
            antara rasa, kesehatan, dan kesegaran.
          </p>
        </div>
        <button
          @click="addToCart(images[currentIndex])"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pesan Sekarang
        </button>
        <p class="text-white text-sm mt-1.5">
          *Harga mungkin dapat berubah tanpa pemberitahuan sebelumnya.
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
