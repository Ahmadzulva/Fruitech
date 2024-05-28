<script setup>
import { RouterLink } from 'vue-router'
import helper from '@/utilities/helper'
const { keranjang } = helper
</script>

<template>
  <div class="navbar">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-10 mr-20"
      >
        <RouterLink :to="'/'" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/assets/images/logo.jpeg" class="h-8" alt="Fruitech Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >FRUITECH</span
          >
        </RouterLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <RouterLink
                :to="'/'"
                class="block mt-2.5 py-2 px-3 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-white-500"
                aria-current="page"
                >Home</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="'/product/0'"
                class="block mt-2.5 py-2 px-3 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-white-500"
                aria-current="page"
                >Product</RouterLink
              >
            </li>

            <li class="flex items-center">
              <RouterLink :to="'/keranjang'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[20px] h-[20px] mr-4"
                  fill="white"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                  />
                </svg>
                <p class="font-bold">({{ keranjang.length }})</p>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style></style>
