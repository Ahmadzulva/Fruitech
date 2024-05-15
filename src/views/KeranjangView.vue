<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import helper from '@/utilities/helper';

const { keranjang } = helper

const products = ref([
  { name: 'Watermelon Juice', description: 'Description 1', price: 9900, image: "assets/images/juice-watermelon.jpeg" },
  { name: 'Orange Juice', description: 'Description 2', price: 9900, image: "assets/images/juice-orange.jpeg" },
  { name: 'Lemon Juice', description: 'Description 3', price: 9900, image: "assets/images/juice-lemon.jpeg" },
  { name: 'Strawberry Juice', description: 'Description 3', price: 9900, image: "assets/images/juice-strawberry.jpeg" }
],)

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
  document.getElementById('modal').classList.remove('hidden')
}

const closeModal = () => {
  document.getElementById('modal').classList.add('hidden')
}

const getTotalPrice = () => {
  return keranjang.value.reduce((total, item) => total + item.price, 0)
}

const checkout = () => {
  keranjang.value = []
  Swal.fire({
    icon: 'success',
    title: 'Checkout Success',
    showConfirmButton: false,
    timer: 1500
  })
  closeModal()
}
</script>
<template>
  <div class="container mx-auto py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(product, index) in products" :key="index" class="bg-white rounded-lg shadow-xl overflow-hidden">
        <div class="relative pb-60 overflow-hidden">
          <img :src="product.image"
            class="absolute inset-0 h-full w-full object-cover transform hover:scale-110 transition duration-300"
            alt="Product" />
        </div>
        <div class="px-4 py-2">
          <h3 class="text-xl font-medium text-gray-800">{{ product.name }}</h3>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-gray-700 font-semibold mt-2">Price: Rp {{ product.price }}</p>
          <button
            class="mt-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded focus:outline-none focus:bg-blue-600"
            @click="addToCart(product)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal component -->
  <div id="modal" class="hidden absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-md">
      <h2 class="text-2xl font-semibold mb-4">Shopping Cart</h2>
      <ul>
        <li v-for="(item, index) in keranjang" :key="index">
          {{ item.name }} - Rp {{ item.price }}
        </li>
      </ul>
      <p class="font-semibold mt-4">Total: Rp {{ getTotalPrice() }}</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded focus:outline-none focus:bg-blue-600"
        @click="checkout()">
        Checkout
      </button>
      <button class="mt-4 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded focus:outline-none focus:bg-red-600"
        @click="closeModal()">
        Close
      </button>
    </div>
  </div>
</template>

<style></style>
